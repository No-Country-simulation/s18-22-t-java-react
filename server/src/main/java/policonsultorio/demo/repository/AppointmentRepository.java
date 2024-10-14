package policonsultorio.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import policonsultorio.demo.entity.AppointmentEntity;
import policonsultorio.demo.entity.Doctor;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Integer> {
    boolean existsByDoctorAndDateAndStartTimeAndEndTime(Doctor doctor, LocalDate date, LocalTime startTime, LocalTime endTime);

    boolean existsByDoctorAndDateAndStartTimeBetweenOrEndTimeBetween(
            Doctor doctor,
            LocalDate date,
            LocalTime startTime,
            LocalTime endTime,
            LocalTime rangeStart,
            LocalTime rangeEnd);

}
