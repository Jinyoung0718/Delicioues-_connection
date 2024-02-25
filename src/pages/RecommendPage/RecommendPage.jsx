import React, { useState } from 'react';
import { Input, Button } from 'antd';
import "./RecommendPage.css";
import { CallGPT } from '../../api/CallGPT';

const { TextArea } = Input;

export default function RecommendPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleClickAPiCall = async () => {
    try {
      setIsLoading(true);
      const messages = await CallGPT({
        prompt: `${userInput}`,
      });
      setData(JSON.parse(messages));
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    handleClickAPiCall();
  };

  return (
    <div className="app-container">
      <div className="app-title">
        <h1>Combine the ingredients to create a recipe!</h1>
      </div>
      <div className="container">
        <TextArea
          className="styled-textarea"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Please enter the ingredients in order"
        />
        <Button
          className="styled-button"
          loading={isLoading}
          onClick={handleSubmit}
        >
          Let's Cook
        </Button>
      </div>
      {data && (
        <div className="data-container">
          <div className="data-title">{data.title}</div>
          <div className="data-text">Ingredients: {data.ingredients && data.ingredients.join(", ")}</div>
          <div className="data-text">Instructions: {data.instructions}</div>
          <div className="data-text">Tips: {data.tips}</div>
          {data.image && <img className="recipe-image" src={data.image} alt="Recipe image" />}
        </div>
      )}
    </div>
  );
}