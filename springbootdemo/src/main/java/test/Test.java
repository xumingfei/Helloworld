package test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class  HasStatic{
    public  static  void  main(String  args[]){

        String arr="aaabbccccddddeeeffffffaabbcdef";
        char[] a=arr.toCharArray();
        Map<String,Object> map = new HashMap<>();
        System.out.println(a.length);
        for (int i=0;i<a.length-1;i++) {
            System.out.println(a[i]);
            if(map.containsKey(String.valueOf(a[i]))){
                String str = map.get(String.valueOf(a[i]))+String.valueOf(a[i]);
                map.put(String.valueOf(a[i]),str);
            }else {
                map.put(String.valueOf(a[i]),String.valueOf(a[i]));
            }
        }
        List list = new ArrayList<>();
        for (String key:map.keySet()) {
            list.add(map.get(key));
        }
        list.toArray(new String[map.size()]);
    }



}
