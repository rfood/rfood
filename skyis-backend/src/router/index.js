import express from 'express';
import food from  './food';
import ingredient from './ingredient'
import recommend from './recommend';
import user from './user';
import nutrient from './nutrient';

const router = express.Router();

/*router.use('/', (req, res) => {
    res.send("HomePage ");
})*/
router.use('/*', (req, res, next) => {
    res.setHeader("Expires", "-1");
    res.setHeader("Cache-Control", "must-revalidate, private");
    next();
})
router.use('/nutrient', nutrient);
router.use('/food', food);
router.use('/ingredient', ingredient);
router.use('/recommend', recommend);
router.use('/user', user);

export default router;
