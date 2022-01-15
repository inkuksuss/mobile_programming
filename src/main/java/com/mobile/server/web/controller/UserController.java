package com.mobile.server.web.controller;


import com.mobile.server.domain.model.User;
import com.mobile.server.web.repository.UserRepository;
import com.mobile.server.web.request.JoinRequest;
import com.mobile.server.web.request.LoginRequest;
import com.mobile.server.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Date;
import java.util.Optional;

@Controller
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }




    @GetMapping("/main")
    public String main(@CookieValue(name = "name", required = false) String userName) {
        if (userName == null) {
            return "html/home.html";
        }

        return "html/main.html";
    }

    @GetMapping("/")
    public String home(@CookieValue(name = "name", required = false) String userName) {

        System.out.println("userName = " + userName);
        if (userName == null) {
            return "html/home.html";
        }

        Optional<User> loginUser = userRepository.findByEmail(userName);

        if (loginUser == null) {
            return "html/home.html";
        }

        return "redirect:/main";
    }

    @PostMapping("/join")
    public String postJoin(@Valid JoinRequest joinRequest, BindingResult bindingResult) {

        System.out.println("request = " + joinRequest.toString());
        joinRequest.setUserCreated(new Date());

        if (bindingResult.hasErrors()) {
            return "html/home.html";
        }

        userService.join(joinRequest);

        return "redirect:/";
    }

    @PostMapping("/login")
    public String postLogin(@Valid LoginRequest loginRequest, HttpServletResponse response, BindingResult bindingResult) {
        System.out.println("loginRequest.toString() = " + loginRequest.toString());
        if (bindingResult.hasErrors()) {
            return "html/home.html";
        }

        User loginUser = userService.login(loginRequest);
        System.out.println("loginUser = " + loginUser);

        if (loginUser == null) {
            return "html/home.html";
        }

        System.out.println("loginUser.getUserName() = " + loginUser.getUserName());
        Cookie cookie = new Cookie("name", String.valueOf(loginUser.getUserName()));
        response.addCookie(cookie);
        return "redirect:/main";
    }

    @GetMapping("/logout")
    public String logout(@CookieValue(name = "name", required = false) String userName, HttpServletResponse response) {

        if (userName == null) {
            return "html/home.html";
        }

        Cookie cookie = new Cookie("name", userName);
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return "html/home.html";
    }

    @GetMapping("/block")
    public String game1(@CookieValue(name = "name", required = false) String userName) {
        if (userName == null) {
            return "html/home.html";
        }
        return "html/gameOne.html";
    }

    @GetMapping("/tet")
    public String game2(@CookieValue(name = "name", required = false) String userName) {
        if (userName == null) {
            return "html/home.html";
        }
        return "html/gameTwo.html";
    }

    @GetMapping("/rock")
    public String game3(@CookieValue(name = "name", required = false) String userName) {
        if (userName == null) {
            return "html/home.html";
        }
        return "html/gameThree.html";
    }

}
