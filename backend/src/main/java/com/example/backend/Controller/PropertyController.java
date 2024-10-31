package com.example.backend.Controller;

import com.example.backend.Model.Property;
import com.example.backend.Service.PropertyService;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/properties")
@CrossOrigin(origins = "http://localhost:3000")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;
    @Autowired
    private UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(PropertyController.class);


    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }
    @CrossOrigin(origins = "http://localhost:3000")

    @GetMapping("/{id}")
    public ResponseEntity<Property> getProperty(@PathVariable int id) {
        return propertyService.getProperty(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public Property createProperty(@RequestBody Property newProperty) {
        return propertyService.addProperty(newProperty);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable int id, @RequestBody Property updatedProperty) {
        try {
            return propertyService.getProperty(id)
                    .map(property -> {
                        property.setPerson(updatedProperty.getPerson());
                        property.setPropertyType(updatedProperty.getPropertyType());
                        property.setPropertyAddress(updatedProperty.getPropertyAddress());
                        property.setPropertyValue(updatedProperty.getPropertyValue());
                        return ResponseEntity.ok(propertyService.updateProperty(property));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            // Log the exception
            System.out.println("Error updating property: " + e.getMessage());
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @CrossOrigin(origins = "http://localhost:3000")

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable int id) {
        propertyService.getProperty(id)
                .ifPresent(property -> propertyService.deleteProperty(id));
        return ResponseEntity.noContent().build();
    }
    @CrossOrigin(origins = "http://localhost:3000")


    @GetMapping("/person/{personId}")
    public List<Property> getPropertiesByPerson(@PathVariable int personId, @RequestHeader("Authorization") String token) {
        String username = userService.getUsernameFromToken(token.substring(7));
        logger.info("Username from token: {}", username);
        logger.info("Person ID: {}", personId);
        if (username.equals(String.valueOf(personId))) {
            return propertyService.getPropertiesByPerson(personId);
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access is denied");
        }
    }
}