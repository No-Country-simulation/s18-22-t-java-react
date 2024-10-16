package policonsultorio.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import policonsultorio.demo.dto.request.PatientRequestDTO;
import policonsultorio.demo.dto.response.PatientResponseDTO;
import policonsultorio.demo.service.IPatientService;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private IPatientService patientService;

    @PostMapping("/create")
    public ResponseEntity<PatientResponseDTO> createPatient(@RequestBody PatientRequestDTO patientRequestDTO){
        PatientResponseDTO patientSaved = patientService.save(patientRequestDTO);
        return new ResponseEntity<>(patientSaved, HttpStatus.CREATED);
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<PatientResponseDTO> searchPatient(@PathVariable Long id){
        return new ResponseEntity<>(patientService.getPatientById(id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePatient(@PathVariable Long id){
        patientService.deletePatientById(id);
    }
}
