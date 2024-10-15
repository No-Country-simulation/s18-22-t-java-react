package policonsultorio.demo.service;

import policonsultorio.demo.dto.request.PatientRequestDTO;
import policonsultorio.demo.dto.response.PatientResponseDTO;
import policonsultorio.demo.entity.Patient;

import java.util.List;

public interface IPatientService {

    PatientResponseDTO save(PatientRequestDTO patientRequestDTO);
    PatientResponseDTO getPatientById(Long id);
    List<Patient> getAllPatients();

}
