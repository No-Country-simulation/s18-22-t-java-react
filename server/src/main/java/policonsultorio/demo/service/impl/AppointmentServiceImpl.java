package policonsultorio.demo.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import policonsultorio.demo.dto.appointment.*;
import policonsultorio.demo.entity.AppointmentEntity;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.entity.Patient;
import policonsultorio.demo.entity.WaitingQueue;
import policonsultorio.demo.enums.QueueStatus;
import policonsultorio.demo.repository.AppointmentRepository;
import policonsultorio.demo.repository.DoctorRepository;
import policonsultorio.demo.repository.PatientRepository;
import policonsultorio.demo.repository.WaitingQueueRepository;
import policonsultorio.demo.service.AppointmentService;
import policonsultorio.demo.service.IWaitingQueue;
import policonsultorio.demo.util.Enum.AppointmentStatus;
import policonsultorio.demo.util.Enum.TimeSlot;
import policonsultorio.demo.util.exception.appointment.*;
import policonsultorio.demo.util.mapper.AppointmentMapper;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final IWaitingQueue waitingQueueService;
    private final WaitingQueueRepository waitingQueueRepository;
    private final AppointmentMapper appointmentMapper;

    LocalTime calculatedEndTime = LocalTime.ofSecondOfDay(0);


    @Override
    @Transactional
    public AppointmentResponseDto createAppointment(AppointmentRequestDto appointmentRequestDto) {
        Doctor doctor = doctorRepository.findById(appointmentRequestDto.id_doctor())
                .orElseThrow(() -> new DoctorNotFoundException("Doctor not found"));

        if(!doctor.getActive()){
            throw new DoctorNotActiveException("Doctor not active");
        }

        Patient patient = patientRepository.findByUserId(Long.valueOf(appointmentRequestDto.id_patient()));
        if (patient == null) {
            throw new PatientNotFoundException("Patient not found");
        }

        /*if(!patient.getActive()){
            throw new PatientNotActiveException("Patient not active");
        }*/


        //verificar si el paciente ya tiene una cita pendiente con este doctor
        boolean patientHasPendingAppointmentWithDoctor = appointmentRepository.existsByPatientAndDoctorAndStatus(
                patient, doctor, AppointmentStatus.PROGRAMADA);

        if (patientHasPendingAppointmentWithDoctor) {
            throw new AppointmentAlreadyBookedException("You already have a pending appointment with this doctor. Please complete or cancel the current appointment before booking a new one.");
        }


        //verificar si el paciente ya tiene una cita con este doctor
        boolean patientAlreadyHasAppointment = appointmentRepository.existsByDoctorAndPatientAndDate(
                doctor, patient, appointmentRequestDto.date());

        if (patientAlreadyHasAppointment) {
            throw new PatientAlreadyHasAppointmentException("Patient already has an appointment with this doctor on the same day.");
        }

        //verificar si el paciente ya tiene una cita con otro doctor en el mismo horario
        boolean patientHasConflictWithOtherDoctor = appointmentRepository.existsByPatientAndDateAndTimeConflict(
                patient, appointmentRequestDto.date(), appointmentRequestDto.startTime(), appointmentRequestDto.startTime().plusMinutes(30));

        if (patientHasConflictWithOtherDoctor) {
            throw new AppointmentTimeConflictException("Patient already has an appointment with another doctor in this time slot.");
        }

        LocalDateTime appointmentDateTime = LocalDateTime.of(appointmentRequestDto.date(), appointmentRequestDto.startTime());
        LocalDateTime currentTime = LocalDateTime.now();

        if (appointmentDateTime.isBefore(currentTime)) {
            throw new AppointmentDateException("The appointment time cannot be in the past. Please select a future time.");
        }

        if (!TimeSlot.isValidTime(appointmentRequestDto.startTime())) {
            throw new RuntimeException("The start time must be a valid time between 07:00 and 18:00 (e.g., 10:00, 10:30, etc.).");
        }

        if(appointmentRequestDto.date().isBefore(LocalDate.now())){
            throw new AppointmentDateException("The appointment date cannot be in the past. Please select a future date.");
        }

        calculatedEndTime = appointmentRequestDto.startTime().plusMinutes(30);

        if (appointmentRequestDto.startTime().isAfter(calculatedEndTime)) {
            throw new AppointmentTimeException("The start time must be before the end time. Please adjust the time range.");
        }

        // Verifica si hay otra cita en el mismo horario
        boolean existsAppointment = appointmentRepository.existsByDoctorAndDateAndTimeConflict(
                doctor, appointmentRequestDto.date(), appointmentRequestDto.startTime(), calculatedEndTime);

        if (existsAppointment) {
            throw new AppointmentAlreadyBookedException("Doctor already has an appointment in this time slot");
        }

        AppointmentEntity entity = AppointmentMapper.toEntity(appointmentRequestDto, doctor, patient);
        entity.setEndTime(calculatedEndTime);

        entity = appointmentRepository.save(entity);

        return AppointmentMapper.toDto(entity);
    }

    @Override
    @Transactional
    public AppointmentResponseDto rescheduleAppointment(int id, AppointmentRescheduleDto rescheduleDto) {
        AppointmentEntity appointment = findAppointmentById(id);

        if (appointment.getStatus() == AppointmentStatus.CANCELADA) {
            throw new AppointmentAlreadyCancelledException("Cannot reschedule a cancelled appointment");
        }

        if (appointment.getStatus() == AppointmentStatus.COMPLETADA) {
            throw new AppointmentAlreadyCompletedException("Cannot reschedule a completed appointment");
        }

        LocalDateTime appointmentDateTime = LocalDateTime.of(appointment.getDate(), appointment.getStartTime());
        LocalDateTime currentTime = LocalDateTime.now();

        if (appointmentDateTime.isBefore(currentTime.plusHours(24))) {
            throw new AppointmentTimeRestrictionException("Appointments can only be rescheduled with at least 24 hours in advance.");
        }

        LocalDateTime newAppointmentDateTime = LocalDateTime.of(rescheduleDto.newDate(), rescheduleDto.newStartTime());

        if (newAppointmentDateTime.isBefore(currentTime)) {
            throw new AppointmentDateException("The new appointment time cannot be in the past. Please select a future time.");
        }


        if (!TimeSlot.isValidTime(rescheduleDto.newStartTime())) {
            throw new RuntimeException("The start time must be a valid time between 07:00 and 18:00 (e.g., 10:00, 10:30, etc.).");
        }

        if (rescheduleDto.newDate().isBefore(LocalDate.now())) {
            throw new AppointmentDateException("The appointment date cannot be in the past. Please select a future date.");
        }

        calculatedEndTime = rescheduleDto.newStartTime().plusMinutes(30);

        if (rescheduleDto.newStartTime().isAfter(calculatedEndTime)) {
            throw new AppointmentTimeException("The start time must be before the end time. Please adjust the time range.");
        }


        // Verifica si hay otra cita en el mismo horario
        if (appointmentRepository.existsByDoctorAndDateAndTimeConflict(
                appointment.getDoctor(), rescheduleDto.newDate(), rescheduleDto.newStartTime(), calculatedEndTime)) {
            throw new AppointmentConflictException("Doctor already has an appointment at the specified time");
        }

        appointment.setDate(rescheduleDto.newDate());
        appointment.setStartTime(rescheduleDto.newStartTime());
        appointment.setEndTime(calculatedEndTime);
        appointment = appointmentRepository.save(appointment);

        return AppointmentMapper.toDto(appointment);
    }

    @Override
    @Transactional
    public AppointmentResponseDto cancelAppointment(int id) {
        AppointmentEntity appointment = findAppointmentById(id);

        if (appointment.getStatus() == AppointmentStatus.CANCELADA) {
            throw new AppointmentAlreadyCancelledException("Appointment is already cancelled");
        }

        if (appointment.getStatus() == AppointmentStatus.COMPLETADA) {
            throw new AppointmentAlreadyCompletedException("Cannot cancel a completed appointment");
        }

        LocalDateTime appointmentDateTime = LocalDateTime.of(appointment.getDate(), appointment.getStartTime());
        LocalDateTime currentTime = LocalDateTime.now();

        if (appointmentDateTime.isBefore(currentTime.plusHours(24))) {
            throw new AppointmentTimeRestrictionException("Appointments can only be cancelled with at least 24 hours in advance.");
        }

        appointment.setStatus(AppointmentStatus.CANCELADA);
        appointment = appointmentRepository.save(appointment);

        //Llama a la funcionalidad de reasignar cita
        reassignedAppointment(appointment);

        return AppointmentMapper.toDto(appointment);
    }

    @Override
    @Transactional
    public AppointmentResponseDto completeAppointment(int id) {
        AppointmentEntity appointment = findAppointmentById(id);

        if (appointment.getStatus() == AppointmentStatus.COMPLETADA) {
            throw new AppointmentAlreadyCompletedException("Appointment is already completed");
        }

        if (appointment.getStatus() == AppointmentStatus.CANCELADA) {
            throw new AppointmentAlreadyCancelledException("Cannot complete a cancelled appointment");
        }

        appointment.setStatus(AppointmentStatus.COMPLETADA);
        appointment = appointmentRepository.save(appointment);

        return AppointmentMapper.toDto(appointment);
    }


    @Override
    @Transactional
    public AppointmentResponseDto updateAppointment(int id, AppointmentRequestDto appointmentRequestDto) {
        AppointmentEntity appointment = findAppointmentById(id);

        if (appointment.getStatus() == AppointmentStatus.CANCELADA) {
            throw new AppointmentAlreadyCancelledException("Appointment is cancelled");
        }

        if (appointment.getStatus() == AppointmentStatus.COMPLETADA) {
            throw new AppointmentAlreadyCompletedException("Appointment is completed");
        }

        LocalDateTime newAppointmentDateTime = LocalDateTime.of(appointmentRequestDto.date(), appointmentRequestDto.startTime());
        LocalDateTime currentTime = LocalDateTime.now();

        if (newAppointmentDateTime.isBefore(currentTime)) {
            throw new AppointmentDateException("The appointment time cannot be in the past. Please select a future time.");
        }


        if (!TimeSlot.isValidTime(appointmentRequestDto.startTime())) {
            throw new RuntimeException("The start time must be a valid time between 07:00 and 18:00 (e.g., 10:00, 10:30, etc.).");
        }

        Doctor doctor = doctorRepository.findById(appointmentRequestDto.id_doctor())
                .orElseThrow(() -> new DoctorNotFoundException("Doctor not found"));

        Patient patient = patientRepository.findByUserId(Long.valueOf(appointmentRequestDto.id_patient()));
        if (patient == null) {
            throw new PatientNotFoundException("Patient not found");
        }

        calculatedEndTime = appointmentRequestDto.startTime().plusMinutes(30);

        // Verificar conflicto de horario solo si el doctor o las horas cambian
        if (!appointment.getDoctor().equals(doctor) ||
                !appointment.getDate().equals(appointmentRequestDto.date()) ||
                !appointment.getStartTime().equals(appointmentRequestDto.startTime()) ||
                !appointment.getEndTime().equals(calculatedEndTime)) {

            boolean existsConflict = appointmentRepository.existsByDoctorAndDateAndTimeConflict(
                    doctor, appointmentRequestDto.date(), appointmentRequestDto.startTime(), calculatedEndTime);

            if (existsConflict) {
                throw new AppointmentConflictException("Doctor already has an appointment in this time slot");
            }
        }

        // Verificar si el paciente tiene un conflicto de horario con otro doctor, excluyendo la cita actual
        boolean patientHasConflictWithOtherDoctor = appointmentRepository.existsByPatientAndDateAndTimeConflictExcludingAppointment(
                patient, appointmentRequestDto.date(), appointmentRequestDto.startTime(), calculatedEndTime, appointment.getId());

        if (patientHasConflictWithOtherDoctor) {
            throw new AppointmentTimeConflictException("Patient already has an appointment with another doctor in this time slot.");
        }


        // Verificar si el paciente ya tiene una cita con el mismo doctor en la misma fecha
        boolean patientAlreadyHasAppointment = appointmentRepository.existsByDoctorAndPatientAndDateExcludingAppointment(
                doctor, patient, appointmentRequestDto.date(), appointmentRequestDto.startTime(), calculatedEndTime, appointment.getId());

        if (patientAlreadyHasAppointment) {
            throw new PatientAlreadyHasAppointmentException("Patient already has an appointment with this doctor on the same day.");
        }

        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setDate(appointmentRequestDto.date());
        appointment.setStartTime(appointmentRequestDto.startTime());
        appointment.setEndTime(calculatedEndTime);
        appointment.setStatus(appointmentRequestDto.status());

        appointment = appointmentRepository.save(appointment);

        return AppointmentMapper.toDto(appointment);
    }



    @Override
    @Transactional(readOnly = true)
    public AppointmentResponseIdDto getAppointment(int id) {
        AppointmentEntity appointment = findAppointmentById(id);
        return appointmentMapper.toDtoId(appointment);
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponseDto<AppointmentResponseDto> getAllAppointments(int page, int size) {
        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Page number and size must be positive");
        }
        Page<AppointmentEntity> appointments = appointmentRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
        List<AppointmentResponseDto> content = appointments.getContent().stream()
                .map(AppointmentMapper::toDto)
                .toList();

        return new PagedResponseDto<>(
                content,
                appointments.getNumber(),
                appointments.getSize(),
                appointments.getTotalElements(),
                appointments.getTotalPages(),
                appointments.isLast()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponseDto<AppointmentResponseDto> getAppointmentAllByPatient(int id_patient, int page, int size) {

        if (page < 0 || size <= 0) {
            throw new IllegalArgumentException("Page number and size must be positive");
        }

        Patient patient = patientRepository.findByUserId((long) id_patient);
        if (patient == null) {
            throw new PatientNotFoundException("Patient not found");
        }

        Page<AppointmentEntity> appointments = appointmentRepository.findByPatient(patient, PageRequest.of(page, size, Sort.by("id").descending()));
        List<AppointmentResponseDto> content = appointments.getContent().stream()
                .map(AppointmentMapper::toDto)
                .toList();

        return new PagedResponseDto<>(
                content,
                appointments.getNumber(),
                appointments.getSize(),
                appointments.getTotalElements(),
                appointments.getTotalPages(),
                appointments.isLast()
        );
    }


    @Override
    @Transactional(readOnly = true)
    public PagedResponseDto<AppointmentResponseDto> getAppointmentAllByDoctor(int id_doctor, int page, int size) {
        if(page < 0 || size <= 0) {
            throw new IllegalArgumentException("Page number and size must be positive");
        }
        Doctor doctor = doctorRepository.findById(id_doctor)
                .orElseThrow(() -> new DoctorNotFoundException("Doctor not found"));
        Page<AppointmentEntity> appointments = appointmentRepository.findByDoctor(doctor, PageRequest.of(page, size, Sort.by("id").descending()));
        List<AppointmentResponseDto> content = appointments.getContent().stream()
                .map(AppointmentMapper::toDto)
                .toList();
        return new PagedResponseDto<>(
                content,
                appointments.getNumber(),
                appointments.getSize(),
                appointments.getTotalElements(),
                appointments.getTotalPages(),
                appointments.isLast()
        );
    }

    @Override
    public Page<AppointmentResponseDto> getAppointmentByDate(LocalDate date, int page, int size) {
        return null;
    }

    @Override
    public Page<AppointmentResponseDto> getAppointmentByStatus(AppointmentStatus status, int page, int size) {
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public OccupiedTimesResponseDto getOccupiedTimes(LocalDate date,  int doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new DoctorNotFoundException("Doctor not found"));

        // Obtener las citas para esa fecha
        List<AppointmentEntity> appointments = appointmentRepository.findByDoctorAndDate(doctor, date);

        // Extraer las horas de inicio de las citas
        List<String> occupiedTimes = appointments.stream()
                .map(appointment -> appointment.getStartTime().format(DateTimeFormatter.ofPattern("HH:mm")))
                .toList();

        return new OccupiedTimesResponseDto(date, occupiedTimes);
    }


    @Scheduled(cron = "0 */5 * * * *") // Ejecutar cada 5 minutos para mayor precisión
    public void markNoShowAppointments() {
        LocalDateTime now = LocalDateTime.now();

        LocalDateTime graceTimeEnd = now.minusMinutes(15);

        List<AppointmentEntity> appointments = appointmentRepository.findByStatusAndDateTimeBeforeWithGrace(
                AppointmentStatus.PROGRAMADA,
                graceTimeEnd
        );

        for (AppointmentEntity appointment : appointments) {
            // Solo marcar como NO_ASISTIO si aún está PROGRAMADA
            if (appointment.getStatus() == AppointmentStatus.PROGRAMADA) {
                appointment.setStatus(AppointmentStatus.NO_ASISTIO);
                appointmentRepository.save(appointment);
            }
        }
    }



    @Transactional
    public AppointmentResponseDto markAppointmentAsAttended(int id) {
        AppointmentEntity appointment = findAppointmentById(id);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime appointmentDateTime = LocalDateTime.of(appointment.getDate(), appointment.getStartTime());

        if (now.isBefore(appointmentDateTime)) {
            throw new IllegalStateException("No se puede marcar como asistida una cita antes de su hora programada");
        }

        if (appointment.getStatus() == AppointmentStatus.PROGRAMADA) {

            LocalDateTime endTimeWithGrace = LocalDateTime.of(
                    appointment.getDate(),
                    appointment.getEndTime().plusMinutes(15)
            );

            if (now.isBefore(endTimeWithGrace)) {
                appointment.setStatus(AppointmentStatus.ASISTIO);
                appointment = appointmentRepository.save(appointment);
            } else {
                throw new IllegalStateException("La cita ya ha expirado y no puede marcarse como asistida");
            }
        } else if (appointment.getStatus() == AppointmentStatus.NO_ASISTIO) {
            // Permitir cambiar de NO_ASISTIO a ASISTIO solo dentro del mismo día
            if (appointment.getDate().isEqual(LocalDate.now())) {
                appointment.setStatus(AppointmentStatus.ASISTIO);
                appointment = appointmentRepository.save(appointment);
            } else {
                throw new IllegalStateException("No se puede marcar como asistida una cita de un día anterior");
            }
        }

        return AppointmentMapper.toDto(appointment);
    }

    private AppointmentEntity findAppointmentById(int id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException("Appointment not found"));
    }

    @Transactional
    protected void reassignedAppointment(AppointmentEntity appointment){
        WaitingQueue nextPatient = waitingQueueService.getWaitingQueue(appointment);

        if (nextPatient != null) {
            AppointmentRequestDto reassignedAppointment = new AppointmentRequestDto(
                    Math.toIntExact(appointment.getDoctor().getId()),
                    Math.toIntExact(nextPatient.getPatient().getUser().getId()),
                    appointment.getDate(),
                    appointment.getStartTime(),
                    AppointmentStatus.PROGRAMADA
            );

            createAppointment(reassignedAppointment);

            nextPatient.setStatus(QueueStatus.ASSIGNED);
            waitingQueueRepository.save(nextPatient);
        }
    }


}
