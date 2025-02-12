import { ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";

interface HackathonCardProps {
  title: string;
  author: string;
  date: string;
  image: string;
  likes: number;
  dislikes: number;
  comments: number;
}

export const HackathonCard = ({
  title,
  author,
  date,
  image,
  likes,
  dislikes,
  comments,
}: HackathonCardProps) => {
  return (
    <div className="card p-4 flex gap-4 hover:scale-[1.02] animate-fade-in border border-gray-300 rounded-lg shadow-sm">
      <img
        src={image}
        alt={title}
        className="w-24 h-24 rounded-lg object-cover"
      />
      <div className="flex-1 space-y-2">
      <div className="flex items-start text-gray-900 justify-between">
          <h3 className="text-lg">{title}</h3>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-sm">{author}</span>
          <span className="text-sm text-gray-400">— {date}</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-green-500" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsDown className="w-4 h-4 text-red-500" />
            <span>{dislikes}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>{comments} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};
