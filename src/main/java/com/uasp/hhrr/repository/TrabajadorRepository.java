/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package com.uasp.hhrr.repository;

import com.uasp.hhrr.model.Trabajador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Tapanes
 */
public interface TrabajadorRepository extends JpaRepository<Trabajador, Integer>, JpaSpecificationExecutor<Trabajador> {

    long countByIdDepartamentoIdAndIdCargoId(int idDepartamento, int idCargo);

    long countByMision(boolean mision);

    long countBySexo(String sexo);

    long countBySexoAndMision(String sexo, boolean mision);

    long countByIdEscolarId(int idEscolar);

    long countByIdCargoIdCatOcupAbreviado(String abreviado);

    long countByIdCargoIdCatOcupId(int id);

    long countByIdCargoIdCatOcupIdAndMision(int id, boolean mision);

    long countByIdCargoIdCatOcupAbreviadoAndMision(String abreviado, boolean mision);

    long countByIdCargoIdCatOcupAbreviadoAndSexo(String abreviado, String sexo);

    long countBySexoAndIdEscolarId(String sexo, int idEscolar);

    long countByIdCargoIdCatOcupAbreviadoAndIdEscolarId(String abreviado, int idEscolar);

    long countByIdCargoIdCatOcupAbreviadoAndSexoAndIdEscolarId(String abreviado, String sexo, int idEscolar);

    long countByIdCargoIdEscalaIdAndIdCargoIdCatOcupAbreviado(int idEscala, String abreviado);

    long countByIdCargoIdEscalaIdAndSexoAndIdCargoIdCatOcupAbreviado(int idEscala, String sexo, String abreviado);

    @Query(value = "SELECT COUNT(t.id) FROM trabajador AS t WHERE calcularEdad(t.ci) > 65",
            nativeQuery = true)
    Long countByMayorEdadLaboral();

    @Query(value = "SELECT COUNT(t.id) FROM trabajador AS t WHERE calcularEdad(t.ci) < 17",
            nativeQuery = true)
    Long countByMenorEdadLaboral();

    @Query(value = "SELECT COUNT(t.id) FROM trabajador AS t WHERE calcularEdad(t.ci) > 65 and t.id_escolar = :idEscolar",
            nativeQuery = true)
    Long countByMayorEdadLaboralAndIdEscolar(@Param(value = "idEscolar") int idEscolar);

    @Query(value = "SELECT COUNT(t.id) FROM trabajador AS t WHERE calcularEdad(t.ci) < 17 and t.id_escolar = :idEscolar",
            nativeQuery = true)
    Long countByMenorEdadLaboralAndIdEscolar(@Param(value = "idEscolar") int idEscolar);

    @Query(value = "SELECT COUNT(t.id) FROM trabajador AS t WHERE calcularEdad(t.ci) > 65 and t.sexo = :sexo",
            nativeQuery = true)
    Long countByMayorEdadLaboralAndSexo(@Param(value = "sexo") String sexo);

    @Query(value = "SELECT COUNT(t.id) FROM trabajador AS t WHERE calcularEdad(t.ci) < 17 and t.sexo = :sexo",
            nativeQuery = true)
    Long countByMenorEdadLaboralAndSexo(@Param(value = "sexo") String sexo);

    @Query(value = "SELECT COUNT(t.id) FROM trabajador AS t WHERE calcularEdad(t.ci) > 65 and t.sexo = :sexo and t.id_escolar = :idEscolar",
            nativeQuery = true)
    Long countByMayorEdadLaboralAndSexoAndIdEscolar(@Param(value = "sexo") String sexo, @Param(value = "idEscolar") int idEscolar);

    @Query(value = "SELECT COUNT(t.id) FROM trabajador AS t WHERE calcularEdad(t.ci) < 17 and t.sexo = :sexo and t.id_escolar = :idEscolar",
            nativeQuery = true)
    Long countByMenorEdadLaboralAndSexoAndIdEscolar(@Param(value = "sexo") String sexo, @Param(value = "idEscolar") int idEscolar);

}
