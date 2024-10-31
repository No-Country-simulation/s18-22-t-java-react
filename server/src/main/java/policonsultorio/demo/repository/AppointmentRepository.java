package policonsultorio.demo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import policonsultorio.demo.entity.AppointmentEntity;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.entity.Patient;
import policonsultorio.demo.util.Enum.AppointmentStatus;
import policonsultorio.demo.util.Enum.TimeSlot;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Integer> {
    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN TRUE ELSE FALSE END " +
            "FROM AppointmentEntity a " +
            "WHERE a.doctor = :doctor " +
            "AND a.date = :date " +
            "AND a.status NOT IN ('CANCELADA', 'COMPLETADA') " +
            "AND ( " +
            "      (a.startTime < :newEndTime AND a.endTime > :newStartTime) " +
            "   )")
    boolean existsByDoctorAndDateAndTimeConflict(
            @Param("doctor") Doctor doctor,
            @Param("date") LocalDate date,
            @Param("newStartTime") LocalTime newStartTime,
            @Param("newEndTime") LocalTime newEndTime
    );


    Page<AppointmentEntity> findByPatient(Patient patient, PageRequest id);


    List<AppointmentEntity> findByDoctorAndDate(Doctor doctor, LocalDate date);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
            "FROM AppointmentEntity a " +
            "WHERE a.doctor = :doctor " +
            "AND a.patient = :patient " +
            "AND a.date = :date " +
            "AND a.status NOT IN ('CANCELADA', 'COMPLETADA')")
    boolean existsByDoctorAndPatientAndDate(@Param("doctor") Doctor doctor,
                                            @Param("patient") Patient patient,
                                            @Param("date") LocalDate date);



    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
            "FROM AppointmentEntity a " +
            "WHERE a.patient = :patient " +
            "AND a.date = :date " +
            "AND a.status NOT IN ('CANCELADA', 'COMPLETADA') " +
            "AND ((a.startTime < :endTime AND a.endTime > :startTime))")
    boolean existsByPatientAndDateAndTimeConflict(@Param("patient") Patient patient,
                                                  @Param("date") LocalDate date,
                                                  @Param("startTime") LocalTime startTime,
                                                  @Param("endTime") LocalTime endTime);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
            "FROM AppointmentEntity a " +
            "WHERE a.doctor = :doctor " +
            "AND a.patient = :patient " +
            "AND a.date = :date " +
            "AND a.status NOT IN ('CANCELADA', 'COMPLETADA') " +
            "AND ((a.startTime < :endTime AND a.endTime > :startTime)) " +
            "AND a.id != :appointmentId")
    boolean existsByDoctorAndPatientAndDateExcludingAppointment(@Param("doctor") Doctor doctor,
                                                                @Param("patient") Patient patient,
                                                                @Param("date") LocalDate date,
                                                                @Param("startTime") LocalTime startTime,
                                                                @Param("endTime") LocalTime endTime,
                                                                @Param("appointmentId") int appointmentId);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
            "FROM AppointmentEntity a " +
            "WHERE a.patient = :patient " +
            "AND a.date = :date " +
            "AND a.status NOT IN ('CANCELADA', 'COMPLETADA') " +
            "AND ((a.startTime < :endTime AND a.endTime > :startTime)) " +
            "AND a.id != :appointmentId")
    boolean existsByPatientAndDateAndTimeConflictExcludingAppointment(@Param("patient") Patient patient,
                                                                      @Param("date") LocalDate date,
                                                                      @Param("startTime") LocalTime startTime,
                                                                      @Param("endTime") LocalTime endTime,
                                                                      @Param("appointmentId") int appointmentId);

    Page<AppointmentEntity> findByDoctor(Doctor doctor, PageRequest id);

    @Query("SELECT a FROM AppointmentEntity a " +
            "WHERE a.status = :status " +
            "AND TIMESTAMP(CONCAT(a.date, ' ', a.startTime)) < :endTime")
    List<AppointmentEntity> findByStatusAndDateTimeBeforeWithGrace(
            @Param("status") AppointmentStatus status,
            @Param("endTime") LocalDateTime endTime
    );





    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
            "FROM AppointmentEntity a " +
            "WHERE a.patient = :patient " +
            "AND a.status = :status " +
            "AND a.doctor = :doctor")
    boolean existsByPatientAndDoctorAndStatus(@Param("patient") Patient patient,
                                              @Param("doctor") Doctor doctor,
                                              @Param("status") AppointmentStatus status);



}
