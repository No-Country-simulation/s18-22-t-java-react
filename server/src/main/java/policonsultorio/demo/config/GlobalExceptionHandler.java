package policonsultorio.demo.config;

import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;
import policonsultorio.demo.dto.ErrorResponse;
import policonsultorio.demo.util.exception.appointment.*;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.toList());
        return ResponseEntity.badRequest().body(new ErrorResponse("Validation failed", String.join(", ", errors)));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Invalid data", ex.getMessage()));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("Data integrity violation", ex.getMessage()));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Invalid request body", ex.getMessage()));
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoHandlerFoundException(NoHandlerFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Resource not found", ex.getMessage()));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(new ErrorResponse("Method not allowed", ex.getMessage()));
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ErrorResponse> handleMissingServletRequestParameterException(MissingServletRequestParameterException ex) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Missing request parameter", ex.getMessage()));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException ex) {
        List<String> errors = ex.getConstraintViolations()
                .stream()
                .map(constraintViolation -> constraintViolation.getPropertyPath() + ": " + constraintViolation.getMessage())
                .collect(Collectors.toList());
        return ResponseEntity.badRequest().body(new ErrorResponse("Constraint violation", String.join(", ", errors)));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error", ex.getMessage()));
    }

    @ExceptionHandler(AppointmentNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleAppointmentNotFoundException(AppointmentNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Appointment not found", ex.getMessage()));
    }

    @ExceptionHandler(AppointmentAlreadyCancelledException.class)
    public ResponseEntity<ErrorResponse> handleAppointmentAlreadyCancelledException(AppointmentAlreadyCancelledException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Appointment already cancelled", ex.getMessage()));
    }

    @ExceptionHandler(AppointmentAlreadyCompletedException.class)
    public ResponseEntity<ErrorResponse> handleAppointmentAlreadyCompletedException(AppointmentAlreadyCompletedException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Appointment already completed", ex.getMessage()));
    }

    @ExceptionHandler(InvalidPageNumberException.class)
    public ResponseEntity<ErrorResponse> handleInvalidPageNumberException(InvalidPageNumberException ex) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Invalid page number", ex.getMessage()));
    }

    @ExceptionHandler(InvalidPageSizeException.class)
    public ResponseEntity<ErrorResponse> handleInvalidPageSizeException(InvalidPageSizeException ex) {
        return ResponseEntity.badRequest().body(new ErrorResponse("Invalid page size", ex.getMessage()));
    }

    @ExceptionHandler(DoctorNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleDoctorNotFoundException(DoctorNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Doctor not found", ex.getMessage()));
    }

    @ExceptionHandler(PatientNotFoundException.class)
    public ResponseEntity<ErrorResponse> handlePatientNotFoundException(PatientNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Patient not found", ex.getMessage()));
    }

    @ExceptionHandler(AppointmentAlreadyBookedException.class)
    public ResponseEntity<ErrorResponse> handleAppointmentAlreadyBookedException(AppointmentAlreadyBookedException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Appointment already booked", ex.getMessage()));
    }

    @ExceptionHandler(AppointmentConflictException.class)
    public ResponseEntity<ErrorResponse> handleAppointmentConflictException(AppointmentConflictException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Appointment conflict with other appointments", ex.getMessage()));
    }

    @ExceptionHandler(AppointmentDateException.class)
    public ResponseEntity<ErrorResponse> handleAppointmentDateException(AppointmentDateException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Invalid date", ex.getMessage()));
    }

    @ExceptionHandler(AppointmentTimeException.class)
    public ResponseEntity<ErrorResponse> handleAppointmentTimeException(AppointmentTimeException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Invalid time", ex.getMessage()));
    }

    @ExceptionHandler(DoctorNotActiveException.class)
    public ResponseEntity<ErrorResponse> handleDoctorNotActiveException(DoctorNotActiveException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Doctor not active", ex.getMessage()));
    }

    @ExceptionHandler(PatientNotActiveException.class)
    public ResponseEntity<ErrorResponse> handlePatientNotActiveException(PatientNotActiveException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Patient not active", ex.getMessage()));
    }

    @ExceptionHandler(AppointmentTimeConflictException.class)
    public ResponseEntity<ErrorResponse> handleAppointmentTimeConflictException(AppointmentTimeConflictException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Appointment time conflict", ex.getMessage()));
    }

    @ExceptionHandler(PatientAlreadyHasAppointmentException.class)
    public ResponseEntity<ErrorResponse> handlePatientAlreadyHasAppointmentException(PatientAlreadyHasAppointmentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Patient already has an appointment", ex.getMessage()));
    }

    @ExceptionHandler(AppointmentTimeRestrictionException.class)
    public ResponseEntity<ErrorResponse> handleAppointmentTimeRestrictionException(AppointmentTimeRestrictionException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Appointment time restriction", ex.getMessage()));
    }
}