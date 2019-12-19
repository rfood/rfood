import axios from 'axios';
import qs from 'querystring';

export const uploadFoodData = (foodData, ingredientData) => axios.post(`/api/util/upload/food`, {
    foodData: foodData,
    ingredientData: ingredientData
});
export const searchImageWithURL = (queryString) =>{
    let temp = axios.get(`/api/util/image/${queryString}`);
    console.log(temp);
}
