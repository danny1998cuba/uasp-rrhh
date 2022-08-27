/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.reports.datasources;

import java.util.ArrayList;
import java.util.List;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRField;

/**
 *
 * @author Tapanes
 * @param <T>
 */
public abstract class CustomDataSource<T> implements JRDataSource {

    protected final List<T> list = new ArrayList<>();
    protected int index = -1;

    public boolean add(T p) {
        return this.list.add(p);
    }

    public boolean addAll(List<T> list) {
        return this.list.addAll(list);
    }

    @Override
    public boolean next() throws JRException {
        return ++index < list.size();
    }

    @Override
    public Object getFieldValue(JRField jrf) throws JRException {
        Object valor = null;

        if (jrf.getName() != null) {
            valor = getFieldValue(jrf.getName());
        }

        return valor;
    }

    public abstract Object getFieldValue(String key);

}
