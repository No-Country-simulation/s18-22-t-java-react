package policonsultorio.demo.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.http.HttpHeaders;

@OpenAPIDefinition(
        info = @Info(
                title = "Polyclinic Management API",
                description = "API for managing appointments, medical records, and prescriptions in a polyclinic.",
                termsOfService = "https://www.polyclinic.com/terms/",
                version = "1.0.0",
                contact = @Contact(
                        name = "Polyclinic Support",
                        url = "https://www.polyclinic.com/contact/",
                        email = "support@polyclinic.com"
                ),
                license = @License(
                        name = "Apache License Version 2.0",
                        url = "https://www.polyclinic.com/license/",
                        identifier = "Apache-2.0"
                )
        ),
        servers = {
                @Server(
                        description = "Local Development Server",
                        url = "http://localhost:8080/api/v1"
                ),
                @Server(
                        description = "Staging Server",
                        url = "https://clinica-medica-production.up.railway.app/api/v1"
                ),
                @Server(
                        description = "Production Server",
                        url = "https://api.polyclinic.com"
                )/*,
                security = @SecurityRequirement(
                        name = "securityToken"
                )*/


        }
)
@SecurityScheme(
        name = "securityToken",
        description = "Access Token For My API",
        type = SecuritySchemeType.HTTP,
        paramName = HttpHeaders.AUTHORIZATION,
        in = SecuritySchemeIn.HEADER,
        scheme = "bearer",
        bearerFormat = "JWT"
)

public class SwaggerConfig {

}