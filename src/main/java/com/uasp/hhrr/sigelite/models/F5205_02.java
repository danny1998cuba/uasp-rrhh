/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.sigelite.models;

import com.uasp.hhrr.sigelite.constants.SigeliteConstants;
import com.uasp.hhrr.sigelite.struct.Aspecto;
import com.uasp.hhrr.sigelite.struct.EncabezadoModelo;
import com.uasp.hhrr.sigelite.struct.EstadosModelo;
import com.uasp.hhrr.sigelite.struct.Indicador;
import com.uasp.hhrr.sigelite.struct.Modelo;
import com.uasp.hhrr.sigelite.struct.Pagina;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

/**
 *
 * @author Tapanes
 */
public class F5205_02 {

    //Columns
    public static enum COLUMNS {
        TOTAL_TOTAL("m5205totaltotal"),
        MUJERES_TOTAL("m5205totalmujer"),
        TOTAL_MAYORES("m5205mat"),
        MUJERES_MAYORES("m5205mam"),
        TOTAL_MENORES("m5205met"),
        MUJERES_MENORES("m5205mem"),
        TOTAL_OPERARIOS("m5205opt"),
        MUJERES_OPERARIOS("m5205opm"),
        TOTAL_SERVICIOS("m5205st"),
        MUJERES_SERVICIOS("m5205sm"),
        TOTAL_TECNICOS("m5205tect"),
        MUJERES_TECNICOS("m5205tecm"),
        TOTAL_ADMIN("m5205at"),
        MUJERES_ADMIN("m5205am"),
        TOTAL_DIREC("m5205dt"),
        MUJERES_DIREC("m5205dm");

        private final String value;

        private COLUMNS(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

    }

    //Rows    
    public static enum FILAS {
        TOTAL_VACANTES(9), TOTAL_OCUPADOS(1), NO_PRIMARIA(2), PRIMARIA(3), SECUNDARIA(4), PRE(5), OBRERO(6), TECNICO_MEDIO(7), UNIVERSITARIO(8), JARUCO(2403), SUMA_CONTROL(99999999);

        private final int value;

        private FILAS(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }

    private final Modelo modelo;

    protected F5205_02(F5205_02Builder builder) {
        modelo = builder.model;
    }

    public Modelo getModelo() {
        return modelo;
    }

    public void addData(FILAS fila, COLUMNS columna, int valor) {
        addData(fila, columna, Integer.toString(valor));
    }

    public void addData(FILAS fila, COLUMNS columna, boolean valor) {
        addData(fila, columna, Boolean.toString(valor));
    }

    public void addData(FILAS fila, COLUMNS columna, long valor) {
        addData(fila, columna, Long.toString(valor));
    }

    public void addData(FILAS fila, COLUMNS columna, double valor) {
        addData(fila, columna, Double.toString(valor));
    }

    public void addData(FILAS fila, COLUMNS columna, float valor) {
        addData(fila, columna, Float.toString(valor));
    }

    public void addData(FILAS fila, COLUMNS columna, String valor) {
        Pagina p = modelo.getPaginas().get(0);

        Indicador ind = p.getIndicadores().stream().filter(i -> i.getCodigofila() == fila.value).findFirst().orElse(null);

        if (ind == null) {
            ind = new Indicador(fila.value);
            p.getIndicadores().add(ind);

            List<Aspecto> aspcs = ind.getAspectos();
            Arrays.stream(COLUMNS.values()).forEach(c -> aspcs.add(new Aspecto(c.getValue(), "0")));
        }

        Aspecto asp = ind.getAspectos().stream().filter(a -> a.getAlias().equals(columna.value)).findFirst().orElse(null);
        if (asp == null) {
            asp = new Aspecto(columna.value, valor);
            ind.getAspectos().add(asp);
        } else {
            asp.setValor(valor);
        }
    }

    public String getValue(FILAS fila, COLUMNS columna) {
        Pagina p = modelo.getPaginas().get(0);

        Indicador ind = p.getIndicadores().stream().filter(i -> i.getCodigofila() == fila.value).findFirst().orElse(null);

        if (ind != null) {
            Aspecto asp = ind.getAspectos().stream().filter(a -> a.getAlias().equals(columna.value)).findFirst().orElse(null);
            if (asp != null) {
                return asp.getValor();
            }
        }

        return "";

    }

    public static class F5205_02Builder {

        private final Modelo model;

        public F5205_02Builder(int month, String day) {
            model = new Modelo(new EncabezadoModelo());

            model.getEncabezado().setIdnummodelo(SigeliteConstants.F5205_COD_MODELO);
            model.getEncabezado().setIdsubnummodelo(SigeliteConstants.F5205_SUBNUMERO_MODELO);
            model.getEncabezado().setIdcodvariante(SigeliteConstants.VARIANTE);
            model.getEncabezado().setCodcentroinformante(SigeliteConstants.COD_UASP);
            model.getEncabezado().setIdfechadeconfeccion(Calendar.getInstance().getTime());
            model.getEncabezado().setEstado(EstadosModelo.DIGITACION);
            model.getEncabezado().setIdtipodemodelo(SigeliteConstants.TIPO_MODELO);
            model.getEncabezado().setIdfechadelinformeacumulado(SigeliteConstants.fechasCierreMes(month).get(day));

            model.getPaginas().add(new Pagina(1));
        }

        public F5205_02 build() {
            return new F5205_02(this);
        }

        public F5205_02Builder setObservaciones(String observaciones) {
            model.getEncabezado().setObservaciones(observaciones);
            return this;
        }

    }
}
