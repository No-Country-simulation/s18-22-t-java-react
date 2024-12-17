package policonsultorio.demo.service.Appointments;

import java.time.LocalTime;

public class TimeSlotValidator {
    private static final LocalTime START_TIME = LocalTime.of(7, 0);
    private static final LocalTime END_TIME = LocalTime.of(18, 0);

    public static boolean isValidTime(LocalTime time) {
        return !time.isBefore(START_TIME) && !time.isAfter(END_TIME);
    }
}
