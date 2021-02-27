import { createContext, ReactNode, useEffect, useState } from 'react'
import challeges from '../../challenges.json'

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number
}

interface ChallengeContextData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    experienceToNextLevel: number,
    activeChallenge: Challenge,
    leveUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void
}

interface ChallengeProviderProps {
    children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children }: ChallengeProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    function leveUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randonChallengesIndex = Math.floor(Math.random() * challeges.length);
        const challenge = challeges[randonChallengesIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience > experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            leveUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengeContext.Provider value={{
            level,
            currentExperience,
            challengesCompleted,
            activeChallenge,
            experienceToNextLevel,
            leveUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge
        }}>
            {children}
        </ChallengeContext.Provider>
    );
}
