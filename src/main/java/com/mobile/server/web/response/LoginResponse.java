package com.mobile.server.web.response;

public class LoginResponse {

    private String userName;

    public LoginResponse(String userName) {
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
