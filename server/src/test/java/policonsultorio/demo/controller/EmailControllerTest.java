package policonsultorio.demo.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class EmailControllerTest {

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
    void sendEmail() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);


        String json = """
                {
                  "email":"staricofflionel@hotmail.com",
                    
                         "titulo": "turno asignado",
                      
                         "mensaje": "turno para el 12 de diciebre a las 3PM con el doctor borraza Pedro"
             
                }
                """;
        HttpEntity<String> request = new HttpEntity<>(json,headers);
        ResponseEntity<Boolean> result = testRestTemplate.exchange("/api/v1/email", HttpMethod.POST, request, Boolean.class);
        System.out.println("result = " + result);

        assertAll(
                () -> assertEquals(HttpStatus.NO_CONTENT, result.getStatusCode()),
                () -> assertEquals(204, result.getStatusCode().value())

        );
    }
}