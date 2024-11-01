import React, { useState } from 'react';

function FilterForm({ onFilterPeople }) {
    const [age, setAge] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterPeople(age);
        setAge('');
    };

    return (
        <form className="filter-form" onSubmit={handleSubmit}>
            <h1>Filter by age</h1>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
            <button type="submit">Filter persons</button>
        </form>
    );
}

export default FilterForm;
