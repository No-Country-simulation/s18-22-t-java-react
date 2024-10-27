package policonsultorio.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import policonsultorio.demo.dto.DtoEmail;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String emailFrom;
    public boolean sendEmail(DtoEmail dtoEmail) {
        Boolean response = false;
        try {
            SimpleMailMessage mesage = new SimpleMailMessage();
            mesage.setTo(dtoEmail.email());
            mesage.setFrom(emailFrom);
            mesage.setSubject(dtoEmail.titulo());
            mesage.setText(dtoEmail.mensaje());

            javaMailSender.send(mesage);
            response = true;
        } catch (Exception e) {
            return response;
        }

        return response;
    }


}
