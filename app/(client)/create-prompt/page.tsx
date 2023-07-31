import Form from '@app/components/Form';
import { Session } from '@app/components/PromptList ';
import { getSession } from '@lib/action';
import { redirect } from 'next/navigation';

const FormFeed = async () => {
	const [session] = await getSession() as unknown as Session[]
	if (!session) {
		redirect('/')
	} else {
		return <Form type="Create" session={session} />;
	}
};

export default FormFeed;
