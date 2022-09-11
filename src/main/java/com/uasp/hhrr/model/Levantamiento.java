/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.model;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;
import java.util.Objects;
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
@Table(name = "levantamiento")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Levantamiento implements Serializable {

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
    @Column(name = "madres")
    private int madres;

    @Basic(optional = false)
    @Column(name = "aislamiento")
    private int aislamiento;

    @Basic(optional = false)
    @Column(name = "covid")
    private int covid;

    @Basic(optional = false)
    @Column(name = "no_covid")
    private int noCovid;

    @Basic(optional = false)
    @Column(name = "peritados")
    private int peritados;

    @Basic(optional = false)
    @Column(name = "embarazo")
    private int embarazo;

    @Basic(optional = false)
    @Column(name = "lic_mat")
    private int licMat;

    @Basic(optional = false)
    @Column(name = "otra_lic")
    private int otraLic;

    @Basic(optional = false)
    @Column(name = "vacaciones")
    private int vacaciones;

    @Basic(optional = false)
    @Column(name = "interruptos")
    private int interruptos;

    @Basic(optional = false)
    @Column(name = "teletrabajo")
    private int teletrabajo;

    @Basic(optional = false)
    @Column(name = "pesquisa")
    private int pesquisa;

    @Basic(optional = false)
    @Column(name = "vacunacion")
    private int vacunacion;

    @Basic(optional = false)
    @Column(name = "otro_puesto")
    private int otroPuesto;

    @Basic(optional = false)
    @Column(name = "total_mujeres_no_fisico")
    private int totalMujeresNoFisico;

    @JoinColumn(name = "id_cat_ocup", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private CategoriaOcupacional idcatOcup;

    public Levantamiento(Integer id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Levantamiento) {
            Levantamiento o = (Levantamiento) obj;

            Calendar c1 = Calendar.getInstance();
            Calendar c2 = Calendar.getInstance();

            c1.setTime(this.getFecha());
            c2.setTime(o.getFecha());

            return c1.get(Calendar.YEAR) == c2.get(Calendar.YEAR)
                    && c1.get(Calendar.MONTH) == c2.get(Calendar.MONTH)
                    && Objects.equals(this.getIdcatOcup().getId(), o.getIdcatOcup().getId());
        } else {
            return false;
        }
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 41 * hash + Objects.hashCode(this.fecha);
        hash = 41 * hash + Objects.hashCode(this.idcatOcup);
        return hash;
    }

    public boolean isValid(long referencia) {

        return (madres <= referencia
                && aislamiento <= referencia
                && covid <= referencia
                && noCovid <= referencia
                && peritados <= referencia
                && embarazo <= referencia
                && licMat <= referencia
                && otraLic <= referencia
                && vacaciones <= referencia
                && interruptos <= referencia
                && teletrabajo <= referencia
                && pesquisa <= referencia
                && vacunacion <= referencia
                && otroPuesto <= referencia)
                && (getNoFisicos() + teletrabajo + pesquisa + vacunacion + otroPuesto) <= referencia
                && getNoFisicos() >= totalMujeresNoFisico;

    }

    public int getNoFisicos() {
        return madres + aislamiento + covid + noCovid + peritados + embarazo
                + licMat + otraLic + vacaciones + interruptos;
    }

}
