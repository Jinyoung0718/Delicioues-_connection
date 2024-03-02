import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import spoonacularApi from '../../api/spoonacularApi';
import RecipeModal from '../../components/modals/RecipeModal';
import { useDebounce } from '../../hook/useDebounce';
import './SearchPage.css';

export default function SearchPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeSelected, setRecipeSelected] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  const useQuery = () => {
    console.log(useLocation());
  // search: "?query=cookie"
    return new URLSearchParams(useLocation().search);
  // new를 붙임으로써 URL 쿼리 문자열을 객체로 변환하기 위해  
  };

  let query = useQuery();
  const searchTerm = query.get("query");
  // "cookie"
  const fetchSearchRecipe = async (searchTerm) => {
    try {
      const response = await spoonacularApi.get(
        `/recipes/complexSearch?query=${searchTerm}&number=16&addRecipeInformation=true&addRecipeNutrition=true&includeIngredients`
      );
      console.log(response);
      const recipes = response.data.results; 
      setSearchResults(recipes);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleClick = (recipe) => {
    setIsModalOpen(true);
    setRecipeSelected(recipe); 
    console.log("recipe", recipe);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchRecipe(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className='recipe-container'>
      {searchResults.map((recipe) => (
        <div key={recipe.id} className="recipe-item">
          <img src={recipe.image}  alt={`${recipe.title} image`} className="recipe-image" onClick={() => handleClick(recipe)} />
          <hr style={{ width: '240px' }} />
          <h4 className="recipe-title">{recipe.title}</h4>
        </div>
      ))}
      {isModalOpen && (
        <RecipeModal {...recipeSelected} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
}
