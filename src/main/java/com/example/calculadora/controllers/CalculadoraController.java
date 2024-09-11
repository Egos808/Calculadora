package com.example.calculadora.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CalculadoraController {

    @GetMapping("/sumar")
    public double sumar(@RequestParam double num1, @RequestParam double num2) {
        return num1 + num2;
    }

    @GetMapping("/restar")
    public double restar(@RequestParam double num1, @RequestParam double num2) {
        return num1 - num2;
    }

    @GetMapping("/multiplicar")
    public double multiplicar(@RequestParam double num1, @RequestParam double num2) {
        return num1 * num2;
    }

    @GetMapping("/dividir")
    public ResponseEntity<?> dividir(@RequestParam double num1, @RequestParam double num2) {
        if (num2 == 0) {
            return ResponseEntity.badRequest().body("No se puede dividir por cero");
        }
        double resultado = num1 / num2;
        return ResponseEntity.ok(resultado);
    }
}
