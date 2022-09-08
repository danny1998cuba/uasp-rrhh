/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Tapanes
 */
@Entity
@Table(name = "ausencias")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Ausencias implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    
    @Basic(optional = false)
    @Column(name = "fecha")
    @Temporal(TemporalType.DATE)
    private Date fecha;
    
    @Basic(optional = false)
    @Column(name = "autorizado")
    private int autorizado;
    
    @Basic(optional = false)
    @Column(name = "enfermedad")
    private int enfermedad;
    
    @Basic(optional = false)
    @Column(name = "iss")
    private int iss;
    
    @Basic(optional = false)
    @Column(name = "accidentes")
    private int accidentes;
    
    @Basic(optional = false)
    @Column(name = "injustificado")
    private int injustificado;
    
    @JoinColumn(name = "id_cat_ocup", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private CategoriaOcupacional idcatOcup;

    public Ausencias(Integer id) {
        this.id = id;
    }
    
}
