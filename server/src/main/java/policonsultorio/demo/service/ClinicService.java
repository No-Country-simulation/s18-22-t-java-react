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

        if (!responseClinic.name().isBlank()) clinic.setName(responseClinic.name());
        if (!responseClinic.address().isBlank()) clinic.setAddress(responseClinic.address());
        if (!responseClinic.cuit().isBlank()) clinic.setCuit(responseClinic.cuit());
        if (!responseClinic.phone().isBlank()) clinic.setPhone(responseClinic.phone());
        if (!responseClinic.description().isBlank()) clinic.setDescription(responseClinic.description());
        if (!responseClinic.vlinicImage().isBlank()) clinic.setVlinicImage(responseClinic.vlinicImage());

        var clinicDb = clinicRepository.save(clinic);
        return new RequestClinic(clinicDb.getId(), new ResponseClinic(clinicDb));
    }
}
