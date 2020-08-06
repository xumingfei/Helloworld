package com.example.springbootdemo;

import java.util.HashMap;

public class Test {
    public static void main(String[] args) {
//        String pwd="000000";
//        System.out.println(new String(MD5Encoder.encode("000000".getBytes())));
        HashMap map = new HashMap();
        map.put("a","b");
        map.put("a","c");
        System.out.println(map.get("a"));
        
/*
        System.out.println(new String(MD5Encoder.decode("MDAwMDAw".getBytes())));
*/
    }
}
