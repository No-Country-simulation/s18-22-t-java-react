package policonsultorio.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import policonsultorio.demo.dto.request.WaitingQueueDTO;
import policonsultorio.demo.dto.response.WaitingQueueResponse;
import policonsultorio.demo.entity.WaitingQueue;
import policonsultorio.demo.service.IWaitingQueue;

@RestController
@RequestMapping("/waiting-list")
public class WaitingQueueController {
    @Autowired
    private IWaitingQueue waitingQueue;

    @PostMapping("/create")
    public WaitingQueue addQueue(@RequestBody WaitingQueueDTO waitingQueueDTO) {
        return waitingQueue.addToQueue(waitingQueueDTO);
    }

    @GetMapping("/getList/{id}")
    public WaitingQueueResponse getQueue(@PathVariable Long id) {
        return waitingQueue.getQueueByPatient(id);
    }
}
