import Feed from '@app/components/Feed';
import { desc } from '@lib/desc';
import logo from '@public/assets/images/thops3.png';
import Image from 'next/image';

async function getData() {
	const res = await fetch('http://localhost:3000/api/prompt', { cache: 'no-store' });
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	return res.json();
}

const Home = async () => {
	const data: Post[] = await getData();
	console.log(data);

	return (
		<section className='flex flex-col items-center justify-center w-full'>
			<div className='flex w-full max-w-7xl flex-col items-center justify-center gap-2'>
				<h1 className='text-normal text-center font-mono tracking-wider text-gray-800 '>{desc}</h1>
				<Image src={logo} alt='logo' className='object-contain blur-0' blurDataURL='data:...' placeholder='blur' />
			</div>
			<Feed data={data} />
		</section>
	);
};

export default Home;
