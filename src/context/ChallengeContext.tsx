import { createContext, ReactNode, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect';
import Cookies from 'js-cookie';
import challeges from '../../challenges.json'
import { LevelUPModal } from '../components/LeveUpModal';

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
	closeUpModal: () => void
}

interface ChallengeProviderProps {
	children: ReactNode;
	level: number,
	currentExperience: number,
	challengesCompleted: number
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({ children, ...rest }: ChallengeProviderProps) {

	const [level, setLevel] = useState(rest.level ?? 1);
	const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
	const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
	const [activeChallenge, setActiveChallenge] = useState(null)
	const [islevelUpModal, setIslevelUpModal] = useState(false)
	const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

	useEffect(() => {
		Notification.requestPermission()
	}, [])

	useEffect(() => {
		Cookies.set('level', String(level));
		Cookies.set('currentExperience', String(currentExperience));
		Cookies.set('challengesCompleted', String(challengesCompleted));

	}, [level, currentExperience, challengesCompleted])

	function leveUp() {
		setLevel(level + 1);
		setIslevelUpModal(true)
	}
	function closeUpModal() {
		setIslevelUpModal(false)
	}

	function startNewChallenge() {
		const randonChallengesIndex = Math.floor(Math.random() * challeges.length);
		const challenge = challeges[randonChallengesIndex];

		setActiveChallenge(challenge);

		new Audio('/notification.mp3').play();

		if (!isMobile && Notification.permission === 'granted') {
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
			completeChallenge,
			closeUpModal
		}}>
			{children}
			{islevelUpModal && <LevelUPModal />}
		</ChallengeContext.Provider>
	);
}
