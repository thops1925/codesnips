import Prompt from './Prompt';

export interface Post {
	map(arg0: (post: Post) => import("react").JSX.Element): import("react").ReactNode;
	id: string
	title: string
	content: string
	userId: string
	user: [{
		id: string
		name: string
		email: string
		emailVerified: string
		image: string
	}][]
}
export interface Session {
	name: string
	email: string
	image: string
}

export const PromptList = ({ postData, session }: { postData: Post, session: Session }) => {
	console.log(postData)

	return (
		<div className='grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4 mx-auto'>
			{postData.map((post: Post) => (
				<Prompt
					post={post}
					session={session}
					key={post.id}
					handleEdit={undefined}
					handleDelete={undefined}
				/>
			))
			}
		</div>
	);
};
