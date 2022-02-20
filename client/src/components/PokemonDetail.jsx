import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPokemon } from "../actions";

const PokemonDetail = (props) => {
    console.log(props)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDetailPokemon(props.match.params.id));
    }, [dispatch])

    const myPokemon = useSelector(state => state.detail);

    return (
        <div>
            {    
                myPokemon.length > 0 ?
                <div>
                    <h1>Soy {myPokemon[0].name}</h1>
                    <img src={myPokemon[0].sprite} alt='img not found' />
                    <h3>Puntos de vida: {myPokemon[0].hp}</h3>
                    <h3>Fuerza: {myPokemon[0].attack}</h3>
                    <h3>Defenza: {myPokemon[0].defense}</h3>
                    <h3>Velocidad: {myPokemon[0].speed}</h3>
                    <h3>Altura: {myPokemon[0].height}</h3>
                    <h3>Peso: {myPokemon[0].weight}</h3>
                    <h4>Tipos: {typeof myPokemon[0].types[0] === 'object' ? myPokemon[0].types.map(t => t.name + ' ') : myPokemon[0].types.map(t => t + ' ')}</h4>
                </div> : <p>Cargando...</p>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    );
}
 
export default PokemonDetail;