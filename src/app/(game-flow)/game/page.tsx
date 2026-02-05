import GameScreen from '@/features/game/components/GameScreen';
import { loadGameConfig } from '@/features/game/config/gameConfig.loader';
import { ErrorMessage } from '@/shared/ui';

const GamePage = async () => {
    try {
        const gameConfig = await loadGameConfig();

        if (!gameConfig?.levels || gameConfig.levels.length === 0) {
            return (
                <ErrorMessage
                    title="No questions available"
                    message="The game configuration is empty. Please check game.config.json"
                />
            );
        }

        return <GameScreen questions={gameConfig.levels} />;
    } catch (error) {
        console.error('Failed to load game page:', error);

        return (
            <ErrorMessage
                title="Failed to load game"
                message={
                    error instanceof Error
                        ? error.message
                        : 'An unexpected error occurred'
                }
            />
        );
    }
};

export default GamePage;
