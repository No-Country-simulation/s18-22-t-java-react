package policonsultorio.demo.controller;


import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import policonsultorio.demo.dto.LoginRequestDTO;

@RestController
@RequestMapping("api/user")
@CrossOrigin("*")
public class UserController {

    @PostMapping
    public ResponseEntity<?> register(@Valid @RequestBody LoginRequestDTO loginRequestDto){

        return
    }
}
