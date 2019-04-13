package com.example.springbootdemo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.Date;


@Controller
public class TestController {

//    @ResponseBody
//    @RequestMapping("/test")
    public String test(){
        return "test";
    }

    @RequestMapping("/test")
    public String testHtml(){
        return "test";
    }

    @RequestMapping("/login")
    public String login(){
//        Map<String,String[]> map = request.getParameterMap();
//        for(Map.Entry<String,String[]> item : map.entrySet()){
//            System.out.print(item.getKey()+"--"+item.getValue());
//        }

//        System.out.println(userName+"=="+password);
        return "login";
    }

    @ResponseBody
    @RequestMapping("/loginSuccess")
    public String loginSuccess(String userName,String password){
        if (StringUtils.isEmpty(userName)){
            userName = "没有数据";
        }
        if(org.springframework.util.StringUtils.hasText(userName) && org.springframework.util.StringUtils.hasText(password)){
            System.out.println(userName+"=="+password);
            return userName+"=="+password;
        }

//        return "loginSuccess";
        return "test";
    }

    @RequestMapping("/navigator")
    public String navigator(){
        return "navigator";
    }

    @ResponseBody
    @RequestMapping("/getIp")
    public String getIp(HttpServletRequest request){
        if (request.getHeader("x-forwarded-for") == null) {
            return request.getRemoteAddr();
        }
        return request.getHeader("x-forwarded-for");
    }

    @RequestMapping("/uploadfile")
    public String uploadFile(HttpServletRequest request){
        return "upload";
    }

    @RequestMapping(value="/upload",method = RequestMethod.POST)//MultipartFile,CommonsMultipartFile
//    public String upload( MultipartFile file) throws IOException {
    public String upload( @RequestParam("file") MultipartFile file) throws IOException {
        //用来检测程序运行时间
        long  startTime=System.currentTimeMillis();
        System.out.println("fileName："+file.getOriginalFilename());

        try {
//            File fileDirectory = new File("E:/上传文件/"+new Date().getTime());
//            if(fileDirectory.exists()){
//
//            }else {
//                fileDirectory.mkdirs();
//            }
            //获取输出流
            OutputStream os=new FileOutputStream("E:\\Idea_workspace\\helloworld\\springbootdemo\\uploadfiles\\"+new Date().getTime()+file.getOriginalFilename());
            //获取输入流 CommonsMultipartFile 中可以直接得到文件的流
            InputStream is=file.getInputStream();

            int temp;
            //一个一个字节的读取并写入
            while((temp=is.read())!=(-1))
            {
                os.write(temp);
            }
            os.flush();
            os.close();
            is.close();

        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        long  endTime=System.currentTimeMillis();
        System.out.println("方法一的运行时间："+String.valueOf(endTime-startTime)+"ms");
        return "success";
    }

}
