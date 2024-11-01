import React, { useState } from 'react';

function DeleteForm({ onDeletePerson }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const personToDelete = {
            name,
            age: parseInt(age)
        };
        onDeletePerson(personToDelete);

        setName('');
        setAge('');
    };

    return (
        <form className="delete-form" onSubmit={handleSubmit}>
            <h1>Delete a person</h1>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
            <button type="submit">Delete Person</button>
        </form>
    );
}

export default DeleteForm;
