import Nav from '@app/components/Nav';
import { Provider } from '@app/components/Provider';
import '@styles/globals.css';

export const metadata = {
	title: {
		default: 'codesnipe',
		template: `%s | https://codesnip-alpha.vercel.app/`,
	},
	robots: {
		follow: true,
		index: true,
	},
	...('@hz12pst' &&
		'https://codesnip-alpha.vercel.app/' && {
			twitter: {
				card: 'summary_large_image',
				creator: '@hz12pst',
				site: 'https://codesnip-alpha.vercel.app/',
			},
		}),
};

const RootLayout = ({ children }: any) => {
	return (
		<html lang='eng' suppressHydrationWarning={true}>
			<body className='inset-0 m-0 mx-auto max-w-7xl bg-gray-200 p-0 min-w-fit'>
				<Provider>
					<Nav />
					<main className='font-font-satoshi antialiased'>{children}</main>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
