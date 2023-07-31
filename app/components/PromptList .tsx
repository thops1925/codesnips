import Prompt from './Prompt';

export interface Post {
	[x: string]: any;
	id: string
	title: string
	content: string
	user: User[]
}
export interface Session {
	id: string;
	sessionToken: string;
	userId: string;
	expires: string
}

export interface User {
	id: string
	name: string
	email: string
	emailVerified: boolean
	image: string
}

export const PromptList = ({
	postData,
	session
}: {
	postData: Post,
	session: Session
}) => {
	return (
		<div className='flex flex-wrap items-center justify-start '>
			{postData.map((post: Post) => {
				return (
					<Prompt
						user={post.users[0]}
						post={post}
						session={session}
						key={post.id}
						handleEdit={undefined}
						handleDelete={undefined}
					/>
				);
			})}
		</div>
	);
};
