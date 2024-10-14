package policonsultorio.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import policonsultorio.demo.dto.ErrorResponse;
import policonsultorio.demo.dto.appointment.AppointmentRequestDto;
import policonsultorio.demo.dto.appointment.AppointmentResponseDto;
import policonsultorio.demo.service.AppointmentService;

@RestController
@RequestMapping("/appointment")
@RequiredArgsConstructor
@Validated
@Tag(name = "Appointment")
public class AppointmentController {

    private final AppointmentService appointmentService;


    @PostMapping("/create")
    @Operation(
            summary = "Create an appointment",
            description = "Create an appointment with the given data",
            tags = {"Appointment"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Appointment created successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = AppointmentResponseDto.class),
                    examples = @ExampleObject(name = "appointment", value = "{\"id\": 1, \"id_doctor\": 1, \"id_patient\": 1, \"date\": \"2025-01-01\", \"startTime\": \"10:00\", \"endTime\": \"11:00\", \"status\": \"PROGRAMADA\"}"))),
            @ApiResponse(responseCode = "400", description = "Invalid input data",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<AppointmentResponseDto> createAppointment(@Valid @RequestBody AppointmentRequestDto appointmentRequestDto) {
        AppointmentResponseDto responseDto = appointmentService.createAppointment(appointmentRequestDto);
        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/cancel/{id}")
    @Operation(
            summary = "Cancel an appointment",
            description = "Cancel an appointment with the given ID",
            tags = {"Appointment"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Appointment cancelled successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = AppointmentResponseDto.class),
                    examples = @ExampleObject(name = "appointment", value = "{\"id\": 1, \"id_doctor\": 1, \"id_patient\": 1, \"date\": \"2025-01-01\", \"startTime\": \"10:00\", \"endTime\": \"11:00\", \"status\": \"CANCELADA\"}"))),
            @ApiResponse(responseCode = "404", description = "Appointment not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<AppointmentResponseDto> cancelAppointment(@PathVariable("id") int id) {
        AppointmentResponseDto responseDto = appointmentService.cancelAppointment(id);
        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/complete/{id}")
    @Operation(
            summary = "Complete an appointment",
            description = "Complete an appointment with the given ID",
            tags = {"Appointment"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Appointment completed successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = AppointmentResponseDto.class),
                    examples = @ExampleObject(name = "appointment", value = "{\"id\": 1, \"id_doctor\": 1, \"id_patient\": 1, \"date\": \"2025-01-01\", \"startTime\": \"10:00\", \"endTime\": \"11:00\", \"status\": \"COMPLETADA\"}"))),
            @ApiResponse(responseCode = "404", description = "Appointment not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<AppointmentResponseDto> completeAppointment(@PathVariable("id") int id) {
        AppointmentResponseDto responseDto = appointmentService.completeAppointment(id);
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/update")
    @Operation(
            summary = "Update an appointment",
            description = "Update an appointment with the given ID and data",
            tags = {"Appointment"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Appointment updated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = AppointmentResponseDto.class),
                    examples = @ExampleObject(name = "appointment", value = "{\"id\": 1, \"id_doctor\": 1, \"id_patient\": 1, \"date\": \"2025-01-01\", \"startTime\": \"10:00\", \"endTime\": \"11:00\", \"status\": \"PROGRAMADA\"}"))),
            @ApiResponse(responseCode = "400", description = "Invalid input data",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "Appointment not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<AppointmentResponseDto> updateAppointment(@RequestParam int id, @Valid @RequestBody AppointmentRequestDto appointmentRequestDto) {
        AppointmentResponseDto responseDto = appointmentService.updateAppointment(id, appointmentRequestDto);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/get_by_id/{id}")
    @Operation(
            summary = "Get an appointment by ID",
            description = "Get an appointment with the given ID",
            tags = {"Appointment"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Appointment found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = AppointmentResponseDto.class),
                    examples = @ExampleObject(name = "appointment", value = "{\"id\": 1, \"id_doctor\": 1, \"id_patient\": 1, \"date\": \"2025-01-01\", \"startTime\": \"10:00\", \"endTime\": \"11:00\", \"status\": \"PROGRAMADA\"}"))),
            @ApiResponse(responseCode = "404", description = "Appointment not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<AppointmentResponseDto> getAppointment(@PathVariable("id") int id) {
        AppointmentResponseDto responseDto = appointmentService.getAppointment(id);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/get_all")
    @Operation(
            summary = "Get all appointments",
            description = "Get all appointments",
            tags = {"Appointment"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Appointments found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = AppointmentResponseDto.class),
                    examples = @ExampleObject(name = "appointment", value = "{\"id\": 1, \"id_doctor\": 1, \"id_patient\": 1, \"date\": \"2025-01-01\", \"startTime\": \"10:00\", \"endTime\": \"11:00\", \"status\": \"PROGRAMADA\"}"))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
            })
    public ResponseEntity<Page<AppointmentResponseDto>> getAllAppointments( @RequestParam(defaultValue = "0") int page,
                                                                            @RequestParam(defaultValue = "10") int size) {
        Page<AppointmentResponseDto> responseDto = appointmentService.getAllAppointments(page, size);
        return ResponseEntity.ok(responseDto);
    }


}
