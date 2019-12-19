import axios from 'axios';

/**
 * 영양소의 정보를 받아오는 api 호출
 */
export const searchFood = (name) => axios.get(`/api/food/${name}`);
export const getStandardNutrient = (id, nutrientType) => axios.get(`/api/recommend/${id}/${nutrientType}`);
export const getFoodNutrient =  (id, nutrientType) => axios.get(`/api/nutrient/food/${id}/${nutrientType}`);
export const getIngredientNutrient = (id, nutrientType) => axios.get(`/api/nutrient/ingredient/${id}/${nutrientType + 1}`);
