import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";
import { IMeal } from "@/lib/meals";

export default function MealItem({
  title,
  slug,
  image,
  summary,
  creator,
}: Omit<IMeal, "instructions">) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={`https://rvlasenko-nextjs-demo-users-image.s3.amazonaws.com/${image}`}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
