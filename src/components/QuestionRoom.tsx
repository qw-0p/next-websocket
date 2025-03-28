import React, {useEffect} from 'react';
import Card from "@/components/shared/ui/card.ui";
import Button from "@/components/shared/ui/button.ui";
import {useUserStore} from "@/store/user";
import {socket} from "@/lib/socketClient";
import Avatar from "@/components/shared/ui/avatar.ui";
import {IQuestion} from "@/types";

interface Props {
    questions: IQuestion[],
    roomId: string
}

interface ISelectedOptions {
    userName: string,
    userAvatar: string
}

interface User {
    userName: string,
    userAvatar: string
}

interface IAnswer {
    [key: string]: {
        [key: string]: ISelectedOptions[]
    }
}


const QuestionRoom: React.FC<Props> = ({ questions, roomId }) => {
    const [selectedAnswers, setSelectedAnswers] = React.useState<IAnswer>({});
    const userAvatar = useUserStore((state) => state.avatar)
    const userName = useUserStore((state) => state.userName)

    useEffect(() => {
        socket.on('update_answers', (data) => {
            setSelectedAnswers((prev: IAnswer) => ({
                ...prev,
                [data.questionId]: {
                    ...prev[data.questionId],
                    [data.option]: [
                        ... (prev[data.questionId]?.[data.option] || []),
                        data.user
                    ]
                }
            }))
        })
        return () => {
            socket.off('update_answers')
        }
    }, []);

    const handleSelectAnswer = (questionId: number, option: string ) => {
        const user = {
            userName,
            userAvatar
        } as User
        socket.emit('answer_selected', {questionId, option, roomId, user})
    }


    return (
        <div className="flex flex-col gap-4 mt-8">
            {questions.map((question) => {
                return (
                    <Card className="flex flex-col gap-4" key={question.id}>
                        <h2 className="mb-2">{question.question}</h2>
                        <div className="flex justify-between gap-4">
                            {JSON.stringify(selectedAnswers)}
                            {question.options.map((option) => (
                                <div key={option}>
                                    <Button onClick={() => handleSelectAnswer(question.id, option)}>{option}</Button>
                                    <div>
                                        {selectedAnswers[question.id]?.[option]?.map((user: User, index: number) => (
                                            <span className="flex items-center" key={index}>
                                                <Avatar url={user.userAvatar}  width={14} height={50} />
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

export default QuestionRoom;
