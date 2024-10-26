package policonsultorio.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import policonsultorio.demo.entity.WaitingQueue;

@Repository
public interface WaitingQueueRepository extends JpaRepository<WaitingQueue, Long> {
}
