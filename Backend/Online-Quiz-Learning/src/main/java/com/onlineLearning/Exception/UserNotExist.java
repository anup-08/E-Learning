package com.onlineLearning.Exception;

public class UserNotExist extends RuntimeException{
    public UserNotExist(String message) {
        super(message);
    }
}
