package policonsultorio.demo.service.Appointments;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import policonsultorio.demo.dto.appointment.AppointmentRequestDto;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.entity.Patient;
import policonsultorio.demo.repository.AppointmentRepository;
import policonsultorio.demo.util.Enum.AppointmentStatus;
import policonsultorio.demo.util.exception.appointment.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Component
@RequiredArgsConstructor
public class PatientAppointmentConflictValidator implements AppointmentValidator{

    private final AppointmentRepository appointmentRepository;

    @Override
    public void validate(AppointmentRequestDto appointmentRequestDto, Doctor doctor, Patient patient) {
        // Validación: Verificar si el paciente ya tiene una cita pendiente con este doctor
        boolean patientHasPendingAppointmentWithDoctor = appointmentRepository.existsByPatientAndDoctorAndStatus(
                patient, doctor, AppointmentStatus.PROGRAMADA);

        if (patientHasPendingAppointmentWithDoctor) {
            throw new AppointmentAlreadyBookedException(
                    "You already have a pending appointment with this doctor. " +
                            "Please complete or cancel the current appointment before booking a new one."
            );
        }

        // Validación: Verificar si el paciente ya tiene una cita con este doctor en la misma fecha
        boolean patientAlreadyHasAppointment = appointmentRepository.existsByDoctorAndPatientAndDate(
                doctor, patient, appointmentRequestDto.date());

        if (patientAlreadyHasAppointment) {
            throw new PatientAlreadyHasAppointmentException(
                    "Patient already has an appointment with this doctor on the same day."
            );
        }


        // Validación: Verificar si el paciente tiene conflicto de horario con otro doctor
        boolean patientHasConflictWithOtherDoctor = appointmentRepository.existsByPatientAndDateAndTimeConflict(
                patient,
                appointmentRequestDto.date(),
                appointmentRequestDto.startTime(),
                appointmentRequestDto.startTime().plusMinutes(30)
        );

        if (patientHasConflictWithOtherDoctor) {
            throw new AppointmentTimeConflictException(
                    "Patient already has an appointment with another doctor in this time slot."
            );
        }

        // Validación: La hora de inicio debe ser antes de la hora calculada de fin
        LocalTime calculatedEndTime = appointmentRequestDto.startTime().plusMinutes(30);
        if (appointmentRequestDto.startTime().isAfter(calculatedEndTime)) {
            throw new AppointmentTimeException("The start time must be before the end time. Please adjust the time range.");
        }

        // Validación: Verificar si hay conflictos con citas del doctor en el mismo horario
        boolean existsAppointment = appointmentRepository.existsByDoctorAndDateAndTimeConflict(
                doctor, appointmentRequestDto.date(), appointmentRequestDto.startTime(), calculatedEndTime);

        if (existsAppointment) {
            throw new AppointmentAlreadyBookedException("Doctor already has an appointment in this time slot.");
        }
    }
}
