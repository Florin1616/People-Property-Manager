//package com.example.backend.Tests;
//
//import com.example.backend.Model.Person;
//import com.example.backend.Service.PersonService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//public class ServiceTests {
//
//    private PersonService personService;
//
//    @BeforeEach
//    public void setUp() {
//        personService = new PersonService();
//    }
//
//    @Test
//    public void testGetAllPersons() {
//        List<Person> persons = personService.getAllPersons();
//        assertEquals(6, persons.size());
//    }
//
//    @Test
//    public void testGetPerson() {
//        Person person = personService.getPerson(1);
//        assertNotNull(person);
//        assertEquals(1, person.getId());
//    }
//
//    @Test
//    public void testAddPerson() {
//        Person newPerson = new Person("New Person", 22, "New Occupation", "New Address", "new_photo.jpg");
//        personService.addPerson(newPerson);
//        assertEquals(7, personService.getAllPersons().size());
//        assertEquals(newPerson, personService.getPerson(7));
//    }
//
//    @Test
//    public void testUpdatePerson() {
//        Person updatedPerson = new Person(1, "Updated Person", 22, "Updated Occupation", "Updated Address", "updated_photo.jpg");
//        personService.updatePerson(1, updatedPerson);
//        assertEquals(updatedPerson, personService.getPerson(1));
//    }
//
//    @Test
//    public void testDeletePerson() {
//        personService.deletePerson(1);
//        assertEquals(5, personService.getAllPersons().size());
//        assertNull(personService.getPerson(1));
//    }
//}
