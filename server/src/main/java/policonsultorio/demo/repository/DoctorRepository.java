package policonsultorio.demo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import policonsultorio.demo.dto.response.DoctorResponse;
import policonsultorio.demo.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
	Page<Doctor> findByNameContainingIgnoreCase(String name, Pageable pageable);
	Page<Doctor> findByNameContainingIgnoreCaseAndDeletedFalse(String name, Pageable pageable);
	Page<Doctor> findAllByDeletedFalse(Pageable pageable);
}