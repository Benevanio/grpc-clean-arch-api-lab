const grpc = require("@grpc/grpc-js"),
  protoLoader = require("@grpc/proto-loader"),
  path = require("path");
const Repo = require("../../repositories/fake-user-repository"),
  UC = require("../../../domain/use-cases/get-user-by-id"),
  Ctrl = require("../../../presentation/controllers/user-controller");
const repo = new Repo(),
  uc = new UC(repo),
  ctrl = new Ctrl(uc);
const def = protoLoader.loadSync(path.join(__dirname, "../proto/user.proto"), {
  keepCase: true,
});
const proto = grpc.loadPackageDefinition(def).user;
const server = new grpc.Server();
server.addService(proto.UserService.service, {
  getUserById: (c, cb) => ctrl.getUserById(c, cb),
});
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    console.log("Server gRPC on :" + port);
  },
);
