import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions';
import styles from './Paginated.module.css'

const Paginado = () => {
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.allPokemons)//traigp todos los pokemones del estado
    const [currentPage, setCurrentPage] = useState(1)//pagina actual -> setear la pagina actual
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12)//cantidad por pagina -> siempre 12 
    const indexOfLastPokemon = currentPage * pokemonsPerPage;//indice del último pokemon 
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;//indice del primer pokemon
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)//pokemones actuales de la pagina

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    const handleClick = (e) => {
        setCurrentPage(Number(e.target.id));
    }
    
    const handlePrevBtn = () => {//avanza a pagina anterior
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        } 
    }

    const handleNextBtn = () => {//avanza a pagina suguiente
        if (currentPage !== pageNumbers.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    const pageNumbers = [];//array con las paginas
    for (let i=1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.map(number => {//renderiza las paginas
        return (
            <li key={number} id={number} onClick={handleClick} className={currentPage == number ? 'active' : null}>
                {number}
            </li>
        )
    });

    // return (  
    //     <>
    //         <h1>Paginado</h1><br/>
    //         {renderData(currentPokemons)}
    //         <ul className='pageNumbers'>
    //             <li>
    //                 <button onClick={handlePrevBtn}>Prev</button>
    //             </li>
    //             {renderPageNumbers}
    //             <li>
    //                 <button onClick={handleNextBtn}>Next</button>
    //             </li>
    //         </ul>
    //     </>
    // );

    return (  
        <nav>
            {/*{currentPokemons}*/}
            <ul>
            <li className={styles.nav_li}>
                <button onClick={handlePrevBtn}>Prev</button>
            </li >
                { pageNumbers && pageNumbers.map(number => (
                    <li key={number} id={number} className={currentPage == number ? styles.nav_li_active: styles.nav_li}>
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

// const renderData = allPokemons => {
//     return (
//         <ul>
//             {allPokemons.map((todo, index) => {
//                 return <li key={index}>{todo.name}</li>
//             })}
//         </ul>
//     )
// }
 
export default Paginado;

