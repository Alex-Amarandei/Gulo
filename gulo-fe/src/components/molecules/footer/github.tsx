import Link from 'next/link';

export default function GitHub() {
  return (
    <div className="flex flex-col items-center md:items-start space-y-1 border-l-4 border-gray-600 pl-4 transition-transform duration-300 hover:transform hover:-translate-y-1">
      <h5 className="text-sm font-bold">GitHub</h5>
      <Link href="https://github.com/Alex-Amarandei/Gulo" className="text-xs text-blue-400 hover:underline">
        github.com/Alex-Amarandei/Gulo
      </Link>
    </div>
  );
}
