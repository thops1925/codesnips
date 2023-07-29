import Prompt from './Prompt';
import { Post, Session } from './PromptList ';



type Props = {
	name: string | any;
	desc: string;
	data: Post;
	handleEdit: any;
	handleDelete: any;
	session: Session

};

const Profile = ({
	name,
	desc,
	data,
	handleEdit,
	handleDelete, session }: Props) => {
	return (
		<div className='container sm:container lg:container md:container flex justify-center items-center flex-col my-4'>
			<div className='flex justify-start items-start flex-col space-y-3'>
				<span className='text-2xl font-bold mx-4'>
					{name}
				</span>
				<h1 className='font-mono text-sm font-normal mx-4 lg:w-1/2'>
					{desc}
				</h1>
			</div>

			<div className='grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4 mx-auto'>
				{data.map((post: Post) => (
					<Prompt
						user={post.user[0]}
						session={session}
						post={post}
						key={post.id}
						handleEdit={() =>
							handleEdit
							&& handleEdit(post)}
						handleDelete={() =>
							handleDelete
							&& handleDelete(post)}
					/>
				))}
			</div>
		</div>
	);
};

export default Profile;
