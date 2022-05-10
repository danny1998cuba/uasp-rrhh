/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.uasp.hhrr.security.userDetails;

import com.uasp.hhrr.model.Usuario;
import com.uasp.hhrr.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;

public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String string) throws UsernameNotFoundException {
        Usuario user = repository.findByUsername(string);

        if (user == null) {
            throw new UsernameNotFoundException("No se encuentra el usuario");
        }

        return new MyUserDetails(user);
    }

}
