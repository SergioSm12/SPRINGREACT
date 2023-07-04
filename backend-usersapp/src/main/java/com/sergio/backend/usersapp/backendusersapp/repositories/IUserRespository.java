package com.sergio.backend.usersapp.backendusersapp.repositories;

import org.springframework.data.repository.CrudRepository;

import com.sergio.backend.usersapp.backendusersapp.models.entities.User;

public interface IUserRespository extends CrudRepository<User, Long> {

}
