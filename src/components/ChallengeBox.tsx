import { useContext } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';
import style from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {

    const { activeChallenge, resetChallenge } = useContext(ChallengeContext)


    return (
        <div className={style.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={style.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="level up" />
                        <strong> Novo desafio </strong>
                        <p>
                            {activeChallenge.description}
                        </p>
                    </main>
                    <footer>
                        <button
                            type="button"
                            className={style.challengeFailedButton}
                            onClick={resetChallenge}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={style.challengeSucceededButton}
                            onClick={resetChallenge}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                    <div className={style.challengeNotActive}>
                        <strong> Finalize um ciclo para receber um desafio  </strong>
                        <p>
                            <img src="icons/level-up.svg" alt="level up" />
                            Avance de level completando desafios
                         </p>
                    </div>
                )}
        </div>
    );
}