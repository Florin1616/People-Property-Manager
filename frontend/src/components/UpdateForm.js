import React, { useState } from 'react';

function UpdateForm({ personToUpdate, onUpdatePerson }) {
    const [newName, setNewName] = useState(personToUpdate.name);
    const [newAge, setNewAge] = useState(personToUpdate.age);
    const [newOccupation, setNewOccupation] = useState(personToUpdate.occupation);
    const [newAddress, setNewAddress] = useState(personToUpdate.address);
    const [newPhoto, setNewPhoto] = useState(personToUpdate.photo);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedFields = {
            id: personToUpdate.id,
            name: newName,
            age: newAge,
            occupation: newOccupation,
            address: newAddress,
            photo: newPhoto
        };

        onUpdatePerson(updatedFields);

        setNewName('');
        setNewAge('');
        setNewOccupation('');
        setNewAddress('');
        setNewPhoto('');
    };

    return (
        <form className="update-form" onSubmit={handleSubmit}>
            <h1>Update a person</h1>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New Name" />
            <input type="number" value={newAge} onChange={(e) => setNewAge(e.target.value)} placeholder="New Age" />
            <input type="text" value={newOccupation} onChange={(e) => setNewOccupation(e.target.value)} placeholder="New Occupation" />
            <input type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} placeholder="New Address" />
            <input type="text" value={newPhoto} onChange={(e) => setNewPhoto(e.target.value)} placeholder="New Photo" />

            <button type="submit">Update Person</button>
        </form>
    );
}

export default UpdateForm;