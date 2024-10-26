package policonsultorio.demo.service;

import policonsultorio.demo.dto.request.WaitingQueueDTO;
import policonsultorio.demo.entity.Doctor;
import policonsultorio.demo.entity.Patient;
import policonsultorio.demo.entity.WaitingQueue;

import java.time.LocalDate;

public interface IWaitingQueue {
    WaitingQueue addToQueue(WaitingQueueDTO queue);
}
