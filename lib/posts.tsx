import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PostMetaData, PostParams, PostData } from '../types';
import { GetStaticProps } from 'next';


const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(type?: string) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string; type: string; }),
      // Convert date to string
      date: new Date(matterResult.data.date).toISOString(),
    };
  });

  // Filter posts by type if type is provided
  const filteredPosts = type ? allPostsData.filter(post => post.type === type) : allPostsData;

  // Sort posts by date
  return filteredPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds(): PostParams[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => ({
    params: {
      id: fileName.replace(/\.md$/, '')
    }
  }));
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use the title from the front matter
  const title = matterResult.data.title;

  // Provide a default value for backTo
  const backTo = matterResult.data.backTo || '/stories';

  return {
    id,
    title,
    content: matterResult.content,
    contentHtml: '', // Add the missing property 'contentHtml'
    ...(matterResult.data as { [key: string]: any }),  // Ensure additional properties are handled correctly
    backTo, // Use the backTo value
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use the title from the front matter
  const title = matterResult.data.title;
  const content = matterResult.content;

  return {
    props: {
      id,
      title,
      content,
    },
  };
};