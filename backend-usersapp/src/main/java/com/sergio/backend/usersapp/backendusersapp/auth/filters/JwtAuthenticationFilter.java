package com.sergio.backend.usersapp.backendusersapp.auth.filters;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sergio.backend.usersapp.backendusersapp.models.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.sergio.backend.usersapp.backendusersapp.auth.TokenJwtConfig.*;

//Filtro de autenticacion para el login
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    //Funcion que realiza el login
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        User user = null;
        String username = null;
        String password = null;

        try {
            user = new ObjectMapper().readValue(request.getInputStream(), User.class);
            username = user.getUsername();
            password = user.getPassword();
            // logger.info("Username desde request InputStream (raw)" + username);
            // logger.info("Password desde request InputStream (raw)" + password);

        } catch (StreamReadException e) {
            e.printStackTrace();
        } catch (DatabindException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
        return authenticationManager.authenticate(authToken);
    }

    //Funcion que genera el token en caso de que el login salga bien
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        String username = ((org.springframework.security.core.userdetails.User) authResult.getPrincipal())
                .getUsername();

        //Taer roles desde JpaUserDetailService lo hace internamente
        Collection<? extends GrantedAuthority> roles = authResult.getAuthorities();

        //Funcion para saber si es admin
        boolean isAdmin = roles.stream().anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));

        //Agregar roles a los claims
        Claims claims = Jwts.claims();
        claims.put("authorities", new ObjectMapper().writeValueAsString(roles));
        claims.put("isAdmin", isAdmin);

        //Generar token con libreria jwt
        String token = Jwts
                .builder()
                .setClaims(claims)
                .setSubject(username)
                .signWith(SECRET_KEY)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .compact();

        response.addHeader(HEADER_AUTHORIZATION, PREFIX_TOKEN + token);

        Map<String, Object> body = new HashMap<>();
        body.put("token", token);
        body.put("message", String.format("Hola %s, has iniciado session con exito!", username));
        body.put("username", username);

        //enviar datos y convertirlos a json
        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setStatus(200);
        response.setContentType("application/json");

    }

    //Funcion que genera la respuesta en caso de que el token no salga bien
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        Map<String, Object> body = new HashMap<>();
        body.put("message", "Error en la autenticacion username o password incorrecto!");
        body.put("error", failed.getMessage());

        response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        response.setStatus(401);
        response.setContentType("application/json");
    }
}
