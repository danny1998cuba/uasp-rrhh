/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.service;

import com.uasp.hhrr.reports.JasperReportsManager;
import com.uasp.hhrr.reports.Report;
import com.uasp.hhrr.reports.TipoReporte;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;
import javax.sql.DataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Tapanes
 */
@Service
public class ReportsService {

    @Autowired
    JasperReportsManager reportsManager;

    @Autowired
    private DataSource dataSource;

    public Report obtenerReporte(String fileName, Map<String, Object> params)
            throws IOException, JRException, SQLException {
        Report report = new Report();
        String extension = params.get("tipo").toString().equalsIgnoreCase(TipoReporte.XLS.name()) ? ".xlsx" : ".pdf";
        report.setFileName(fileName + extension);

        ByteArrayOutputStream stream = reportsManager.export(fileName, params.get("tipo").toString(), params,
                dataSource.getConnection());

        byte[] bs = stream.toByteArray();
        report.setStream(new ByteArrayInputStream(bs));
        report.setLength(bs.length);

        return report;
    }

    public Report obtenerReporte(String fileName, Map<String, Object> params, JRBeanCollectionDataSource source)
            throws IOException, JRException, SQLException {
        Report report = new Report();
        String extension = params.get("tipo").toString().equalsIgnoreCase(TipoReporte.XLS.name()) ? ".xlsx" : ".pdf";
        report.setFileName(fileName + extension);

        ByteArrayOutputStream stream = reportsManager.export(fileName, params.get("tipo").toString(), params, source);

        byte[] bs = stream.toByteArray();
        report.setStream(new ByteArrayInputStream(bs));
        report.setLength(bs.length);

        return report;
    }
}
