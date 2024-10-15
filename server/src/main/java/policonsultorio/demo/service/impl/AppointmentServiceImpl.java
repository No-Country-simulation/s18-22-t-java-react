package policonsultorio.demo.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import policonsultorio.demo.dto.appointment.AppointmentRequestDto;
import policonsultorio.demo.dto.appointment.AppointmentRescheduleDto;
import policonsultorio.demo.dto.appointment.AppointmentResponseDto;
import policonsultorio.demo.dto.appointment.PagedResponseDto;
import policonsultorio.demo.entity.AppointmentEntity;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.entity.Patient;
import policonsultorio.demo.repository.AppointmentRepository;
import policonsultorio.demo.repository.DoctorRepository;
import policonsultorio.demo.repository.PatientRepository;
import policonsultorio.demo.service.AppointmentService;
import policonsultorio.demo.util.Enum.AppointmentStatus;
import policonsultorio.demo.util.exception.appointment.*;
import policonsultorio.demo.util.mapper.AppointmentMapper;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

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

        Patient patient = patientRepository.findById(appointmentRequestDto.id_patient())
                .orElseThrow(() -> new PatientNotFoundException("Patient not found"));

        // Validar si ya existe una cita con el mismo doctor en el mismo rango horario
        boolean existsAppointment = appointmentRepository.existsByDoctorAndDateAndStartTimeAndEndTime(
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

        // Verifica si hay otra cita en el mismo horario
        if (appointmentRepository.existsByDoctorAndDateAndStartTimeBetweenOrEndTimeBetween(
                appointment.getDoctor(), rescheduleDto.newDate(), rescheduleDto.newStartTime(), rescheduleDto.newEndTime(),
                appointment.getStartTime(), appointment.getEndTime())) {
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

        appointment.setDoctor(doctorRepository.findById(appointmentRequestDto.id_doctor())
                .orElseThrow(() -> new DoctorNotFoundException("Doctor not found")));
        appointment.setPatient(patientRepository.findById(appointmentRequestDto.id_patient())
                .orElseThrow(() -> new PatientNotFoundException("Patient not found")));
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
    public Page<AppointmentResponseDto> getAppointmentByDoctor(int id_doctor, int page, int size) {
        return null;
    }

    @Override
    public PagedResponseDto<AppointmentResponseDto> getAppointmentAllByPatient(int id_patient, int page, int size) {
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
    public Page<AppointmentResponseDto> getAppointmentByDate(LocalDate date, int page, int size) {
        return null;
    }

    @Override
    public Page<AppointmentResponseDto> getAppointmentByStatus(AppointmentStatus status, int page, int size) {
        return null;
    }

    private AppointmentEntity findAppointmentById(int id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new AppointmentNotFoundException("Appointment not found"));
    }

}
