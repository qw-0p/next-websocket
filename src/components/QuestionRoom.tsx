import React, {useEffect} from 'react';
import Card from "@/components/shared/ui/card.ui";
import Button from "@/components/shared/ui/button.ui";
import {useUserStore} from "@/store/user";
import {socket} from "@/lib/socketClient";
import Avatar from "@/components/shared/ui/avatar.ui";

export interface Question {
    id: number;
    question: string;
    options: string[];
}

interface Props {
    questions: Question[]
}


const Question: React.FC<Props> = ({ questions: data }) => {
    const [selectedAnswers, setSelectedAnswers] = React.useState<any>({});
    const userAvatar = useUserStore((state) => state.avatar)

    useEffect(() => {
        socket.on('update_answers', (data) => {
            setSelectedAnswers((prev: any) => {
                return ({
                    ...prev,
                    [data.option]: [...(prev[data.option] || []), data.userAvatar],
                });
            })
        })
        return () => {
            socket.off('update_answers')
        }
    }, []);

    const handleSelectAnswer = (questionId: number, option: string ) => {
        socket.emit('answer_selected', {questionId, option, userAvatar})
    }


    return (
        <div className="flex flex-col gap-4 mt-8">
            {data.map((question) => {
                return (
                    <Card className="flex flex-col gap-4" key={question.id}>
                        <h2 className="mb-2">{question.question}</h2>
                        <div className="flex justify-between gap-4">

                            {question.options.map((option) => (
                                <div key={option}>
                                    <Button onClick={() => handleSelectAnswer(question.id, option)}>{option}</Button>
                                    <div>
                                        {
                                            selectedAnswers[option]?.map((user: any, index: number) => (
                                                <div key={index}>
                                                    <Avatar url={user.userAvatar}  width={50} height={50} />
                                                </div>
                                            ))
                                        }
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

export default Question;
