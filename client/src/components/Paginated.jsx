import React from "react";
import styles from './Paginated.module.css'

const Paginated = ({ pokemonsPerPage, allPokemons, paginated, currentPage, handlePrevBtn, handleNextBtn }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (  
        <nav>
            <ul>
            <li className={styles.nav_li}>
                <button onClick={handlePrevBtn}>Prev</button>
            </li >
                { pageNumbers && pageNumbers.map(number => (
                    <li key={number} className={currentPage == number ? styles.nav_li_active: styles.nav_li}>
                        <a onClick={() => paginated(number)} className={styles.nav_a}>{number}</a>
                    </li>
                ))}
            <li className={styles.nav_li}>
                <button onClick={handleNextBtn}>Next</button>
            </li>
            </ul>
        </nav>
    );
}

export default Paginated;