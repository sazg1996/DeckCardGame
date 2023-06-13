import React from 'react'
import styles from '../Card/Card.module.css'
import Button from '../Button/Button';

const handleClick = event => {

    console.log(event.target);

    console.log('Image clicked');
};

const Card = ({ card,showDiscard, discard}) => {

    return (
        <div className={styles.card}>
            <img src={card.image} onClick={handleClick} />
           {showDiscard ? 
                <Button execute={()=>discard(card.code)}>Discard</Button>
                :null
           }
            
        </div>
    )
}

export default Card