// SignInSignUp.js

import React, { useState, useEffect, useRef } from 'react';
import './SignInSignUp.css';
import imgnail from '../components/images/altbg.jpeg';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, getAuth, fetchSignInMethodsForEmail , signInWithPopup , GoogleAuthProvider, signInWithGoogle} from 'firebase/auth';
import { auth } from "../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import glogo from '../components/images/360_F_308543787_DmPo1IELtKY9hG8E8GlW8KHEsRC7JiDN.jpg';

const SignInSignUp = () => {
  const [isSignUpMode, setSignUpMode] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [values2, setValues2] = useState({
    email2: "",
    pass2: "",
  });
  const nameRef=useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const email2Ref = useRef(null);
  const pass2Ref = useRef(null);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);
  const toggleMode = () => {
    setSignUpMode(!isSignUpMode);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!values.name || !values.email || !values.pass) {
      setValues({name:"",email:"",pass:""});
      if (nameRef.current && emailRef.current && passRef.current) {
        nameRef.current.value = "";
        emailRef.current.value = "";
        passRef.current.value = "";
      }
      alert("Please fill in all the details!!");
      return;
    }
  
    try {
      const auth = getAuth();
      const methods = await fetchSignInMethodsForEmail(auth, values.email);
      if (methods && methods.length > 0) {
        setValues({name:"",email:"",pass:""});
        nameRef.current.value = "";
        emailRef.current.value = "";
        passRef.current.value = "";
        alert("An account already exists with this email");
        
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.pass);
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: values.name
        });
        setValues({name:"",email:"",pass:""});
        if (nameRef.current && emailRef.current && passRef.current) {
          nameRef.current.value = "";
          emailRef.current.value = "";
          passRef.current.value = "";
        }
        alert("Sucess! Account created succesfully")
        // setTimeout(() => {
        //   // Simulating success
        //   setSuccessAlertVisible(true);
        //   setTimeout(() => {
        //     setSuccessAlertVisible(false);
        //   }, 2000);
        //   // Clear form fields after submission
        //   setValues({name:"",email:"",pass:""});
        //   if (nameRef.current && emailRef.current && passRef.current) {
        //     nameRef.current.value = "";
        //     emailRef.current.value = "";
        //     passRef.current.value = "";
        //   }
        // }, 2000);
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setValues({name:"",email:"",pass:""});
        nameRef.current.value = "";
        emailRef.current.value = "";
        passRef.current.value = "";
        // setErrorAlertVisible(true);
        // setTimeout(() => {
        //   setErrorAlertVisible(false);
        // }, 2000);
        alert("An account already exists with this email");
        
        
      }
      else if(error.code=="auth/invalid-email"){
        setValues({name:"",email:"",pass:""});
        nameRef.current.value = "";
        emailRef.current.value = "";
        passRef.current.value = "";
        alert("Please enter a valid Email ID");
      }
      else if(error.code=="auth/weak-password"){
        setValues({name:"",email:"",pass:""});
        nameRef.current.value = "";
        emailRef.current.value = "";
        passRef.current.value = "";
        alert("Password should contain atleast 6 digits/characters")
      }
    }
  };
  
  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, values2.email2, values2.pass2);
      setValues2({email2:"",pass2:""});
      email2Ref.current.value = "";
      pass2Ref.current.value = "";
      alert("Logged in successfully");
    } catch (error) {
      setValues2({email2:"",pass2:""});
      email2Ref.current.value = "";
      pass2Ref.current.value = "";
      console.log(error); // Log the error for debugging
      if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address");
        
      } else if (error.code === "auth/missing-password") {
        alert("Please enter the password");
      } else {
        alert("Invalid credentials! Couldn't find any account with the provided email/password");
      }
    }
    
  };
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
 

      const result = await signInWithPopup(auth, provider);
      // Handle successful sign-in
      alert("Logged in with Google successfully");
    } catch (error) {
      // Handle errors
      console.error("Error signing in with Google:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
  
      const result = await signInWithPopup(auth, provider);
      // Handle successful sign-up
      alert("Signed up with Google successfully");
    } catch (error) {
      // Handle errors
      console.error("Error signing up with Google:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  

  useEffect(() => {
    const container = document.querySelector('.lsp-container');

    if (container) {
      const sign_up_btn = document.querySelector('#lsp-sign-up-btn');
      const sign_in_btn = document.querySelector('#lsp-sign-in-btn');
      const sign_up_btn2 = document.querySelector('#lsp-sign-up-btn2');
      const sign_in_btn2 = document.querySelector('#lsp-sign-in-btn2');

      if (sign_up_btn && sign_in_btn && sign_up_btn2 && sign_in_btn2) {
        sign_up_btn.addEventListener('click', () => {
          container.classList.add('lsp-sign-up-mode');
        });

        sign_in_btn.addEventListener('click', () => {
          container.classList.remove('lsp-sign-up-mode');
        });

        sign_up_btn2.addEventListener('click', () => {
          container.classList.add('lsp-sign-up-mode2');
        });

        sign_in_btn2.addEventListener('click', () => {
          container.classList.remove('lsp-sign-up-mode2');
        });
      }
    }
  }, [isSignUpMode]);

  return (
  <div className='lsp-body'>
    {/* {successAlertVisible && (
      <div className="alert alert-success" role="alert">
        <i className="bi bi-check-circle"></i> Action completed successfully!
      </div>
    )} */}

    <div className={`lsp-container ${isSignUpMode ? 'lsp-sign-up-mode' : ''}`}>
      <div className="lsp-signin-signup">
        {/* Sign-in form */}
        <div className={`lsp-card-form ${isSignUpMode ? '' : 'lsp-visible'}`}>
          <form action="" className={`lsp-sign-in-form ${isSignUpMode ? '' : 'lsp-visible'}`} onSubmit={handleSignIn}>
            <h2 className="lsp-title">Sign in</h2>
            <div className="lsp-input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Email" value={values2.email2} ref={email2Ref} onChange={(e) => setValues2({ ...values2, email2: e.target.value })} />
            </div>
            <div className="lsp-input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={values2.pass2} ref={pass2Ref} onChange={(e) => setValues2({ ...values2, pass2: e.target.value })} />
            </div>
            <input type="submit" value="Login" className="lsp-btn2" />
            <div className="lsp-google-btn">
  <p id="lsp-google_text">Sign in with</p>
  <button type="button" className="lsp-google-icon" onClick={handleGoogleSignIn}>
    <img src={glogo} className='lsp-googlelogo' alt="" />
  </button>
</div>


          </form>
        </div>

        {/* Sign-up form */}
        <div className={`lsp-card-form ${isSignUpMode ? 'lsp-visible' : ''}`}>
          <form action="" className={`lsp-sign-up-form ${isSignUpMode ? 'lsp-visible' : ''}`} onSubmit={handleSignUp}>
            <h2 className="lsp-title">Sign up</h2>
            <div className="lsp-input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={values.name} ref={nameRef} onChange={(e) => setValues({ ...values, name: e.target.value })} />
            </div>
            <div className="lsp-input-field">
              <i className="fas fa-envelope"></i>
              <input type="text" placeholder="Email" value={values.email} ref={emailRef} onChange={(e) => setValues({ ...values, email:e.target.value })} />
            </div>
            <div className="lsp-input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={values.pass}  ref={passRef} onChange={(e) => setValues({ ...values, pass: e.target.value })} />
            </div>
            <input type="submit" value="Sign up" className="lsp-btn2" />
            <div className="lsp-google-btn">
  <p id="lsp-google_text">Sign up with</p>
  <button type="button" className="lsp-google-icon" onClick={handleGoogleSignUp}>
    <img src={glogo} className='lsp-googlelogo' alt="" />
  </button>
</div>
            <p className="lsp-account-text">
              Already have an account? <button type="button" id="lsp-sign-in-btn2" onClick={toggleMode}>Sign in</button>
            </p>
          </form>
        </div>
      </div>

      {/* Panels container */}
      <div className="lsp-panels-container">
        {/* Left panel */}
        <div className={`lsp-panel lsp-left-panel ${isSignUpMode ? 'lsp-visible' : ''}`}>
          <div className="lsp-content">
            <div className="lsp-background-image">
              <img src={imgnail} alt="signup" className="lsp-image" />
            </div>
            <button type="button" className="lsp-btn2" onClick={toggleMode}>Sign in</button>
          </div>
        </div>

        {/* Right panel */}
        <div className={`lsp-panel lsp-right-panel ${isSignUpMode ? '' : 'lsp-visible'}`}>
          <div className="lsp-content">
            <div className="lsp-background-image">
              <img src={imgnail} alt="signup" className="lsp-image" />
            </div>
            <button type="button" className="lsp-btn2" onClick={toggleMode}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
    </div>  
  );
};


export default SignInSignUp;
