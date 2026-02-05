import { Button, Heading, Text } from '@/shared/ui';
import { ButtonVariant, AppLink } from '@/shared/types';
import styles from './not-found.module.css';

const NotFound = () => (
    <main className={styles.container}>
        <div className={styles.content}>
            <div className={styles.errorCode}>404</div>
            <Heading className={styles.title}>Page Not Found</Heading>

            <Text className={styles.message}>
                The page you are looking for doesn&apos;t exist or has been
                moved.
            </Text>

            <Button href={AppLink.Home} variant={ButtonVariant.Primary}>
                Go to Home
            </Button>
        </div>
    </main>
);

export default NotFound;
