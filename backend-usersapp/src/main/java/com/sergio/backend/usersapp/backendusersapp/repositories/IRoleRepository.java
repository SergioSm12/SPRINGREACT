package com.sergio.backend.usersapp.backendusersapp.repositories;

import com.sergio.backend.usersapp.backendusersapp.models.entities.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface IRoleRepository extends CrudRepository<Role,Long> {
    Optional<Role> findByName(String name);
}
