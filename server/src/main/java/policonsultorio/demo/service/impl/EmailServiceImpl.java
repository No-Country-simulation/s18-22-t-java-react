package policonsultorio.demo.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import policonsultorio.demo.dto.DtoEmail;
import policonsultorio.demo.service.EmailService;


@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String emailFrom;

    @Override
    public Boolean sendEmail(DtoEmail dtoEmail) throws MessagingException {
        Boolean response = true;
        try {


            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("Medilink <" + emailFrom + ">");
            helper.setTo(dtoEmail.toUser());
            helper.setSubject(dtoEmail.subject());

            Context context = new Context();
            context.setVariable("emailSubject", dtoEmail.subject());
            context.setVariable("emailMessage", dtoEmail.message());


            String htmlContent = templateEngine.process("emailTemplate", context);

            helper.setText(htmlContent, true);

            mailSender.send(message);
            return response;
        } catch (Exception e) {
            response = false;
            return response;
        }
    }

}
