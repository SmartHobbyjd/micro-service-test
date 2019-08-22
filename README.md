# here is a perfect example using docker 

https://qiita.com/esaka/items/34a6d94ad48fe08bae8a

# micro-service-project-test

The test is base on Golang, gRPC, Mongodb, react js and gRPC Web, 
the idea is to make out of it as I'll describe it.

# To start UI ( please go to reactclient README file )

For this example we are using React and to run it you need:

 1.go to reactclient
 2.run : npm start

# To start gRPC web proxy

in the projec root run:

grpcwebproxy --backend_addr=localhost:9090 --allow_all_origins  --run_tls_server=false

# CRUD Operations in MongoDB with gRPC using Go 

How to install golang server
 * go run server/main.go


# here is your test

So to make sure you have the know how, I will ask youto make:

Any custum changes you want on .proto file, main.go file and at ui (you can use vue 
if you want in this example it with a basic React ui ) but for your Clinet UI please
use Material UI (vue / React )

You Can Remove any Document from db struct or add any extra. But hereis an idea:

remove imgs or cell_number, add a file upload a pet_name, a favorite_color or text_box

for the db conection I have itin main.go file but make separeted connector if you like.

