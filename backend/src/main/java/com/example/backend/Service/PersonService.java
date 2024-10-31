package com.example.backend.Service;

import com.example.backend.Model.Person;
import com.example.backend.Repo.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import net.datafaker.Faker;

@Service
public class PersonService {
    private final PersonRepository personRepository;
//    private final SimpMessagingTemplate messagingTemplate;
    private final Faker faker = new Faker();
//    public PersonService(PersonRepository personRepository, SimpMessagingTemplate messagingTemplate) {

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
//        this.messagingTemplate = messagingTemplate;
    }

    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    public Optional<Person> getPerson(int id) {
        return personRepository.findById(id);
    }

    public Person addPerson(Person person) {
        Person savedPerson = personRepository.save(person);
//        messagingTemplate.convertAndSend("/topic/newPerson", savedPerson);
        return savedPerson;
    }

    public void deletePerson(int id) {
        personRepository.deleteById(id);
    }

//    public void generatePersons(int number) {
//        for (int i = 0; i < number; i++) {
//            String name = faker.name().fullName();
//            int age = faker.number().numberBetween(18, 60);
//            String occupation = faker.company().profession();
//            String address = faker.address().fullAddress();
//            String photo = faker.avatar().image();
//            Person person = new Person(name, age, occupation, address, photo);
//            addPerson(person);
//        }
//    }

//    @Scheduled(fixedRate = 8000)
//    public void generateAndSendPerson() {
//        Person person = generatePerson();
//        addPerson(person);
//    }

//    private Person generatePerson() {
//        String name = faker.name().fullName();
//        int age = faker.number().numberBetween(18, 60);
//        String occupation = faker.company().profession();
//        String address = faker.address().fullAddress();
//        String photo = faker.avatar().image();
//        return new Person(name, age, occupation, address, photo);
//    }
}