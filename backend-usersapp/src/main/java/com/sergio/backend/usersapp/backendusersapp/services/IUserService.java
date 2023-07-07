package com.sergio.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import com.sergio.backend.usersapp.backendusersapp.models.dto.UserDto;
import com.sergio.backend.usersapp.backendusersapp.models.entities.User;
import com.sergio.backend.usersapp.backendusersapp.models.request.UserRequest;

public interface IUserService {

    List<UserDto> findAll();

    Optional<UserDto> findById(Long id);

    UserDto save(User user);

    Optional<UserDto> update(UserRequest user, Long id);

    void remove(Long id);
}
