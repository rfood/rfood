import axios from 'axios';

export const searchIngredient = (name) => axios.get(`/api/ingredient/${name}`);
export const insertIngredient = (code, name) => axios.post(`/api/ingredient`, {
    code: code,
    name: name
});
