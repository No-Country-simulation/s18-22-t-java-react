package policonsultorio.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import policonsultorio.demo.entity.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}