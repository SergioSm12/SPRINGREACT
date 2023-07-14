package com.sergio.backend.usersapp.backendusersapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.sergio.backend.usersapp.backendusersapp.models.IUser;
import com.sergio.backend.usersapp.backendusersapp.models.dto.UserDto;
import com.sergio.backend.usersapp.backendusersapp.models.dto.mapper.DtoMapperUser;
import com.sergio.backend.usersapp.backendusersapp.models.entities.Role;
import com.sergio.backend.usersapp.backendusersapp.models.request.UserRequest;
import com.sergio.backend.usersapp.backendusersapp.repositories.IRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sergio.backend.usersapp.backendusersapp.models.entities.User;
import com.sergio.backend.usersapp.backendusersapp.repositories.IUserRespository;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRespository repository;

    @Autowired
    private IRoleRepository roleRepository;

    //Traer el pasword encoder de security config
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    @Transactional(readOnly = true)
    public List<UserDto> findAll() {

        List<User> users = (List<User>) repository.findAll();
        return users
                .stream()
                .map(u -> DtoMapperUser.builder()
                        .setUser(u)
                        .build())
                .collect(Collectors.toList());
    }

    //Paginacion
    @Transactional(readOnly = true)
    @Override
    public Page<UserDto> findAll(Pageable pageable) {

        Page<User> usersPage = repository.findAll(pageable);
        return usersPage.map(u -> DtoMapperUser.builder().setUser(u).build());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserDto> findById(Long id) {
        return repository.findById(id).map(u -> DtoMapperUser.builder().setUser(u).build());
    }

    @Override
    @Transactional
    public UserDto save(User user) {
        String passwordBCrypt = passwordEncoder.encode(user.getPassword());
        user.setPassword(passwordBCrypt);

        user.setRoles(getRoles(user));

        return DtoMapperUser.builder().setUser(repository.save(user)).build();
    }

    @Override
    @Transactional
    public Optional<UserDto> update(UserRequest user, Long id) {
        Optional<User> o = repository.findById(id);
        User userOptional = null;
        if (o.isPresent()) {

            User userDb = o.orElseThrow();
            userDb.setRoles(getRoles(user));
            userDb.setUsername(user.getUsername());
            userDb.setEmail(user.getEmail());
            userOptional = repository.save(userDb);
        }
        return Optional.ofNullable(DtoMapperUser.builder().setUser(userOptional).build());
    }

    @Override
    @Transactional
    public void remove(Long id) {
        repository.deleteById(id);
    }

    private List<Role> getRoles(IUser user) {
        //Crear role user por defecto
        Optional<Role> ou = roleRepository.findByName("ROLE_USER");
        List<Role> roles = new ArrayList<>();
        if (ou.isPresent()) {
            roles.add(ou.orElseThrow());
        }

        if (user.isAdmin()) {
            Optional<Role> oa = roleRepository.findByName("ROLE_ADMIN");
            if (oa.isPresent()) {
                roles.add(oa.orElseThrow());
            }
        }
        return roles;
    }

}
