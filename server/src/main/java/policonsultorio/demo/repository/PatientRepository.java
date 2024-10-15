package policonsultorio.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import policonsultorio.demo.entity.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
    Patient findByUserId(Long userId);
}
