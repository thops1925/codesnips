import Feed from '@app/components/Feed';
import { desc } from '@lib/desc';
import logo from '@public/assets/images/thops3.png';
import Image from 'next/image';
import Loading from './loading';
import { Suspense } from 'react';
import { getCurrentUser } from '@lib/session';
import { fetchAll } from '@lib/action';
import { Post, Session } from '@app/components/PromptList ';



const Home = async () => {
	const session = await getCurrentUser() as unknown as Session
	const post = await fetchAll() as unknown as Post

	return (
		<section className='flex flex-col items-center justify-center w-full'>
			<div className='flex w-full max-w-7xl flex-col items-center justify-center gap-2'>
				<h1 className='text-normal text-center font-mono tracking-wider text-gray-800 '>
					{desc}
				</h1>
				<Image
					src={logo}
					alt='logo'
					className='object-contain blur-0'
					blurDataURL='data:...'
					placeholder='blur' />
			</div>
			<Suspense fallback={<Loading />}>
				<Feed
					post={post}
					session={session}
				/>
			</Suspense>
		</section>
	);
};

export default Home;
