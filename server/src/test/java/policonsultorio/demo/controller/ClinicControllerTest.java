package policonsultorio.demo.controller;

import org.assertj.core.internal.Arrays;
import org.jboss.jandex.PrimitiveType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import policonsultorio.demo.dto.clinic.RequestClinic;
import policonsultorio.demo.entity.Clinic;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.assertj.core.internal.Arrays.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ClinicControllerTest {


    private TestRestTemplate testRestTemplate;

    @Autowired
    private RestTemplateBuilder restTemplateBuilder;

    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        restTemplateBuilder = restTemplateBuilder.rootUri("http://localhost:" + port);
        testRestTemplate = new TestRestTemplate(restTemplateBuilder);
    }

    @Test
    @Disabled
    void createClinic() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);


        String json = """
                {
                  "name":"Osecactest",
                    
                         "cuit": "3265874",
                      
                         "address": "falsa 123",
                     
                         "phone": "94154841",
                                
                         "description": "unA CLINICA CON TECNOLOGINA DE ULTIJA GENERACION",
                                
                         "vlinicImage": "IMG"
                }
                """;
        HttpEntity<String> request = new HttpEntity<>(json,headers);
        ResponseEntity<RequestClinic> result = testRestTemplate.exchange("/api/v1/clinic", HttpMethod.POST, request, RequestClinic.class);
        System.out.println("result = " + result);

        assertAll(
                () -> assertEquals(HttpStatus.CREATED, result.getStatusCode()),
                () -> assertEquals(201, result.getStatusCode().value()),
                () -> assertEquals(result.getBody().responseClinic().name(),"Osecactest")
        );
    }

    @Test
    void updateClinic() {
    }

    @Test
    void deleteLogic() {
    }

    @Test
    void clincById() {
        ResponseEntity<RequestClinic> response = testRestTemplate.getForEntity("/api/v1/clinic/3", RequestClinic.class);
        System.out.println("response = " + response);
        assertAll(
                () -> assertEquals(HttpStatus.OK, response.getStatusCode()),
                () -> assertEquals(200, response.getStatusCode().value()),
                () -> assertEquals(response.getBody().id(),3)
        );
    }

    @Test
    void avilableLogic() {
    }

    @Test
    void allClinic() {
        ResponseEntity<Set> response = testRestTemplate.getForEntity("/api/v1/clinic/all", Set.class);
        System.out.println("response = " + response);
        assertAll(
                () -> assertEquals(HttpStatus.OK, response.getStatusCode()),
                () -> assertEquals(200, response.getStatusCode().value()),
                () -> assertTrue(!response.getBody().isEmpty())
        );
    }
}