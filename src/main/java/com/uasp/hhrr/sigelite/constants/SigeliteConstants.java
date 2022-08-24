/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.sigelite.constants;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;

/**
 *
 * @author Tapanes
 */
public abstract class SigeliteConstants {

    public static final int VARIANTE = 2;  //EFUP-Si reporta Estado Financiero Unidad Presupuestada
    public static final String COD_UASP = "08427";    //Unidad de Aseguramiento a la Salud Pública
    public static final int TIPO_MODELO = 1;

    /* 5205  NÚMERO DE TRABAJADORES POR CATEGORÍA OCUPACIONAL, SEXO Y NIVEL DE ESCOLARIDAD */
    public static final int F5205_COD_MODELO = 5205;
    public static final String F5205_SUBNUMERO_MODELO = "02";

    public static HashMap<String, Date> fechasCierreMes(int month) {
        HashMap<String, Date> map = new HashMap<>();
        Calendar c = new GregorianCalendar(Calendar.getInstance().get(Calendar.YEAR), month, 7);
        map.put("07", c.getTime());
        c.set(Calendar.DAY_OF_MONTH, 14);
        map.put("14", c.getTime());
        c.set(Calendar.DAY_OF_MONTH, 21);
        map.put("21", c.getTime());
        c.set(Calendar.DAY_OF_MONTH, 28);
        map.put("28", c.getTime());
        return map;
    }

}
