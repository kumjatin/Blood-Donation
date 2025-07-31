package com.bloodApp.dto;

import java.time.LocalDate;

public class RequestSummary {
    private Long id;
    private String requesterEmail;
    private String bloodGroup;
    private String hospital;
    private String contact;
    private String urgency;
    private String status;
    private LocalDate date;
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getRequesterEmail() {
		return requesterEmail;
	}
	public void setRequesterEmail(String requesterEmail) {
		this.requesterEmail = requesterEmail;
	}
	public String getBloodGroup() {
		return bloodGroup;
	}
	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
	public String getHospital() {
		return hospital;
	}
	public void setHospital(String hospital) {
		this.hospital = hospital;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getUrgency() {
		return urgency;
	}
	public void setUrgency(String urgency) {
		this.urgency = urgency;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public RequestSummary(Long id, String requesterEmail, String bloodGroup, String hospital, String contact,
			String urgency, String status, LocalDate date) {
		super();
		this.id = id;
		this.requesterEmail = requesterEmail;
		this.bloodGroup = bloodGroup;
		this.hospital = hospital;
		this.contact = contact;
		this.urgency = urgency;
		this.status = status;
		this.date = date;
	}

   
    
}
