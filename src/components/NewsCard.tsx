import React from 'react';
import { Clock } from 'lucide-react';
import './NewsCard.css';

interface NewsCardProps {
  image: string;
  title: string;
  excerpt: string;
  category: 'news' | 'sports' | 'community';
  timestamp: string;
  author?: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  image,
  title,
  excerpt,
  category,
  timestamp,
  author,
}) => {
  const categoryClass = `category-badge category-${category}`;
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Handle card click - can be implemented later
  };
  
  return (
    <div className="news-card animate-fade-in" onClick={handleClick}>
      <div className="news-card-image">
        <img src={image} alt={title} />
        <div className={categoryClass}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </div>
      </div>
      <div className="news-card-content">
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-excerpt">{excerpt}</p>
        <div className="news-card-meta">
          <span className="news-card-time">
            <Clock size={14} />
            {timestamp}
          </span>
          {author && <span className="news-card-author">By {author}</span>}
        </div>
      </div>
    </div>
  );
};