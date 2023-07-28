'use client';

import Image from 'next/image';
import Link from 'next/link';
import AuthProviders from './AuthProviders';
import { signOut, } from 'next-auth/react';
import Button from './Button';
import { Session } from './PromptList ';
import { Provider } from '@app/(client)/layout';




const DesktopNav = ({ session }: { session: Provider }) => {
	return (
		<div className='sm:flex hidden'>
			{session ? (
				<div className='flex gap-3 md:gap-5 items-center'>
					<Link
						href='/create-prompt'
						className='text-white rounded-full bg-black px-5 py-3 font-bold tracking-wide h-12'>
						Create Post
					</Link>

					<Button
						type='button'
						title='Sign Out'
						handleClick={() => signOut()}
					/>

					<Link href='/profile'>
						<Image
							src={session.image}
							alt='logo'
							className='rounded-full blur-0 object-fit h-12 w-12 border border-black'
							width={100}
							height={100}
						/>
					</Link>
				</div>
			) : (
				<>
					{!session &&
						<AuthProviders />
					}
				</>
			)}
		</div>
	);
};

export default DesktopNav;
