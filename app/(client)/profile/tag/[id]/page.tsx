'use client';
import Feed from '@app/components/Feed';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

const TagProfile = ({ params }: any) => {
	const router = useRouter();
	const { data: session } = useSession();
	const id = params.id;
	const [copy, setCopy] = useState<any>('');
	const [data, setData] = useState<any>({});
	const [loading, setLoading] = useState(true);

	const getData = async (id: any) => {
		try {
			const res = await fetch(`/api/tag/${id}/posts`);
			if (res.ok) {
				const responseData: any = await res.json();
				setData(responseData);
			} else {
				console.log('Failed to fetch data');
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData(id);
	}, [id]);

	const { creatorId, creator, prompt, tag }: any = data || {};

	if (loading) {
		return <div>Loading...</div>;
	}

	const handleProfile = () => {
		if (creatorId === session?.user.id) return router.push('/profile');
		router.push(`/profile/user/${creatorId}?name=${creator.username}`);
	};
	return (
		<section className='flex justify-center items-center container sm:container lg:container md:container mx-auto'>
			<div
				className='flex-1 flex-col mx-4'
				key={id}>
				<div className='flex gap-3 justify-center items-center mb-4'>
					<Image
						src={creator?.image}
						alt={id}
						width={40}
						height={40}
						className='rounded-full object-contain'
						onClick={handleProfile} />
					<div className='flex flex-col max-w-xl min-w-md'>
						<h3 className='font-semibold text-lg capitalize'>
							{creator?.username.slice(0, 6)}
						</h3>
						<p className=' text-gray-400 text-lg'>
							{creator?.email}
						</p>{' '}
					</div>

					<div
						className=''
						onClick={() => {
							setCopy(prompt);
							navigator.clipboard.writeText(prompt);
							setTimeout(() => setCopy(''), 3000);
						}}>
						{copy === prompt ? (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-8 h-8'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M4.5 12.75l6 6 9-13.5' />
							</svg>
						) : (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='w-8 h-8'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184'
								/>
							</svg>
						)}
					</div>
				</div>
				<div className='flex items-center justify-center bg-slate-700 py-4 rounded-lg'>
					<div className='whitespace-pre-wrap inset-0 break-words text-green-600'>{prompt}</div>
				</div>
				<div className='mx-4 space-x-4 mt-4'>
					<FacebookShareButton
						title={tag}
						url={`https://codesnip-alpha.vercel.app/profile/tag/${id}?tag=${creator?.username}`}>
						<FacebookIcon
							size={32}
							round={true} />
					</FacebookShareButton>

					<TwitterShareButton
						title={tag}
						url={`https://codesnip-alpha.vercel.app/profile/tag/${id}?tag=${creator?.username}`}>
						<TwitterIcon
							size={32}
							round={true} />
					</TwitterShareButton>
				</div>
			</div>
		</section>
	);
};

export default TagProfile;
