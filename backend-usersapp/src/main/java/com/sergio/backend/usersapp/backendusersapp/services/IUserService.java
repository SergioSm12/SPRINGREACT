package com.sergio.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import com.sergio.backend.usersapp.backendusersapp.models.entities.User;
import com.sergio.backend.usersapp.backendusersapp.models.request.UserRequest;

public interface IUserService {

    List<User> findAll();

    Optional<User> findById(Long id);

    User save(User user);

    Optional<User> update(UserRequest user, Long id);

    void remove(Long id);
}
