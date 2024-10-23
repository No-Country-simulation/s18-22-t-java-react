package policonsultorio.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import policonsultorio.demo.dto.clinic.RequestClinic;
import policonsultorio.demo.dto.clinic.ResponseClinic;
import policonsultorio.demo.entity.Clinic;
import policonsultorio.demo.repository.ClinicRepository;

@Service
@Transactional
public class ClinicService {

    @Autowired
    private ClinicRepository clinicRepository;

    public RequestClinic register(ResponseClinic responseClinic) {
     Clinic clinic =   clinicRepository.save(new Clinic(responseClinic));
     return new RequestClinic(clinic.getId(),new ResponseClinic(clinic));
    }
}
