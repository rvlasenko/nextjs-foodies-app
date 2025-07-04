"use server";

import { redirect } from "next/navigation";
import { IMeal, saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

export interface MealFormState {
  message: string | null;
  errors?: {
    title?: string;
    summary?: string;
    instructions?: string;
    image?: string;
    creator?: string;
    creator_email?: string;
  };
}

function isInvalidText(text: string, minLength = 1, maxLength = 5000): boolean {
  const trimmedText = text?.trim() || "";
  return trimmedText.length < minLength || trimmedText.length > maxLength;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidImageFile(image: File | string): boolean {
  if (!image || !(image instanceof File) || image.size === 0) {
    return false;
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

  return allowedTypes.includes(image.type) && image.size <= maxSizeInBytes;
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

  const errors: MealFormState["errors"] = {};

  // Validate title (3-100 chars)
  if (isInvalidText(meal.title, 3, 100)) {
    errors.title = "Title must be between 3 and 100 characters";
  }

  // Validate summary (10-250 chars)
  if (isInvalidText(meal.summary, 10, 250)) {
    errors.summary = "Summary must be between 10 and 250 characters";
  }

  // Validate instructions (30-5000 chars)
  if (isInvalidText(meal.instructions, 30, 5000)) {
    errors.instructions = "Instructions must be between 30 and 5000 characters";
  }

  // Validate creator name (2-50 chars)
  if (isInvalidText(meal.creator, 2, 50)) {
    errors.creator = "Name must be between 2 and 50 characters";
  }

  // Validate email
  if (!isValidEmail(meal.creator_email)) {
    errors.creator_email = "Please enter a valid email address";
  }

  // Validate image
  if (!isValidImageFile(meal.image)) {
    errors.image =
      "Please upload a valid image (JPEG, PNG, WebP, or GIF, max 5MB)";
  }

  // Return all validation errors
  if (Object.keys(errors).length > 0) {
    return {
      message: "Please fix the errors below",
      errors,
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
