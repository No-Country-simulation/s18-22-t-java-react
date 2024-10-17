package policonsultorio.demo.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import policonsultorio.demo.dto.appointment.*;
import policonsultorio.demo.entity.AppointmentEntity;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.entity.Patient;
import policonsultorio.demo.repository.AppointmentRepository;
import policonsultorio.demo.repository.DoctorRepository;
import policonsultorio.demo.repository.PatientRepository;
import policonsultorio.demo.service.AppointmentService;
import policonsultorio.demo.util.Enum.AppointmentStatus;
import policonsultorio.demo.util.Enum.TimeSlot;
import policonsultorio.demo.util.exception.appointment.*;
import policonsultorio.demo.util.mapper.AppointmentMapper;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    @Override
    @Transactional
    public AppointmentResponseDto createAppointment(AppointmentRequestDto appointmentRequestDto) {
        Doctor doctor = doctorRepository.findById(appointmentRequestDto.id_doctor())
                .orElseThrow(() -> new DoctorNotFoundException("Doctor not found"));

        if(!doctor.getActive()){
            throw new DoctorNotActiveException("Doctor not active");
        }

        Patient patient = patientRepository.findById(appointmentRequestDto.id_patient())
                .orElseThrow(() -> new PatientNotFoundException("Patient not found"));

        /*if(!patient.getActive()){
            throw new PatientNotActiveException("Patient not active");
        }*/

        if (!TimeSlot.isValidTime(appointmentRequestDto.startTime())) {
            throw new RuntimeException("The start time must be a valid time between 10:00 and 20:00 (e.g., 10:00, 10:30, etc.).");
        }

        if(appointmentRequestDto.date().isBefore(LocalDate.now())){
            throw new AppointmentDateException("The appointment date cannot be in the past. Please select a future date.");
        }

        if(appointmentRequestDto.startTime().isAfter(appointmentRequestDto.endTime())){
            throw new AppointmentTimeException("The start time must be before the end time. Please adjust the time range.");
        }

        // Verifica si hay otra cita en el mismo horario
        boolean existsAppointment = appointmentRepository.existsByDoctorAndDateAndTimeConflict(
                doctor, appointmentRequestDto.date(), appointmentRequestDto.startTime(), appointmentRequestDto.endTime());

        if (existsAppointment) {
            throw new AppointmentAlreadyBookedException("Doctor already has an appointment in this time slot");
        }

        AppointmentEntity entity = AppointmentMapper.toEntity(appointmentRequestDto, doctor, patient);

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

        if (!TimeSlot.isValidTime(rescheduleDto.newStartTime())) {
            throw new RuntimeException("The start time must be a valid time between 10:00 and 20:00 (e.g., 10:00, 10:30, etc.).");
        }

        if (rescheduleDto.newDate().isBefore(LocalDate.now())) {
            throw new AppointmentDateException("The appointment date cannot be in the past. Please select a future date.");
        }

        if (rescheduleDto.newStartTime().isAfter(rescheduleDto.newEndTime())) {
            throw new AppointmentTimeException("The start time must be before the end time. Please adjust the time range.");
        }

        // Verifica si hay otra cita en el mismo horario
        if (appointmentRepository.existsByDoctorAndDateAndTimeConflict(
                appointment.getDoctor(), rescheduleDto.newDate(), rescheduleDto.newStartTime(), rescheduleDto.newEndTime())) {
            throw new AppointmentConflictException("Doctor already has an appointment at the specified time");
        }

        appointment.setDate(rescheduleDto.newDate());
        appointment.setStartTime(rescheduleDto.newStartTime());
        appointment.setEndTime(rescheduleDto.newEndTime());
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

        appointment.setStatus(AppointmentStatus.CANCELADA);
        appointment = appointmentRepository.save(appointment);

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


        if (!TimeSlot.isValidTime(appointmentRequestDto.startTime())) {
            throw new RuntimeException("The start time must be a valid time between 10:00 and 20:00 (e.g., 10:00, 10:30, etc.).");
        }

        Doctor doctor = doctorRepository.findById(appointmentRequestDto.id_doctor())
                .orElseThrow(() -> new DoctorNotFoundException("Doctor not found"));

        Patient patient = patientRepository.findById(appointmentRequestDto.id_patient())
                .orElseThrow(() -> new PatientNotFoundException("Patient not found"));

        // Verificar conflicto de horario solo si el doctor o las horas cambian
        if (!appointment.getDoctor().equals(doctor) ||
                !appointment.getDate().equals(appointmentRequestDto.date()) ||
                !appointment.getStartTime().equals(appointmentRequestDto.startTime()) ||
                !appointment.getEndTime().equals(appointmentRequestDto.endTime())) {

            boolean existsConflict = appointmentRepository.existsByDoctorAndDateAndTimeConflict(
                    doctor, appointmentRequestDto.date(), appointmentRequestDto.startTime(), appointmentRequestDto.endTime());

            if (existsConflict) {
                throw new AppointmentConflictException("Doctor already has an appointment in this time slot");
            }
        }

        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setDate(appointmentRequestDto.date());
        appointment.setStartTime(appointmentRequestDto.startTime());
        appointment.setEndTime(appointmentRequestDto.endTime());
        appointment.setStatus(appointmentRequestDto.status());

        appointment = appointmentRepository.save(appointment);

        return AppointmentMapper.toDto(appointment);
    }


    @Override
    @Transactional(readOnly = true)
    public AppointmentResponseDto getAppointment(int id) {
        AppointmentEntity appointment = findAppointmentById(id);
        return AppointmentMapper.toDto(appointment);
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

        Patient patient = patientRepository.findById(id_patient)
                .orElseThrow(() -> new PatientNotFoundException("Patient not found"));

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
    public Page<AppointmentResponseDto> getAppointmentByDoctor(int id_doctor, int page, int size) {
        return null;
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

    private AppointmentEntity findAppointmentById(int id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException("Appointment not found"));
    }

}
