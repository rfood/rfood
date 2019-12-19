import axios from 'axios';

/**
 * 검색하는 것들을 모아두려고 했었음.
 *
 */
export const searchIngredient = (name) => axios.get(`/api/ingredient/${name}`);
export const searchFood = (name) => axios.get(`/api/food/${name}`);
