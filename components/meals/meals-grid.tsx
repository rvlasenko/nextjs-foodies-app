import { IMeal } from "@/lib/meals";
import MealItem from "./meal-item";
import classes from "./meals-grid.module.css";

export default function MealsGrid({ meals }: { meals: IMeal[] }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
