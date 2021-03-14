package test;

import java.io.Serializable;

public class Person implements Serializable {
    private String name;

    private static Integer age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static Integer getAge() {
        return age;
    }

    public static void setAge(Integer age) {
        Person.age = age;
    }

    public final void test() {
        System.out.println("hello");
    }
}
