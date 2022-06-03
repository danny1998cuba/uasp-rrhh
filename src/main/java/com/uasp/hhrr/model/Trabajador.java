/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "trabajador")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Trabajador implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    
    @Basic(optional = false)
    @Column(name = "nombre")
    private String nombre;
    
    @Basic(optional = false)
    @Column(name = "apellidos")
    private String apellidos;
    
    @Basic(optional = false)
    @Column(name = "ci")
    private String ci;
    
    @Basic(optional = false)
    @Column(name = "sexo")
    private String sexo;
    
    @Basic(optional = false)
    @Column(name = "maestria")
    private boolean maestria;
    
    @Basic(optional = false)
    @Column(name = "doctorado")
    private boolean doctorado;
    
    @JoinColumn(name = "id_cat_doc", referencedColumnName = "id")
    @ManyToOne
    private CategoriaDocente idCatDoc;
    
    @JoinColumn(name = "id_escolar", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private NivelEscolar idEscolar;
    
    @JoinColumn(name = "id_departamento", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Departamento idDepartamento;
    
    @JoinColumn(name = "id_CLA", referencedColumnName = "id")
    @ManyToOne
    private Cla idCLA;
    
    @JoinColumn(name = "id_cargo", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Cargo idCargo;

    public Trabajador(Integer id) {
        this.id = id;
    }
   
}
