/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.sigelite.struct;

import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.thoughtworks.xstream.annotations.XStreamConverter;
import com.uasp.hhrr.sigelite.xml.converters.SingleValueDateConverter;
import com.uasp.hhrr.sigelite.xml.converters.SingleValueEstadoConverter;
import java.util.Date;

/**
 *
 * @author Tapanes
 */
@XStreamAlias("encabezado")
public class EncabezadoModelo {

    private int idnummodelo;
    private String idsubnummodelo;
    private int idcodvariante;
    private String codcentroinformante;

    @XStreamConverter(SingleValueDateConverter.class)
    private Date idfechadelinformeacumulado;

    @XStreamConverter(SingleValueDateConverter.class)
    private Date idfechadeconfeccion;

    @XStreamConverter(SingleValueEstadoConverter.class)
    private EstadosModelo estado;
    private String observaciones;
    private int idtipodemodelo;

    public EncabezadoModelo() {
    }

    public EncabezadoModelo(int idnummodelo, String idsubnummodelo, int idcodvariante, String codcentroinformante, Date idfechadelinformeacumulado, Date idfechadeconfeccion, EstadosModelo estado, String observaciones, int idtipodemodelo) {
        this.idnummodelo = idnummodelo;
        this.idsubnummodelo = idsubnummodelo;
        this.idcodvariante = idcodvariante;
        this.codcentroinformante = codcentroinformante;
        this.idfechadelinformeacumulado = idfechadelinformeacumulado;
        this.idfechadeconfeccion = idfechadeconfeccion;
        this.estado = estado;
        this.observaciones = observaciones;
        this.idtipodemodelo = idtipodemodelo;
    }

    public int getIdnummodelo() {
        return idnummodelo;
    }

    public void setIdnummodelo(int idnummodelo) {
        this.idnummodelo = idnummodelo;
    }

    public String getIdsubnummodelo() {
        return idsubnummodelo;
    }

    public void setIdsubnummodelo(String idsubnummodelo) {
        this.idsubnummodelo = idsubnummodelo;
    }

    public int getIdcodvariante() {
        return idcodvariante;
    }

    public void setIdcodvariante(int idcodvariante) {
        this.idcodvariante = idcodvariante;
    }

    public String getCodcentroinformante() {
        return codcentroinformante;
    }

    public void setCodcentroinformante(String codcentroinformante) {
        this.codcentroinformante = codcentroinformante;
    }

    public Date getIdfechadelinformeacumulado() {
        return idfechadelinformeacumulado;
    }

    public void setIdfechadelinformeacumulado(Date idfechadelinformeacumulado) {
        this.idfechadelinformeacumulado = idfechadelinformeacumulado;
    }

    public Date getIdfechadeconfeccion() {
        return idfechadeconfeccion;
    }

    public void setIdfechadeconfeccion(Date idfechadeconfeccion) {
        this.idfechadeconfeccion = idfechadeconfeccion;
    }

    public EstadosModelo getEstado() {
        return estado;
    }

    public void setEstado(EstadosModelo estado) {
        this.estado = estado;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public int getIdtipodemodelo() {
        return idtipodemodelo;
    }

    public void setIdtipodemodelo(int idtipodemodelo) {
        this.idtipodemodelo = idtipodemodelo;
    }

}
