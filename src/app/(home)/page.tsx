import Image from 'next/image';
import { Button } from '@/shared/ui';
import { AppLink, ButtonVariant } from '@/shared/types';
import styles from './page.module.css';

const Home = () => (
    <main className={styles.main}>
        <Image
            src="/webp/thumb.webp"
            alt="Thumb image"
            width={624}
            height={368}
            className={styles.image}
        />

        <div className={styles.intro}>
            <h1 className={styles.title}>Who wants to be a millionaire?</h1>
            <Button variant={ButtonVariant.Primary} href={AppLink.Game}>
                Start
            </Button>
        </div>
    </main>
);

export default Home;
