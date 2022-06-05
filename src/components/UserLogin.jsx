import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeUser } from "../store/slices/user.slice";
import { useDispatch } from "react-redux";
import Footer from './Footer';


const UserLogin = () => {


const [userName, setUserName]  = useState("");

const navigate = useNavigate();
const dispatch = useDispatch();
    
const getUser = () => {

    dispatch(changeUser(userName));
    navigate("/pokedex");
};

    return (
        <div className='contain'>
        <div className='welcome'>
<img src="https://sergiofrancodev.com/logo.png" alt="" width="500"/> 

<img src="https://sergiofrancodev.com/pokeball.gif" alt="" width="300" />


<h1>¡Welcome pokemon master!</h1>
<h3>To start you have to give me your name </h3>

<div>
<input 
type="text"
placeholder='enter your name' 
value={userName} 
onChange={(e) => setUserName(e.target.value)}/>

<button onClick={getUser}>Start</button>
</div>

 </div>
  <Footer/>
  </div>
    );
};

export default UserLogin;