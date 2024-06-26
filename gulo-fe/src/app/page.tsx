import Balance from '@/components/molecules/content/balance';
import FloatingButtons from '@/components/molecules/content/floating-buttons';

export default function Home() {
  return (
    <>
      <div className='flex flex-grow p-4 w-2/3 items-center justify-center h-[90vh] rounded-lg'>
        <Balance />
      </div>
      <FloatingButtons />
    </>
  );
}
