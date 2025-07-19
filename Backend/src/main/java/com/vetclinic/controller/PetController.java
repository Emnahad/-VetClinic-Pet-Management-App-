package com.vetclinic.controller;

import com.vetclinic.model.Pet;
import com.vetclinic.repository.PetRepository;
import com.vetclinic.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@RestController
@RequestMapping("/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;

    @PostMapping
    public ResponseEntity<?> addPet(@RequestBody Pet pet, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(petService.addPet(pet, userDetails.getUsername()));
    }

    @GetMapping
    public ResponseEntity<List<Pet>> getAllPets(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(petService.getAllPets(userDetails.getUsername()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPet(@PathVariable String id, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(petService.getPetById(id, userDetails.getUsername()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable String id, @RequestBody Pet pet, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(petService.updatePet(id, pet, userDetails.getUsername()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePet(@PathVariable String id, @AuthenticationPrincipal UserDetails userDetails) {
        petService.deletePet(id, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }
}
