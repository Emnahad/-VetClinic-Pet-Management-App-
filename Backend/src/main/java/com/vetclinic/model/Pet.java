package com.vetclinic.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document(collection = "pets")
public class Pet {
    @Id
    private String id;
    private String name;
    private String species;
    private String breed;
    private int age;
    private String status;
    private String userId;
    private Date createdAt;
}
