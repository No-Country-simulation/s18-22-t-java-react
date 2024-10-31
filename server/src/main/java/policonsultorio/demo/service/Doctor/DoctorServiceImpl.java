package policonsultorio.demo.service.Doctor;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import policonsultorio.demo.dto.request.DoctorRequest;
import policonsultorio.demo.dto.response.DoctorResponse;
import policonsultorio.demo.entity.Clinic;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.enums.Roles;
import policonsultorio.demo.repository.ClinicRepository;
import policonsultorio.demo.repository.DoctorRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements IDoctorService {

	@Autowired
	DoctorRepository doctorRepository;
	@Autowired
	ModelMapper mapper;
    @Autowired
    private ClinicRepository clinicRepository;

	@Override
	public DoctorResponse create(DoctorRequest request) {
		try {
			Doctor doctor = mapper.map(request, Doctor.class);
			doctor.setRol(Roles.MEDIC);
			Optional<Clinic> clinic = clinicRepository.findById(request.getClinic_id());
            clinic.ifPresent(doctor::setClinic);
			doctorRepository.save(doctor);
			return mapper.map(doctor, DoctorResponse.class);
		} catch (DataIntegrityViolationException ex) {
			throw new RuntimeException("sus datos son invalidos", ex);
		} catch (Exception e) {
			throw new RuntimeException("Error creating a Doctor ", e);
		}
	}

	@Override
	public DoctorResponse getById(Integer id)
	{
		try {
			Doctor doctor = doctorRepository.findById( id )
					.orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + id));
			return mapper.map(doctor, DoctorResponse.class);
		} catch (Exception e) {
			throw new RuntimeException("Error retrieving doctor by ID: " + id, e);
		}
	}

	@Override
	public List<DoctorResponse> getAll() {
		try {
			List<Doctor> doctors = doctorRepository.findAll();
			return doctors.stream()
					.filter(doctor -> Boolean.FALSE.equals(doctor.getDeleted())) // Usar Boolean.FALSE para evitar NPE
					.map(doctor -> mapper.map(doctor, DoctorResponse.class))
					.collect(Collectors.toList());
		} catch (Exception e) {
			throw new RuntimeException("Error retrieving doctors", e);
		}
	}


	public Page<DoctorResponse> getAllPage(Pageable pageable, String name) {
		try {
			Page<Doctor> doctors;
			if (name != null && !name.isEmpty()) {
				// Filtra por nombre y solo devuelve doctores que no están eliminados
				doctors = doctorRepository.findByNameContainingIgnoreCaseAndDeletedFalse(name, pageable);
			} else {
				// Devuelve todos los doctores que no están eliminados
				doctors = doctorRepository.findAllByDeletedFalse(pageable);
			}
			return doctors.map(doctor -> mapper.map(doctor, DoctorResponse.class));
		} catch (Exception e) {
			throw new RuntimeException("Error retrieving doctors", e);
		}
	}






	@Override
	public DoctorResponse update(Integer id, DoctorRequest request) {
		try {
			Doctor existingDoctor = doctorRepository.findById(id)
					.orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + id));

			// Actualizamos los campos necesarios
			mapper.map(request, existingDoctor);
			doctorRepository.save(existingDoctor);

			return mapper.map(existingDoctor, DoctorResponse.class);
		} catch (DataIntegrityViolationException ex) {
			throw new RuntimeException("Invalid data provided for update", ex);
		} catch (Exception e) {
			throw new RuntimeException("Error updating Doctor with ID: " + id, e);
		}


	}

	@Override
	@Transactional
		public void softDeleteDoctor(Integer id) {
			Doctor doctor = doctorRepository.findById(id).orElseThrow(() -> new RuntimeException("Doctor not found"));
			doctor.setDeleted(true);
			doctorRepository.save(doctor);
		}





	@Override
	public boolean delete(DoctorRequest id, DoctorRequest request) {
		return false;
	}
}
