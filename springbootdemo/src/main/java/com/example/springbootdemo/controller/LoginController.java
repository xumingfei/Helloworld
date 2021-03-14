package com.example.springbootdemo.controller;

import com.example.springbootdemo.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;

/**
 * @ClassName：LoginController
 * @Description：TODO
 * @CreateTime：3/6/21 11:34 AM
 * @Author：xumingfei
 */
@RestController
@RequestMapping("/")
public class LoginController {
    private static final Logger LOGGER = LoggerFactory.getLogger(LoginController.class);
    @GetMapping("/login2")
    public ModelAndView login(ModelAndView modelAndView) {
        modelAndView.setViewName("login2");
        return modelAndView;
    }

    @PostMapping("/login2")
    public ModelAndView login(ModelAndView modelAndView, @Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            for (FieldError err:bindingResult.getFieldErrors()){
                modelAndView.addObject(err.getField(), err.getDefaultMessage());
                LOGGER.info(err.getObjectName());
            }
            LOGGER.info(modelAndView.toString());

            modelAndView.setViewName("login2");
            return modelAndView;
        }
        String userName = user.getUserName();
        String password = user.getPassword();
        if (!"admin".equals(userName)) {
            modelAndView.addObject("error", "没有该用户");
            modelAndView.setViewName("login2");
            return modelAndView;
        }
        if(!"123456".equals(password)){
            modelAndView.addObject("error","密码错误！");
            modelAndView.setViewName("login");
            return modelAndView;
        }
        modelAndView.addObject("userName",userName);
        modelAndView.setViewName("index");
        return modelAndView;
    }

}
