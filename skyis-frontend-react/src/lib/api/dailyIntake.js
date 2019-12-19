import axios from 'axios';

/**
 * 일일 권장 영양소를 가져오는 api 호출
 */
export const getDailyIntake = (genderAgeType, nutrientType) => axios.get(`/api/recommend/`);