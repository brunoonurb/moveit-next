import { createContext, ReactNode, useState } from 'react'
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
    resetChallenge: () => void
}

interface ChallengeProviderProps {
    children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children }: ChallengeProviderProps) {

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(4);
    const [challengesCompleted, setChallengesCompleted] = useState(1);
    const [activeChallenge, setActiveChallenge] = useState(null)
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
    
    function leveUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randonChallengesIndex = Math.floor(Math.random() * challeges.length);
        const challenge = challeges[randonChallengesIndex];

        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null)
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
            resetChallenge
        }}>
            {children}
        </ChallengeContext.Provider>
    );
}
