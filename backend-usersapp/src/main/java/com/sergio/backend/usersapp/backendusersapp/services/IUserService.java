package com.sergio.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import com.sergio.backend.usersapp.backendusersapp.models.entities.User;

public interface IUserService {

    List<User> findAll();

    Optional<User> findById(Long id);

    User save(User user);

    Optional<User> update(User user, Long id);

    void remove(Long id);
}
