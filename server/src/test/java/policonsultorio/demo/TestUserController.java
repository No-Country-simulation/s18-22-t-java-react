package policonsultorio.demo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.Assert;
import policonsultorio.demo.controller.UserController;
import policonsultorio.demo.dto.LoginRequestDTO;
import policonsultorio.demo.entity.User;
import policonsultorio.demo.enums.Roles;
import policonsultorio.demo.service.Doctor.IDoctorService;
import policonsultorio.demo.service.UserService;

import static org.hamcrest.Matchers.is;
import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(UserController.class)
public class TestUserController {


    @MockBean
    private IDoctorService iDoctorService;
    @MockBean
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void testCrearUsuario() throws Exception {
        LoginRequestDTO user = new LoginRequestDTO(null, "alex15", "1234","12354789","pasteur","123654jdjd" ,"algon@gmai.com", "32536987", null,null, Roles.PATIENT);

        // User user = new User(alex);
        when(userService.register(any(LoginRequestDTO.class))).thenReturn(user);

        // Configurar la solicitud
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(user);

        // Realizar la solicitud
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name", is("alex13")))
                .andReturn();


        // Verificar el resultado
        verify(userService, times(1)).register(any(LoginRequestDTO.class));
    }

    @BeforeEach
    public void setUp() {
        LoginRequestDTO user = new LoginRequestDTO(1L);

        when(userService.findByUserId(1L)).thenReturn(user);
    }

    @Test
    public void traerUserporId() throws Exception {


        // Realizar la solicitud
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/user/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(""))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id", is(1)))
                .andReturn();


        // Verificar el resultado
        String jsonResponse = result.getResponse().getContentAsString();
        ObjectMapper objectMapper = new ObjectMapper();
        LoginRequestDTO user = objectMapper.readValue(jsonResponse, LoginRequestDTO.class);

// Verificar el resultado
        assertNotNull(user);
        assertEquals(1, user.id());
    }


  

}
