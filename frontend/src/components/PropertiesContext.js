// PropertiesContext.js
import React, { useState, useEffect } from 'react';

export const PropertiesContext = React.createContext();

export const PropertiesProvider = ({ children}) => {
    const [properties, setProperties] = useState([]);



    return (
        <PropertiesContext.Provider value={{ properties, setProperties }}>
            {children}
        </PropertiesContext.Provider>
    );
};

