import { useContext } from 'react';
import { ChallengeContext } from '../context/ChallengeContext';
import style from '../styles/components/Profile.module.css'

export function Profile() {

    const {level} = useContext(ChallengeContext);

    return (
        <div className={style.profileContainer}>
            <img src="https://github.com/brunoonurb.png" alt="Foto Profile" />
            <div>
                <strong>Bruno Pedroso</strong>
                <p>
                    <img src="icons/level.svg" alt="" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}