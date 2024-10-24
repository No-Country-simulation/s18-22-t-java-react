package policonsultorio.demo.controller;

import org.jboss.jandex.PrimitiveType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import policonsultorio.demo.dto.clinic.RequestClinic;
import policonsultorio.demo.entity.Clinic;

import java.util.Set;

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
    void createClinic() {
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