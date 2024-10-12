package policonsultorio.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import policonsultorio.demo.entity.User;

public interface UserRepositoty extends JpaRepository<User, Long> {
}
