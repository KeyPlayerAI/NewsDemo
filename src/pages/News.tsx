import React, { useState } from 'react';
import { NewsCard } from '../components/NewsCard';
import { SearchIcon, Filter } from 'lucide-react';
import './News.css';

// Mock data for news articles
const newsArticles = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg',
    title: 'New Hospital Wing to Open Next Month',
    excerpt: 'The long-awaited expansion of Carroll County Medical Center will open to patients on June 15th.',
    category: 'news',
    timestamp: '2 hours ago',
    author: 'Sarah Johnson',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    title: 'Local Businesses See Post-Pandemic Recovery',
    excerpt: 'Small businesses in Carroll County are reporting improved sales as the economy continues to recover.',
    category: 'news',
    timestamp: '5 hours ago',
    author: 'Michael Chen',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/3628100/pexels-photo-3628100.jpeg',
    title: 'School Board Approves New Curriculum',
    excerpt: 'Carroll County schools will implement an updated curriculum focusing on STEM education starting next fall.',
    category: 'news',
    timestamp: 'Yesterday',
    author: 'David Wilson',
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/2977547/pexels-photo-2977547.jpeg',
    title: 'County Commission Approves Budget for Next Fiscal Year',
    excerpt: 'The Carroll County Commission has approved a $50 million budget for the upcoming fiscal year.',
    category: 'news',
    timestamp: '2 days ago',
    author: 'Emily Parker',
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg',
    title: 'New Public Library Branch to Break Ground Next Week',
    excerpt: 'Construction of the new eastern branch of the Carroll County Public Library will begin next Monday.',
    category: 'news',
    timestamp: '3 days ago',
    author: 'James Wilson',
  },
  {
    id: 6,
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
    title: 'Local Startup Receives Major Investment',
    excerpt: 'Carroll County tech startup SecureHealth has secured $2 million in venture capital funding.',
    category: 'news',
    timestamp: '3 days ago',
    author: 'Lisa Thompson',
  },
  {
    id: 7,
    image: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg',
    title: 'Road Construction to Begin on Highway 27',
    excerpt: 'Major roadwork on Highway 27 will begin next week, with expected delays for commuters.',
    category: 'news',
    timestamp: '4 days ago',
    author: 'Mark Davis',
  },
  {
    id: 8,
    image: 'https://images.pexels.com/photos/2892618/pexels-photo-2892618.jpeg',
    title: 'County Fair Announces Dates and Headliners',
    excerpt: 'The annual Carroll County Fair will return August 15-22 with an exciting lineup of entertainment.',
    category: 'news',
    timestamp: '5 days ago',
    author: 'Jennifer Smith',
  },
];

export const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredNews = newsArticles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="news-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Local News</h1>
          <p>Stay informed with the latest news from Carroll County</p>
        </div>
        <div className="news-search">
          <div className="search-input-container">
            <SearchIcon size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search news..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-btn">
            <Filter size={18} />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      <div className="featured-news">
        <div className="featured-news-image">
          <img src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg" alt="Featured news" />
          <div className="featured-badge">Breaking News</div>
        </div>
        <div className="featured-news-content">
          <h2>County Commission Approves New Downtown Development Plan</h2>
          <p>A new plan to revitalize the downtown area has been approved, bringing new shops and restaurants to Carroll County. The $12 million project will transform the historic district with renovated storefronts, improved sidewalks, and new green spaces.</p>
          <div className="featured-meta">
            <span className="featured-author">By John Anderson</span>
            <span className="featured-time">1 hour ago</span>
          </div>
          <button className="read-more-btn">Read Full Story</button>
        </div>
      </div>
      
      <div className="news-categories">
        <button className="category-btn active">All</button>
        <button className="category-btn">Local Government</button>
        <button className="category-btn">Education</button>
        <button className="category-btn">Business</button>
        <button className="category-btn">Health</button>
      </div>
      
      <div className="news-list">
        {filteredNews.map((article) => (
          <div key={article.id} className="news-list-item">
            <NewsCard
              image={article.image}
              title={article.title}
              excerpt={article.excerpt}
              category={article.category as 'news' | 'sports' | 'community'}
              timestamp={article.timestamp}
              author={article.author}
            />
          </div>
        ))}
      </div>
      
      <div className="pagination">
        <button className="pagination-btn active">1</button>
        <button className="pagination-btn">2</button>
        <button className="pagination-btn">3</button>
        <span className="pagination-ellipsis">...</span>
        <button className="pagination-btn">10</button>
        <button className="pagination-btn pagination-next">Next</button>
      </div>
    </div>
  );
};