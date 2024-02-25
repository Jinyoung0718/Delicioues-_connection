import React from 'react';
import './Introduce.css';
import Introduce_1 from '../assets/Introduce_1.jpg';
import Introduce_2 from '../assets/Introduce_2.jpg';

export default function Introduce() {
  return (
    <div className='Introduction'>
            <h3 id='title'>Introduction</h3>
      <hr style={{ width: '300px', textAlign: 'center'}} />
      <ul className='icons'>
        <li>
          <div className="image-container">
            <img src={Introduce_1} alt="" />
          </div>
          <div className="content">
            <header className="align-center">
              <h2>Introduction to the website</h2>
              <p>For the introduction and growth of cooking..</p>
            </header>
            <hr />
            <p>Hello! We introduce a website that provides convenient features to find various recipes, search for the dishes you want, and utilize GPT to recommend customized dishes based on the ingredients you have.</p>
          </div>
        </li>
        <li>
          <div className="image-container">
            <img src={Introduce_2} alt="" />
          </div>
          <div className="content">
            <header className="align-center">
              <h2>Future plans</h2>
              <p>Future Planning Direction</p>
            </header>
            <hr />
            <p>We will be able to study various dishes through various collaborators and will conduct education through various campaigns</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
