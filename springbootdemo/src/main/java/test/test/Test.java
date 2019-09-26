package test.test;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Test {
    static Logger log = LoggerFactory.getLogger(Test.class);

    public static void main(String[] args) {
        log.info("3");
    }


    private void testslf4j(){
        Logger logger = LoggerFactory.getLogger(Object.class);
        logger.error("123");
    }
}
