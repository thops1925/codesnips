'use client';

import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Post, Session, User } from './PromptList ';
import Modal from './Model';

type Props = {
	post: Post
	handleEdit: any;
	handleDelete: any;
	session: Session
	user: User
};

const Prompt = ({
	post,
	handleEdit,
	handleDelete,
	session,
	user
}: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const [copy, setCopy] = useState('');
	const [line, setLine] = useState(false);

	const handleCopy = () => {
		setCopy(post.content);
		navigator.clipboard.writeText(post.content);
		setTimeout(() => setCopy(''), 3000);
	};

	const handleProfile = () => {
		if (user.id === session.userId) return router.push('/profile');
		router.push(`/profile/user/${post.id}?name=${user.name}`);
	};

	const handleTagClick = (id: string) => {
		router.push(`/profile/tag/${id}?tag=${user.name}`);
	};

	return (
		<div className='rounded-lg border border-gray-300 bg-white/20
		 bg-clip-padding backdrop-blur-lg backdrop-filter w-full px-4 py-4 
		 max-w-sm  min-w-md max-h-md h-60'>
			<div className='flex justify-between items-start'>
				<div className='flex flex-row justify-center items-center gap-3 cursor-pointer'>
					<Link href='/profile'>
						<Image
							src={user.image}
							alt={user.id}
							width={40}
							height={40}
							className='rounded-full object-contain' />
					</Link>
					<div className='flex flex-col ' onClick={handleProfile}>
						<h3 className='font-satoshi font-semibold text-gray-900 '>
							{user.name}
						</h3>
						<p className='text-sm text-gray-400'>
							{user.name}</p>
					</div>
				</div>
				<div className=' w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] 
				backdrop-blur flex justify-center items-center cursor-pointer'
					onClick={handleCopy}>
					{copy === post.content ? (
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
						</svg>
					) : (
						<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 
								0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 
								1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 
								48.208 0 011.927-.184'
							/>
						</svg>
					)}
				</div>
			</div>
			<p className='text-normal text-sky-500 font-bold my-4 cursor-pointer capitalize'
				onClick={() => handleTagClick && handleTagClick(post.id)}>
				{post.title}
			</p>

			<div className={`
			${line
					? ' bg-slate-700 py-4 rounded-lg'
					: ''}
					`}
				onClick={() => setLine(!line)}>

				<code className={`font-mono text-sm text-gray-700 whitespace-pre-line z-20
				${line
						? 'text-green-600 bg-slate-700 mx-4 '
						: 'line-clamp-6 '}`}>
					{/* <Modal> */}
					{post.content}
					{/* </Modal> */}
				</code>
			</div>

			{session?.userId === user.id
				&& pathname === '/profile'
				&& (
					<div className='flex flex-row gap-3 mt-3'>
						<p className='rounded-full font-bold tracking-wide border border-black  px-5 py-3 h-12 cursor-pointer'
							onClick={handleEdit}>
							Edit
						</p>
						<p className='text-white rounded-full bg-black px-5 py-3 font-bold tracking-wide h-12 cursor-pointer'
							onClick={handleDelete}>
							Delete
						</p>
					</div>
				)}
		</div>
	);
};

export default Prompt;
