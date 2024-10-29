package policonsultorio.demo.service;

import jakarta.mail.MessagingException;
import policonsultorio.demo.dto.DtoEmail;

public interface EmailService {

    Boolean sendEmail(DtoEmail dtoEmail) throws MessagingException;

}
