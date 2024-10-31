package com.example.backend.Controller;

import com.example.backend.Model.Person;
import com.example.backend.Service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/entities")
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {

    @Autowired
    private PersonService personService;
    @CrossOrigin(origins = "http://localhost:3000")

    @GetMapping
    public List<Person> getAllEntities() {
        return personService.getAllPersons();
    }
    @CrossOrigin(origins = "http://localhost:3000")

    @GetMapping("/{id}")
    public ResponseEntity<Person> getEntity(@PathVariable int id) {
        return personService.getPerson(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public Person createEntity(@RequestBody Person newEntity) {
        return personService.addPerson(newEntity);
    }


    @CrossOrigin(origins = "http://localhost:3000")

    @PutMapping("/{id}")
    public ResponseEntity<Person> updateEntity(@PathVariable int id, @RequestBody Person updatedEntity) {
        return personService.getPerson(id)
                .map(person -> {
                    person.setName(updatedEntity.getName());
                    person.setAge(updatedEntity.getAge());
                    person.setOccupation(updatedEntity.getOccupation());
                    person.setAddress(updatedEntity.getAddress());
                    person.setPhoto(updatedEntity.getPhoto());
                    return ResponseEntity.ok(personService.addPerson(person));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    @CrossOrigin(origins = "http://localhost:3000")

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntity(@PathVariable int id) {
        personService.getPerson(id)
                .ifPresent(person -> personService.deletePerson(id));
        return ResponseEntity.noContent().build();
    }
}