import React, { useContext, useState } from 'react'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import CardContext from '../../context/CardContext'
import Styles from './Login.module.css'

const Login = () => {
    const { handleNames } = useContext(CardContext);
    const navigate = useNavigate();
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const handleChangeName1 = (event) => {
        setPlayer1Name(event.target.value);

    };
    const handleChangeName2 = (event) => {
        setPlayer2Name(event.target.value);
    };
    const handleNamesNavigate = () => {

        navigate("/DeckCardGame");
        handleNames(player1Name, player2Name)
    }
    return (


        <div>
            <div className={Styles.loginContainer}>

                <div class={Styles.inputContainer}>
                    <label>Player One</label>
                    <input type='text' name="playerOne" value={player1Name} placeholder="Player One" onChange={handleChangeName1}></input>
                </div>
                <div class={Styles.inputContainer}>
                    <label>Player Two</label>
                    <input type='text' name="playerTwo" value={player2Name} placeholder="Player One" onChange={handleChangeName2}></input>
                </div>



            </div>
            <Button execute={() => handleNamesNavigate()}>Login</Button>
        </div>
    )
}

export default Login