import db from "./db";
import {
    Food,
    Ingredient,
    Nutrient,
    StandardGenderAge,
} from "./models";

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