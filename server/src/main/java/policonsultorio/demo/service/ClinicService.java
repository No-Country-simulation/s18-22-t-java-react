package policonsultorio.demo.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import policonsultorio.demo.dto.clinic.RequestClinic;
import policonsultorio.demo.dto.clinic.ResponseClinic;
import policonsultorio.demo.dto.clinic.ResponseClinicUpdate;
import policonsultorio.demo.entity.Clinic;
import policonsultorio.demo.repository.ClinicRepository;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClinicService {

    @Autowired
    private ClinicRepository clinicRepository;

    public RequestClinic register(ResponseClinic responseClinic) {
        Clinic clinic = clinicRepository.save(new Clinic(responseClinic));
        return new RequestClinic(clinic.getId(), new ResponseClinic(clinic));
    }

    public RequestClinic update(Long id, ResponseClinicUpdate responseClinic) {

        Clinic clinic = clinicRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("clinic not found"));

        if (responseClinic.name() != null) clinic.setName(responseClinic.name());
        if (responseClinic.address() != null) clinic.setAddress(responseClinic.address());
        if (responseClinic.cuit() != null) clinic.setCuit(responseClinic.cuit());
        if (responseClinic.phone() != null) clinic.setPhone(responseClinic.phone());
        if (responseClinic.description() != null) clinic.setDescription(responseClinic.description());
        if (responseClinic.vlinicImage() != null) clinic.setVlinicImage(responseClinic.vlinicImage());

        var clinicDb = clinicRepository.save(clinic);
        return new RequestClinic(clinicDb.getId(), new ResponseClinic(clinicDb));
    }

    public void deleteLogicClinic(Long id) {
        Clinic clinic = clinicRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("clinic not found"));
        clinic.setActive(false);
        clinicRepository.save(clinic);
    }

    public RequestClinic getClinicById(Long id) {
        Optional<Clinic> clinic = clinicRepository.findById(id);
        return new RequestClinic(clinic.get().getId(), new ResponseClinic(clinic.get()));
    }

    public RequestClinic avilableClinic(Long id) {
        Clinic clinic = clinicRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("clinic not found"));
        clinic.setActive(true);
       Clinic clinicDb = clinicRepository.save(clinic);
        return new RequestClinic(clinicDb.getId(), new ResponseClinic(clinicDb));
    }

    public Set<Clinic> getAllClinics() {
        Set<Clinic> clinics = clinicRepository.findAll().stream().collect(Collectors.toSet());
                return clinics;
    }
}
