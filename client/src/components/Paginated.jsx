/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
//import styles from './Paginated.module.css';
import styled from "styled-components";

const Nav = styled.nav`
    text-align: right;
    margin-right: 100px;
`

const Paginado = styled.ul`
    display: inline-block;
    padding: 0;
    margin: 8px;
    cursor: pointer;
    font-weight: lighter;
    li {
        display:inline-block;
	    margin-right:10px;
        a {
            display:block;
            border: 1px solid black;
	        padding:10px 15px;
	        color:black;
	        background: antiquewhite;
	        text-decoration: none;
        }
        a:active {
            background:black;
	        font-weight:bold;
        }
        a:hover:not(.active) {
            background:orangered;
        }
    }
`
const Paginated = ({ pokemonsPerPage, allPokemons, paginated, currentPage, handlePrevBtn, handleNextBtn }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (  
        <Nav>
            <Paginado>
            <li >{/*className={styles.nav_li}*/}
                <a onClick={handlePrevBtn}>Ant</a>
            </li >
                { pageNumbers && pageNumbers.map(number => (
                    <li onClick={() => paginated(number)} key={number}> {/*className={currentPage == number ? styles.nav_li_active: styles.nav_li}*/}
                        <a onClick={() => paginated(number)} >{number}</a>{/*className={styles.nav_a}*/}
                    </li>
                ))}
            <li >{/*className={styles.nav_li}*/}
                <a onClick={handleNextBtn}>Sig</a>
            </li>
            </Paginado>
        </Nav>
    );
}

export default Paginated;