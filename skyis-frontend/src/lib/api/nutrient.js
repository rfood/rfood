import axios from 'axios';

export const searchFood = (name) => axios.get(`/api/food/${name}`);
export const getStandardNutrient = (id, type) => axios.get(`/api/recommend/${id}/${type}`);
export const getFoodNutrient =  (id, type) => axios.get(`/api/nutrient/food/${id}/${type}`);
