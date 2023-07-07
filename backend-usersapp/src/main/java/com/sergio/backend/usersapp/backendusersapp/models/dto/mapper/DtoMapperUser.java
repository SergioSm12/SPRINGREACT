package com.sergio.backend.usersapp.backendusersapp.models.dto.mapper;

import com.sergio.backend.usersapp.backendusersapp.models.dto.UserDto;
import com.sergio.backend.usersapp.backendusersapp.models.entities.User;

//Clase DTO manejando patron builder
public class DtoMapperUser {

    private User user;

    private DtoMapperUser() {
    }

    public static DtoMapperUser builder() {
        return new DtoMapperUser();
    }

    public DtoMapperUser setUser(User user) {
        this.user = user;
        return this;
    }

    public UserDto build() {
        if (user == null) {
            throw new RuntimeException("Debe pasar el entity user!");
        }
        return new UserDto(this.user.getId(), user.getUsername(), user.getEmail());

    }
}
