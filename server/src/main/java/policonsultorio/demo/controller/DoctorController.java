package policonsultorio.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import policonsultorio.demo.dto.request.DoctorRequest;
import policonsultorio.demo.dto.response.DoctorResponse;
import policonsultorio.demo.service.Doctor.DoctorServiceImpl;

import java.util.List;

@RestController
@RequestMapping("api/v1/doctor")
@CrossOrigin("*")
public class DoctorController {
 @Autowired
 private DoctorServiceImpl doctorService;




	// CREATE - POST Method to create a new doctor
	@PostMapping("create")
	public ResponseEntity<DoctorResponse> createDoctor(@RequestBody DoctorRequest doctorRequest) {
		try {
			DoctorResponse doctorResponse = doctorService.create(doctorRequest);
			return new ResponseEntity<>(doctorResponse, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	// GET BY ID - GET Method to retrieve a doctor by ID
	@GetMapping("getById/{id}")
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
	public ResponseEntity<DoctorResponse> updateDoctor(
			@PathVariable Integer id, @RequestBody DoctorRequest doctorRequest) {
		try {
			DoctorResponse doctorResponse = doctorService.update(id, doctorRequest);
			return new ResponseEntity<>(doctorResponse, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

	// FIND ALL - GET Method to get all doctors
	@GetMapping("allDoctors")
	public ResponseEntity<List<DoctorResponse>> getAllDoctors() {
		try {
			List<DoctorResponse> doctors = doctorService.getAll();
			return new ResponseEntity<>(doctors, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}




}
