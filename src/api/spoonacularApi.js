import axios from 'axios';

const BASE_URL = 'https://api.spoonacular.com';

const spoonacularApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: import.meta.env.VITE_API_KEY,
  },
});

export default spoonacularApi;