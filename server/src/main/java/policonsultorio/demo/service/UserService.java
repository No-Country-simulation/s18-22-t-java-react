package policonsultorio.demo.service;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import policonsultorio.demo.dto.LoginRequestDTO;
import policonsultorio.demo.dto.request.LoginDtoResponse;
import policonsultorio.demo.entity.Authorizarion;
import policonsultorio.demo.entity.User;
import policonsultorio.demo.repository.AuthorizationRepository;
import policonsultorio.demo.repository.UserRepository;
import policonsultorio.demo.security.SecurityFilter;
import policonsultorio.demo.security.TokenService;
import policonsultorio.demo.service.Doctor.DoctorServiceImpl;


@Service
@Transactional
public class UserService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorServiceImpl doctorServiceImpl;

    @Autowired
    private AuthorizationRepository AuthorizationRepository;

    @Autowired
    private TokenService tokenService;

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
        User usuario = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Entoty not found"));
        return new LoginRequestDTO(usuario);
    }


    public User deleteLogicUser(int id) {
        Long idUser = Long.valueOf(id);
        var userDb = findByUserId(idUser);
        User user = new User(userDb);
        user.setActive(false);
        return userRepository.save(user);

    }

    public LoginRequestDTO login(LoginDtoResponse loginRequestDto) {

        User userDb = userRepository.findByEmail(loginRequestDto.email());
        if (!userDb.getPassword().equals(loginRequestDto.password())) throw new EntityNotFoundException("password not match");

        Authorizarion auhorization = AuthorizationRepository.findByUserId(userDb.getId());
        String jwt = tokenService.generarToken(userDb);
        auhorization = (auhorization == null) ? Authorizarion.builder().userId(userDb).jwt(jwt).build() : Authorizarion.builder().id(auhorization.getId()).userId(userDb).jwt(jwt).build();
        var auth =  AuthorizationRepository.save(auhorization);
       // userDb.setAuthorizarion(auhorization);
       // User userDbSave = userRepository.save(userDb);
        return new LoginRequestDTO(userDb) ;

    }

    public User findByEmail(String email) {

        return userRepository.findByEmail(email);




    }
}
