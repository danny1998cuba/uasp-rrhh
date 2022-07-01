/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.reports;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.util.Map;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

/**
 *
 * @author Tapanes
 */
@Component
public class JasperReportsManager {

    private static final String REPORT_FOLDER = "reports";
    private static final String JASPER = ".jrxml";

    public ByteArrayOutputStream export(String fileName, String tipoReport, Map<String, Object> params,
            Connection con) throws JRException, IOException {
        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        ClassPathResource resource = new ClassPathResource("images" + File.separator + "logo.png");
        params.put("logo", resource.getFile().getAbsolutePath());

        JasperPrint jasperPrint = JasperFillManager.fillReport(compile(fileName), params, con);

        if (tipoReport.equalsIgnoreCase(TipoReporte.XLS.toString())) {
            JRXlsExporter exporter = new JRXlsExporter();
            exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
            exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(stream));
            SimpleXlsxReportConfiguration configuration = new SimpleXlsxReportConfiguration();
            configuration.setDetectCellType(true);
            configuration.setCollapseRowSpan(true);
            exporter.setConfiguration(configuration);
            exporter.exportReport();
        } else {
            JasperExportManager.exportReportToPdfStream(jasperPrint, stream);
        }

        return stream;
    }

    public ByteArrayOutputStream export(String fileName, String tipoReport, Map<String, Object> params,
            JRBeanCollectionDataSource source) throws JRException, IOException {
        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        ClassPathResource resource = new ClassPathResource("images" + File.separator + "logo.png");
        params.put("logo", resource.getFile().getAbsolutePath());

        JasperPrint jasperPrint = JasperFillManager.fillReport(compile(fileName), params, source);

        if (tipoReport.equalsIgnoreCase(TipoReporte.XLS.toString())) {
            JRXlsExporter exporter = new JRXlsExporter();
            exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
            exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(stream));
            SimpleXlsxReportConfiguration configuration = new SimpleXlsxReportConfiguration();
            configuration.setDetectCellType(true);
            configuration.setCollapseRowSpan(true);
            exporter.setConfiguration(configuration);
            exporter.exportReport();
        } else {
            JasperExportManager.exportReportToPdfStream(jasperPrint, stream);
        }

        return stream;
    }

    private JasperReport compile(String fileName) throws IOException, JRException {
        ClassPathResource resource = new ClassPathResource(REPORT_FOLDER + File.separator + fileName + JASPER);
        InputStream inputStream = resource.getInputStream();
        return JasperCompileManager.compileReport(inputStream);
    }

}
