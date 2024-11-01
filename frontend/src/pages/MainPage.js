import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import entities from '../components/entities';
import AddForm from '../components/NewPersonForm';
import DeleteForm from '../components/DeleteForm';
import UpdateForm from '../components/UpdateForm';
import FilterForm from '../components/FilterForm';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import Pagination from '../components/Pagination';
import { PeopleContext } from '../components/PeopleContext';
import { useNavigate } from 'react-router-dom';


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
            }}>
                {children}
                <button className='closeButtonUpdateForm' style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={onClose}>X</button>
            </div>
        </div>
    );
}

function MainPage() {
    const { people, setPeople, fetchPeople, error } = useContext(PeopleContext);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [personToUpdate, setPersonToUpdate] = useState(null);


    const [currentPage, setCurrentPage] = useState(1);
    const [peoplePerPage, setPeoplePerPage] = useState(3);
    const lastPostIndex = currentPage * peoplePerPage;
    const firstPostIndex = lastPostIndex - peoplePerPage;
    const currentPeople = people.slice(firstPostIndex, lastPostIndex);

    const ageCategories = {
        '<30': people.filter(person => person.age < 30).length,
        '30-50': people.filter(person => person.age >= 30 && person.age <= 50).length,
        '>50': people.filter(person => person.age > 50).length,
    };

    const filterPeople = (ageToFilter) => {
        const filteredPeople = people.filter(person => Number(person.age) === Number(ageToFilter));
        setPeople(filteredPeople);
    };

    const openUpdateForm = (person) => {
        setPersonToUpdate(person);
        setShowUpdateForm(true);
    };

    const closeUpdateForm = () => {
        setShowUpdateForm(false);
    };

    const addPerson = (newPerson) => {
        fetch('http://localhost:8080/entities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPerson),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
                // console.log(response.body)
            })
            .then(data => {
                setPeople(prevPeople => [...prevPeople, data]);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    const navigate = useNavigate();


    const deletePerson = (personToDeleteId) => {
        fetch(`http://localhost:8080/entities/${personToDeleteId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return true;
            })
            .then(() => {
                fetchPeople();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const updatePerson = (personToUpdate) => {
        const updatedPeople = people.map(person => {
            if (person.id === personToUpdate.id) {
                return {
                    ...person,
                    propertyType: personToUpdate.newName !== undefined ? personToUpdate.newName : person.name,
                    age: personToUpdate.newAge !== undefined ? personToUpdate.newAge : person.age,
                    occupation: personToUpdate.newOccupation !== undefined ? personToUpdate.newOccupation : person.occupation,
                    address: personToUpdate.newAddress !== undefined ? personToUpdate.newAddress : person.address,
                    photo: personToUpdate.newPhoto !== undefined ? personToUpdate.newPhoto : person.photo
                };
            }
            return person;
        });

        fetch(`http://localhost:8080/entities/${personToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personToUpdate),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setPeople(prevPeople => prevPeople.map(person => person.id === data.id ? data : person));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const logout = async () => {
        // const token = localStorage.getItem('token');
        // await fetch('http://localhost:8080/logout', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${token}`,
        //     },
        // });
        // localStorage.removeItem('token');
        navigate('/login');

    }
    return (
        error ? (
            <p>{error}</p>
        ) : (

            <div className="container">
                <button onClick={logout}>Logout</button>

                <ul>
                    {currentPeople.map((person) => (
                        <li key={person.id}>
                            <h3>{person.name}</h3>
                            <p>Age: {person.age}</p>
                            <Link to={`/person/${person.id}`}>View Details</Link>
                            <p><button className='delete-button' onClick={() => deletePerson(person.id)}>Delete</button></p>
                            <button className='update-button' onClick={() => openUpdateForm(person)}>Update</button>

                        </li>
                    ))}
                </ul>
                <Pagination
                    totalPeople={people.length}
                    peoplePerPage={peoplePerPage}
                    setCurrentPage={setCurrentPage}

                />
                <div className="all-forms">
                    {/* <AddForm onAddPerson={addPerson} /> */}
                    {/* <DeleteForm onDeletePerson={deletePerson} /> */}

                    {showUpdateForm && (
                        <Modal onClose={closeUpdateForm}>
                            <UpdateForm personToUpdate={personToUpdate} onUpdatePerson={updatePerson} onClose={closeUpdateForm} />
                        </Modal>
                    )}
                    <FilterForm onFilterPeople={filterPeople} />
                </div>

                <div className="chart">
                    <Bar
                        data={{
                            labels: Object.keys(ageCategories),
                            datasets: [
                                {
                                    label: 'Age',
                                    data: Object.values(ageCategories),
                                },
                            ]
                        }}
                    />
                </div>


            </div>
        )
    );
}

export default MainPage;
