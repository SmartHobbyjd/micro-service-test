package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	crudpb "project/crud"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type UserServiceServer struct {
}

func (s *UserServiceServer) ReadUser(ctx context.Context, req *crudpb.ReadUserReqById) (*crudpb.ReadUserRes, error) {
	// convert string id (from crud) to mongoDB ObjectId
	oid, err := primitive.ObjectIDFromHex(req.GetId())
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, fmt.Sprintf("Could not convert to ObjectId: %v", err))
	}
	result := userdb.FindOne(ctx, bson.M{"_id": oid})
	// Create an empty UserItem to write our decode result to
	data := UserItem{}
	// decode and write to data
	if err := result.Decode(&data); err != nil {
		return nil, status.Errorf(codes.NotFound, fmt.Sprintf("Could not find user with Object Id %s: %v", req.GetId(), err))
	}
	// Cast to GetUserRes type
	response := &crudpb.ReadUserRes{
		User:&crudpb.User{
			Id:oid.Hex(),
			Name:data.Name,
			MidName:data.MidName,
			LastName:data.LastName,
			UserName:data.UserName,
			Email:data.Email,
			CellNumber:data.CellNumber,
			Imgs:data.Imgs,
		},
	}
	return response, nil
}

func (s *UserServiceServer) CreateUser(ctx context.Context, req *crudpb.CreateUserReq) (*crudpb.CreateUserRes, error) {
	// Get the crudbuf user type from the crudbuf request type
	// Essentially doing req.User to access the struct with a nil check
	user := req.GetUser()
	// Now we have to convert this into a UserItem type to convert into BSON
	data := UserItem{
		// ID:       primitive.NilObjectID,
		Name: user.Name,
			MidName:    user.MidName,
			LastName:  user.LastName,
			UserName:	user.UserName,
			Email: user.Email,
			CellNumber: user.CellNumber,
			Imgs: user.Imgs,
		//AuthorID: user.GetAuthorId(),
		//Title:    user.GetTitle(),
		//Content:  user.GetContent(),
	}

	// Insert the data into the database
	// *InsertOneResult contains the oid
	result, err := userdb.InsertOne(mongoCtx, data)
	// check error
	if err != nil {
		// return internal gRPC error to be handled later
		return nil, status.Errorf(
			codes.Internal,
			fmt.Sprintf("Internal error: %v", err),
		)
	}
	// add the id to user
	oid := result.InsertedID.(primitive.ObjectID)
	user.Id = oid.Hex()
	// return the user in a CreateUserRes type
	return &crudpb.CreateUserRes{User: user}, nil
}

func (s *UserServiceServer) UpdateUser(ctx context.Context, req *crudpb.UpdateUserReq) (*crudpb.UpdateUserRes, error) {
	// Get the user data from the request
	user := req.GetUser()

	// Convert the Id string to a MongoDB ObjectId
	oid, err := primitive.ObjectIDFromHex(user.GetId())
	if err != nil {
		return nil, status.Errorf(
			codes.InvalidArgument,
			fmt.Sprintf("Could not convert the supplied user id to a MongoDB ObjectId: %v", err),
		)
	}

	// Convert the data to be updated into an unordered Bson document
	update := bson.M{
		"name":      user.GetName(),
		"mid_name":    user.GetMidName(),
		"last_name":	user.GetLastName(),
		"user_name": 	user.GetUserName(),
		"email":	user.GetEmail(),
		"cell_number": user.GetCellNumber(),
		"imgs": user.GetImgs(),
	}

	// Convert the oid into an unordered bson document to search by id
	filter := bson.M{"_id": oid}

	// Result is the BSON encoded result
	// To return the updated document instead of original we have to add options.
	result := userdb.FindOneAndUpdate(ctx, filter, bson.M{"$set": update}, options.FindOneAndUpdate().SetReturnDocument(1))

	// Decode result and write it to 'decoded'
	decoded := UserItem{}
	err = result.Decode(&decoded)
	if err != nil {
		return nil, status.Errorf(
			codes.NotFound,
			fmt.Sprintf("Could not find user with supplied ID: %v", err),
		)
	}
	return &crudpb.UpdateUserRes{
		User: &crudpb.User{
			Id:       decoded.ID.Hex(),
			Name: decoded.Name,
			MidName:    decoded.MidName,
			LastName:  decoded.LastName,
			UserName:	decoded.UserName,
			Email:	decoded.Email,
			CellNumber:	decoded.CellNumber,
			Imgs:	decoded.Imgs,
		},
	}, nil
}

