/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.reports.submodel;

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
public class GrupoEscala {
    private String grupo;
    
    private long opTot;
    private long opMuj;
    
    private long serTot;
    private long serMuj;
    
    private long adTot;
    private long adMuj;
    
    private long tecTot;
    private long tecMuj;
    
    private long cuadTot;
    private long cuadMuj;
}
