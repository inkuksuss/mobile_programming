package com.mobile.server.web.repository;


import com.mobile.server.domain.model.User;
import com.mobile.server.web.request.JoinRequest;
import com.mobile.server.web.request.LoginRequest;
import com.mobile.server.web.response.LoginResponse;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.Optional;

@Mapper
public interface UserRepository {

    @Insert("INSERT INTO USERS(user_name, user_email, user_password, user_created) VALUES(#{userName}, #{userEmail}, #{userPassword}, #{userCreated})")
    void addUser(JoinRequest joinRequest);

    @Select("SELECT * FROM USERS WHERE user_email = #{userEmail}")
    Optional<User> findByEmail(String userEmail);
}
