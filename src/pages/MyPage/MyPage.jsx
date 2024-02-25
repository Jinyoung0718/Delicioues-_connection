import { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function MyPage() {
  const [likedRecipes, setLikedRecipes] = useState(() => {
    return JSON.parse(localStorage.getItem("likedRecipes")) || [];
  });

  const [selectedRecipe, setSelectedRecipe] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleImageClick = (recipe) => {
    console.log(likedRecipes);
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    const updatedRecipes = likedRecipes.filter(recipe => recipe.id !== id);
    setLikedRecipes(updatedRecipes);
    localStorage.setItem("likedRecipes", JSON.stringify(updatedRecipes));
  };

  return (
    <PageContainer>
      <Title>My Liked Recipes</Title>
      <RecipesGrid>
        {likedRecipes.length > 0 ? (
          likedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id}>
              <RecipeImage src={recipe.image} alt={recipe.title} onClick={() => handleImageClick(recipe)}/>
              <RecipeTitle>{recipe.title}</RecipeTitle>
              <DeleteButton onClick={() => handleDelete(recipe.id)}>Delete</DeleteButton>
            </RecipeCard>
          ))
        ) : (
          <NoRecipesText>No liked recipes yet.</NoRecipesText>
        )}
      </RecipesGrid>
    </PageContainer>
  );
}
const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  margin-top: 5vh;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const RecipeCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RecipeTitle = styled.p`
  margin: 10px 0;
  font-size: 1rem;
  color: #333;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff7875;
  }
`;

const NoRecipesText = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.5rem;
  font-weight: 500;

  position: absolute; 
  top: 20%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
`;
