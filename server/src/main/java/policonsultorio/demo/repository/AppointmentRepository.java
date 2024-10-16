package policonsultorio.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import policonsultorio.demo.entity.AppointmentEntity;
import policonsultorio.demo.entity.Doctor;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Integer> {
    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN TRUE ELSE FALSE END " +
            "FROM AppointmentEntity a " +
            "WHERE a.doctor = :doctor " +
            "AND a.date = :date " +
            "AND ( " +
            "      (a.startTime < :newEndTime AND a.endTime > :newStartTime) " +
            "   )")
    boolean existsByDoctorAndDateAndTimeConflict(
            @Param("doctor") Doctor doctor,
            @Param("date") LocalDate date,
            @Param("newStartTime") LocalTime newStartTime,
            @Param("newEndTime") LocalTime newEndTime
    );


}
