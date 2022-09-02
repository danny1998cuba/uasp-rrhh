/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.utils;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.commons.lang3.RandomStringUtils;

/**
 *
 * @author Tapanes
 */
public class PasswordGenerator {
    
    int lowerCount, upperCount, specialCount, randomCount, numbersCount;

    public PasswordGenerator() {
        this.lowerCount = 3;
        this.upperCount = 2;
        this.specialCount = 1;
        this.randomCount = 2;
        this.numbersCount = 2;
    }

    public PasswordGenerator(int lowerCount, int upperCount, int specialCount, int randomCount, int numbersCount) {
        this.lowerCount = lowerCount;
        this.upperCount = upperCount;
        this.specialCount = specialCount;
        this.randomCount = randomCount;
        this.numbersCount = numbersCount;
    }
    
    public String generateRandomPassword() {
        String upperString = RandomStringUtils.random(upperCount, 65, 90, true, true);
        String lowerString = RandomStringUtils.random(lowerCount, 97, 122, true, true);
        String numbers = RandomStringUtils.randomNumeric(numbersCount);
        String specialString = RandomStringUtils.random(specialCount, 33, 47, false, false);
        String totalString = RandomStringUtils.randomAlphanumeric(randomCount);

        String combinedChars = upperString
                .concat(lowerString)
                .concat(numbers)
                .concat(specialString)
                .concat(totalString);

        List<Character> list = combinedChars.chars()
                .mapToObj(c -> (char) c)
                .collect(Collectors.toList());

        Collections.shuffle(list);

        String pass = list.stream().collect(StringBuilder::new, StringBuilder::append, StringBuilder::append).toString();
        
        return pass;
    }
    
}
