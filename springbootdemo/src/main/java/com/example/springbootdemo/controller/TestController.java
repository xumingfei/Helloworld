package com.example.springbootdemo.controller;

import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLDecoder;


@Controller
@RequestMapping("/testcontroller")
public class TestController {

    Logger logger = LoggerFactory.getLogger(TestController.class);

    @Autowired
    RedisTemplate redisTemplate;

    public void testRedis(){
        redisTemplate.execute(new SessionCallback() {
            @Override
            public Object execute(RedisOperations redisOperations) throws DataAccessException {
                redisOperations.opsForValue().set("key1","value1");
                return null;
            }
        });
        /*redisTemplate.execute((RedisOperations<String,Object> redisOperations)->{

            return null;
        });*/
        redisTemplate.execute(new RedisCallback() {
            @Override
            public Object doInRedis(RedisConnection redisConnection) throws DataAccessException {
                return null;
            }
        });
        redisTemplate.execute((RedisConnection redisConnection)->{
           return null;
        });
    }

    @ResponseBody
//    @RequestMapping(value = "/test")
    @RequestMapping(params="method=test2")
    public String test2(HttpServletRequest request, HttpServletResponse response){//,@RequestBody String json
        try {
//            System.out.println(URLDecoder.decode(json,"utf-8"));
//            String jsonStr = URLDecoder.decode(json,"utf-8");

//            JSONObject obj = JSONObject.parseObject(jsonStr);
//            System.out.println("oa:"+obj.get("oa"));
//            System.out.println("xmid:"+obj.get("xmid"));
            InputStreamReader reader = new InputStreamReader(request.getInputStream(), "utf-8");
            BufferedReader buffer = new BufferedReader(reader);
            String data = buffer.readLine();
            System.out.println("data"+data);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "test";
    }

    @ResponseBody
    @RequestMapping(value = "/test")
    public String test(@RequestBody String json){//,
        try {
            System.out.println(URLDecoder.decode(json,"utf-8"));
            String jsonStr = URLDecoder.decode(json,"utf-8");

            JSONObject jsonObject = JSONObject.fromObject(json);
            logger.info(String.valueOf(jsonObject.get("oa")));
//            JSONObject obj = JSONObject.parseObject(jsonStr);
//            System.out.println("oa:"+obj.get("oa"));
//            System.out.println("xmid:"+obj.get("xmid"));
//            InputStreamReader reader = new InputStreamReader(request.getInputStream(), "utf-8");
//            BufferedReader buffer = new BufferedReader(reader);
//            String data = buffer.readLine();
//            System.out.println("data"+data);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "张三";
    }

//    @ResponseBody
//    public String testHtml(){
//        return "test";
//    }

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
            OutputStream os=new FileOutputStream("E:\\Idea_workspace\\helloworld\\springbootdemo\\uploadfiles\\"+System.currentTimeMillis()+file.getOriginalFilename());
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

    @RequestMapping("jquery")
    public String  jQueryTest(){
        return "jQueryTest";
    }

}
