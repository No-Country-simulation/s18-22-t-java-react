package policonsultorio.demo.repository;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import policonsultorio.demo.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByName(@NotBlank String name);

    @Query(value = "SELECT * FROM user WHERE name = :name",nativeQuery = true)
    UserDetails findByNameUserDetails(@Param("name") String email);

    @Query(value = "SELECT * FROM user WHERE email = :email",nativeQuery = true)
    UserDetails findByEmailUserDetails(@Param("email")String email);
}
