/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.sigelite.xml;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import com.uasp.hhrr.sigelite.struct.Modelo;

/**
 *
 * @author Tapanes
 */
public class XMLGenerator {

    private static XMLGenerator instance;

    protected XMLGenerator() {
    }

    public static XMLGenerator getInstance() {
        if (instance == null) {
            instance = new XMLGenerator();
        }
        return instance;
    }

    private XStream configuration(Modelo m) {
        XStream x = new XStream(new DomDriver());
        x.autodetectAnnotations(true);
        x.alias(m.getRootId(), Modelo.class);
        return x;
    }

    public String toXml(Modelo model) {
        XStream x = configuration(model);
        return "<?xml version=\"1.0\"?>\n" + x.toXML(model).replace("__", "_");
    }
}
