import React, { useContext, useEffect } from 'react'
import DeckCardPlayer from '../DeckCardPlayer/DeckCardPlayer'
import Button from '../Button/Button'
import CardContext from '../../context/CardContext'
import { json } from 'react-router-dom'
import Status from '../../constants/Status';
const DeckCardGame = () => {
const {players,deckId,cardsFromAPI,drawCard,statusGame,discard}=useContext(CardContext);

  useEffect(() => {

    cardsFromAPI();
    
  }, []);

  return (
    <div>  <Button execute={() => drawCard()} disabled={statusGame!==Status.PLAYING}>Draw</Button>
   
    <DeckCardPlayer playerName={players.player1Name} playerCards={players.playerOneCards} discard={discard} numPlayer={"One"}></DeckCardPlayer>
    
  
    <DeckCardPlayer playerName={players.player2Name} playerCards={players.playerTwoCards} discard={discard} numPlayer={"Two"}></DeckCardPlayer>
    
    </div>
  )
}

export default DeckCardGame