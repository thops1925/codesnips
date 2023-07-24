"use client"
import Image from 'next/image';
import logo from '@public/assets/images/thops3.png';
import { useState } from 'react';
import Link from 'next/link';
import AuthProviders from './AuthProviders';
import { signOut, } from 'next-auth/react';
import Button from './Button';


type Props = {
	session: any;
};
const MobileViewNav = ({ session }: Props) => {

	const [dropDown, setDropDown] = useState(false);
	return (
		<div className='relative mx-3 flex sm:hidden'>
			{session?.user ? (
				<div className='flex'>
					<Image
						src={logo}
						alt='logo'
						className='h-12 w-12 rounded-full border border-black object-contain blur-0 '
						width={100}
						height={100}
						onClick={() => setDropDown((prev) => !prev)}
					/>
					{dropDown && (
						<div className='absolute right-0 top-full z-40 mt-3 flex h-screen w-screen flex-col items-center justify-start gap-2 rounded-lg p-5 backdrop-blur'>
							<Link href='/profile' onClick={() => setDropDown(false)} className='h-12 font-bold capitalize  tracking-wide'>
								my profile
							</Link>
							<Link href='/create-prompt' className=' h-12 font-bold capitalize tracking-wide' onClick={() => setDropDown(false)}>
								Create Post
							</Link>


							<Button
								type='button'
								title='Sign Out'
								handleClick={() => {
									setDropDown(false);
									signOut();
								}}
							/>

						</div>
					)}
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

export default MobileViewNav;
