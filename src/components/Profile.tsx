import style from '../styles/components/Profile.module.css'

export function Profile() {
    return (
        <div className={style.profileContainer}>
            <img src="https://github.com/brunoonurb.png" alt="Foto Profile" />
            <div>
                <strong>Bruno Pedroso</strong>
                <p>
                    <img src="icons/level.svg" alt="" />
                    Level 1
                </p>
            </div>
        </div>
    );
}