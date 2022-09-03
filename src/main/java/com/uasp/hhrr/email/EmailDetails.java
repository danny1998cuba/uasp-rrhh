/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.email;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Tapanes
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EmailDetails {
 
    // Class data members
    private String recipient;
    private String msgBody;
    private String subject;
    private String attachment;
}