
import { authOptions } from '@app/(server)/api/auth/[...nextauth]/route';
import Nav from '@app/components/Nav';
import { getCurrentUser } from '@lib/session';
import '@styles/globals.css';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';


export interface Provider {
	name: string;
	email: string;
	image: string
}


const RootLayout = async ({ children }: { children: React.ReactNode }) => {

	return (
		<html lang='eng' suppressHydrationWarning={true}>
			<body
				className='inset-0 m-0 mx-auto max-w-7xl bg-gray-200 p-0 min-w-fit'>
				<Nav />
				<main
					className='font-font-satoshi antialiased'>
					{children}
				</main>
			</body>
		</html>
	);
};

export default RootLayout;