func (s *UserServiceServer) DeleteUser(ctx context.Context, req *crudpb.DeleteUserReqById) (*crudpb.DeleteUserRes, error) {
	oid, err := primitive.ObjectIDFromHex(req.GetId())
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, fmt.Sprintf("Could not convert to ObjectId: %v", err))
	}
	// DeleteOne returns DeleteResult which is a struct containing the amount of deleted docs (in this case only 1 always)
	// So we return a boolean instead
	_, err = userdb.DeleteOne(ctx, bson.M{"_id": oid})
	if err != nil {
		return nil, status.Errorf(codes.NotFound, fmt.Sprintf("Could not find/delete user with id %s: %v", req.GetId(), err))
	}
	return &crudpb.DeleteUserRes{
		Success: true,
	}, nil
}

func (s *UserServiceServer) ListUsers(req *crudpb.ListUsersReq, stream crudpb.UserService_ListUsersServer) error {
	// Initiate a UserItem type to write decoded data to
	data := &UserItem{}
	// collection.Find returns a cursor for our (empty) query
	cursor, err := userdb.Find(context.Background(), bson.M{})
	if err != nil {
		return status.Errorf(codes.Internal, fmt.Sprintf("Unknown internal error: %v", err))
	}
	// An expression with defer will be called at the end of the function
	defer cursor.Close(context.Background())
	// cursor.Next() returns a boolean, if false there are no more items and loop will break
	for cursor.Next(context.Background()) {
		// Decode the data at the current pointer and write it to data
		err := cursor.Decode(data)
		// check error
		if err != nil {
			return status.Errorf(codes.Unavailable, fmt.Sprintf("Could not decode data: %v", err))
		}
		// If no error is found send user over stream
		stream.Send(&crudpb.ListUsersRes{
			User: &crudpb.User{
				Id:       data.ID.Hex(),
				Name: data.Name,
				MidName:    data.MidName,
				LastName:  data.LastName,
				UserName:	data.UserName,
				Email:	data.Email,
				CellNumber:	data.CellNumber,
				Imgs:	data.Imgs,
			},
		})
	}
	// Check if the cursor has any errors
	if err := cursor.Err(); err != nil {
		return status.Errorf(codes.Internal, fmt.Sprintf("Unkown cursor error: %v", err))
	}
	return nil
}
 

type UserItem struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	Name string             `bson:"name"`
	MidName  string             `bson:"mid_name"`
	LastName    string             `bson:"last_name"`
	UserName 	string 			`bson:"user_name"`
	Email string 			`bson:"email"`
	CellNumber string 		`bson:"cell_number"`
	Imgs string 			`bson:"imgs"`
}

var db *mongo.Client
var userdb *mongo.Collection
var mongoCtx context.Context

func main() {

	// Configure 'log' package to give file name and line number on eg. log.Fatal
	// just the filename & line number:
	// log.SetFlags(log.Lshortfile)
	// Or add timestamps and pipe file name and line number to it:
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	fmt.Println("Starting server on port :9090...")

	// 9090 is the default port for gRPC
	// Ideally we'd use 0.0.0.0 instead of localhost as well
	listener, err := net.Listen("tcp", ":9090")

	if err != nil {
		log.Fatalf("Unable to listen on port :9090: %v", err)
	}

	// slice of gRPC options
	// Here we can configure things like TLS
	opts := []grpc.ServerOption{}
	// var s *grpc.Server
	s := grpc.NewServer(opts...)
	// var srv *UserServiceServer
	srv := &UserServiceServer{}

	crudpb.RegisterUserServiceServer(s, srv)

	// Initialize MongoDb client
	fmt.Println("Connecting to MongoDB...")
	mongoCtx = context.Background()
	db, err = mongo.Connect(mongoCtx, options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
	}
	err = db.Ping(mongoCtx, nil)
	if err != nil {
		log.Fatalf("Could not connect to MongoDB: %v\n", err)
	} else {
		fmt.Println("Connected to Mongodb")
	}

	userdb = db.Database("crud").Collection("user")

	// Start the server in a child routine
	go func() {
		if err := s.Serve(listener); err != nil {
			log.Fatalf("Failed to serve: %v", err)
		}
	}()
	fmt.Println("Server succesfully started on port :9090")

	// Bad way to stop the server
	// if err := s.Serve(listener); err != nil {
	// 	log.Fatalf("Failed to serve: %v", err)
	// }
	// Right way to stop the server using a SHUTDOWN HOOK

	// Create a channel to receive OS signals
	c := make(chan os.Signal)

	// Relay os.Interrupt to our channel (os.Interrupt = CTRL+C)
	// Ignore other incoming signals
	signal.Notify(c, os.Interrupt)

	// Block main routine until a signal is received
	// As long as user doesn't press CTRL+C a message is not passed
	// And our main routine keeps running
	// If the main routine were to shutdown so would the child routine that is Serving the server
	<-c

	// After receiving CTRL+C Properly stop the server
	fmt.Println("\nStopping the server...")
	s.Stop()
	listener.Close()
	fmt.Println("Closing MongoDB connection")
	db.Disconnect(mongoCtx)
	fmt.Println("Done.")
}
