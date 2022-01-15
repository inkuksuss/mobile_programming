package com.mobile.server.web.request;

import javax.validation.constraints.NotNull;
import java.util.Date;

public class JoinRequest {
    @Override
    public String toString() {
        return "JoinRequest{" +
                "userName='" + userName + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userVerifyPassword='" + userVerifyPassword + '\'' +
                '}';
    }

    @NotNull
    private String userName;

    @NotNull
    private String userEmail;

    @NotNull
    private String userPassword;

    @NotNull
    private String userVerifyPassword;

    private Date userCreated;

    public Date getUserCreated() {
        return userCreated;
    }

    public void setUserCreated(Date userCreated) {
        this.userCreated = userCreated;
    }

    public JoinRequest(String userName, String userEmail, String userPassword, String userVerifyPassword) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userVerifyPassword = userVerifyPassword;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserVerifyPassword() {
        return userVerifyPassword;
    }

    public void setUserVerifyPassword(String userVerifyPassword) {
        this.userVerifyPassword = userVerifyPassword;
    }
}
