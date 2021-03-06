import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BounceLoader from 'react-spinners/BounceLoader';
import { colors } from '../styles/theme';
import Button from '../components/Button';
import GitHub from '../components/Icons/GitHub';
import { loginWithGitHub } from '../firebase/firebase';
import useUser, { USER_STATES } from '../hooks/useUser';

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    user && router.replace('/home');
  }, [user]);

  const handleClick = () => {
    loginWithGitHub().catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Devter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <img src="/devter-logo.png" alt="Devter Logo" />
        <h1>Devter</h1>
        <h2>
          Talk about developent with developers
          <span aria-label="tech emojis" role="img">
            👩‍💻👨‍💻
          </span>
        </h2>
        {user === USER_STATES.NOT_LOGGED && (
          <div>
            <Button onClick={handleClick}>
              <GitHub fill="#fff" width="24" height="24" />
              Login with GitHub
            </Button>
          </div>
        )}
        {user === USER_STATES.NOT_KNOWN && <BounceLoader size={60} color="#0099ff" loading />}
      </section>

      <style jsx>
        {`
          img {
            width: 12rem;
          }
          h1 {
            font-size: 2.4rem;
            color: ${colors.primary};
          }
          h2 {
            font-size: 1.6rem;
            color: ${colors.secondary};
          }

          section {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </>
  );
}
