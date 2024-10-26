package policonsultorio.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import policonsultorio.demo.dto.request.DoctorRequest;
import policonsultorio.demo.dto.response.DoctorResponse;
import policonsultorio.demo.service.Doctor.DoctorServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/doctor/")
@CrossOrigin("*")
@Tag(name = "Doctor")
public class DoctorController {
	 @Autowired
	 private DoctorServiceImpl doctorService;




	// CREATE - POST Method to create a new doctor
	@PostMapping("create")
	@Operation(
			summary = "Create a doctor",
			description = "Create a new doctor",
			tags = {"Doctor"}
	)
	@ApiResponses(value = {
			@ApiResponse(responseCode = "201", description = "Doctor created successfully",
			content = @Content(mediaType = "application/json", schema = @Schema(implementation = DoctorResponse.class),
			examples = @ExampleObject(name = "doctor",
					value = "{\"id\": 1, \"name\": \"John Doe\", \"password\": \"pass123\", \"email\": \"john@gmail.com\", \"phone\": \"123456789\", \"img\": \"a_image\", \"active\": \"true\", \"specialization\": \"Cardiología\", \"licenseNumber\": \"654321\"}")))
	})
	public ResponseEntity<DoctorResponse> createDoctor(@RequestBody @Valid DoctorRequest doctorRequest) {
		try {
			DoctorResponse doctorResponse = doctorService.create(doctorRequest);
			return new ResponseEntity<>(doctorResponse, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	// GET BY ID - GET Method to retrieve a doctor by ID
	@GetMapping("getById/{id}")
	@Operation(
			summary = "Search a doctor",
			description = "Search for a specific doctor using a given ID",
			tags = {"Doctor"}
	)
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Doctor found",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = DoctorResponse.class),
			examples = @ExampleObject(name = "doctor",
					value = "{\"id\": 1, \"name\": \"John Doe\", \"password\": \"pass123\", \"email\": \"john@gmail.com\", \"phone\": \"123456789\", \"img\": \"a_image\", \"active\": \"true\", \"specialization\": \"Cardiología\", \"licenseNumber\": \"654321\"}"))),
            @ApiResponse(responseCode = "404", description = "Doctor not found with that ID")
	})
	public ResponseEntity<DoctorResponse> getDoctorById(@PathVariable Integer id) {
		try {
			DoctorResponse doctorResponse = doctorService.getById(id);
			return new ResponseEntity<>(doctorResponse, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

	// UPDATE - PUT Method to update an existing doctor
	@PutMapping("update/{id}")
	@Operation(
			summary = "Update a doctor",
			description = "Update information about a doctor",
			tags = {"Doctor"}
	)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Updated doctor",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = DoctorResponse.class),
            examples = @ExampleObject(name = "doctor",
                    value = "{\"id\": 1, \"name\": \"John Doe\", \"password\": \"pass123\", \"email\": \"john@gmail.com\", \"phone\": \"123456789\", \"img\": \"a_image\", \"active\": \"true\", \"specialization\": \"Cardiología\", \"licenseNumber\": \"654321\"}"))),
            @ApiResponse(responseCode = "404", description = "Doctor not found with that ID")
    })
	public ResponseEntity<DoctorResponse> updateDoctor(
			@PathVariable Integer id, @RequestBody @Valid DoctorRequest doctorRequest) {
		try {
			DoctorResponse doctorResponse = doctorService.update(id, doctorRequest);
			return new ResponseEntity<>(doctorResponse, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

	// FIND ALL - GET Method to get all doctors
	@GetMapping("allDoctors")
	@Operation(
			summary = "List all doctors",
			description = "List all registered doctors",
			tags = {"Doctor"}
	)
	public ResponseEntity<List<DoctorResponse>> getAllDoctors() {
		try {
			List<DoctorResponse> doctors = doctorService.getAll();
			return new ResponseEntity<>(doctors, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}




	@GetMapping("allDoctors-page")
	@Operation(
			summary = "List all doctors",
			description = "List all registered doctors",
			tags = {"Doctor"}
	)
	public ResponseEntity<Page<DoctorResponse>> getAllDoctorsPage(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(required = false) String name) {
		try {
			Pageable pageable = PageRequest.of(page, size);
			Page<DoctorResponse> doctors = doctorService.getAllPage(pageable, name);
			return new ResponseEntity<>(doctors, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("delete/{id}")
	@Operation(
			summary = "deleted doctor",
			description = "deleting a doctor",
			tags = {"Doctor"}
	)
	public ResponseEntity<Void> deleteDoctor(@PathVariable Integer id) {
		try {
			doctorService.softDeleteDoctor(id);
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

}
