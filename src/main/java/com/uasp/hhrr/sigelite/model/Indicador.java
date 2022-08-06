/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.sigelite.model;

import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.thoughtworks.xstream.annotations.XStreamConverter;
import com.thoughtworks.xstream.converters.extended.ToAttributedValueConverter;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Tapanes
 */
@XStreamAlias("indicador")
@XStreamConverter(value = ToAttributedValueConverter.class, strings = {"aspectos"})
public class Indicador {

    private int codigofila;
    private List<Aspecto> aspectos;

    public Indicador() {
    }

    public Indicador(int codigofila) {
        this.codigofila = codigofila;
        this.aspectos = new ArrayList<Aspecto>();
    }

    public Indicador(int codigofila, List<Aspecto> aspectos) {
        this.codigofila = codigofila;
        this.aspectos = aspectos;
    }

    public int getCodigofila() {
        return codigofila;
    }

    public void setCodigofila(int codigofila) {
        this.codigofila = codigofila;
    }

    public List<Aspecto> getAspectos() {
        return aspectos;
    }

    public void setAspectos(List<Aspecto> aspectos) {
        this.aspectos = aspectos;
    }

}
