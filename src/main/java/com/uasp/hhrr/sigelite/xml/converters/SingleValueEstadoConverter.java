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
import com.uasp.hhrr.sigelite.struct.EstadosModelo;

/**
 *
 * @author Tapanes
 */
public class SingleValueEstadoConverter implements Converter {

    @Override
    public void marshal(Object o, HierarchicalStreamWriter writer, MarshallingContext mc) {
        EstadosModelo estado = (EstadosModelo) o;
        writer.setValue(estado.getValue() + "");
    }

    @Override
    public Object unmarshal(HierarchicalStreamReader reader, UnmarshallingContext uc) {
        return EstadosModelo.fromValue(Integer.parseInt(reader.getValue()));
    }

    @Override
    public boolean canConvert(Class type) {
        return type.equals(EstadosModelo.class);
    }

}
