package com.vetclinic.service;

import com.vetclinic.model.Pet;
import com.vetclinic.model.User;
import com.vetclinic.repository.PetRepository;
import com.vetclinic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PetService {

    private final PetRepository petRepository;
    private final UserRepository userRepository;

    public Pet addPet(Pet pet, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        pet.setUserId(user.getId());
        pet.setCreatedAt(new Date());
        return petRepository.save(pet);
    }

    public List<Pet> getAllPets(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return petRepository.findAll().stream()
                .filter(p -> p.getUserId().equals(user.getId()))
                .toList();
    }

    public Pet getPetById(String id, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Pet pet = petRepository.findById(id).orElseThrow();
        if (!pet.getUserId().equals(user.getId())) {
            throw new SecurityException("Not authorized");
        }
        return pet;
    }

    public Pet updatePet(String id, Pet newPet, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Pet existingPet = petRepository.findById(id).orElseThrow();
        if (!existingPet.getUserId().equals(user.getId())) {
            throw new SecurityException("Not authorized");
        }

        existingPet.setName(newPet.getName());
        existingPet.setSpecies(newPet.getSpecies());
        existingPet.setBreed(newPet.getBreed());
        existingPet.setAge(newPet.getAge());
        existingPet.setStatus(newPet.getStatus());

        return petRepository.save(existingPet);
    }

    public void deletePet(String id, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Pet pet = petRepository.findById(id).orElseThrow();
        if (!pet.getUserId().equals(user.getId())) {
            throw new SecurityException("Not authorized");
        }
        petRepository.deleteById(id);
    }
}
