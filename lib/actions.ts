"use server";

import { redirect } from "next/navigation";
import { IMeal, saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

export interface MealFormState {
  message: string | null;
}

function isInvalidText(text: string) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState: MealFormState, formData: FormData) {
  const meal: IMeal = {
    title: formData.get("title") as string,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as File,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email)
  ) {
    return {
      message: "Invalid input",
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
