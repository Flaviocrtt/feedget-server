import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest{
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase{

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest){
        const {type, comment, screenshot} = request;

        if(!type){
            throw new Error('Type is requered');
        }

        if(!comment){
            throw new Error('Coment is requered');
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('screenshot is not base64');
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                `<div style="font-size: 16px; color: #111">`,
                    `<p>tipo: ${type}</p>`,
                    `<p>comentario: ${comment}</p>`,
                    screenshot ? `<img src="${screenshot}" style="max-width: 100%;" />`: '',
            `</div>`,
            ].join('')
        })
    
    }
    
}