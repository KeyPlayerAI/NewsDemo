import React from 'react';
import { FeaturedCarousel } from '../components/FeaturedCarousel';
import { NewsCard } from '../components/NewsCard';
import './Home.css';

// Mock data for the featured carousel
const featuredItems = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg',
    title: 'County Commission Approves New Downtown Development Plan',
    description: 'A new plan to revitalize the downtown area has been approved, bringing new shops and restaurants to Carroll County.',
    category: 'news',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg',
    title: 'High School Football Team Advances to State Championship',
    description: 'The Carroll County Eagles have advanced to the state championship after a thrilling victory last Friday night.',
    category: 'sports',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    title: 'Annual Arts Festival Returns This Weekend',
    description: 'The beloved Carroll County Arts Festival is back with more artists, food vendors, and live performances than ever before.',
    category: 'community',
  },
];

// Mock data for news cards
const newsItems = [
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
    image: 'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg',
    title: 'Eagles Quarterback Breaks School Record',
    excerpt: 'Senior quarterback Jake Thompson broke the school\'s all-time passing record during Friday\'s game.',
    category: 'sports',
    timestamp: '1 day ago',
    author: 'Alex Rivera',
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/269948/pexels-photo-269948.jpeg',
    title: 'Local Runner Qualifies for Boston Marathon',
    excerpt: 'Carroll County native Emma Williams has qualified for the Boston Marathon with an impressive time.',
    category: 'sports',
    timestamp: '2 days ago',
    author: 'Jessica Lee',
  },
  {
    id: 6,
    image: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg',
    title: 'Community Garden Project Seeks Volunteers',
    excerpt: 'The new community garden initiative is looking for volunteers to help with planting this spring.',
    category: 'community',
    timestamp: '3 days ago',
    author: 'Robert Taylor',
  },
];

export const Home: React.FC = () => {
  return (
    <div className="home-page">
      <FeaturedCarousel items={featuredItems} />
      
      <div className="section-heading">
        <h2>Latest News</h2>
        <a href="/news" className="view-all-link">View All News</a>
      </div>
      
      <div className="news-grid">
        {newsItems.map((item) => (
          <div key={item.id} className="news-grid-item">
            <NewsCard
              image={item.image}
              title={item.title}
              excerpt={item.excerpt}
              category={item.category as 'news' | 'sports' | 'community'}
              timestamp={item.timestamp}
              author={item.author}
            />
          </div>
        ))}
      </div>
    </div>
  );
};