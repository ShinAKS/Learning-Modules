package com.shopping.service;

import com.shopping.db.User;
import com.shopping.db.UserDao;
import com.shopping.stubs.user.Gender;
import com.shopping.stubs.user.UserRequest;
import com.shopping.stubs.user.UserResponse;
import com.shopping.stubs.user.UserServiceGrpc;
import io.grpc.stub.StreamObserver;

public class UserServiceImpl extends UserServiceGrpc.UserServiceImplBase {
    UserDao userDao = new UserDao();

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

        UserResponse userResponse = userResponseBuilder.build();

        responseObserver.onNext(userResponse); //used to return the response back to the client
        responseObserver.onCompleted(); //ensure that RPC method is completed.
    }
}
