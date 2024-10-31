package com.example.backend.Service;

import com.example.backend.Model.Person;
import com.example.backend.Model.Property;
import com.example.backend.Repo.PersonRepository;
import com.example.backend.Repo.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Optional<Property> getProperty(int id) {
        return propertyRepository.findById(id);
    }

    public Property addProperty(Property property) {
        return propertyRepository.save(property);
    }

    public void deleteProperty(int id) {
        propertyRepository.deleteById(id);
    }

    public List<Property> getPropertiesByPerson(int personId) {
        return propertyRepository.findByPersonId(personId);
    }

    public Property updateProperty(Property updatedProperty) {
        Person person = updatedProperty.getPerson();
        if (person != null) {
            Optional<Person> existingPerson = personRepository.findById(person.getId());
            if (!existingPerson.isPresent()) {
                throw new RuntimeException("Person with id " + person.getId() + " does not exist");
            }
        }
        return propertyRepository.save(updatedProperty);
    }
}