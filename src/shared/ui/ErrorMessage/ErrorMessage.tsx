import Heading from '../Typography/Heading';
import Text from '../Typography/Text';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
    title?: string;
    message?: string;
}

const ErrorMessage = ({
    title = 'Something went wrong',
    message = 'Please try again later',
}: ErrorMessageProps) => {
    const lines = message.split('\n').filter((line) => line.trim());

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Heading className={styles.title}>{title}</Heading>
                <div className={styles.messageContainer}>
                    {lines.map((line, index) => (
                        <Text key={index} className={styles.message}>
                            {line}
                        </Text>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;
