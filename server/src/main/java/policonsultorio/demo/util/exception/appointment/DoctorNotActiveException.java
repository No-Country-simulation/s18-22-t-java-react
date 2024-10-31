package policonsultorio.demo.util.exception.appointment;

public class DoctorNotActiveException extends RuntimeException {
    public DoctorNotActiveException(String message) {
        super(message);
    }
}
