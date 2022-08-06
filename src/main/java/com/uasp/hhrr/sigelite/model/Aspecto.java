/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.sigelite.model;

import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.thoughtworks.xstream.annotations.XStreamConverter;
import com.thoughtworks.xstream.converters.extended.ToAttributedValueConverter;

/**
 *
 * @author Tapanes
 */
@XStreamAlias("aspecto")
@XStreamConverter(value = ToAttributedValueConverter.class, strings = {"valor"})
public class Aspecto {

    private String alias;

    private String valor;

    public Aspecto() {
    }

    public Aspecto(String alias, String valor) {
        this.alias = alias;
        this.valor = valor;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

}
