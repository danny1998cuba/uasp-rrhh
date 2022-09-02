/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.uasp.hhrr.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
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
@Table(name = "usuario")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;

    @Basic(optional = false)
    @Column(name = "username")
    private String username;

    @Basic(optional = false)
    @Column(name = "password")
    private String password;

    @Basic(optional = false)
    @Column(name = "nombre")
    private String nombre;

    @Basic(optional = false)
    @Column(name = "apellidos")
    private String apellidos;

    @Basic(optional = false)
    @Column(name = "email")
    private String email;

    @Column(name = "telefono")
    private String telefono;

    @Basic(optional = false)
    @Column(name = "enabled")
    private boolean enabled;

    @JoinTable(name = "usuario_roles",
            joinColumns = {
                @JoinColumn(name = "id_usuario", referencedColumnName = "id")
            },
            inverseJoinColumns = {
                @JoinColumn(name = "id_rol", referencedColumnName = "id")
            })
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Rol> rolList;

    public Usuario(Integer id) {
        this.id = id;
    }

}
