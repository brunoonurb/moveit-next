import Head from "next/head";
import React from "react";
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Conutdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CountdownProvider } from "../context/CountdownContext";

import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.contanier}>
      <Head>
        <title>
          Inicio | move.it
        </title>
      </Head>
      <ExperienceBar />
      <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  )
}
