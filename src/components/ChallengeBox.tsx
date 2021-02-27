import { useContext } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';
import { CountdownContext } from '../context/CountdownContext';
import style from '../styles/components/ChallengeBox.module.css'
import { CompletedChallenges } from './CompletedChallenges';

export function ChallengeBox() {

    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext)
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengesSucceded() {
        completeChallenge();
        resetCountdown();
    }

    function handleChallengesFailed() {
        resetChallenge();
        resetCountdown();
    }

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
                            onClick={handleChallengesFailed}
                        >
                            Falhei
                        </button>
                        <button
                            type="button"
                            className={style.challengeSucceededButton}
                            onClick={handleChallengesSucceded}
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