import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import markdown from 'remark-parse';
import remarkHtml from 'remark-html';
// import from your project's types directory
import { PostMetaData, PostParams, PostData } from '../types';


const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(): PostMetaData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostMetaData[] = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { [key: string]: any })  // Cast the data part explicitly
    };
  });

  // Assume that date is properly formatted as a string and existent in all posts
  return allPostsData.sort((a, b) => a.date && b.date ? (a.date < b.date ? 1 : -1) : 0);
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
  const matterResult = matter(fileContents);

  const processedContent = await unified()
    .use(markdown)
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as { [key: string]: any })  // Ensure additional properties are handled correctly
  };
}
