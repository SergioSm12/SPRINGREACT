package com.sergio.backend.usersapp.backendusersapp.auth.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sergio.backend.usersapp.backendusersapp.auth.SimpleGrantedAuthorityJsonCreator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;
import java.util.*;

//IMPORTAR CONSTANTES DE TOKENJWTCONFIG
import static com.sergio.backend.usersapp.backendusersapp.auth.TokenJwtConfig.*;


public class JwtValidationFilter extends BasicAuthenticationFilter {
    public JwtValidationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
//Obtener cabeceras
        String header = request.getHeader(HEADER_AUTHORIZATION);
        if (header == null || !header.startsWith(PREFIX_TOKEN)) {
            chain.doFilter(request, response);
            return;
        }

        //Traer token limpio sin Bearer
        String token = header.replace(PREFIX_TOKEN, "");

        try {

            //Validar el token
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            //Obtenermos roles que viene desde el claims del token
            Object authoritiesClaims = claims.get("authorities");

            //Obtenemos el username que viene desde el claims del token
            String username = claims.getSubject();

            //Convertimos el tipo objeto a bytes para pasarlo a cada uno por simple granted authorities
            Collection<? extends GrantedAuthority> authorities = Arrays
                    .asList(new ObjectMapper()
                            .addMixIn(SimpleGrantedAuthority.class, SimpleGrantedAuthorityJsonCreator.class)
                            .readValue(authoritiesClaims
                                    .toString()
                                    .getBytes(), SimpleGrantedAuthority[].class));

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            chain.doFilter(request, response);
        } catch (JwtException e) {
            Map<String, String> body = new HashMap<>();

            body.put("error", e.getMessage());
            body.put("message", "El token JWT no es valido!");
            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setStatus(401);
            response.setContentType("application/json");
        }

    }
}
