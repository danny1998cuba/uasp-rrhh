/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package com.uasp.hhrr.controller;

import com.google.gson.Gson;
import com.uasp.hhrr.MessageResponse;
import com.uasp.hhrr.model.UserAuth;
import com.uasp.hhrr.model.Usuario;
import com.uasp.hhrr.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Daniel
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/")
public class AuthenticationController {

    @Autowired
    AuthenticationManager auth;

    @Autowired
    UsuarioService userService;

    @Autowired
    Gson g;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserAuth input) {
        Authentication authObj;

        try {
            authObj = auth.authenticate(
                    new UsernamePasswordAuthenticationToken(input.getUsername(), input.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authObj);
            Usuario u = userService.findByUsername(input.getUsername()).orElse(null);

            return ResponseEntity.status(HttpStatus.OK).body(g.toJson(u != null ? u : "Anonymous"));
        } catch (BadCredentialsException ex) {
            MessageResponse msg = new MessageResponse("Credenciales incorrectas");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(g.toJson(msg));
        }
    }

//    @GetMapping("/userAuth")
//    public ResponseEntity<?> getAuthenticated() {
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        Usuario u;
//
//        if (principal != "anonymousUser") {
//            String uN = ((MyUserDetails) principal).getUser().getUsername();
//            System.out.println(uN);
//            u = userService.findByUsername(uN).orElse(null);
//            System.out.println(u);
//        } else {
//            System.out.println("anonymus");
//            u = null;
//        }
//
//        return ResponseEntity.of(Optional.ofNullable(u));
//    }

    @PostMapping("/restorePass")
    public ResponseEntity<?> restorePass(@RequestBody String ident) {
        MessageResponse msg;
        switch (userService.restorePassword(ident)) {
            case RESTORED:
                msg = new MessageResponse("Se ha enviado su nueva contraseña a su correo electrónico");
                return ResponseEntity.ok(g.toJson(msg));
            case NOT_FOUND:
                msg = new MessageResponse("Nombre de usuario incorrecto");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(g.toJson(msg));
            case EMAIL_ERROR:
                msg = new MessageResponse("Correo electrónico no enviado");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(g.toJson(msg));
            default:
                msg = new MessageResponse("Otra cosa");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(g.toJson(msg));
        }
    }
}
