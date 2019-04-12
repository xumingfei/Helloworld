package test;

import test.test.Contanstans_jk;

public class Test {
    public static void main(String[] args) {
        System.out.println("Test");
        printStaticVar();
    }

    private static void printStaticVar() {
        System.out.println(Contanstans_jk.FIANL_VAR);
        System.out.println(Contanstans_jk.VAR);
    }
}
