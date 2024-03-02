import { useState } from 'react';
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
      // messages 변수에 CallGPT 함수에 프로퍼티를 넘겨서 결과값을 저장
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
        <h1 style={{fontSize: '3.3rem'}}>Combine the ingredients to create a recipe!</h1>
      </div>
      <div className="container">
        <TextArea
          className="styled-textarea"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Please enter the ingredients in order"
          style={{width: '50rem'}}
        />
        <Button
          className="styled-button"
          loading={isLoading}
          onClick={handleSubmit}
        >
          Show Recipe
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