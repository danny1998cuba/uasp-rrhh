/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Tapanes
 */
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DepartamentoCargoPK implements Serializable {

    @Basic(optional = false)
    @Column(name = "Departamentoid")
    private int departamentoid;

    @Basic(optional = false)
    @Column(name = "Cargoid")
    private int cargoid;

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 19 * hash + this.departamentoid;
        hash = 19 * hash + this.cargoid;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final DepartamentoCargoPK other = (DepartamentoCargoPK) obj;
        if (this.departamentoid != other.departamentoid) {
            return false;
        }
        return this.cargoid == other.cargoid;
    }

}
