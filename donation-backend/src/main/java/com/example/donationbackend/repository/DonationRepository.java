package com.example.donationbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.donationbackend.entity.Donation;

public interface DonationRepository extends JpaRepository<Donation, Long> {
}