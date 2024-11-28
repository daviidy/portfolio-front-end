import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { formatDate } from "@/lib/utils";

interface Comment {
  id: number;
  created_at: string;
  body_html: string;
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
  children: Comment[];
}

interface CommentsProps {
  comments: Comment[];
  articleUrl: string;
  commentsCount: number;
}

function CommentContent({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <Image
          src={comment.user.profile_image}
          alt={comment.user.name}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium">{comment.user.name}</span>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            @{comment.user.username}
          </span>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            • {formatDate(comment.created_at)}
          </span>
        </div>
        <div 
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: comment.body_html }}
        />
        
        {/* Render replies */}
        {comment.children && comment.children.length > 0 && (
          <div className="mt-4 ml-4 space-y-4 border-l-2 border-neutral-200 dark:border-neutral-800 pl-4">
            {comment.children.map((reply) => (
              <CommentContent key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Comments({ comments, articleUrl, commentsCount }: CommentsProps) {
  const commentUrl = `${articleUrl}#comments`;

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-medium tracking-tighter">
          Comments ({commentsCount})
        </h2>
        <Button asChild variant="outline">
          <Link href={commentUrl} target="_blank" rel="noopener noreferrer">
            Add Comment
          </Link>
        </Button>
      </div>
      
      <div className="space-y-8">
        {comments.map((comment) => (
          <CommentContent key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
