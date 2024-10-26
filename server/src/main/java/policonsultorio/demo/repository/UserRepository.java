package policonsultorio.demo.repository;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;
import policonsultorio.demo.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByName(@NotBlank String name);

    User findByEmail( String email);

   /* @Query("SELECT u FROM User u WHERE u.email = :email")
    User findByEmail(@Param("email") String email);*/




}
