/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Service.java to edit this template
 */
package com.uasp.hhrr.service;

import com.uasp.hhrr.model.Usuario;
import com.uasp.hhrr.repository.UsuarioRepository;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 *
 * @author Tapanes
 */
@Service
public class UsuarioService implements Services<Usuario, Integer>{
    @Autowired
    UsuarioRepository repository;

    @Override
    public Integer save(Usuario object) {
        if (object.getId() != null) {
            object.setId(null);
        }
        object.setPassword(new BCryptPasswordEncoder().encode(object.getPassword()));
        Usuario p = repository.save(object);
        return p.getId();
    }

    @Override
    public Integer update(Usuario object, Integer id) {
        Pattern p = Pattern.compile("^\\$2[ayb]\\$[0-9]{2}\\$[A-Za-z0-9\\.\\/]{53}$");
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (repository.findById(id).isPresent()) {
            object.setId(id);
            if (!p.matcher(object.getPassword()).matches()) {
                object.setPassword(encoder.encode(object.getPassword()));
            }

            repository.save(object);
            return id;
        } else {
            return -1;
        }
    }

    @Override
    public boolean deleteById(Integer id) {
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<Usuario> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Usuario> findById(Integer id) {
        return repository.findById(id);
    }

    public Optional<Usuario> findByUsername(String username) {
        return Optional.ofNullable(repository.findByUsername(username));
    }

    public boolean existentUsername(String username) {
        return repository.findByUsername(username) != null;
    }

    public boolean existentUsername(String username, int id) {
        Usuario u = repository.findByUsername(username);
        return (u != null) && (u.getId() != id);
    }

    public enum ChangeState {
        CHANGED, WRONG_OLD, USER_NOT_FOUND
    }

    public ChangeState changePassword(int id, String oldPass, String newPass) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        Optional<Usuario> fromDb = repository.findById(id);
        if (fromDb.isPresent()) {
            Usuario u = fromDb.get();

            if (encoder.matches(oldPass, u.getPassword())) {
                u.setPassword(encoder.encode(newPass));
                repository.save(u);
                return ChangeState.CHANGED;
            } else {
                return ChangeState.WRONG_OLD;
            }
        } else {
            return ChangeState.USER_NOT_FOUND;
        }
    }
}
