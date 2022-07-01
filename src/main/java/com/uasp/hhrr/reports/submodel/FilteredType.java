/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.reports.submodel;

import com.uasp.hhrr.model.Trabajador;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Tapanes
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FilteredType {
    private String filtros;
    private Trabajador example;
}
