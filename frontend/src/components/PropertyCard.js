function PropertyCard({ property, onDelete, onUpdate }) {
    return (
        <div className="property-card">
            <p>Type: {property.propertyType}</p>
            <p>Address: {property.propertyAddress}</p>
            <p>Value: {property.propertyValue}</p>
            <button onClick={() => onUpdate(property)}>Update</button>
            <button onClick={() => onDelete(property.id)}>Delete</button>
        </div>
    );
}

export default PropertyCard;