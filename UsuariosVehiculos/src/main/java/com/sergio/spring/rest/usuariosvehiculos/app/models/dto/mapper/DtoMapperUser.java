package com.sergio.spring.rest.usuariosvehiculos.app.models.dto.mapper;

import com.sergio.spring.rest.usuariosvehiculos.app.models.dto.entity.users.UserDto;
import com.sergio.spring.rest.usuariosvehiculos.app.models.entities.User;

//Clase para mapear entity con dto usando patron Builder
public class DtoMapperUser {


    private User user;

    private DtoMapperUser() {
    }

    //Manera de acceder al constructor vacio
    public static DtoMapperUser builder() {
        return new DtoMapperUser();
    }

    //Pasamos el user al get instance de esta manera traemos los datos del entoty a esta clase
    public DtoMapperUser setUser(User user) {
        this.user = user;
        return this;
    }

    //Teniendo los datos del user los poblamos en el dto(los metodos anteriores funcionan encadenados)
    public UserDto build() {
        if (user == null) {
            throw new RuntimeException("Debe pasar el entoty user");
        }

        boolean isAdmin = user.getRoles().stream().anyMatch(r -> "ROLE_ADMIN".equals(r.getName()));
        boolean isGuard = user.getRoles().stream().anyMatch(r -> "ROLE_GUARD".equals(r.getName()));
        return new UserDto(this.user.getId(), this.user.getName(), this.user.getLastName(), this.user.getEmail(), this.user.getFaculty(),isAdmin,isGuard);
    }
}
