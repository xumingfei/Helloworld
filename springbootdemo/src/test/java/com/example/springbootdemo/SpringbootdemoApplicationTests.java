package com.example.springbootdemo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SpringbootdemoApplicationTests {

	@Test
	public void contextLoads() {
		HashMap map = new HashMap();
	}

	@Test
	public void testSlf4j(){
		Logger logger = LoggerFactory.getLogger(Object.class);
		logger.error("123");
	}

}
