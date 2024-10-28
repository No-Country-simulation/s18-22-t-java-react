package policonsultorio.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import policonsultorio.demo.dto.DtoEmail;
import policonsultorio.demo.config.EmailConfig;
import policonsultorio.demo.service.EmailService;

import java.util.Map;

@RestController
@RequestMapping("/email")
@CrossOrigin("*")
@Tag(name = "email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/sendMessage")
    @Operation(
            summary = "Send email",
            description = "Send email to user",
            tags = {"email"}
    )
    public ResponseEntity<?> sendEmail(@RequestBody DtoEmail dtoEmail) throws MessagingException {
        emailService.sendEmail(dtoEmail);
        return ResponseEntity.ok("Email sent successfully");
    }
}