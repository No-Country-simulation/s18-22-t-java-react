package policonsultorio.demo.service;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import policonsultorio.demo.dto.LoginRequestDTO;
import policonsultorio.demo.entity.User;
import policonsultorio.demo.repository.UserRepository;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public LoginRequestDTO register(LoginRequestDTO loginRequestDto) {

        User usuario = userRepository.findByName(loginRequestDto.name());
        if (usuario == null) {
            User u = new User(loginRequestDto);
            u.setActive(true);
            usuario = userRepository.save(u);
        } else if (!usuario.getActive()) {
            usuario.setActive(true);
            usuario = userRepository.save(usuario);
        } else if (usuario.getActive()) {
          throw new EntityExistsException("Entity is exist");
        }

        return new LoginRequestDTO(usuario);

    }

    public LoginRequestDTO findByUserId(Long id) {

        User usuario = userRepository.findById(id).orElseThrow(()-> new  EntityNotFoundException("Entoty not found") );
        return new LoginRequestDTO(usuario);
    }


    public User deleteLogicUser(int id){
        Long idUser = Long.valueOf(id);
        var userDb = findByUserId( idUser);
      User user = new User(userDb);
      user.setActive(false);
      return userRepository.save(user);
    }
}
