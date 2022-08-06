/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.sigelite.xml.converters;

import com.thoughtworks.xstream.converters.Converter;
import com.thoughtworks.xstream.converters.MarshallingContext;
import com.thoughtworks.xstream.converters.UnmarshallingContext;
import com.thoughtworks.xstream.io.HierarchicalStreamReader;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author Tapanes
 */
public class SingleValueDateConverter implements Converter {

    @Override
    public void marshal(Object o, HierarchicalStreamWriter writer, MarshallingContext mc) {
        Date fecha = (Date) o;
        writer.setValue(new SimpleDateFormat("yyyy-MM-dd").format(fecha));
    }

    @Override
    public Object unmarshal(HierarchicalStreamReader reader, UnmarshallingContext uc) {
        try {
            return new SimpleDateFormat("yyyy-mm-dd").parse(reader.getValue());
        } catch (ParseException ex) {
            return null;
        }
    }

    @Override
    public boolean canConvert(Class type) {
        return type.equals(Date.class);
    }

}
