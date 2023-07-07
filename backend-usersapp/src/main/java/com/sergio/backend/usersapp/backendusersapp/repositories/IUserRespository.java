package com.sergio.backend.usersapp.backendusersapp.repositories;

import org.springframework.data.repository.CrudRepository;

import com.sergio.backend.usersapp.backendusersapp.models.entities.User;

import java.util.Optional;

public interface IUserRespository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);

}
