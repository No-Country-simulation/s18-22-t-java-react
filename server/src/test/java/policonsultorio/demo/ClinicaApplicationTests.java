package policonsultorio.demo;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.annotation.Order;
import org.springframework.test.annotation.Rollback;
import policonsultorio.demo.dto.LoginRequestDTO;
import policonsultorio.demo.entity.User;
import policonsultorio.demo.service.UserService;



@SpringBootTest
class ClinicaApplicationTests {

    @Autowired
    private UserService userService;

    @Test
    @DisplayName("Test 1:Save user")
    @Order(1)
    @Rollback(value = false)
    public void createUserTest()
            throws Exception {
        try {
            LoginRequestDTO alex = new LoginRequestDTO(null, "alex", "1234", "algon@gmai.com", "32536987", null);

            User userCreated = userService.register(alex);
            System.out.println(userCreated);
            Assertions.assertThat(userCreated.getId()).isPositive();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
