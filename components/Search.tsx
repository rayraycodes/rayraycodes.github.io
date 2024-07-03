import { supabase } from '../utils/supabase/client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SearchProps {
    setIsUlDown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Search({ setIsUlDown }: SearchProps) {

    const [results, setResults] = useState<{ title: any; tags: any; id: any; }[]>([]);

    const search = async (input: string) => {
        console.log('Searching for:', input);
        let { data, error } = await supabase
            .from('stories')
            .select('title, tags, id')
            .ilike('title', `%${input}%`);

        if (error) console.log("Error: ", error);
        else {
            console.log('Search results:', data);
            setResults(data as { title: any; tags: any; id: any; }[]);
        }
    };

    const [input, setInput] = useState('');
    const [top, setTop] = useState(0);
    const [isMouseDown, setIsMouseDown] = useState(false);
    

    // Call the search function whenever the input changes
    useEffect(() => {
        if (input) {
            const inputElement = document.querySelector('input');
            if (inputElement) {
                const rect = inputElement.getBoundingClientRect();
                setTop(rect.top + rect.height + 10);
            }
            search(input);
        } else {
            setResults([]); // If the input is empty, clear the results
        }
        if (results.length > 0) {
            setIsUlDown(true);
        if (results.length <= 0) 
            setIsUlDown(false);
        }
    }, [input]);

    return (
        <div className={`relative w-full text-white flex-col items-center flex justify-center p-2 text-xs sm:text-sm md:text-base animate-slide-fade-in`}>
            {/* <div className="relative flex flex-col items-center justify-center bg-gray-100 animate-slide-fade-in"> */}
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onBlur={() => { if (!isMouseDown) setInput('');}}
                className="text-center top-0 px-3 py-2  text-lg leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Search..."
            />
            <ul
                onMouseDown={() => { setIsMouseDown(true); setIsUlDown(false);}}
                onMouseUp={() => { setIsMouseDown(false); setIsUlDown(false); }}
                onClick={() => { setInput(''); setIsMouseDown(false);}}
                style={{ position: 'fixed', top: `${top}px`, zIndex: 99 }}
                className="w-full max-w-md mx-auto overflow-auto max-h-screen"
            > 
            {results.map((result, index) => (
                <li key={index} className="px-4 py-2 mb-2 bg-white rounded shadow">
                    <Link href={`/post/${result.id}`} target="_blank">


                        <h2 className="text-xl font-bold text-gray-800">{result.title}</h2>
                        <p className="text-sm text-gray-600">
                            {Array.isArray(result.tags)
                                ? result.tags.join(', ')
                                : Object.entries(result.tags).map(([key, value]) => `${key}: ${value}`).join(',  ')
                            }
                        </p>

                    </Link>
                </li>
            ))}
            </ul>
        </div>
    );
}