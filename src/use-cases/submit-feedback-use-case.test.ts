import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSubmitSpy = jest.fn();
const createSendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    {create: createFeedbackSubmitSpy },
    {sendMail: createSendEmailSpy }
)

describe('submit feedback', () => {
    it('should be able to submit feedback', async () => {
        await expect( 
            submitFeedback.execute({
                type: 'BUG',
                comment: 'test',
                screenshot: 'data:image/png;base64,asdf'
            })
        ).resolves.not.toThrow();

        expect(createFeedbackSubmitSpy).toHaveBeenCalled();
        expect(createSendEmailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit feedback with no type', async () => {
        await expect( 
            submitFeedback.execute({
                type: '',
                comment: 'test',
                screenshot: 'data:image/png;base64,asdf'
            })
        ).rejects.toThrow();
    })

    it('should not be able to submit feedback with no comment', async () => {
        await expect( 
            submitFeedback.execute({
                type: 'BUG',
                comment: '',
                screenshot: 'data:image/png;base64,asdf'
            })
        ).rejects.toThrow();
    })

    it('should not be able to submit feedback with invalid screenshot', async () => {
        await expect( 
            submitFeedback.execute({
                type: 'BUG',
                comment: 'test',
                screenshot: 'test.png'
            })
        ).rejects.toThrow();
    })
})