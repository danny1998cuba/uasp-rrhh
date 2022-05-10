/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
@Table(name = "escala")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Escala implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Basic(optional = false)
    @Column(name = "clasificador")
    private String clasificador;

    @Basic(optional = false)
    @Column(name = "salario")
    private double salario;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idEscala")
    @JsonIgnore
    private List<Cargo> cargoList;

    public Escala(Integer id) {
        this.id = id;
    }

}
