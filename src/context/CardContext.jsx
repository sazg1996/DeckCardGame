import React, { Children, createContext } from 'react'
import { useState } from 'react';
import Status from '../constants/Status';
import axios from 'axios';
const CardContext = createContext();
const CardProvider = ({ children }) => {



  const [statusGame, setStatusGme] = useState(Status.PLAYING);
  const [deckId, setDeckId] = useState('');
  const [players, setPlayers] = useState({
    player1Name: '',
    player2Name: '',
    playerOneCards: [],
    playerTwoCards: [],
  });
  const cardsFromAPI = async () => {
    const url = 'http://deckofcardsapi.com/api/deck/new/draw/?count=20'
    const { data } = await axios(url);
    let cards = data.cards.map((card) => {
      return {
        code: card.code,
        value: card.value,
        numericValue: convertCardValueToNumber(card),
        suit: card.suit,
        image: card.image
      }
    });
    cards.sort((a, b) => a.numericValue - b.numericValue);
    setDeckId(data.deck_id)
    setPlayers({
      ...players,
      playerOneCards: cards.slice(0, 10),
      playerTwoCards: cards.slice(10, 20),
    });

  }

  const convertCardValueToNumber = (card) => {
    switch (card.value) {
      case "ACE":
        return 1 ;
      case "JACK":
        return 11;
      case "QUEEN":
        return 12;
      case "KING":
        return 13;
      default:
        return card.value;
    }
  }

  const drawCard = async () => {
    setStatusGme(Status.WAITING);
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    const { data } = await axios(url);

    let drewCards = data.cards.map((card) => {
      return {
        code: card.code,
        value: card.value,
        numericValue: convertCardValueToNumber(card),
        suit: card.suit,
        image: card.image
      }
    });






    if (drewCards && drewCards.length > 0) {
      setPlayers({
        ...players,
        playerOneCards: players.playerOneCards.concat(drewCards[0]),
        playerTwoCards: players.playerTwoCards.concat(drewCards[1])
      })
    }
    else
    {
      setStatusGme(Status.FNISHED);
      alert("No hay más cartas")
    }
  }

  const handleNames = (player1Name, player2Name) => {
    setPlayers({
      player1Name: player1Name,
      player2Name: player2Name,
      playerOneCards: [],
      playerTwoCards: [],

    })


  }
  function evaluateGame(cards) {
    let three = 0;
    let poker = 0;
    let straight = false;
    
    for (let i = 0; i < cards.length; i++) {
      let count = 1;
      while (i + 1 < cards.length && cards[i].numericValue === cards[i + 1].numericValue) {
        count++;
        i++;
      }
      if (count === 3) {
        three++;
      } else if (count === 4) {
        poker++;
      }
    }
    
    for (let i = 0; i <= cards.length - 4; i++) {
      let subconjuntostraight = true;
      let suit = cards[i].suit;
      for (let j = i + 1; j < i + 4; j++) {
        if (cards[j].numericValue !== cards[j - 1].numericValue + 1 || cards[j].suit !== suit) {
          subconjuntostraight = false;
          break;
        }
      }
      if (subconjuntostraight) {
        straight = true;
        break;
      }
    }
    
    if ((three === 2 && poker === 1) || (three === 2 && straight)) {
      return true;
    }
    
    return false;
  }
  const discard = (cardCode) => {

    let updatePlayers = {
      ...players,
      playerOneCards: players.playerOneCards.filter(card => card.code !== cardCode),
      playerTwoCards: players.playerTwoCards.filter(card => card.code !== cardCode),
    }
    

    if (updatePlayers.playerOneCards.length == 10 && updatePlayers.playerTwoCards.length == 10) {
      updatePlayers.playerOneCards = updatePlayers.playerOneCards.sort((a, b) => a.numericValue - b.numericValue);
      updatePlayers.playerTwoCards = updatePlayers.playerTwoCards.sort((a, b) => a.numericValue - b.numericValue);

      setStatusGme(Status.PLAYING);
    }
    setPlayers(updatePlayers)
    let isWinnerOne = evaluateGame(updatePlayers.playerOneCards);

    let isWinnerTwo = evaluateGame(updatePlayers.playerTwoCards);
    console.log(isWinnerOne, isWinnerTwo);
    if(isWinnerOne || isWinnerTwo) {
      setStatusGme(Status.FNISHED);
      alert(`Felicidades ${isWinnerOne ? updatePlayers.player1Name: updatePlayers.player2Name}. Has ganado el juego`)
    }
    
      
    


  }


  return (
    <CardContext.Provider
      value={{ players, deckId, cardsFromAPI, handleNames, drawCard, statusGame, discard }}>
      {children}
    </CardContext.Provider>
  );
}
export { CardProvider }
export default CardContext