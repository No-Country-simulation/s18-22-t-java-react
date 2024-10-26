package policonsultorio.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import policonsultorio.demo.entity.Authorizarion;

public interface AuthorizationRepository extends JpaRepository<Authorizarion,Long> {

    @Query(value = "SELECT * FROM authorization WHERE user_id = :user_id",nativeQuery = true)
    Authorizarion findByUserId(@Param("user_id")Long user_id);


}
