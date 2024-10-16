package policonsultorio.demo.util.Enum;

import lombok.Getter;

import java.time.LocalTime;
import java.util.Arrays;

@Getter
public enum TimeSlot {
    TIME_10_00(LocalTime.of(10, 0)),
    TIME_10_30(LocalTime.of(10, 30)),
    TIME_11_00(LocalTime.of(11, 0)),
    TIME_11_30(LocalTime.of(11, 30)),
    TIME_12_00(LocalTime.of(12, 0)),
    TIME_12_30(LocalTime.of(12, 30)),
    TIME_13_00(LocalTime.of(13, 0)),
    TIME_13_30(LocalTime.of(13, 30)),
    TIME_14_00(LocalTime.of(14, 0)),
    TIME_14_30(LocalTime.of(14, 30)),
    TIME_15_00(LocalTime.of(15, 0)),
    TIME_15_30(LocalTime.of(15, 30)),
    TIME_16_00(LocalTime.of(16, 0)),
    TIME_16_30(LocalTime.of(16, 30)),
    TIME_17_00(LocalTime.of(17, 0)),
    TIME_17_30(LocalTime.of(17, 30)),
    TIME_18_00(LocalTime.of(18, 0)),
    TIME_18_30(LocalTime.of(18, 30)),
    TIME_19_00(LocalTime.of(19, 0)),
    TIME_19_30(LocalTime.of(19, 30)),
    TIME_20_00(LocalTime.of(20, 0));

    private final LocalTime time;

    TimeSlot(LocalTime time) {
        this.time = time;
    }

    public static boolean isValidTime(LocalTime time) {
        return Arrays.stream(values())
                .anyMatch(slot -> slot.getTime().equals(time));
    }
}
