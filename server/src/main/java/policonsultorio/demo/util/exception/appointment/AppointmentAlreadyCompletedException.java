package policonsultorio.demo.util.exception.appointment;

public class AppointmentAlreadyCompletedException extends RuntimeException {
    public AppointmentAlreadyCompletedException(String message) {
        super(message);
    }
}
