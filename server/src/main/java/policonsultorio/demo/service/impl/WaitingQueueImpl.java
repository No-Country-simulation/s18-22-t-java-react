package policonsultorio.demo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import policonsultorio.demo.dto.request.WaitingQueueDTO;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.entity.Patient;
import policonsultorio.demo.entity.WaitingQueue;
import policonsultorio.demo.enums.QueueStatus;
import policonsultorio.demo.repository.DoctorRepository;
import policonsultorio.demo.repository.PatientRepository;
import policonsultorio.demo.repository.WaitingQueueRepository;
import policonsultorio.demo.service.IWaitingQueue;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class WaitingQueueImpl implements IWaitingQueue {

    @Autowired
    private WaitingQueueRepository waitingQueueRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public WaitingQueue addToQueue(WaitingQueueDTO waitingQueueDTO) {
        WaitingQueue waitingQueue = new WaitingQueue();

        Patient patient = patientRepository.findByUserId(waitingQueueDTO.id_patient());
        Optional<Doctor> doctor = doctorRepository.findById(waitingQueueDTO.id_doctor());
        waitingQueue.setPatient(patient);
        waitingQueue.setDoctor(doctor.get());
        waitingQueue.setRequestedDate(waitingQueueDTO.requested_date());
        waitingQueue.setCreatedAt(LocalDateTime.now());
        waitingQueue.setStatus(QueueStatus.WAITING);

        return waitingQueueRepository.save(waitingQueue);
    }
}
