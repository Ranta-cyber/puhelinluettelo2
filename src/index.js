import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
//import axios from 'axios';
import PersonService from './notes';
import './index.css'
//import {  } from '@testing-library/react';
//const baseurl ='http://localhost:3001/persons'

//import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newRajaus, setNewRajaus ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  // const deleteButton = (id) => {
  //   return( 
  //       <button name={id} type="button" onClick={event => deletePerson(event, id)}> delete 
  //       </button>
  //   )}


  const backPhoto = 'https://cdn.pixabay.com/photo/2018/04/07/08/28/notepad-3297994_1280.jpg'

  var formStyle = {
    color: 'white',
    backgroundImage: 'url(' + backPhoto + ')'
  };

  

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  const hook = () => {
    PersonService
      .getAll()
      .then(returnedPersons => {setPersons(returnedPersons)})  
  }

  useEffect(hook, [])

  const Persons = () => { 
    if (newRajaus === '') 
    { const listItems = persons.map((personList, i) => 
      // <li key={i} id={i}>{personList.name} {personList.number} {deleteButton(personList.id)}</li>)
      <li key={i} id={i}>{personList.name} {personList.number}   
        <button name={personList.number} type="button" onClick={event => deletePerson(event, personList.id, i)}> delete 
        </button>
      </li>) 
      return( <ul id="choiceList">{listItems}</ul>)
    }
    else 
    {
      const listItems = filterItems(persons, newRajaus)
          .map((personList, i) => 
            //<li key={i} id={i}>{personList.name} {personList.number} {deleteButton(personList.id)} 
      <li key={i} id={i}>{personList.name} {personList.number}   
        <button name={personList.number} type="button" onClick={event => deletePerson(event, personList.id, i)}> delete 
        </button>
      </li>)
           
      return(<ul id="choiceList">{listItems}</ul>)
    }
  }
  // const RemoveFromList = (itemid) => {
  //   var element = document.getElementById( itemid );
  //   element.parentNode.removeChild(element);
  // }

  const deletePerson = (event, id, i) => {
    event.preventDefault()
    //console.log('delete person id:', id)
    PersonService
    .deleteNote(id)
    .then(error => { setErrorMessage(
      `Note '${persons[0].name}' is removed from server`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setPersons(persons.filter(n => n.id !== id))})
    
      .catch(error => {
        setErrorMessage(
          `Note '${persons[i].name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)})
      .finally()
        
  }
  
  const AddPerson = (event) => {
    event.preventDefault()
    const index = persons.findIndex(name1 => name1.name === newName)
  
    if (index < 0) {

      const nameObject = {
          name: newName,
          number: newNumber,
          date: new Date().toISOString()}
          //important: Math.random() > 0.5}
      PersonService
          .addNote(nameObject)
          .then(returnedPerson => {setPersons(persons.concat          (returnedPerson))
            
              setNewName('')
              setNewNumber('')  
              },
              setErrorMessage(
                `Note '${newName}' is added.`
              ),
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000),
          )
    } else {
      if (window.confirm(`${newName} is already added to phonebook, \nreplace the old number with a new one?`) === true)
        {
          const listItems3 = filterItems(persons, newName)
          
          const nameObject = {
            name: newName,
            number: newNumber,
            date: new Date().toISOString(),
            id: listItems3[0].id}

            console.log('newname,newnumber,id:',newName, newNumber, listItems3[0].id)
            
            PersonService
              .updateNote(nameObject)
              .then(error =>
                setErrorMessage(
                  `Note '${nameObject.name}' is updated.`
                ),
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000),
                persons[index].number = newNumber
                )
                .catch(error => {
                  alert(
                    `the note '${nameObject.name}' was already deleted from server`
                  )
                  setPersons(persons.filter(n => n.id !== nameObject.id))
                })
              
            setNewName('')
            setNewNumber('')         
        }
      }
  }

  const handleRajausChange = (event) => {
    event.preventDefault();
    setNewRajaus(event.target.value)
  }
  
  const handlePersonChange = (event) => {
    //console.log('event', event.target.value)
    event.preventDefault();
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value)
  }
  
  const filterItems = (arr, query) => {
    return arr.filter(el => 
      el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
  
  return (
    <div style={formStyle}>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <div>
           Filter shown with: <input value={newRajaus}
           onChange={handleRajausChange}/>
      </div>
       
      <h3>Add a new</h3>

      <div>
      <form onSubmit={AddPerson}> 
        <div>
          Name: <input value={newName}
          onChange={handlePersonChange}/>
        </div>
        <div>
          Number: <input value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </div>

      <h3>Numbers</h3>

      <Persons newrajaus={newRajaus} ihmiset={persons}/>
      
    </div>
  )
}

ReactDOM.render(
  //<React.StrictMode>
    <App />,
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
