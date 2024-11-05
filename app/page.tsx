// Task: print Image on you web site using avatar_url return by Github API
'use client'

// import Image from 'next/image'
import { useEffect, useState } from 'react'

type PostType = {
    id: number,
    title: string,
    content: string,
    author: string,
    date: Date,
    category: string, 
}

export default function MyFetch() {

    // const [url, setUrl] = useState('')
    const [data, setData] = useState<PostType[]>()

    useEffect(() => {
        async function getData() {
            try {
                // const data = await fetch('https://api.github.com/users/wwarodom')
                const result = await fetch('/api')
                const data2 = await result.json()
                console.log("Data: ", data2) 
                setData(data2)
                // setUrl(result.avatar_url)
            }
            catch(error) {
                console.error("Error: ",error)
            }      
        }
       getData()
    }, [])
  
    if (!data) return <>...loading!!</>

    return (<>
      <div className="min-h-screen bg-blue-50 p-10">
      <h1 className="text-3xl font-bold text-center mb-8">Fetched Data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <h2 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h2>
                  <p className="text-gray-700 mb-4">{item.content}</p>
                  <p className="text-sm text-gray-500">Author: {item.author}</p>
                  <p className="text-sm text-gray-500">Category: {item.category}</p>
                  <p className="text-sm text-gray-500">Date: {new Date(item.date).toLocaleDateString()}</p>
              </div>
          ))}
      </div>
  </div>
       
    </>)
}