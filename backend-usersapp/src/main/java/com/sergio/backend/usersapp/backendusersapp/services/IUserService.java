package com.sergio.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import com.sergio.backend.usersapp.backendusersapp.models.dto.UserDto;
import com.sergio.backend.usersapp.backendusersapp.models.entities.User;
import com.sergio.backend.usersapp.backendusersapp.models.request.UserRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService {

    List<UserDto> findAll();

    Page<UserDto> findAll(Pageable pageable);

    Optional<UserDto> findById(Long id);

    UserDto save(User user);

    Optional<UserDto> update(UserRequest user, Long id);

    void remove(Long id);
}
