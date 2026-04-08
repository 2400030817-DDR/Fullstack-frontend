package com.example.donationbackend.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.example.donationbackend.entity.Donation;
import com.example.donationbackend.repository.DonationRepository;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin("*")
public class DonationController {

    private final DonationRepository donationRepository;

    public DonationController(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    @PostMapping
    public Donation saveDonation(@RequestBody Donation donation) {
        return donationRepository.save(donation);
    }

    @GetMapping
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }
}