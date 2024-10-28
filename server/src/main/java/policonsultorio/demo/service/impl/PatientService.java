package policonsultorio.demo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import policonsultorio.demo.dto.LoginRequestDTO;
import policonsultorio.demo.dto.request.PatientRequestDTO;
import policonsultorio.demo.dto.request.UpdatePatientDTO;
import policonsultorio.demo.dto.response.PatientResponseDTO;
import policonsultorio.demo.entity.Patient;
import policonsultorio.demo.entity.User;
import policonsultorio.demo.repository.PatientRepository;
import policonsultorio.demo.repository.UserRepository;
import policonsultorio.demo.service.IPatientService;
import policonsultorio.demo.service.UserService;

import java.util.List;

@Service
public class PatientService implements IPatientService {
    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Override
    public PatientResponseDTO save(PatientRequestDTO patientRequestDTO) {
        LoginRequestDTO user = userService.register(patientRequestDTO.user());
        User userDB = userRepository.findById(user.id()).orElse(null);

        Patient patient = new Patient();
        patient.setInsurer(patientRequestDTO.insurer());
        patient.setUser(userDB);

        PatientResponseDTO patientResponseDTO = new PatientResponseDTO(patientRepository.save(patient));

        return patientResponseDTO;
    }

    @Override
    public PatientResponseDTO getPatientById(Long id) {
        Patient byUserId = patientRepository.findByUserId(id);
        return new PatientResponseDTO(byUserId);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public void deletePatientById(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setActive(false);
        userRepository.save(user);
    }

    @Override
    public PatientResponseDTO update(Long id, UpdatePatientDTO updatePatientDTO) {
        Patient patientOld = patientRepository.findByUserId(id);
        User userOld = patientOld.getUser();

        patientOld.setInsurer(updatePatientDTO.insurer());
        userOld.setNumeroAsociado(updatePatientDTO.number_associate());
        userOld.setPhone(updatePatientDTO.phone());
        userOld.setObraSocial(updatePatientDTO.social_work());
        userOld.setImg(updatePatientDTO.image());

        User newUser = userRepository.save(userOld);
        patientOld.setUser(newUser);
        Patient newPatient = patientRepository.save(patientOld);

        return new PatientResponseDTO(newPatient);
    }
}
