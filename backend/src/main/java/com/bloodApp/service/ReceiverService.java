package com.bloodApp.service;

import com.bloodApp.model.BloodRequest;
import com.bloodApp.model.User;
import com.bloodApp.repository.BloodRequestRepository;
import com.bloodApp.repository.UserRepository;
import com.bloodApp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReceiverService {

    @Autowired
    private BloodRequestRepository requestRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtil jwtUtil;

    public BloodRequest createRequest(BloodRequest request, String token) {
        request.setStatus("pending");
        request.setDate(LocalDate.now());

        String email = jwtUtil.extractEmail(token.substring(7)); 
        User requester = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalStateException("Receiver not found"));

        request.setRequester(requester);
        request.setRequesterEmail(requester.getEmail());

        return requestRepo.save(request);
    }

    public List<BloodRequest> getRequestsByEmail(String email) {
        return requestRepo.findByRequesterEmail(email);
    }

    public BloodRequest updateRequest(Long id, BloodRequest updated) {
        BloodRequest existing = requestRepo.findById(id).orElseThrow();
        existing.setHospital(updated.getHospital());
        existing.setContact(updated.getContact());
        existing.setUrgency(updated.getUrgency());
        existing.setStatus(updated.getStatus());
        return requestRepo.save(existing);
    }

    public void deleteRequest(Long id) {
        requestRepo.deleteById(id);
    }

    public List<String> getDonorsByBloodGroup(String bloodGroup) {
        return userRepo.findAll()
                .stream()
                .filter(u -> u.getRole().equals("donor") && u.getBloodGroup().equalsIgnoreCase(bloodGroup))
                .map(User::getEmail)
                .toList();
    }
}
