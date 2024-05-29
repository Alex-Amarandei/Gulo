import Link from 'next/link';

export default function Author() {
  return (
    <div className='flex flex-col items-center md:items-start space-y-1 border-l-4 border-gray-600 pl-4 transition-transform duration-300 hover:transform hover:-translate-y-1'>
      <h5 className='text-sm font-bold'>Author</h5>
      <p className='text-xs'>
        Created by{' '}
        <Link
          href='https://www.linkedin.com/in/alex-amarandei/'
          target='_blank'
          className='text-blue-400 hover:underline'>
          Alex Amarandei
        </Link>
      </p>
    </div>
  );
}
