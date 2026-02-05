import { Button, Heading, ThumbImage } from '@/shared/ui';
import { AppLink, ButtonVariant } from '@/shared/types';
import styles from './page.module.css';

const Home = () => (
    <main className={styles.main}>
        <ThumbImage className={styles.image} />

        <div className={styles.intro}>
            <Heading className={styles.title}>
                Who wants to be a millionaire?
            </Heading>
            <Button variant={ButtonVariant.Primary} href={AppLink.Game}>
                Start
            </Button>
        </div>
    </main>
);

export default Home;
