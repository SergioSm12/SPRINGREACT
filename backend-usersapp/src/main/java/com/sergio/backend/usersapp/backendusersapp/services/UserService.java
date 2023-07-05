package com.sergio.backend.usersapp.backendusersapp.services;

import java.util.List;
import java.util.Optional;

import com.sergio.backend.usersapp.backendusersapp.models.request.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sergio.backend.usersapp.backendusersapp.models.entities.User;
import com.sergio.backend.usersapp.backendusersapp.repositories.IUserRespository;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRespository repository;

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List<User>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public User save(User user) {
        return repository.save(user);
    }

    @Override
    @Transactional
    public Optional<User> update(UserRequest user, Long id) {
        Optional<User> o = this.findById(id);

        if (o.isPresent()) {
            User userDb = o.orElseThrow();
            userDb.setUsername(user.getUsername());
            userDb.setEmail(user.getEmail());
            return Optional.of(this.save(userDb));
        }
        return Optional.empty();
    }

    @Override
    @Transactional
    public void remove(Long id) {
        repository.deleteById(id);
    }

}
