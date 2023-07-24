import Nav from '@app/components/Nav';
import '@styles/globals.css';



const RootLayout = ({ children }: any) => {
	return (
		<html lang='eng' suppressHydrationWarning={true}>
			<body className='inset-0 m-0 mx-auto max-w-7xl bg-gray-200 p-0 min-w-fit'>
				<Nav />
				<main className='font-font-satoshi antialiased'>{children}</main>
			</body>
		</html>
	);
};

export default RootLayout;
