import { signIn } from 'next-auth/react';
import Button from './Button';

const AuthProviders = () => {
	return (
		<>
			<Button
				type='button'
				title='Sign In'
				handleClick={() => signIn()}
			/>
		</>
	)
};

export default AuthProviders;