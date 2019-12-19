import db from "./db";
import {
    Food,
    Ingredient,
    Nutrient,
    StandardGenderAge,
} from "./models";

/**
 * Sequelize association을 위해서 만들었
 */
export function associate() {
    Food.associate();
    Ingredient.associate();
    Nutrient.associate();
    StandardGenderAge.associate();
}
export function sync() {
    associate();
    db.sync();
}