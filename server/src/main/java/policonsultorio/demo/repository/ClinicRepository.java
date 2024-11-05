package policonsultorio.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import policonsultorio.demo.entity.Clinic;

@Repository
public interface ClinicRepository extends JpaRepository<Clinic,Long> {
}
