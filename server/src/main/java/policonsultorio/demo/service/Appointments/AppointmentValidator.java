package policonsultorio.demo.service.Appointments;

import policonsultorio.demo.dto.appointment.AppointmentRequestDto;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.entity.Patient;

public interface AppointmentValidator {
    void validate(AppointmentRequestDto appointmentRequestDto, Doctor doctor, Patient patient);
}
