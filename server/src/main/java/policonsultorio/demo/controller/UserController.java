package policonsultorio.demo.controller;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import policonsultorio.demo.dto.LoginRequestDTO;
import policonsultorio.demo.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> register(@Valid @RequestBody LoginRequestDTO loginRequestDto) {

        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.register(loginRequestDto));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));

        }
    }

    @GetMapping
    public  String testResponse(){
        return "hola clinica";
    }
}
