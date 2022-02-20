import React from "react";
import styles from './Card.module.css'

export default function Card({ attack, sprite, name, type }) {
    return (
        <div className={styles.card}>
            <h2 hidden>Strength: {attack}</h2>
            <img src={sprite} alt="img not found" className={styles.image}/>
            <h3>Name: {name}</h3>
            <h5>Types: {type}</h5>
        </div>
    )
}