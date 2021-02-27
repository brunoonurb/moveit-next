import { useContext } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';
import styles from '../styles/components/LevelUPModal.module.css'

export function LevelUPModal() {
    const { level, closeUpModal } = useContext(ChallengeContext)
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header> {level} </header>

                <strong>Parabéns</strong>

                <p> Você alcançou um novo level</p>

                <button type="button" onClick={closeUpModal}>
                    <img src="/icons/close.svg" alt="Fechar modal" />
                </button>
            </div>
        </div>
    );
}