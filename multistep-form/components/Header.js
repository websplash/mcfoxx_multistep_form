import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
        <Image src={`/mcfoxx_logo.svg`} alt={`mcfoxx logo`} width="100" height="100"></Image>
    </header>
  )
}

export default Header