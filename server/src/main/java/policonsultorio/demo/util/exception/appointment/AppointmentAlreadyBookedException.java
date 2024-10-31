package policonsultorio.demo.util.exception.appointment;

public class AppointmentAlreadyBookedException extends RuntimeException {

    public AppointmentAlreadyBookedException(String message) {
        super(message);
    }
}
