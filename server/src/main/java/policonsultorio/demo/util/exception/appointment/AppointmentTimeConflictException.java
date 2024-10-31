package policonsultorio.demo.util.exception.appointment;

public class AppointmentTimeConflictException extends RuntimeException {
    public AppointmentTimeConflictException(String message) {
        super(message);
    }
}
