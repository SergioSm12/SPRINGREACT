package com.sergio.backend.usersapp.backendusersapp.services;

import com.sergio.backend.usersapp.backendusersapp.repositories.IUserRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    @Autowired
    private IUserRespository repository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //Se pasa el optional con user pero de los entities.
        Optional<com.sergio.backend.usersapp.backendusersapp.models.entities.User> o = repository.findByUsername(username);

        if (!o.isPresent()) {
            //Si no encuentra el nombre
            throw new UsernameNotFoundException(String.format("Username %s no existe en el sistema!", username));
        }

        //Si lo encuentra lo optiene y se guarda en user
        com.sergio.backend.usersapp.backendusersapp.models.entities.User user = o.orElseThrow();

        //Traer roles de la base de datos
        List<GrantedAuthority> authorities = user.getRoles().stream().map(r -> new SimpleGrantedAuthority(r.getName())).collect(Collectors.toList());

        return new User(user.getUsername(), user.getPassword(), true, true, true, true, authorities);
    }
}
