'use client';

import Link from 'next/link';
import { Session } from './PromptList ';
import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';

type Props = {
	type: string;
	session: Session
};

const Form = ({
	type,
	session
}: Props) => {
	const [submitting, setIsSubmitting] =
		useState(false);
	const [formData, setPost] =
		useState({
			title: '',
			content: ''
		});

	const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const response = await fetch('/api/prompt/new', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: session.userId,
					title: formData.title,
					content: formData.content,
				}),
			});

			if (response.ok) {
				window.location.href = '/';
			}
		} catch (error) {
		} finally {
			setIsSubmitting(false);
		}
	};




	return (
		<section className='w-full max-w-full flex justify-center items-center  flex-col'>
			<h1 className='text-5xl flex items-center justify-center font-bold'>
				{type}
			</h1>
			<form onSubmit={createPrompt}
				className='mt-10 w-full flex flex-col rounded-xl border border-gray-200
				 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-5 '>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700 '>
						TITLE
					</span>
					<input
						value={formData.title}
						onChange={(e) => setPost({
							...formData,
							title: e.target.value
						})}
						required
						className=' font-satoshi  w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0'
						placeholder='CREATE A TITLE OR KEY WORD THAT YOU CAN REMEMBER YOUR CODE'
					/>
				</label>
				<label>
					<span className='font-satoshi font-semibold text-base text-gray-700 '>
						Code ...
					</span>
					<textarea
						value={formData.content}
						onChange={(e) => setPost({
							...formData,
							content: e.target.value
						})}
						required
						className=' font-satoshi w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-500 outline-0 '
						placeholder='PASTE YOUR CODE HERE'
					/>
				</label>

				<div className='flex justify-end items-end mx-3 my-4 mb-5 gap-4'>
					<Link
						href='/'
						className='font-bold border border-black rounded-full  px-8 py-4'>
						Cancel
					</Link>
					<button
						type='submit'
						disabled={submitting}
						className='font-bold border border-black rounded-full px-4 py-4 bg-black text-white'>
						{submitting ? `${type} ... ` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
