package com.example.springbootdemo;

import org.apache.tomcat.util.security.MD5Encoder;

public class Test {
    public static void main(String[] args) {
        String pwd="000000";
        System.out.println(new String(MD5Encoder.encode("000000".getBytes())));
/*
        System.out.println(new String(MD5Encoder.decode("MDAwMDAw".getBytes())));
*/
    }
}
