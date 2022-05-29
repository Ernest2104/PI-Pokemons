import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
    text-align: right;
    margin-right: 6rem;
`
const Paginado = styled.ul`
    display: inline-block;
    padding: 0;
    margin: 0.4rem;
    cursor: pointer;
    font-weight: bold;
    font-size: calc(0.4rem + 0.4vw);
    li {
        display:inline-block;
	    margin-right:0.7rem;
        a {
            display:block;
            border: 1px solid black;
	        padding:0.4rem 0.9rem;
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
const Paginated = ({ pokemonsPerPage, allPokemons, paginated, handlePrevBtn, handleNextBtn }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (  
        <Nav>
            <Paginado>
            <li >
                <a onClick={handlePrevBtn}>Ant</a>
            </li >
                { pageNumbers && pageNumbers.map(number => (
                    <li onClick={() => paginated(number)} key={number}> 
                        <a onClick={() => paginated(number)} >{number}</a>
                    </li>
                ))}
            <li >
                <a onClick={handleNextBtn}>Sig</a>
            </li>
            </Paginado>
        </Nav>
    );
}

export default Paginated;