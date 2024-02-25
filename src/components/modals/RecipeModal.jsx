import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import useClickOutside from '../../hook/useClickOutside';

export default function RecipeModal({ id, image, summary, title, nutrition, extendedIngredients, setIsModalOpen }) {
  const ref = useRef();
  useClickOutside(ref, () => setIsModalOpen(false));

  const [likedRecipes, setLikedRecipes] = useState(() => {
    return JSON.parse(localStorage.getItem("likedRecipes")) || []; 
  });

  const [isLiked, setIsLiked] = useState(() => {
    return likedRecipes.some(recipe => recipe.id == id);
  });

  useEffect(() => {
    setIsLiked(likedRecipes.some(recipe => recipe.id == id));
  }, [likedRecipes, id]);

  const handleLike = () => {
    let newLikedRecipes;
    if (isLiked) {
      newLikedRecipes = likedRecipes.filter(recipe => recipe.id !== id); // 좋아요를 한 번 더 누르면 해당 레시피만 로컬스테이지에 저장된 공간에서 제외시키기 위함
    } else {
      newLikedRecipes = [...likedRecipes, {id, image, title}];
    }
    setLikedRecipes(newLikedRecipes);
    localStorage.setItem("likedRecipes", JSON.stringify(newLikedRecipes));
  };

  return (
    <ModalOverlay>
      <ModalContent ref={ref}>
        <FlexContainer>
          <LeftContent>
            <h2>{title}</h2>
            <img src={image} alt={title} />
            <StyledSummary dangerouslySetInnerHTML={{ __html: summary }} />
          </LeftContent>
          <RightContent>
            <ul style={{ marginTop: '20%' }}>
              {
                ((extendedIngredients || nutrition.ingredients).map((ingredient, index) => (
                  <li key={index} style={{ padding: '2%', fontSize: '1.2rem', fontWeight: '300' }}>{ingredient.name}</li>
                )))}
            </ul>
          </RightContent>
        </FlexContainer>
        <ButtonContainer>
          <LikeButton onClick={handleLike} style={{
                color: isLiked ? '#ff4757' : 'rgba(0, 0, 0, 0.3)', 
                borderColor: isLiked ? '#ff4757' : 'rgba(0, 0, 0, 0.3)',
                background: isLiked ? '#ffe8e8' : 'transparent'
              }}>♥</LikeButton>
          <CloseButton onClick={() => setIsModalOpen(false)}>Close</CloseButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.75); 
  backdrop-filter: blur(8px); 
`;

const ModalContent = styled.div`
  background: #f8f8f8; 
  padding: 1rem; 
  border-radius: 12px; 
  width: 80%; 
  max-width: 850px; 
  max-height: 90vh;
  height: 100%;
  overflow-x: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); 
  display: flex;
  flex-direction: column;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftContent = styled.div`
  text-align: center;
  flex: 1;
  margin-right: 20px;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledSummary = styled.div`
  background-color: #FFF;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  text-align: justify;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 1rem;
`;

const LikeButton = styled.button`
  font-size: 1.5rem;
  color: #ff4757;
  border: 2px solid #ff4757;
  background: transparent;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    background-color: #ff4757;
  }
`;



const CloseButton = styled.button`
  font-size: 1rem; 
  color: #333;
  border: 2px solid #333;
  background: transparent;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 10px; 
  transition: all 0.3s ease;

  &:hover {
    color: black;
    border-color: #666;
    background: #f0f0f0;
    transform: scale(1.05);
  }
`;

