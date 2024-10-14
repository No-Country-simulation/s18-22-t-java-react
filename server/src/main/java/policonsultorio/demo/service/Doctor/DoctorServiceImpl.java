package policonsultorio.demo.service.Doctor;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import policonsultorio.demo.dto.request.DoctorRequest;
import policonsultorio.demo.dto.response.DoctorResponse;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.repository.DoctorRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements IDoctorService {

	@Autowired
	DoctorRepository doctorRepository;
	@Autowired
	ModelMapper mapper;

	@Override
	public DoctorResponse create(DoctorRequest request) {
		try {
			Doctor doctor = mapper.map(request, Doctor.class);
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
					.map(doctor -> mapper.map(doctor, DoctorResponse.class))
					.collect(Collectors.toList());
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
	public boolean delete(DoctorRequest id, DoctorRequest request) {
		return false;
	}
}
