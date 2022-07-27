import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <Image src={`/mcfoxx_logo.svg`} alt={`mcfoxx logo`} width="130" height="130"></Image>
        </a>
      </Link>
    </header>
  )
}

export default Header