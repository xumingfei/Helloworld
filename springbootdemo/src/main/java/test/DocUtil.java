package test;

import org.apache.poi.hwpf.extractor.WordExtractor;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

/**

* @Description:    java类作用描述

* @Author:         ethan_xu

* @CreateDate:     2019/4/22 13:41

* @UpdateUser:     ethan_xu

* @UpdateDate:     2019/4/22 13:41

* @UpdateRemark:   修改内容

* @Version:        1.0

*/
public class DocUtil {
    /**
     * 读取doc文件内容
     *
     * @param fs 想要读取的文件对象
     * @return 返回文件内容
     * @throws IOException
     */
    public static String doc2String(FileInputStream fs) throws IOException {
        StringBuilder result = new StringBuilder();
//        Word6Extractor re = new Word6Extractor(fs);
//        result.append(re.getText());
//        re.close();
        XWPFDocument xdoc = new XWPFDocument(fs);
        XWPFWordExtractor extractor = new XWPFWordExtractor(xdoc);
        result.append(extractor.getText());
//        extractor.close();
        return result.toString();
    }
    public static String docx2String(FileInputStream fs) throws IOException {
        StringBuilder result = new StringBuilder();
//        Word6Extractor re = new Word6Extractor(fs);
//        result.append(re.getText());
//        re.close();
        XWPFDocument xdoc = new XWPFDocument(fs);
        XWPFWordExtractor extractor = new XWPFWordExtractor(xdoc);
        result.append(extractor.getText());
//        extractor.close();
        return result.toString();
    }

    public static String doc2String(File file) throws IOException {
        return doc2String(new FileInputStream(file));

    }
    public static void main(String[] args) {
        File file = new File("C:\\Users\\Xiaofei\\Desktop\\新建 DOCX Document.docx");
        try {
            System.out.println(new FileInputStream(file).available());
            System.out.println(doc2String(file));
            if (!StringUtils.hasText(doc2String(file))) {
                System.out.println("文档为空");
            }
        } catch (IOException e) {
            System.out.println("123");
            e.printStackTrace();
        }
    }

    /*poi3.8-beta版本*/
    private String readWord(String path){
        String buffer = "";
        try {
            if (path.endsWith(".doc")){
                InputStream is = new FileInputStream(new File(path));
                WordExtractor ex = new WordExtractor(is);
                buffer = ex.getText();
            }else if (path.endsWith(".docx")){
                FileInputStream fs = new FileInputStream(new File(path));
                XWPFDocument xdoc = new XWPFDocument(fs);
                XWPFWordExtractor extractor = new XWPFWordExtractor(xdoc);
                buffer = extractor.getText();
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return buffer;
    }
}
