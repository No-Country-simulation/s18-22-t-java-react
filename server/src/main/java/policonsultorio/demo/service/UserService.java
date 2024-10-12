package policonsultorio.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import policonsultorio.demo.dto.LoginRequestDTO;
import policonsultorio.demo.entity.User;
import policonsultorio.demo.repository.UserRepositoty;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepositoty userRepositoty;

    public User register(LoginRequestDTO loginRequestDto) {
        try {
            User usuario = userRepositoty.save(new User(loginRequestDto));
            return usuario;
        }catch (Exception e){
            System.out.println("e = " + e.getMessage());
        }

        return new User();

    }
}
