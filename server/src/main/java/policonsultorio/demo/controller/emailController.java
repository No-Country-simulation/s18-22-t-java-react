package policonsultorio.demo.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import policonsultorio.demo.dto.DtoEmail;
import policonsultorio.demo.service.EmailService;

import java.util.Map;

@RestController
@RequestMapping("/email")
@CrossOrigin("*")
@Tag(name = "email")
public class emailController {

    @Autowired
    private EmailService emailService;

    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> sendEmail(DtoEmail dtoEmail){

        try {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(emailService.sendEmail(dtoEmail)) ;
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));

        }
    }
}