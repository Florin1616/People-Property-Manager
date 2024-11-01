import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import AddPropertyForm from '../components/NewPropertyForm';
import UpdateForm from '../components/UpdatePropertyForm';
import { PropertiesContext } from '../components/PropertiesContext';

function Modal({ children, onClose }) {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                position: 'relative',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                width: '55%', 
                height: '55%',
            }}>
                {children}
                <button className='closeButtonUpdateForm' style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={onClose}>X</button>
            </div>
        </div>
    );
}


function Details() {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [propertyToUpdate, setpropertyToUpdate] = useState(null);

    const openUpdateForm = (property) => {
        setpropertyToUpdate(property);
        setShowUpdateForm(true);
    };

    const closeUpdateForm = () => {
        setShowUpdateForm(false);
    };

    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const { properties, setProperties } = useContext(PropertiesContext);
    const [newProperty, setNewProperty] = useState(''); 


    const token = localStorage.getItem('token'); // Get the token from local storage
    console.log('Token from local storage:', token); // Debugging line to log the token

    const handleUpdate = (propertyToUpdate, propertyId) => {
        console.log(propertyId);

        const updatedPeople = properties.map(property => {
            if (property.id === propertyToUpdate.id) {
                return {
                    ...property,
                    name: propertyToUpdate.newPropertyType !== undefined ? propertyToUpdate.newPropertyType : property.name,
                    propertyAddress: propertyToUpdate.newPropertyAddress !== undefined ? propertyToUpdate.newPropertyAddress : property.age,
                    propertyValue: propertyToUpdate.newPropertyValue !== undefined ? propertyToUpdate.newPropertyValue : property.occupation,

                };
            }
            return person;
        });




        fetch(`http://localhost:8080/properties/${propertyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Add the token in the header

            },
            body: JSON.stringify(propertyToUpdate),
        })
            .then(response => {
                if (!response.ok) { throw response }
                return response.json() 
            })
            .then(() => {
                fetchProperties();
                closeUpdateForm();
            })
            .catch(err => {
                console.error('Error:', err);
            });


    };

    const handleDelete = (propertyId) => {
        fetch(`http://localhost:8080/properties/${propertyId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Add the token in the header
            },
        })
            .then(response => {
                if (!response.ok) { throw response }
                return response.json()  
            })
            .then(() => {
                fetchProperties();
            })
            .catch(err => {
                console.error('Error:', err);
            });
    };

   

    useEffect(() => {
        fetch(`http://localhost:8080/entities/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Add the token in the header
            },
        })
            .then(response => response.json())
            .then(data => setPerson(data))
            .catch(error => console.error('Error:', error));
    }, [id]);

    const fetchProperties = () => {
        fetch(`http://localhost:8080/properties/person/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Add the token in the header
            },
        })
            .then(response => response.json())
            .then(data => {
                setProperties(data);
                console.log("MUIE");
            })
            .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        fetchProperties();
    }, [id, token]);

    const addProperty = (newProperty) => {
        fetch('http://localhost:8080/properties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Add the token in the header

            },
            body: JSON.stringify(newProperty),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setProperties(prevProperties => [...prevProperties, data]);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    if (!person) {
        return <div>Loading...</div>;
    }

    return (
        <div className="details-container">
            <div className="person-list-details">
                <ul>
                    <h3>{person.name}</h3>
                    <img className="image" src={person.photo} />
                    <p>Age: {person.age}</p>
                    <p>Occupation: {person.occupation}</p>
                    <p>Address: {person.address}</p>
                </ul>

            </div>
            <h2>Properties of {person.name}: </h2>
            {Array.isArray(properties) && properties.map(property => (
                <PropertyCard
                    key={property.id}
                    property={property}
                    onDelete={handleDelete}
                    onUpdate={openUpdateForm}
                />
            ))}
            <AddPropertyForm onAddProperty={addProperty} personId={id} />

            {showUpdateForm && (
                <Modal onClose={closeUpdateForm}>
                    <UpdateForm propertyToUpdate={propertyToUpdate} onUpdateProperty={handleUpdate} onClose={closeUpdateForm} personId={id}/>
                </Modal>
            )}
        </div>

    );
}

export default Details;