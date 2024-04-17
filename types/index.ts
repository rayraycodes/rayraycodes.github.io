// /types/index.ts

export interface PostMetaData {
    id: string;
    date?: string;  // Assuming date is an optional string
    title?: string;  // Optional title
    [key: string]: any;  // To handle additional metadata dynamically
  }
  
  export interface PostParams {
    params: {
      id: string;
    };
  }
  
  export interface PostData extends PostMetaData {
    contentHtml: string;
  }
  
  
  export interface StoriesProps {
    allPostsData: PostMetaData[];
    allPostsContent: string[];
  }
  
  export interface PostProps {
    id: string;
    title: string;
    content: string;
    contentHtml: string;
    // other properties...
  }