package policonsultorio.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import policonsultorio.demo.dto.DtoEmail;
import policonsultorio.demo.service.EmailService;

@RestController
@RequestMapping("/email")
@CrossOrigin("*")
@Tag(name = "email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;


    @PostMapping("/sendMessage")
    @Operation(
            summary = "Send an email",
            description = "Send an email with the given data",
            tags = {"email"}
    )
    public ResponseEntity<?> sendEmail(@RequestBody @Valid DtoEmail dtoEmail) throws MessagingException {
        emailService.sendEmail(dtoEmail);
        return ResponseEntity.ok("Email sent successfully");
    }

}