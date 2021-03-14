package com.example.springbootdemo.entity;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * @ClassName：User
 * @Description：TODO
 * @CreateTime：3/6/21 11:56 AM
 * @Author：xumingfei
 */
public class User implements Serializable {
    private Long id;
    @NotEmpty(message = "用户名不能为空")
    private String userName;
    private String nickName;
    @Size(min = 6, max = 10, message = "密码长度是6-10位")
    private String password;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }
}
