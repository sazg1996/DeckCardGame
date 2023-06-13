import React from 'react'
import Card from '../Card/Card'
import styles from '../CardList/CardList.module.css'
const CardList = ({children}) => {
  return (
    <div className={styles.cardList}>
      {children}
    </div>
  )
}

export default CardList