package policonsultorio.demo.service.Doctor;

import policonsultorio.demo.dto.request.DoctorRequest;
import policonsultorio.demo.dto.response.DoctorResponse;

import java.util.List;

public interface IDoctorService {

  DoctorResponse create(DoctorRequest request);

	DoctorResponse getById(Integer id);
	List<DoctorResponse> getAll() ;
	DoctorResponse update(Integer id, DoctorRequest  request);

	public void softDeleteDoctor(Integer id) ;
	boolean delete(DoctorRequest id, DoctorRequest request);
}

