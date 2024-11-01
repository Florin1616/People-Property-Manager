import React, { useState } from 'react';

function UpdateForm({ personId, propertyToUpdate ,onUpdateProperty }) {
    const [newPropertyType, setNewPropertyType] = useState(propertyToUpdate.propertyType); 
    const [newPropertyAddress, setNewPropertyAddress] = useState(propertyToUpdate.propertyAddress);
    const [newPropertyValue, setNewPropertyValue] = useState(propertyToUpdate.propertyValue);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedFields = {
            person: { id: personId }, 
            propertyType: newPropertyType,
            propertyAddress: newPropertyAddress,
            propertyValue: parseFloat(newPropertyValue)
        };

        onUpdateProperty(updatedFields, propertyToUpdate.id);

        setNewPropertyType('');
        setNewPropertyAddress('');
        setNewPropertyValue('');

    };

    return (
        <form className="update-form" onSubmit={handleSubmit}>
            <h1>Update a property</h1>
            <input type="text" value={newPropertyType} onChange={(e) => setNewPropertyType(e.target.value)} placeholder="New Type" />
            <input type="text" value={newPropertyAddress} onChange={(e) => setNewPropertyAddress(e.target.value)} placeholder="New Addres" />
            <input type="number" value={newPropertyValue} onChange={(e) => setNewPropertyValue(e.target.value)} placeholder="New Value" />
            <button type="submit">Update property</button>
        </form>
    );
}

export default UpdateForm;