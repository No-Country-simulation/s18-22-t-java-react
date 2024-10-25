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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import policonsultorio.demo.dto.request.PatientRequestDTO;
import policonsultorio.demo.dto.request.UpdatePatientDTO;
import policonsultorio.demo.dto.response.PatientResponseDTO;
import policonsultorio.demo.service.IPatientService;

@RestController
@RequestMapping("/patients")
@Tag(name = "Patient")
public class PatientController {

    @Autowired
    private IPatientService patientService;

    @PostMapping("/create")
    @Operation(
            summary = "Created a patient",
            description = "Create or register a patient",
            tags = {"Patient"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Patient created successfully",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = PatientResponseDTO.class),
            examples = @ExampleObject(name = "patient",
                    value = "{\"id\": 1, \"name\": \"John Doe\", \"password\": \"pass123\", \"email\": \"john@gmail.com\", \"phone\": \"123456789\", \"img\": \"a_image\", \"active\": \"true\", \"insurer\": \"SURA\"}")))
    })
    public ResponseEntity<PatientResponseDTO> createPatient(@RequestBody @Valid PatientRequestDTO patientRequestDTO){
        PatientResponseDTO patientSaved = patientService.save(patientRequestDTO);
        return new ResponseEntity<>(patientSaved, HttpStatus.CREATED);
    }

    @GetMapping("/search/{id}")
    @Operation(
            summary = "Search a patient",
            description = "Search for a specific patient using a given ID",
            tags = {"Patient"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Patient found",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = PatientResponseDTO.class),
            examples = @ExampleObject(name = "patient",
                    value = "{\"id\": 1, \"name\": \"John Doe\", \"password\": \"pass123\", \"email\": \"john@gmail.com\", \"phone\": \"123456789\", \"img\": \"a_image\", \"active\": \"true\", \"insurer\": \"SURA\"}")))
    })
    public ResponseEntity<PatientResponseDTO> searchPatient(@PathVariable Long id){
        return new ResponseEntity<>(patientService.getPatientById(id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @Operation(
            summary = "Delete a patient",
            description = "Delete a patient by a given ID. This elimination is logical (inactivates the patient)",
            tags = {"Patient"}
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Patient removed successfully"),
            @ApiResponse(responseCode = "404", description = "Patient not found with that ID")
    })
    public void deletePatient(@PathVariable Long id){
        patientService.deletePatientById(id);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<PatientResponseDTO> updatePatient(@PathVariable Long id, @RequestBody @Valid UpdatePatientDTO updatePatientDTO){
        PatientResponseDTO patientResponseDTO = patientService.update(id, updatePatientDTO);
        return new ResponseEntity<>(patientResponseDTO, HttpStatus.OK);
    }
}
