package policonsultorio.demo.controller;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import policonsultorio.demo.dto.LoginRequestDTO;
import policonsultorio.demo.dto.request.LoginDtoResponse;
import policonsultorio.demo.entity.User;
import policonsultorio.demo.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    /*
    @PostMapping(produces = "application/json")
    public ResponseEntity<?> register(@Valid @RequestBody LoginRequestDTO loginRequestDto) {

        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(userService.register(loginRequestDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));

        }
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<?> getById(@PathVariable Long id) {

        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.findByUserId(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error! Something went wrong n/" + e.getMessage());
       }
        }*/


    @PostMapping(produces = "application/json")
    public ResponseEntity<?> login( @RequestBody @Valid LoginDtoResponse loginRequestDto) {

        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(userService.login(loginRequestDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));

        }
    }
}



