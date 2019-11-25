import axios from 'axios';

export const searchFood = (name) => axios.get(`/api/food/${name}`);
export const getStandardNutrient = (id, nutrientType) => axios.get(`/api/recommend/${id}/${nutrientType}`);
export const getFoodNutrient =  (id, nutrientType) => axios.get(`/api/nutrient/food/${id}/${nutrientType}`);
export const getIngredientNutrient = (id, nutrientType) => axios.get(`/api/nutrient/ingredient/${id}/${nutrientType + 1}`);
