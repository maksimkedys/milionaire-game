import GameScreen from '@/features/game/components/GameScreen';
import gameConfig from '@/features/game/config/game.config.json';

const GamePage = () => <GameScreen questions={gameConfig.levels} />;

export default GamePage;
