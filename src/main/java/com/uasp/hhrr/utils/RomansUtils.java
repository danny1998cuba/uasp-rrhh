/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.utils;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author Tapanes
 */
public abstract class RomansUtils {

    private static final Map<Character, Integer> ROMANS = new HashMap<Character, Integer>() {
        {
            put('I', 1);
            put('V', 5);
            put('X', 10);
            put('L', 50);
            put('C', 100);
            put('D', 500);
            put('M', 1000);
        }
    };

    public static int romanToInt(String s) {
        int sum = 0;
        int n = s.length();

        for (int i = 0; i < n; i++) {
            if (i != n - 1
                    && ROMANS.get(s.charAt(i))
                    < ROMANS.get(s.charAt(i + 1))) {
                sum += ROMANS.get(s.charAt(i + 1))
                        - ROMANS.get(s.charAt(i));
                i++;
            } else {
                sum += ROMANS.get(s.charAt(i));
            }
        }
        return sum;
    }
}
