import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllStories } from '../lib/stories';

interface Story {
  id: string;
  title: string;
  created_at: string;
  type: string;
}

interface StoryListProps {
  storyType?: string; // Make storyType optional
}

const StoryList: React.FC<StoryListProps> = ({ storyType }) => {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      const data = await getAllStories();

      setStories(data || []);
    };

    fetchStories();
  }, []);

  const filteredStories = storyType 
    ? stories.filter(story => story.type === storyType)
    : stories; // If no storyType is provided, use all stories

  return (
    <div>
      {filteredStories.map((story, index) => (
        <Link href={`/post/${story.id}`} key={story.id}>
          <div key={index} className="postCard transform hover:scale-105 bg-white p-4 rounded-lg shadow-lg mb-8 mx-4 my-6 relative overflow-hidden flex-shrink-0 flex flex-col justify-center items-center" style={{ minWidth: '300px', maxWidth: '500px' }}>
            <h4 className="text-xl font-bold mb-2">{story.title}</h4>
            <p className="text-sm mb-4">{new Date(story.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </Link>
      ))}
       <a href="/" className="mt-4 inline-block bg-nepal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </a>
    </div>
  );
};

export default StoryList;