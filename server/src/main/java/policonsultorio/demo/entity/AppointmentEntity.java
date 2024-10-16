package policonsultorio.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import policonsultorio.demo.util.Enum.AppointmentStatus;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "appointment")
public class AppointmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(targetEntity = Doctor.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_doctor")
    public Doctor doctor;

    @ManyToOne(targetEntity = Patient.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_patient")
    public Patient patient;

    private LocalDate date;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;
}
