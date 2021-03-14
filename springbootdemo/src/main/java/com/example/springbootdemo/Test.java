package com.example.springbootdemo;

import org.dom4j.*;

import java.util.HashMap;
import java.util.Iterator;

public class Test {
    public static void main(String[] args) throws DocumentException {
//        String pwd="000000";
//        System.out.println(new String(MD5Encoder.encode("000000".getBytes())));
        HashMap map = new HashMap();
        map.put("a","b");
        map.put("a","c");
//        System.out.println(map.get("a"));

        String str = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
                "<四大名著>\n" +
                "\t<西游记 id=\"x001\">\n" +
                "\t\t<作者>吴承恩1</作者>\n" +
                "\t\t<作者>吴承恩2</作者>\n" +
                "\t\t<朝代>明朝</朝代>\n" +
                "\t</西游记>\n" +
                "\t<红楼梦 id=\"x002\">\n" +
                "\t\t<作者>曹雪芹</作者>\n" +
                "\t</红楼梦>\n" +
                "</四大名著>";

        Document document = DocumentHelper.parseText(str);
        Element root=document.getRootElement();
        for(Iterator it = root.attributeIterator(); it.hasNext();){
            Attribute attribute = (Attribute) it.next();
            String text=attribute.getText();
            System.out.println("==="+text);
        }
/*
        System.out.println(new String(MD5Encoder.decode("MDAwMDAw".getBytes())));
*/
    }
}
