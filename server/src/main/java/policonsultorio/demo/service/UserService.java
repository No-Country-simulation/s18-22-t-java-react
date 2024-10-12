package policonsultorio.demo.service;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import policonsultorio.demo.dto.LoginRequestDTO;
import policonsultorio.demo.entity.User;
import policonsultorio.demo.repository.UserRepositoty;

import java.util.Map;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepositoty userRepositoty;

    public LoginRequestDTO register(LoginRequestDTO loginRequestDto) {

        User usuario = userRepositoty.findByName(loginRequestDto.name());
        if (usuario == null) {
            usuario = userRepositoty.save(new User(loginRequestDto));
        } else if (!usuario.getActive()) {
            usuario.setActive(true);
            usuario = userRepositoty.save(usuario);
        } else if (usuario.getActive()) {
          throw new EntityExistsException("Entity is exist");
        }

        return new LoginRequestDTO(usuario);

    }
}
