/**
 * @fileoverview gRPC-Web generated client stub for crud
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */


const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.crud = require('./crud_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.crud.UserServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.crud.UserServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.crud.CreateUserReq,
 *   !proto.crud.CreateUserRes>}
 */
const methodDescriptor_UserService_CreateUser = new grpc.web.MethodDescriptor(
  '/crud.UserService/CreateUser',
  grpc.web.MethodType.UNARY,
  proto.crud.CreateUserReq,
  proto.crud.CreateUserRes,
  /** @param {!proto.crud.CreateUserReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.crud.CreateUserRes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.crud.CreateUserReq,
 *   !proto.crud.CreateUserRes>}
 */
const methodInfo_UserService_CreateUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.crud.CreateUserRes,
  /** @param {!proto.crud.CreateUserReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.crud.CreateUserRes.deserializeBinary
);


/**
 * @param {!proto.crud.CreateUserReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.crud.CreateUserRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.crud.CreateUserRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.crud.UserServiceClient.prototype.createUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/crud.UserService/CreateUser',
      request,
      metadata || {},
      methodDescriptor_UserService_CreateUser,
      callback);
};


/**
 * @param {!proto.crud.CreateUserReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.crud.CreateUserRes>}
 *     A native promise that resolves to the response
 */
proto.crud.UserServicePromiseClient.prototype.createUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/crud.UserService/CreateUser',
      request,
      metadata || {},
      methodDescriptor_UserService_CreateUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.crud.ReadUserReqById,
 *   !proto.crud.ReadUserRes>}
 */
const methodDescriptor_UserService_ReadUser = new grpc.web.MethodDescriptor(
  '/crud.UserService/ReadUser',
  grpc.web.MethodType.UNARY,
  proto.crud.ReadUserReqById,
  proto.crud.ReadUserRes,
  /** @param {!proto.crud.ReadUserReqById} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.crud.ReadUserRes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.crud.ReadUserReqById,
 *   !proto.crud.ReadUserRes>}
 */
const methodInfo_UserService_ReadUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.crud.ReadUserRes,
  /** @param {!proto.crud.ReadUserReqById} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.crud.ReadUserRes.deserializeBinary
);


/**
 * @param {!proto.crud.ReadUserReqById} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.crud.ReadUserRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.crud.ReadUserRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.crud.UserServiceClient.prototype.readUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/crud.UserService/ReadUser',
      request,
      metadata || {},
      methodDescriptor_UserService_ReadUser,
      callback);
};


/**
 * @param {!proto.crud.ReadUserReqById} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.crud.ReadUserRes>}
 *     A native promise that resolves to the response
 */
proto.crud.UserServicePromiseClient.prototype.readUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/crud.UserService/ReadUser',
      request,
      metadata || {},
      methodDescriptor_UserService_ReadUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.crud.UpdateUserReq,
 *   !proto.crud.UpdateUserRes>}
 */
const methodDescriptor_UserService_UpdateUser = new grpc.web.MethodDescriptor(
  '/crud.UserService/UpdateUser',
  grpc.web.MethodType.UNARY,
  proto.crud.UpdateUserReq,
  proto.crud.UpdateUserRes,
  /** @param {!proto.crud.UpdateUserReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.crud.UpdateUserRes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.crud.UpdateUserReq,
 *   !proto.crud.UpdateUserRes>}
 */
const methodInfo_UserService_UpdateUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.crud.UpdateUserRes,
  /** @param {!proto.crud.UpdateUserReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.crud.UpdateUserRes.deserializeBinary
);


/**
 * @param {!proto.crud.UpdateUserReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.crud.UpdateUserRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.crud.UpdateUserRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.crud.UserServiceClient.prototype.updateUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/crud.UserService/UpdateUser',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateUser,
      callback);
};


/**
 * @param {!proto.crud.UpdateUserReq} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.crud.UpdateUserRes>}
 *     A native promise that resolves to the response
 */
proto.crud.UserServicePromiseClient.prototype.updateUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/crud.UserService/UpdateUser',
      request,
      metadata || {},
      methodDescriptor_UserService_UpdateUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.crud.DeleteUserReqById,
 *   !proto.crud.DeleteUserRes>}
 */
const methodDescriptor_UserService_DeleteUser = new grpc.web.MethodDescriptor(
  '/crud.UserService/DeleteUser',
  grpc.web.MethodType.UNARY,
  proto.crud.DeleteUserReqById,
  proto.crud.DeleteUserRes,
  /** @param {!proto.crud.DeleteUserReqById} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.crud.DeleteUserRes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.crud.DeleteUserReqById,
 *   !proto.crud.DeleteUserRes>}
 */
const methodInfo_UserService_DeleteUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.crud.DeleteUserRes,
  /** @param {!proto.crud.DeleteUserReqById} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.crud.DeleteUserRes.deserializeBinary
);


/**
 * @param {!proto.crud.DeleteUserReqById} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.crud.DeleteUserRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.crud.DeleteUserRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.crud.UserServiceClient.prototype.deleteUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/crud.UserService/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteUser,
      callback);
};


/**
 * @param {!proto.crud.DeleteUserReqById} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.crud.DeleteUserRes>}
 *     A native promise that resolves to the response
 */
proto.crud.UserServicePromiseClient.prototype.deleteUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/crud.UserService/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_UserService_DeleteUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.crud.ListUsersReq,
 *   !proto.crud.ListUsersRes>}
 */
const methodDescriptor_UserService_ListUsers = new grpc.web.MethodDescriptor(
  '/crud.UserService/ListUsers',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.crud.ListUsersReq,
  proto.crud.ListUsersRes,
  /** @param {!proto.crud.ListUsersReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.crud.ListUsersRes.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.crud.ListUsersReq,
 *   !proto.crud.ListUsersRes>}
 */
const methodInfo_UserService_ListUsers = new grpc.web.AbstractClientBase.MethodInfo(
  proto.crud.ListUsersRes,
  /** @param {!proto.crud.ListUsersReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.crud.ListUsersRes.deserializeBinary
);


/**
 * @param {!proto.crud.ListUsersReq} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.crud.ListUsersRes>}
 *     The XHR Node Readable Stream
 */
proto.crud.UserServiceClient.prototype.listUsers =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/crud.UserService/ListUsers',
      request,
      metadata || {},
      methodDescriptor_UserService_ListUsers);
};


/**
 * @param {!proto.crud.ListUsersReq} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.crud.ListUsersRes>}
 *     The XHR Node Readable Stream
 */
proto.crud.UserServicePromiseClient.prototype.listUsers =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/crud.UserService/ListUsers',
      request,
      metadata || {},
      methodDescriptor_UserService_ListUsers);
};


module.exports = proto.crud;

