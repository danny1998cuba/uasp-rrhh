/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.sigelite.struct;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Tapanes
 */
public class Modelo {

    private EncabezadoModelo encabezado;
    private List<Pagina> paginas;

    public Modelo(EncabezadoModelo encabezado, List<Pagina> paginas) {
        this.encabezado = encabezado;
        this.paginas = paginas;
    }

    public Modelo(EncabezadoModelo encabezado) {
        this.encabezado = encabezado;
        this.paginas = new ArrayList<>();
    }

    public EncabezadoModelo getEncabezado() {
        return encabezado;
    }

    public void setEncabezado(EncabezadoModelo encabezado) {
        this.encabezado = encabezado;
    }

    public List<Pagina> getPaginas() {
        return paginas;
    }

    public void setPaginas(List<Pagina> paginas) {
        this.paginas = paginas;
    }

    public String getRootId() {
        return "F" + encabezado.getIdnummodelo() + encabezado.getIdsubnummodelo()
                + "_" + encabezado.getCodcentroinformante();
    }

}
