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
import policonsultorio.demo.enums.Roles;
import policonsultorio.demo.service.UserService;




@SpringBootTest
class ClinicaApplicationTests {

    @Autowired
    private UserService userService;

    @Test
    @DisplayName("Test 1:Save user")
    @Order(1)
    @Rollback(value = false)
    public void createUserTest() throws Exception {

            LoginRequestDTO alex = new LoginRequestDTO(null, "alex15", "1234","12354789","pasteur","123654jdjd" ,"algon@gmai.com", "32536987", null,null, Roles.PATIENT);

            LoginRequestDTO userCreated = userService.register(alex);

            Assertions.assertThat(userCreated.id()).isPositive();

    }


    @Test
    @DisplayName("Test 1:delete logic user")
    @Order(2)
    @Rollback(value = false)
    public void delete_logic_user() throws Exception {

        User userCreated = userService.deleteLogicUser(10);
        System.out.println("userCreated.getActive() = " + userCreated.getActive());
        Assertions.assertThat(userCreated.getActive()).isEqualTo(false);

    }

}
