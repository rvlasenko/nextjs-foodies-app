import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";

export interface IMeal {
  id?: number;
  title: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
  image: File | string;
  slug?: string;
}

const s3 = new S3({
  region: "eu-north-1",
});
const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare<[], IMeal[]>("SELECT * FROM meals").all();
}

export function getMeal(slug: string) {
  return db
    .prepare<[string], IMeal>("SELECT * FROM meals WHERE slug = ?")
    .get(slug);
}

export async function saveMeal(meal: IMeal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: "rvlasenko-nextjs-demo-users-image",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES
    (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
