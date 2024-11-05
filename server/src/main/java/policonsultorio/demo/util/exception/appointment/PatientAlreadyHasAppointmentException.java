package policonsultorio.demo.util.exception.appointment;

public class PatientAlreadyHasAppointmentException extends RuntimeException {
    public PatientAlreadyHasAppointmentException(String message) {
        super(message);
    }
}
