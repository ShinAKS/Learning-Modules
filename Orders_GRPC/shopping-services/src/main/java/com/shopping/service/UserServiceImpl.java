package com.shopping.service;

import com.shopping.client.OrderClient;
import com.shopping.db.User;
import com.shopping.db.UserDao;
import com.shopping.server.OrderServer;
import com.shopping.stubs.order.Order;
import com.shopping.stubs.user.Gender;
import com.shopping.stubs.user.UserRequest;
import com.shopping.stubs.user.UserResponse;
import com.shopping.stubs.user.UserServiceGrpc;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.stub.StreamObserver;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

public class UserServiceImpl extends UserServiceGrpc.UserServiceImplBase {
    UserDao userDao = new UserDao();
    private Logger logger = Logger.getLogger(UserServiceImpl.class.getName());

    @Override
    public void getUserDetails(UserRequest request, StreamObserver<UserResponse> responseObserver) {

        User user = userDao.getDetails(request.getUsername());

        UserResponse.Builder userResponseBuilder =
                UserResponse.newBuilder()
                        .setId(user.getId())
                        .setUsername(user.getUsername())
                        .setAge(user.getAge())
                        .setName(user.getName())
                        .setGender(Gender.valueOf(user.getGender()));

        List<Order> orders = getOrders(userResponseBuilder);

        userResponseBuilder.setNoOfOrders(orders.size());

        UserResponse userResponse = userResponseBuilder.build();

        responseObserver.onNext(userResponse); //used to return the response back to the client
        responseObserver.onCompleted(); //ensure that RPC method is completed.
    }

    private List<Order> getOrders(UserResponse.Builder userResponseBuilder) {
        //get Orders by Invoking the Order Client
        logger.info("Creating a channel and calling order client");
        ManagedChannel channel = ManagedChannelBuilder.forTarget("localhost:50052")
                .usePlaintext()
                .build();

        OrderClient orderClient = new OrderClient(channel);
        List<Order> orders = orderClient.getOrders(userResponseBuilder.getId());

        //shut that channel if not needed any more
        //ignore it if we have multiple calls to the channel and want to keep channel open.
        try {
            channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            logger.log(Level.SEVERE,"Channel didnot shutdown ",e);
        }
        return orders;
    }
}
