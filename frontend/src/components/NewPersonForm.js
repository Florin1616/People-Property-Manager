import React, { useState } from 'react';

function AddForm({ onAddPerson }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [occupation, setOccupation] = useState('');
    const [address, setAddress] = useState('');
    const [photo, setPhoto] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            name,
            age: parseInt(age),
            occupation,
            address,
            photo
        };
        onAddPerson(newPerson);
        // Clear form fields after submission
        setName('');
        setAge('');
        setOccupation('');
        setAddress('');
        setPhoto('');
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h1>Add a new person</h1>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
            <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="Occupation" required />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
            <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Photo url" required />
            <button type="submit">Add Person</button>
        </form>
    );
}

export default AddForm;
