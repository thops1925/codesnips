'use client';
import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@app/components/Form';
import { getCurrentUser } from '@lib/session';

const FormFeed = () => {
	const router = useRouter();
	const session = use(getCurrentUser())
	const [submitting, setIsSubmitting] = useState(false);
	const [post, setPost] = useState({ title: '', content: '' });

	const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch('/api/prompt/new', {
				method: 'POST',
				body: JSON.stringify({
					userId: session?.user?.id,
					title: post.title,
					content: post.content,
				}),
			});

			if (response.ok) {
				router.push('/');
			}
		} catch (error) {
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!session)
		return (
			<div>
				<p>Please login</p>
			</div>
		);

	return <Form
		type='Create'
		post={post}
		setPost={setPost}
		submitting={submitting}
		handleSubmit={createPrompt} />;
};

export default FormFeed;
