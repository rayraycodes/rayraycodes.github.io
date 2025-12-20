import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MessageSquare, Send, AlertCircle } from 'lucide-react';
import { githubConfig } from '../config/github.config';

interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

interface CommentsData {
  [storyId: string]: Comment[];
}

interface CommentsProps {
  /**
   * Unique identifier for this page/story
   * Used to store comments per story
   */
  storyId: string;
}

/**
 * Comments component using GitHub Gists API
 * Comments are stored in a GitHub Gist, organized by story ID
 */
export function Comments({ storyId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load comments from GitHub Gist when storyId changes
  useEffect(() => {
    if (storyId) {
      loadComments();
    }
  }, [storyId]);

  const loadComments = async () => {
    if (!githubConfig.gistId) {
      setError('Gist ID not configured. Please set up GitHub Gists in config.');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://api.github.com/gists/${githubConfig.gistId}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load comments');
      }

      const gist = await response.json();
      const file = gist.files[githubConfig.filename];
      
      if (file && file.content) {
        const commentsData: CommentsData = JSON.parse(file.content);
        // Filter comments for this specific story
        const storyComments = commentsData[storyId] || [];
        setComments(storyComments);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error('Error loading comments:', err);
      setError('Failed to load comments. Please check your configuration.');
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveComments = async (updatedComments: Comment[]) => {
    if (!githubConfig.gistId) {
      throw new Error('Gist ID not configured');
    }

    if (!githubConfig.token) {
      throw new Error('GitHub token not configured. Please add a token to github.config.ts');
    }

    // Load current gist content
    const gistResponse = await fetch(
      `https://api.github.com/gists/${githubConfig.gistId}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${githubConfig.token}`,
        },
      }
    );

    if (!gistResponse.ok) {
      throw new Error('Failed to access gist');
    }

    const gist = await gistResponse.json();
    const file = gist.files[githubConfig.filename];
    const commentsData: CommentsData = file?.content 
      ? JSON.parse(file.content) 
      : {};

    // Update comments for this story
    commentsData[storyId] = updatedComments;

    // Update gist
    const updateResponse = await fetch(
      `https://api.github.com/gists/${githubConfig.gistId}`,
      {
        method: 'PATCH',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${githubConfig.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          files: {
            [githubConfig.filename]: {
              content: JSON.stringify(commentsData, null, 2),
            },
          },
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      throw new Error(errorData.message || 'Failed to save comment');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      return;
    }

    if (!githubConfig.token) {
      setError('GitHub token not configured. Please add a token to github.config.ts');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const newComment: Comment = {
        id: Date.now().toString(),
        name: name.trim(),
        message: message.trim(),
        timestamp: Date.now(),
      };

      const updatedComments = [...comments, newComment];
      await saveComments(updatedComments);
      setComments(updatedComments);
      setName('');
      setMessage('');
    } catch (err: any) {
      console.error('Error posting comment:', err);
      setError(err.message || 'Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <section className="mt-16 pt-8 border-t border-gray-200">
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50 animate-pulse" />
          <p>Loading comments...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-gray-700" />
          <h2 className="text-3xl font-semibold tracking-tight">Comments</h2>
        </div>
        
        <p className="text-muted-foreground">
          Share your thoughts, questions, or your own adventure stories below.
          {storyId && (
            <span className="text-xs block mt-1 text-gray-500">
              Comments for this story only
            </span>
          )}
        </p>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-900 font-medium">{error}</p>
              {error.includes('token') && (
                <p className="text-xs text-red-700 mt-1">
                  Please add a GitHub Personal Access Token to <code className="bg-red-100 px-1 rounded">src/config/github.config.ts</code>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="space-y-2">
            <Label htmlFor="comment-name">Your Name</Label>
            <Input
              id="comment-name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comment-message">Your Comment</Label>
            <Textarea
              id="comment-message"
              placeholder="Share your thoughts..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="bg-white resize-none"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting || !name.trim() || !message.trim()}
            className="w-full sm:w-auto"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
                </p>
              </div>
              
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">{comment.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(comment.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {comment.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
