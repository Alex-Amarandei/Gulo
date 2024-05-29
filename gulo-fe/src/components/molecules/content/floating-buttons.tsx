import BuyMeACoffeeButton from '@/components/atoms/buttons/buy-me-a-coffee-button';
import InfoButton from '@/components/atoms/buttons/info-button';

export default function FloatingButtons() {
  return (
    <div className='fixed bottom-20 right-5 flex flex-col space-y-4 z-50'>
      <BuyMeACoffeeButton />
      <InfoButton />
    </div>
  );
}
