package com.example.utils;


import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class HttpURLConnectionUtil {


    private static Logger logger = LoggerFactory.getLogger(HttpURLConnectionUtil.class);
    public static void main(String[] args) {
//        HttpURLConnectionUtil.httpurlconnection1();
        HttpURLConnectionUtil.httpurlconnection2();
    }

    private static void httpurlconnection2(){
        URL url = null;
        DataOutputStream out = null; //
        StringBuilder builder = new StringBuilder();
        try {
            JSONObject json = new JSONObject();
            Map<String, String> map = new HashMap<String,String>();
            json.put("oa","xujing65");
            json.put("xmid","123123123");
            url = new URL("http://localhost:8080/testcontroller?method=test2");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Accept", "application/json");
            // 设置是否从httpUrlConnection读入，默认情况下是true;
            connection.setDoInput(true);
            connection.setDoOutput(true);
            // Post 请求不能使用缓存
            connection.setUseCaches(false);
            connection.setConnectTimeout(30000); //30秒连接超时
            connection.setReadTimeout(30000);    //30秒读取超时

            connection.connect();
            //传入参数
            out = new DataOutputStream(connection.getOutputStream());
            System.out.println(json.toString());
            String str = json.toString();
            JSONObject j = (JSONObject) JSONObject.fromObject(str);
            out.write(str.getBytes("utf-8"));
            out.flush(); //清空缓冲区,发送数据
            out.close();
            int responseCode = connection.getResponseCode();


            //返回结果
            InputStream inStrm = connection.getInputStream();
            byte[] b = new byte[1024];
            int length = -1;
            while ((length = inStrm.read(b)) != -1) {
                builder.append(new String(b, 0, length));
            }
            System.out.println(builder.toString());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void httpurlconnection1(){
        URL url = null;
        OutputStream out = null; //
        StringBuilder builder = new StringBuilder();
        try {
            com.alibaba.fastjson.JSONObject json = new com.alibaba.fastjson.JSONObject();
            Map<String, String> map = new HashMap<String,String>();
            json.put("oa","xujing65");
            json.put("xmid","123123123");
            url = new URL("http://localhost:8080/testcontroller/test");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Accept", "application/json");
            // 设置是否从httpUrlConnection读入，默认情况下是true;
            connection.setDoInput(true);
            connection.setDoOutput(true);
            // Post 请求不能使用缓存
            connection.setUseCaches(false);
            connection.setConnectTimeout(30000); //30秒连接超时
            connection.setReadTimeout(30000);    //30秒读取超时

            //传入参数
            out = connection.getOutputStream();
            System.out.println(json.toJSONString());
            String str = json.toJSONString();
            com.alibaba.fastjson.JSONObject j = (com.alibaba.fastjson.JSONObject) com.alibaba.fastjson.JSONObject.parse(str);
            out.write(json.toJSONString().getBytes());
            out.flush(); //清空缓冲区,发送数据
            out.close();
            int responseCode = connection.getResponseCode();


            //返回结果
            InputStream inStrm = connection.getInputStream();
            byte[] b = new byte[1024];
            int length = -1;
            while ((length = inStrm.read(b)) != -1) {
                builder.append(new String(b, 0, length));
            }
            System.out.println(builder.toString());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
