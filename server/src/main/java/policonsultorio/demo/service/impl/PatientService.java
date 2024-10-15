package policonsultorio.demo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import policonsultorio.demo.dto.LoginRequestDTO;
import policonsultorio.demo.dto.request.PatientRequestDTO;
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
    public Patient getPatientById(int id) {
        return patientRepository.findById(id).orElse(null);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
}
