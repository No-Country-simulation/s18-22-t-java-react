package policonsultorio.demo.service.AppointmentsCreate;

import org.springframework.stereotype.Component;
import policonsultorio.demo.dto.appointment.AppointmentRequestDto;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.entity.Patient;
import policonsultorio.demo.util.exception.appointment.DoctorNotActiveException;

@Component
public class DoctorActiveValidator implements AppointmentValidator{
    @Override
    public void validate(AppointmentRequestDto appointmentRequestDto, Doctor doctor, Patient patient) {
        if (!doctor.getActive()) {
            throw new DoctorNotActiveException("Doctor not active");
        }
    }
}
