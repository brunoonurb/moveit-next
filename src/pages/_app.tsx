import { ChallengeProvider } from '../context/ChallengeContext'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChallengeProvider>
      <Component {...pageProps} />
    </ChallengeProvider>
  );
}

export default MyApp
