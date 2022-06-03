/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Tapanes
 */
@Entity
@Table(name = "departamento_cargo")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DepartamentoCargo implements Serializable {

    private static final long serialVersionUID = 1L;

    @EmbeddedId
    protected DepartamentoCargoPK departamentoCargoPK;

    @Basic(optional = false)
    @Column(name = "plazas")
    private int plazas;

    @JoinColumn(name = "Departamentoid", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Departamento departamento;

    @JoinColumn(name = "Cargoid", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private Cargo cargo;

    public DepartamentoCargo(DepartamentoCargoPK departamentoCargoPK) {
        this.departamentoCargoPK = departamentoCargoPK;
    }

}
