// Task: print Image on you web site using avatar_url return by Github API
'use client'

// import Image from 'next/image'
import { useEffect, useState } from 'react'

type TitleType = {
    id: number;
    title: string;
};

type ContentType = {
    id: number;
    content: string;
};

export default function MyFetch() {
    const [titles, setTitles] = useState<TitleType[]>([]);
    const [contents, setContents] = useState<ContentType[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch titles from the first API
                const titleResponse = await fetch('https://jsonplaceholder.typicode.com/photos'); // Adjust to actual API
                const titleData = await titleResponse.json();
                
                // Fetch contents from the second API
                const contentResponse = await fetch('https://api.vercel.app/blog'); // Adjust to actual API
                const contentData = await contentResponse.json();

                setTitles(titleData);
                setContents(contentData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    if (!titles.length || !contents.length) return <>...loading!!</>;
    
    return (
        <div className="min-h-screen bg-blue-50 p-10">
            <h1 className="text-3xl font-bold text-center mb-8">Combined Data</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {titles.map((titleItem, index) => {
                    // Get the corresponding content from the second API (assuming they align by index)
                    const contentItem = contents[index];
                    return (
                        <div key={titleItem.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-xl font-semibold text-blue-800 mb-2">{titleItem.title}</h2>
                            <p className="text-gray-700">{contentItem?.content || "No content available"}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}