import axios from 'axios';

/**
 * ingredient 테이블을 호출하는 api
 */
export const searchIngredient = (name) => axios.get(`/api/ingredient/${name}`);
export const insertIngredient = (code, name) => axios.post(`/api/ingredient`, {
    code: code,
    name: name
});
