import axios from 'axios';
import qs from 'querystring';

export const uploadFoodData = (foodData, ingredientData) => axios.post(`/api/util/upload/food`, {
    foodData: foodData,
    ingredientData: ingredientData
});
export const searchImageWithURL = (queryString) =>axios.get(`/api/util/image/${queryString}`);
