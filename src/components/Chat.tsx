'use client';
import Button from '@/components/shared/ui/button.ui';
import React from 'react';

const ChatForm = ({ onSendMessage }: { onSendMessage: (message: string) => void }) => {
	const [message, setMessage] = React.useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim() !== '') {
			onSendMessage(message);
			setMessage("")
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex gap-2 mt-4">
			<input
				onChange={(e) => setMessage(e.target.value)}
				value={message}
				type="text"
				className="flex-1 border-2 px-4 py-2 rounded-lg focus:outline-none"
				placeholder="Type your message" />
			<Button type="submit" className="px-4 py-2 rounded-lg text-white bg-blue-500">Send</Button>
		</form>
	);
};

export default ChatForm;
