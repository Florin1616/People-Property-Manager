//package com.example.backend.Model;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import static org.junit.jupiter.api.Assertions.*;
//
//public class PersonTests {
//    private Person person;
//
//    @BeforeEach
//    public void setUp() {
//        person = new Person();
//    }
//
//    @Test
//    public void testId() {
//        person.setId(1);
//        assertEquals(1, person.getId());
//    }
//
//    @Test
//    public void testName() {
//        person.setName("John Doe");
//        assertEquals("John Doe", person.getName());
//    }
//
//    @Test
//    public void testAge() {
//        person.setAge(30);
//        assertEquals(30, person.getAge());
//    }
//
//    @Test
//    public void testOccupation() {
//        person.setOccupation("Engineer");
//        assertEquals("Engineer", person.getOccupation());
//    }
//
//    @Test
//    public void testAddress() {
//        person.setAddress("123 Street");
//        assertEquals("123 Street", person.getAddress());
//    }
//
//    @Test
//    public void testPhoto() {
//        person.setPhoto("photo.jpg");
//        assertEquals("photo.jpg", person.getPhoto());
//    }
//
//    @Test
//    public void testToString() {
//        person.setId(1);
//        person.setName("John Doe");
//        person.setAge(30);
//        person.setOccupation("Engineer");
//        person.setAddress("123 Street");
//        person.setPhoto("photo.jpg");
//        String expected = "Person{id=1, name='John Doe', age=30, occupation='Engineer', address='123 Street', photo='photo.jpg'}";
//        assertEquals(expected, person.toString());
//    }
//
//    @Test
//    public void testPersonConstructorWithId() {
//        Person person = new Person(1, "Matei", 30, "Engineer", "123 Street", "photo.jpg");
//        assertEquals(1, person.getId());
//        assertEquals("Matei", person.getName());
//        assertEquals(30, person.getAge());
//        assertEquals("Engineer", person.getOccupation());
//        assertEquals("123 Street", person.getAddress());
//        assertEquals("photo.jpg", person.getPhoto());
//    }
//
//    @Test
//    public void testPersonConstructorWithoutId() {
//        Person person = new Person("Mihai", 30, "Engineer", "123 Street", "photo.jpg");
//        assertEquals("Mihai", person.getName());
//        assertEquals(30, person.getAge());
//        assertEquals("Engineer", person.getOccupation());
//        assertEquals("123 Street", person.getAddress());
//        assertEquals("photo.jpg", person.getPhoto());
//    }
//}