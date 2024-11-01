import React, { useState } from 'react';

function AddPropertyForm({ onAddProperty, personId }) {
    const [propertyType, setPropertyType] = useState(''); 
    const [propertyAddress, setPropertyAddress] = useState('');
    const [propertyValue, setPropertyValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProperty = {
            person: { id: personId }, 
            propertyType: propertyType,
            propertyAddress: propertyAddress,
            propertyValue: parseFloat(propertyValue)
        };
        onAddProperty(newProperty);
        // Clear form fields after submission
        setPropertyType('');
        setPropertyAddress('');
        setPropertyValue('');
    };

    return (
        <form className="add-property-form" onSubmit={handleSubmit}>
            <h1>Add a new property</h1>
            <input type="text" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} placeholder="Property Type" required />
            <input type="text" value={propertyAddress} onChange={(e) => setPropertyAddress(e.target.value)} placeholder="Property Name" required />
            <input type="number" value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)} placeholder="Property Value" required />
            <button type="submit">Add Property</button>
        </form>
    );
}

export default AddPropertyForm;