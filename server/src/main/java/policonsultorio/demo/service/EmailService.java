package policonsultorio.demo.service;

import jakarta.mail.MessagingException;
import policonsultorio.demo.dto.DtoEmail;

public interface EmailService {

    void sendEmail(DtoEmail dtoEmail) throws MessagingException;

}
