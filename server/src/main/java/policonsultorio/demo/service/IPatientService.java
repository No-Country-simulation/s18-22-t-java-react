package policonsultorio.demo.service;

import policonsultorio.demo.entity.Patient;

import java.util.List;

public interface IPatientService {

    Patient save(Patient patient);
    Patient getPatientById(int id);
    List<Patient> getAllPatients();

}
