import { faCircleNodes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function GraphButton() {
  return (
    <div className='bg-gray-800 text-sablier info-button rounded-full p-4 z-50 transition-transform duration-300 hover:-translate-y-1 cursor-pointer text-center py-5'>
      <Link href='/graph'>
        <FontAwesomeIcon icon={faCircleNodes} size='xl' className='sablier' />
      </Link>
    </div>
  );
}
