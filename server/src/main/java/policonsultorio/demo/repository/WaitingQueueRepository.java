package policonsultorio.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.entity.WaitingQueue;
import policonsultorio.demo.enums.QueueStatus;

import java.util.List;

@Repository
public interface WaitingQueueRepository extends JpaRepository<WaitingQueue, Long> {
    List<WaitingQueue> findByDoctorAndStatus(Doctor doctor, QueueStatus status);
    WaitingQueue findByPatientIdAndStatus(Integer id, QueueStatus status);
}
