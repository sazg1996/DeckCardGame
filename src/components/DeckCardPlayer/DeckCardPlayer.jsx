import React, { useState } from 'react'
import CardList from '../CardList/CardList'
import Card from '../Card/Card';
import Styles from './DeckCard.module.css'

const DeckCardPlayer = ({ playerName, playerCards, discard,numPlayer }) => {


    return (
        <div>
            <div className={Styles.playerHeader}>
                <strong>Player {playerName==""?  numPlayer:playerName}  </strong>
                <br />
                <label>Cards Obtained</label>
            </div>
            <div >
                <CardList  >
                    {playerCards.map(card => (
                        <Card
                            key={card.code}
                            card={card}
                            showDiscard={playerCards.length > 10}
                            discard={discard}
                        />
                    ))}
                </CardList>

            </div>




        </div>
    )
}

export default DeckCardPlayer