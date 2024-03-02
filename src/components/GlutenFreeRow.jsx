import { useState, useEffect } from 'react';
import spoonacularApi from '../api/spoonacularApi';
import RecipeModal from './modals/RecipeModal';
import { IoReloadSharp } from "react-icons/io5";
import styled from 'styled-components';
import './GlutenFreeRow.css';

// Import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function GlutenFreeRow() {
  const [glutenFreeRecipes, setGlutenFreeRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const check = localStorage.getItem('glutenFreeRecipes');

    if (check) {
      setGlutenFreeRecipes(JSON.parse(check));
    } else {
      const request = await spoonacularApi.get('/recipes/random?number=16&tags=GlutenFree');
      const data = request.data.recipes;
      localStorage.setItem('glutenFreeRecipes', JSON.stringify(data));
      setGlutenFreeRecipes(data);
    }
  };

  const handleClick = (recipe) => {
    setIsModalOpen(true);
    setSelectedRecipe(recipe); 
    console.log("recipe", recipe)
  };

const handleRefresh = async () => {
  const request = await spoonacularApi.get('/recipes/random?number=16');
  const data = request.data.recipes;
  setGlutenFreeRecipes(data);
  localStorage.setItem('glutenFreeRecipes', JSON.stringify(data));
};

  return (
    <section id='Ranking_Row'>
      <h3 id='title'>GlutenFree Diet</h3>
      <hr style={{ width: '300px' }} />
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '50px'}}>
    <StyledReloadIcon onClick={handleRefresh} size={'1.4rem'} />
    </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation={{}}
        loop={true}
        spaceBetween={50}
        slidesPerView={5}
      >
        {glutenFreeRecipes.map((recipe) => (
          <SwiperSlide key={recipe.id} className='row__posters'>
            <Container>
              <div className='image-container'>
                <img src={recipe.image} alt={recipe.title} onClick={() => handleClick(recipe)}/>
                <p className='overlay-text'>{recipe.title}</p>
              </div>
              <Gradient />
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
      {isModalOpen && ( 
        <RecipeModal {...selectedRecipe} setIsModalOpen={setIsModalOpen} /> 
      )}
    </section>
  );
}

export default GlutenFreeRow;

const Container = styled.div`
  border-radius: 2rem;
  overflow: hidden;
  user-select :none;

  img {
    width: 100%;
    height: 80%;
    object-position: center; 
    transition: transform 0.3s ease, opacity 0.3s ease; 

    &:hover {
      opacity: 0.8; 
      transform: scale(1.05); 
      cursor: pointer;
    }
  }
`;

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const StyledReloadIcon = styled(IoReloadSharp)`
  cursor: pointer;
  transition: color 0.3s ease; 

  &:hover {
    color:  #822d2d; 
  }
`;
