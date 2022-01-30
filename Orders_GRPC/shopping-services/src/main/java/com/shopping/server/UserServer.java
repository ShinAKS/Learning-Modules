package com.shopping.server;

import com.shopping.db.User;
import com.shopping.service.UserServiceImpl;
import io.grpc.Server;
import io.grpc.ServerBuilder;

import java.io.IOException;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

public class UserServer {

    private static final Logger logger = Logger.getLogger(UserServer.class.getName());

    private Server server;

    public void startServer() {
        int port = 50051;
        try {
            server = ServerBuilder.forPort(port)
                    .addService(new UserServiceImpl())
                    .build()
                    .start();

            logger.info("Server started on port 50051");

            //Why this hook was added?
            //Let's say server started and we killed the jvm. We wanted to ensure that the server is also shutdown cleanly.
            Runtime.getRuntime().addShutdownHook(new Thread(){
                @Override
                public void run(){
                    logger.info("Clean server shutdown in case JVM was shutdown");
                    try{
                        UserServer.this.stopServer();
                    } catch(InterruptedException exception){
                        logger.log(Level.SEVERE,"Server shutdown interrupted",exception);
                    }
                }
            });
        } catch (IOException exception) {
            logger.log(Level.SEVERE,"Server didn't start" , exception);
        }
    }

    public void stopServer() throws InterruptedException {
        if (server!=null){
            server.shutdown().awaitTermination(30, TimeUnit.SECONDS);
        }
    }

    //we are adding this so that we don't abruptly kill the server.
    //we want to keep the server running till the time requests are exhausted
    public void blockUntilShutdown() throws InterruptedException {
        if (server!=null){
            server.awaitTermination();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        UserServer userServer = new UserServer();
        userServer.startServer();
        userServer.blockUntilShutdown();
    }
}
