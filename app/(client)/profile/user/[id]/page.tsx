"use client"
import Profile from '@app/components/Profile';
import { Post, Session } from '@app/components/PromptList ';
import { fetchUserFile, getSession } from '@lib/action';
import { desc } from '@lib/desc';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';

const UserProfile = ({ params }: any) => {
	const searchParams = useSearchParams();
	const userProfile = use(fetchUserFile(params.id)) as unknown as Post
	const session = use(getSession()) as unknown as Session
	return (
		<>
			<Profile
				name={searchParams.get('name')}
				desc={desc}
				data={userProfile}
				handleEdit={() => { }}
				handleDelete={() => { }}
				session={session} />
		</>
	);
};

export default UserProfile;
