'use client';
import Profile from '@app/components/Profile';
import { Session } from '@app/components/PromptList ';
import { getSession } from '@lib/action';
import { desc } from '@lib/desc';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

const MyProfile = () => {
    const [session] = use(getSession()) as unknown as Session[]

    const router = useRouter();
    const id = session.userId
    const [post, setPost] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`/api/users/${id}/posts`);
            const data = await response.json();
            setPost(data.reverse());
        };
        getData();
    }, [id]);

    console.log(session)

    const handleEdit = (id: any) => {
        // router.push(`/update-prompt?id=${id.id}`);
    };

    const handleDelete = async (id: any) => {
        // const hasConfirm = confirm('Are you sure?');

        // if (hasConfirm) {
        //     try {
        //         await fetch(`/api/prompt/${id.id}`, {
        //             method: 'DELETE',
        //         });
        //         const filteredPosts = post.filter((item: any) => item.id !== id.id);

        //         setPost(filteredPosts);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    };

    if (!session) {
        return <div>Please login</div>;
    }

    return (
        <div className='flex justify-center items-center flex-col max-w-full'>
            <Profile name='Profile' desc={desc} data={post} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    );
};

export default MyProfile;