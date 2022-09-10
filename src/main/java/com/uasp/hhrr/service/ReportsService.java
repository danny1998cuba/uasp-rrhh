/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.service;

import com.uasp.hhrr.exceptions.InvalidControlSumException;
import com.uasp.hhrr.model.Ausencias;
import com.uasp.hhrr.model.CategoriaOcupacional;
import com.uasp.hhrr.model.Levantamiento;
import com.uasp.hhrr.reports.JasperReportsManager;
import com.uasp.hhrr.reports.Report;
import com.uasp.hhrr.reports.TipoReporte;
import com.uasp.hhrr.reports.datasources.AusentismoDataSource;
import com.uasp.hhrr.reports.datasources.GrupoEscalaDataSource;
import com.uasp.hhrr.reports.datasources.LevantamientoDataSource;
import com.uasp.hhrr.reports.datasources.PlantillaACDataSource;
import com.uasp.hhrr.reports.submodel.Ausentismo;
import com.uasp.hhrr.reports.submodel.GrupoEscala;
import com.uasp.hhrr.reports.submodel.LevantamientoRep;
import com.uasp.hhrr.reports.submodel.PlantillaAprobadaCubierta;
import com.uasp.hhrr.repository.CategoriaOcupacionalRepository;
import com.uasp.hhrr.repository.DepartamentoCargoRepostory;
import com.uasp.hhrr.repository.EscalaRepository;
import com.uasp.hhrr.repository.TrabajadorRepository;
import com.uasp.hhrr.utils.RomansUtils;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import javax.sql.DataSource;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
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

    @Autowired
    DepartamentoCargoRepostory dcRepository;

    @Autowired
    CategoriaOcupacionalRepository coRepository;

    @Autowired
    EscalaRepository eRepository;

    @Autowired
    TrabajadorRepository tRepository;

    @Autowired
    AusenciasService ausenciasService;

    @Autowired
    LevantamientoService levantamientoService;

    @Autowired
    NocturnidadService nocturnidadService;

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

    public Report obtenerReporte(String fileName, Map<String, Object> params, JRDataSource source)
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

    public PlantillaACDataSource generatePlantillaACDataSource() {
        PlantillaACDataSource ds = new PlantillaACDataSource();
        List<PlantillaAprobadaCubierta> list = new ArrayList<>();

        coRepository.findAll().forEach(
                co -> {
                    boolean isParent = co.getParent() == null;

                    list.add(new PlantillaAprobadaCubierta(
                            isParent,
                            co.getAbreviado(),
                            co.getNombre(),
                            !isParent ? dcRepository.plazasByCatOcupId(co.getId()) : dcRepository.plazasByCatOcupAbrev(co.getAbreviado()),
                            !isParent ? tRepository.countByIdCargoIdCatOcupId(co.getId()) : tRepository.countByIdCargoIdCatOcupAbreviado(co.getAbreviado()),
                            !isParent ? tRepository.countByIdCargoIdCatOcupIdAndMision(co.getId(), true) : tRepository.countByIdCargoIdCatOcupAbreviadoAndMision(co.getAbreviado(), true))
                    );
                }
        );

        list.sort(Comparator.comparing(PlantillaAprobadaCubierta::getAbreviado));
        ds.addAll(list);

        return ds;
    }

    public GrupoEscalaDataSource generateGEDataSource() {
        GrupoEscalaDataSource ds = new GrupoEscalaDataSource();
        List<GrupoEscala> list = new ArrayList<>();

        eRepository.findAll().forEach(
                e -> {
                    list.add(new GrupoEscala(
                            e.getClasificador(),
                            tRepository.countByIdCargoIdEscalaIdAndIdCargoIdCatOcupAbreviado(e.getId(), "O"),
                            tRepository.countByIdCargoIdEscalaIdAndSexoAndIdCargoIdCatOcupAbreviado(e.getId(), "f", "O"),
                            tRepository.countByIdCargoIdEscalaIdAndIdCargoIdCatOcupAbreviado(e.getId(), "S"),
                            tRepository.countByIdCargoIdEscalaIdAndSexoAndIdCargoIdCatOcupAbreviado(e.getId(), "f", "S"),
                            tRepository.countByIdCargoIdEscalaIdAndIdCargoIdCatOcupAbreviado(e.getId(), "A"),
                            tRepository.countByIdCargoIdEscalaIdAndSexoAndIdCargoIdCatOcupAbreviado(e.getId(), "f", "A"),
                            tRepository.countByIdCargoIdEscalaIdAndIdCargoIdCatOcupAbreviado(e.getId(), "T"),
                            tRepository.countByIdCargoIdEscalaIdAndSexoAndIdCargoIdCatOcupAbreviado(e.getId(), "f", "T"),
                            tRepository.countByIdCargoIdEscalaIdAndIdCargoIdCatOcupAbreviado(e.getId(), "C"),
                            tRepository.countByIdCargoIdEscalaIdAndSexoAndIdCargoIdCatOcupAbreviado(e.getId(), "f", "C")));
                }
        );

        list.sort(Comparator.comparing((e) -> RomansUtils.romanToInt(e.getGrupo())));
        ds.addAll(list);

        return ds;
    }

    public AusentismoDataSource ausentismo(Date fecha, List<Ausencias> data) throws InvalidControlSumException {
        for (Ausencias aus : data) {
            CategoriaOcupacional co = coRepository.findOne(Example.of(aus.getIdcatOcup())).orElse(null);
            long ref = tRepository.countByIdCargoIdCatOcupAbreviado(co.getAbreviado());

            if (!aus.isValid(ref * 24)) {
                throw new InvalidControlSumException("Valor máximo de FTL igual a " + ref * 24 + " para la categoría " + co.getNombre());
            }
        }

        ausenciasService.actualizarDb(fecha, data);

        List<Ausencias> enDb = ausenciasService.getByMonth(fecha);
        List<Ausentismo> list = new ArrayList<>();
        AusentismoDataSource ds = new AusentismoDataSource();

        coRepository.findByParentIsNull().forEach(
                co -> {
                    Ausencias a = enDb.stream().filter(
                            au -> Objects.equals(au.getIdcatOcup().getId(), co.getId())
                    ).findFirst().orElse(null);

                    list.add(new Ausentismo(
                            co.getNombre(),
                            dcRepository.plazasByCatOcupAbrev(co.getAbreviado()),
                            tRepository.countByIdCargoIdCatOcupAbreviado(co.getAbreviado()),
                            tRepository.countByIdCargoIdCatOcupAbreviadoAndSexo(co.getAbreviado(), "f"),
                            a));
                }
        );

        ds.addAll(list);

        return ds;
    }

    public LevantamientoDataSource levantamiento(Date fecha, List<Levantamiento> data) throws InvalidControlSumException {
        for (Levantamiento lev : data) {
            CategoriaOcupacional co = coRepository.findOne(Example.of(lev.getIdcatOcup())).orElse(null);
            long ref = tRepository.countByIdCargoIdCatOcupAbreviadoAndMision(co.getAbreviado(), false);

            if (!lev.isValid(ref)) {
                throw new InvalidControlSumException("Valor máximo de trabajadores disponibles igual a " + ref + " para la categoría " + co.getNombre());
            }
        }

        levantamientoService.actualizarDb(fecha, data);

        List<Levantamiento> enDb = levantamientoService.getByMonth(fecha);
        List<LevantamientoRep> list = new ArrayList<>();
        LevantamientoDataSource ds = new LevantamientoDataSource();

        coRepository.findByParentIsNull().forEach(
                co -> {
                    Levantamiento l = enDb.stream().filter(
                            lev -> Objects.equals(lev.getIdcatOcup().getId(), co.getId())
                    ).findFirst().orElse(null);

                    list.add(new LevantamientoRep(
                            co.getNombre(),
                            tRepository.countByIdCargoIdCatOcupAbreviado(co.getAbreviado()),
                            tRepository.countByIdCargoIdCatOcupAbreviadoAndMision(co.getAbreviado(), true),
                            l));
                }
        );

        ds.addAll(list);

        return ds;
    }
}
