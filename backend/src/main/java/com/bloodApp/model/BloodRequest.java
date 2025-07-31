package com.bloodApp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "blood_requests")
public class BloodRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "requester_id")
    private User requester;  

    private String bloodGroup;
    private String hospital;
    private String contact;
    private String urgency;
    private String status = "pending";
    private LocalDate date = LocalDate.now();
    private Long donorId;
    private String requesterEmail;

    
    public String getRequesterEmail() {
		return requesterEmail;
	}

	public void setRequesterEmail(String requesterEmail) {
		this.requesterEmail = requesterEmail;
	}

	public BloodRequest() {}

    public BloodRequest(User requester, String bloodGroup, String hospital, 
                       String contact, String urgency) {
        this.requester = requester;
        this.bloodGroup = bloodGroup;
        this.hospital = hospital;
        this.contact = contact;
        this.urgency = urgency;
      
    }

  

	public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getRequester() { return requester; }
    public void setRequester(User requester) { this.requester = requester; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getHospital() { return hospital; }
    public void setHospital(String hospital) { this.hospital = hospital; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public Long getDonorId() { return donorId; }
    public void setDonorId(Long donorId) { this.donorId = donorId; }
}