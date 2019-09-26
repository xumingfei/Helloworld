package test;

import test.test.Contanstans_jk;

import java.io.*;

public class Test {
    public static void main(String[] args) throws FileNotFoundException {
        System.out.println("Test");
        File filePath = new File("C:\\Users\\Xiaofei\\Desktop\\新建 DOCX Document.doc");
        InputStream in = new FileInputStream(filePath);
        try {
            System.out.println(in.available());
            if( in.available() ==0){
                System.out.println("文件为空");
            }else{
                System.out.println("文件不为空");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
//        printStaticVar();
    }

    private static void printStaticVar() {
        System.out.println(Contanstans_jk.FIANL_VAR);
        System.out.println(Contanstans_jk.VAR);
    }
}
