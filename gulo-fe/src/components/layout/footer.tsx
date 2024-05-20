import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-gray-800 text-white py-4" style={{ height: "8vh" }}>
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center h-full space-y-4 md:space-y-0 md:space-x-8">
				{/* Contact Us */}
				<div className="flex flex-col items-center md:items-start space-y-1 border-l-4 border-gray-600 pl-4 transition-transform duration-300 hover:transform hover:-translate-y-1">
					<h5 className="text-sm font-bold">Contact Us</h5>
					<p className="text-xs">Email: alex.m.amarandei@gmail.com</p>
				</div>

				{/* Author */}
				<div className="flex flex-col items-center md:items-start space-y-1 border-l-4 border-gray-600 pl-4 transition-transform duration-300 hover:transform hover:-translate-y-1">
					<h5 className="text-sm font-bold">Author</h5>
					<p className="text-xs">
						Created by{" "}
						<Link href="https://www.linkedin.com/in/alex-amarandei/" target="_blank" className="text-blue-400 hover:underline">
							Alex Amarandei
						</Link>
					</p>
				</div>

				{/* GitHub */}
				<div className="flex flex-col items-center md:items-start space-y-1 border-l-4 border-gray-600 pl-4 transition-transform duration-300 hover:transform hover:-translate-y-1">
					<h5 className="text-sm font-bold">GitHub</h5>
					<Link href="https://github.com/Alex-Amarandei/Gulo" className="text-xs text-blue-400 hover:underline">
						github.com/Alex-Amarandei/Gulo
					</Link>
				</div>

				{/* Copyright */}
				<div className="flex flex-col items-center md:items-start space-y-1 border-l-4 border-gray-600 pl-4 transition-transform duration-300 hover:transform hover:-translate-y-1">
					<p className="text-sm font-bold">&copy; 2024 Gulo. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
