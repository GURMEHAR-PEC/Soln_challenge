import React from 'react';
import { useState } from 'react';
import './form.css'; 
import {Firestore} from '../firebase';
import {getFirestore,collection,onSnapshot,deleteDoc,addDoc,doc} from 'firebase/firestore';
function IncidentReportForm() {
  const db=getFirestore();
  const colref1=collection(db,'sector 17')
  const [formData, setFormData] = useState({
    incidentType: 0,
    frequency: 0,
    securityRating: 0,
    signalRating: 0,
    emergencyRating: 0,
    transportationRating:0
  });
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData(prevState => ({
        ...prevState,
        [name]: parseInt(value)
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]:0
      }));
    }
  };
  const handleRadioChange = (e) => {
  const { name, value } = e.target;
  const parsedValue = parseInt(value, 10);
  
  
  if (formData[name] === parsedValue) {
    setFormData(prevState => ({
      ...prevState,
      [name]: 0
    }));
  } else {
   
    setFormData(prevState => ({
      ...prevState,
      [name]: parsedValue
    }));
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    const db = getFirestore();
    const { incidentType, frequency, securityRating, signalRating, emergencyRating, transportationRating } = formData;
    const unansweredQuestions = Object.keys(formData).filter(key => formData[key] === 0);
    if (unansweredQuestions.length > 0) {
      alert("Please answer all questions before submitting. ⚠️");
      return; 
    }
    try {
      const docRef = await addDoc(collection(db, 'sector 17'), {
        Incident: incidentType,
        Frequency: frequency,
        securityRating: securityRating,
        signalRating: signalRating,
        emergencyRating: emergencyRating,
        transportationRating: transportationRating
      });
      
      setFormData({
        incidentType: 0,
        frequency: 0,
        securityRating: 0,
        signalRating: 0,
        emergencyRating: 0,
        transportationRating: 0
      });
      
      document.getElementById('myForm').reset();
      alert('Thanks for submitting your feedback.\nWith ❤️ from team SafeHaven 🤗')
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <div className='formbg'>     
    <div className='form-container'>
      <form id="myForm" onSubmit={handleSubmit}>
        <div className='mcq'>
        <div className="question">
          <label>Q1. Select Incident Type:</label>
        </div>
        <div className='options'>  
          <input type="radio" id="theft" name="incidentType" value="1"  onChange={handleRadioChange} checked={formData.incidentType === 1}/>
          <label htmlFor="theft">Theft</label>
          <input type="radio" id="harassment" name="incidentType" value="2"  onChange={handleRadioChange} checked={formData.incidentType === 2}/>
          <label htmlFor="harassment">Harassment</label>
          <input type="radio" id="violence" name="incidentType" value="3" onChange={handleRadioChange} checked={formData.incidentType === 3} />
          <label htmlFor="violence">Violence</label>
          <input type="radio" id="vandalism" name="incidentType" value="4"  onChange={handleRadioChange} checked={formData.incidentType === 4}/>
          <label htmlFor="vandalism">Vandalism</label>
        </div>
        </div>
        <div className='mcq'>
        <div className="question">
          <label>Q2. Select Frequency:</label>
        </div>  
        <div className='options'>
          <input type="radio" id="rare" name="frequency" value="1" onChange={handleRadioChange} checked={formData.frequency === 1}/>
          <label htmlFor="rare">Rare</label>
          <input type="radio" id="moderate" name="frequency" value="2" onChange={handleRadioChange} checked={formData.frequency === 2}  />
          <label htmlFor="moderate">Moderate</label>
          <input type="radio" id="high" name="frequency" value="3"  onChange={handleRadioChange} checked={formData.frequency === 3}/>
          <label htmlFor="high">High</label>
        </div>
        </div>

        <div className='mcq'>
        <div className="question">
          <label htmlFor="securityRating">Q3. Rate Security Measures:</label>
        </div>
        <div className='options'>  
          <input type="radio" id="securityOne" name="securityRating" value="1"  onChange={handleRadioChange} checked={formData.securityRating === 1}/>
          <label htmlFor="securityOne">1</label>
          <input type="radio" id="securityTwo" name="securityRating" value="2"  onChange={handleRadioChange} checked={formData.securityRating === 2}/>
          <label htmlFor="securityTwo">2</label>
          <input type="radio" id="securityThree" name="securityRating" value="3" onChange={handleRadioChange} checked={formData.securityRating === 3} />
          <label htmlFor="securityThree">3</label>
          <input type="radio" id="securityFour" name="securityRating" value="4" onChange={handleRadioChange} checked={formData.securityRating === 4} />
          <label htmlFor="securityFour">4</label>
          <input type="radio" id="securityFive" name="securityRating" value="5" onChange={handleRadioChange} checked={formData.securityRating === 5} />
          <label htmlFor="securityFive">5</label>
        </div>
        </div>
        
        <div className='mcq'>
        <div className="question">
          <label htmlFor="signalRating">Q4. Rate Cellular Signal Coverage:</label>
        </div>

        <div className='options'>  
          <input type="radio" id="signalOne" name="signalRating" value="1" onChange={handleRadioChange} checked={formData.signalRating === 1}/>
          <label htmlFor="signalOne">1</label>
          <input type="radio" id="signalTwo" name="signalRating" value="2" onChange={handleRadioChange} checked={formData.signalRating === 2}/>
          <label htmlFor="signalTwo">2</label>
          <input type="radio" id="signalThree" name="signalRating" value="3" onChange={handleRadioChange} checked={formData.signalRating === 3}/>
          <label htmlFor="signalThree">3</label>
          <input type="radio" id="signalFour" name="signalRating" value="4" onChange={handleRadioChange} checked={formData.signalRating === 4}/>
          <label htmlFor="signalFour">4</label>
          <input type="radio" id="signalFive" name="signalRating" value="5" onChange={handleRadioChange} checked={formData.signalRating === 5}/>
          <label htmlFor="signalFive">5</label>
        </div>
        </div>


        <div className='mcq'>
        <div className="question">
          <label htmlFor="emergencyRating">Q5. Rate Emergency Services:</label>
        </div>

        <div className='options'>
          <input type="radio" id="emergencyOne" name="emergencyRating" value="1" onChange={handleRadioChange} checked={formData.emergencyRating === 1}/>
          <label htmlFor="emergencyOne">1</label>
          <input type="radio" id="emergencyTwo" name="emergencyRating" value="2" onChange={handleRadioChange} checked={formData.emergencyRating === 2}/>
          <label htmlFor="emergencyTwo">2</label>
          <input type="radio" id="emergencyThree" name="emergencyRating" value="3" onChange={handleRadioChange} checked={formData.emergencyRating === 3}/>
          <label htmlFor="emergencyThree">3</label>
          <input type="radio" id="emergencyFour" name="emergencyRating" value="4" onChange={handleRadioChange} checked={formData.emergencyRating === 4}/>
          <label htmlFor="emergencyFour">4</label>
          <input type="radio" id="emergencyFive" name="emergencyRating" value="5" onChange={handleRadioChange} checked={formData.emergencyRating === 5}/>
          <label htmlFor="emergencyFive">5</label>
        </div>
        </div>

        <div className='mcq'>
        <div className="question">
          <label htmlFor="transportationRating">Q6. Rate Public Transportation Services and Bus Stops:</label>
        </div>

        <div className='options'>  
          <input type="radio" id="transportOne" name="transportationRating" value="1" onChange={handleRadioChange} checked={formData.transportationRating === 1}/>
          <label htmlFor="transportOne">1</label>
          <input type="radio" id="transportTwo" name="transportationRating" value="2" onChange={handleRadioChange} checked={formData.transportationRating === 2}/>
          <label htmlFor="transportTwo">2</label>
          <input type="radio" id="transportThree" name="transportationRating" value="3" onChange={handleRadioChange} checked={formData.transportationRating === 3}/>
          <label htmlFor="transportThree">3</label>
          <input type="radio" id="transportFour" name="transportationRating" value="4" onChange={handleRadioChange} checked={formData.transportationRating === 4}/>
          <label htmlFor="transportFour">4</label>
          <input type="radio" id="transportFive" name="transportationRating" value="5" onChange={handleRadioChange} checked={formData.transportationRating === 5}/>
          <label htmlFor="transportFive">5</label>
        </div>
        </div>  

        <button type="submit" className='formsubmit'>Submit</button>
      </form>
    </div>
    </div>
  );
}

export default IncidentReportForm;

