package policonsultorio.demo.service;

import policonsultorio.demo.dto.request.WaitingQueueDTO;
import policonsultorio.demo.dto.response.WaitingQueueResponse;
import policonsultorio.demo.entity.AppointmentEntity;
import policonsultorio.demo.entity.WaitingQueue;


public interface IWaitingQueue {
    WaitingQueue addToQueue(WaitingQueueDTO queue);
    WaitingQueue getWaitingQueue(AppointmentEntity appointment);
    WaitingQueueResponse getQueueByPatient(Long id);
}
