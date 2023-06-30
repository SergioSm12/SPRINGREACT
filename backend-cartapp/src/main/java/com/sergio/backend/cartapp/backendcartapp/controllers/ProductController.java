package com.sergio.backend.cartapp.backendcartapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sergio.backend.cartapp.backendcartapp.models.entities.Product;
import com.sergio.backend.cartapp.backendcartapp.services.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class ProductController {
    @Autowired
    private ProductService service;

    @GetMapping("/products")
    public List<Product> list() {
        return service.findAll();
    }
}
