//import react from 'react';
import axios from 'axios';
//const baseUrl ='http://localhost:3001/api/persons';
//const baseUrl ='https://guarded-mountain-62659.herokuapp.com/api/persons';
//Koska tässä tapauksessa sekä frontend että backend 
//toimivat samassa osoitteessa, voidaan React-sovelluksessa eli 
//frontendin koodissa oleva palvelimen baseUrl määritellä 
//suhteellisena URL:ina
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

const addNote = (nameObject) => {   
    const request = axios.post(baseUrl, nameObject)
    return request.then(response => response.data)
  }

  const updateNote = (nameObject) => {
      //console.log('id:',nameObject.id)
    const request = axios.put(`${baseUrl}/${nameObject.id}`, nameObject)
    return request.then(response => response.data)
  }

  

  const deleteNote = (id) => {
      //console.log('deletessä id :',id)
      const request = axios.delete(`${baseUrl}/${id}`)
      //return request.then(response => response.data)
      return request.then(response => response.data)

    //   .then(res => {
    //     console.log(res.data);
    // })
    // .catch((err) => {
    //     console.log(err);
    // })
  }

export default { addNote, 
                getAll, 
                updateNote,
                deleteNote}