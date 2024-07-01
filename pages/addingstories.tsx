import { useState } from 'react';
import { supabase } from '../utils/supabase/client';

const AddStoryForm = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [backTo, setBackTo] = useState('');
  const [type, setType] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    let contentJson;
    let tagsJson;

    try {
      contentJson = JSON.parse(content);
      tagsJson = JSON.parse(tags);
    } catch (error) {
      console.error('Invalid JSON:', error);
      return;
    }

    const { data, error } = await supabase
      .from('stories')
      .insert([
        { 
          id: id,
          title: title,
          content: contentJson,
          tags: tagsJson,
          created_at: new Date(createdAt),
          backTo: backTo,
          type: type
        },
      ]);

    if (error) {
      console.error('Error: ', error);
    } else {
      console.log('Story added: ', data);
    }

    setLoading(false);
    setSubmitted(true);
  };
  
  const handleNewStory = () => {
    setSubmitted(false);
    setLoading(false);
    // reset all form fields
  };

  return (

    loading ? (
        <div>Loading...</div>
      ) : submitted ? (
        <div>
          <div>Submitted!</div>
          <button onClick={handleNewStory} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add New Story</button>
        </div>
      ) : (

    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <label className="block mb-4">
        <span className="block text-gray-700 text-sm font-bold mb-2">ID:</span>
        <input type="text" value={id} onChange={e => setId(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700 text-sm font-bold mb-2">Title:</span>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700 text-sm font-bold mb-2">Content (JSON):</span>
        <textarea value={content} onChange={e => setContent(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700 text-sm font-bold mb-2">Tags (JSON):</span>
        <textarea value={tags} onChange={e => setTags(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700 text-sm font-bold mb-2">Created At:</span>
        <input type="datetime-local" value={createdAt} onChange={e => setCreatedAt(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700 text-sm font-bold mb-2">Back To:</span>
        <input type="text" value={backTo} onChange={e => setBackTo(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700 text-sm font-bold mb-2">Type:</span>
        <input type="text" value={type} onChange={e => setType(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </label>
    
        <input type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" />
        </form>
    )
  );
};

export default AddStoryForm;