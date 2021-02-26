import { useContext } from 'react'
import { ChallengeContext } from '../context/ChallengeContext'
import style from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges() {

    const { challengesCompleted } = useContext(ChallengeContext);

    return (
        <div className={style.completedChallengesContaine}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}