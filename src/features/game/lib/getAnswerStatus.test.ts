import { AnswerStatus } from '@/shared/types';
import { getAnswerStatus } from './getAnswerStatus';

describe('getAnswerStatus', () => {
    describe('when not revealed', () => {
        it('should return Selected for selected answer', () => {
            const status = getAnswerStatus(
                'answer1',
                'answer1',
                ['answer1'],
                false
            );
            expect(status).toBe(AnswerStatus.Selected);
        });

        it('should return Default for non-selected answer', () => {
            const status = getAnswerStatus(
                'answer2',
                'answer1',
                ['answer1'],
                false
            );
            expect(status).toBe(AnswerStatus.Default);
        });

        it('should return Default when no answer selected', () => {
            const status = getAnswerStatus('answer1', null, ['answer1'], false);
            expect(status).toBe(AnswerStatus.Default);
        });
    });

    describe('when revealed', () => {
        it('should return Correct for correct answer', () => {
            const status = getAnswerStatus(
                'answer1',
                'answer1',
                ['answer1'],
                true
            );
            expect(status).toBe(AnswerStatus.Correct);
        });

        it('should return Correct for non-selected correct answer', () => {
            const status = getAnswerStatus(
                'answer2',
                'answer1',
                ['answer2'],
                true
            );
            expect(status).toBe(AnswerStatus.Correct);
        });

        it('should return Wrong for selected wrong answer', () => {
            const status = getAnswerStatus(
                'answer2',
                'answer2',
                ['answer1'],
                true
            );
            expect(status).toBe(AnswerStatus.Wrong);
        });

        it('should return Default for non-selected wrong answer', () => {
            const status = getAnswerStatus(
                'answer3',
                'answer2',
                ['answer1'],
                true
            );
            expect(status).toBe(AnswerStatus.Default);
        });
    });

    describe('edge cases', () => {
        it('should handle undefined correctIds', () => {
            const status = getAnswerStatus(
                'answer1',
                'answer1',
                undefined,
                true
            );
            expect(status).toBe(AnswerStatus.Wrong);
        });

        it('should handle empty correctIds array', () => {
            const status = getAnswerStatus('answer1', 'answer1', [], true);
            expect(status).toBe(AnswerStatus.Wrong);
        });

        it('should handle multiple correct answers', () => {
            const status1 = getAnswerStatus(
                'answer1',
                'answer1',
                ['answer1', 'answer2'],
                true
            );
            const status2 = getAnswerStatus(
                'answer2',
                'answer1',
                ['answer1', 'answer2'],
                true
            );

            expect(status1).toBe(AnswerStatus.Correct);
            expect(status2).toBe(AnswerStatus.Correct);
        });
    });
});
