package policonsultorio.demo;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.Column;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import policonsultorio.demo.controller.DoctorController;
import policonsultorio.demo.controller.UserController;
import policonsultorio.demo.dto.LoginRequestDTO;
import policonsultorio.demo.dto.request.DoctorRequest;
import policonsultorio.demo.dto.response.DoctorResponse;
import policonsultorio.demo.service.Doctor.DoctorServiceImpl;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;



@WebMvcTest(DoctorController.class)
public class doctorControllerTest {

    @InjectMocks
    private DoctorController doctorController;

    @Autowired
    private DoctorServiceImpl doctorService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(doctorController).build();
    }


    @Test
    public void testCrearUsuario() throws Exception {
        DoctorRequest doctor = new DoctorRequest("carlos","1234","carlos@gmail.com","1234","1234","1234","1234567890",null,null,"pediatra","14597", 1L);
        ResponseEntity doctorEntity = new ResponseEntity<>(doctor, HttpStatus.CREATED);


        when(doctorController.createDoctor(any(DoctorRequest.class))).thenReturn(doctorEntity);

        // Configurar la solicitud
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(doctor);

        // Realizar la solicitud
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("api/v1/doctor/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name", is("carlos")))
                .andReturn();


        // Verificar el resultado
        verify(doctorController, times(1)).createDoctor(any(DoctorRequest.class));
    }

    @BeforeEach
    public void setUp() {
        DoctorRequest doctor = new DoctorRequest("carlos","1234","carlos@gmail.com", "1234","1234","1234","1234567890",null,null,"pediatra","14597", 1L);
        ResponseEntity doctorEntity = new ResponseEntity<>(doctor, HttpStatus.CREATED);

        when(doctorController.getDoctorById(1)).thenReturn(doctorEntity);
    }

}
