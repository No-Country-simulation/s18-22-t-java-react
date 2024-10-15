package policonsultorio.demo.repository;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import policonsultorio.demo.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByName(@NotBlank String name);
}
