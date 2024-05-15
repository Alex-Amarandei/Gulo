"use client";
import fetchStreams from "@/api/fetchStreams";
import { useEffect, useState } from "react";
import StreamList from "./streamList";

export default function StreamsWidget() {
	const [streams, setStreams] = useState<Stream[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchStreams();
			setStreams(data);
			setLoading(false);
		};

		fetchData();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return <StreamList streams={streams} />;
}
