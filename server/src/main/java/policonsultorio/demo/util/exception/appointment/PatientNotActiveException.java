package policonsultorio.demo.util.exception.appointment;

public class PatientNotActiveException extends RuntimeException {
    public PatientNotActiveException(String message) {
        super(message);
    }
}
