This is a Windows Use guid, for linux please ask me if you need any help

About How to install the Envirenment of the project.
1.How to install golang server for grpc.
-Set up golang environment.
       Download go1.12.7.windows-amd64.msi and install it.
       Download protoc-3.9.0-win64.zip and set path or copy it to the system path.
-Set up MongoDB environment
        Download mongodb-win32-x86_64-2008plus-ssl-4.0.11-signed.msi and install it.
2.How to install react client for grpc.
-Install node.exe
Download node-v12.8.0-x64.msi and install it.
-Download protoc-gen-grpc-web-1.0.6-windows-x86_64.exe and set env path.
Note that rename it to protoc-gen-grpc-web.
3.How to install proxy server for grpc
-Download “grpcwebproxy.exe” and copy it to the system path.

About How to set up the project.
1.Start proxy Server for web grpc
For this run this command
> grpcwebproxy --backend_addr=localhost:9090 --allow_all_origins  --run_tls_server=false
2. Start golang server for grpc
	>go run go/main.go
3. Start react client for grpc
           >npm install
	>npm start


##################
This is React Client for GRPC
##################
 
How to run the react client
* npm install
* npm start


