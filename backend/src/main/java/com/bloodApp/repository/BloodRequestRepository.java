package com.bloodApp.repository;

import com.bloodApp.model.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {
    List<BloodRequest> findByRequesterEmail(String email);
    List<BloodRequest> findByDonorIdAndStatus(Long donorId, String status);
    List<BloodRequest> findByStatus(String status);
}
