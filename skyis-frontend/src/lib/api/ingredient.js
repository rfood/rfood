import axios from 'axios';

export const searchIngredient = ({name}) => axios.get(`/api/ingredient/${name}`);