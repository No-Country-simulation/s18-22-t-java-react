package policonsultorio.demo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import policonsultorio.demo.dto.clinic.ResponseClinic;
import policonsultorio.demo.dto.clinic.ResponseClinicUpdate;
import policonsultorio.demo.service.ClinicService;

import java.util.Map;

@RestController
@RequestMapping("/clinic")
@CrossOrigin("*")
public class ClinicController {

    @Autowired
    private ClinicService clinicService;

    @PostMapping(produces = "application/json")
    public ResponseEntity<?> createClinic(@RequestBody @Valid ResponseClinic responseClinic) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(clinicService.register(responseClinic));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));

        }
    }

    @PutMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<?> updateClinic(@PathVariable Long id, @RequestBody @Valid ResponseClinicUpdate responseClinic) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(clinicService.update(id, responseClinic));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));

        }
    }

    @PatchMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<?> deleteLogic(@PathVariable Long id) {
        try {
            clinicService.deleteLogicClinic(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }



    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<?> clincById(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(clinicService.getClinicById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }


    @PatchMapping(value = "/avilable/{id}", produces = "application/json")
    public ResponseEntity<?> avilableLogic(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(clinicService.avilableClinic(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }


    @GetMapping(value = "/all", produces = "application/json")
    public ResponseEntity<?> allClinic() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(clinicService.getAllClinics());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
        }
    }
}
