package policonsultorio.demo.service.Appointments;

import org.springframework.stereotype.Component;
import policonsultorio.demo.dto.appointment.AppointmentRequestDto;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.entity.Patient;
import policonsultorio.demo.repository.DoctorRepository;
import policonsultorio.demo.util.exception.appointment.DoctorNotActiveException;
import policonsultorio.demo.util.exception.appointment.DoctorNotFoundException;

@Component
public class DoctorActiveValidator implements AppointmentValidator{
    @Override
    public void validate(AppointmentRequestDto appointmentRequestDto, Doctor doctor, Patient patient) {
        if (!doctor.getActive()) {
            throw new DoctorNotActiveException("Doctor not active");
        }
    }
}
