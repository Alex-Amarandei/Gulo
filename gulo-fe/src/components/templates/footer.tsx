import Author from '@/components/molecules/footer/author';
import ContactUs from '@/components/molecules/footer/contact-us';
import Copyright from '@/components/molecules/footer/copyright';
import GitHub from '@/components/molecules/footer/github';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4" style={{ height: '10vh' }}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center h-full space-y-4 md:space-y-0 md:space-x-8">
        <ContactUs />
        <Author />
        <GitHub />
        <Copyright />
      </div>
    </footer>
  );
}
