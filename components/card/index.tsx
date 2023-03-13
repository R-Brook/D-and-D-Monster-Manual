import React, { FC } from "react";
import styles from "./card.module.css";
import Link from "next/link";

export interface CardProps {
  name: string;
  index: string;
  image: string | null;
  type: string;
  size: string;
  hit_points: number;
  armor_class_value: number;
}

export const Card: FC<CardProps> = ({
  name,
  index,
  image,
  type,
  size,
  hit_points,
  armor_class_value,
}) => {
  return (
    <div key={name} className={styles.layout}>
      <div
        className={
          image === null ? styles.imageContainerGrey : styles.imageContainer
        }
      >
        {image && image.length > 0 && (
          <img src={image} alt={name} className={styles.image} />
        )}
      </div>

      <h2 className={styles.monsterName}>{name}</h2>

      <div className={styles.hpContainer}>
        <span>HP </span>
        <span className={styles.hp}>{hit_points}</span>
      </div>

      <p>Type: {type}</p>
      <p>Size: {size}</p>
      <p>AC: {armor_class_value}</p>
      <br />
      {
        <Link
          href="/monster/[index]"
          as={`/monster/${index}`}
          className={styles.button}
        >
          More
        </Link>
      }
    </div>
  );
};
