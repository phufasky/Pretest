// Task: print Image on you web site using avatar_url return by Github API
'use client'

// import Image from 'next/image'
import { useEffect, useState } from 'react'

// Update MergedType to include author and date
type MergedType = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string; // or Date, depending on the format of the date field in your data
};

export default function MyFetch() {
  const [titles, setTitles] = useState([]);
  const [contents, setContents] = useState([]);
  const [mergedData, setMergedData] = useState<MergedType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch titles
        const titlesRes = await fetch('https://api.example.com/titles');
        const titlesData = await titlesRes.json();
        setTitles(titlesData);

        // Fetch contents
        const contentsRes = await fetch('https://api.example.com/contents');
        const contentsData = await contentsRes.json();
        setContents(contentsData);

        // Merge the data based on the `id`
        const merged = titlesData.map((titleItem:any) => {
          const contentItem = contentsData.find((item:any) => item.id === titleItem.id);
          return {
            id: titleItem.id,
            title: titleItem.title,
            content: contentItem ? contentItem.content : 'No content available',
            author: contentItem ? contentItem.author : 'Unknown author', // add author from content source
            date: contentItem ? contentItem.date : 'Unknown date',       // add date from content source
          };
        });
        setMergedData(merged);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  if (!mergedData.length) return <>Loading...</>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-light-blue">
      {mergedData.map((item) => (
        <div key={item.id} className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p>{item.content}</p>
          <p><strong>Author:</strong> {item.author}</p>
          <p><strong>Date:</strong> {item.date}</p>
        </div>
      ))}
    </div>
  );
}
