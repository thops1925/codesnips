import Prompt from './Prompt';

export interface Post {
	[x: string]: any;
	map(arg0: (post: Post) => import("react").JSX.Element): import("react").ReactNode;
	id: string
	title: string
	content: string
	userId: string
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
		<div className='grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4 mx-auto'>
			{postData.map((post) => {
				// const postId = post.id;
				// const postTitle = post.title;
				// const postContent = post.content;
				// const userId = post.userId;
				// Accessing users array, for example:
				// const users = post.users[1];

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
