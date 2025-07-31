package com.bloodApp.controller;

import com.bloodApp.model.BloodRequest;
import com.bloodApp.service.ReceiverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/receiver")
@CrossOrigin(origins = "http://localhost:3000")
public class ReceiverController {

    @Autowired
    private ReceiverService receiverService;

    @PostMapping("/requests")
    public BloodRequest createRequest(@RequestBody BloodRequest request,
                                      @RequestHeader("Authorization") String token) {
        return receiverService.createRequest(request, token);
    }

    @GetMapping("/requests/{email}")
    public List<BloodRequest> getMyRequests(@PathVariable String email) {
        return receiverService.getRequestsByEmail(email);
    }

    @PutMapping("/requests/{id}")
    public BloodRequest updateRequest(@PathVariable Long id, @RequestBody BloodRequest updatedRequest) {
        return receiverService.updateRequest(id, updatedRequest);
    }

    @DeleteMapping("/requests/{id}")
    public void deleteRequest(@PathVariable Long id) {
        receiverService.deleteRequest(id);
    }

    @GetMapping("/donors")
    public List<String> findDonorsByBloodGroup(@RequestParam String bloodGroup) {
        return receiverService.getDonorsByBloodGroup(bloodGroup);
    }
}
