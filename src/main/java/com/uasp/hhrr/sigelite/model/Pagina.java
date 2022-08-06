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
@XStreamAlias("pagina")
@XStreamConverter(value = ToAttributedValueConverter.class, strings = {"indicadores"})
public class Pagina {

    private int numpagina;
    private List<Indicador> indicadores;

    public Pagina() {
    }

    public Pagina(int numpagina) {
        this.numpagina = numpagina;
        this.indicadores = new ArrayList<Indicador>();
    }

    public Pagina(int numpagina, List<Indicador> indicadores) {
        this.numpagina = numpagina;
        this.indicadores = indicadores;
    }

    public int getNumpagina() {
        return numpagina;
    }

    public void setNumpagina(int numpagina) {
        this.numpagina = numpagina;
    }

    public List<Indicador> getIndicadores() {
        return indicadores;
    }

    public void setIndicadores(List<Indicador> indicadores) {
        this.indicadores = indicadores;
    }

}
