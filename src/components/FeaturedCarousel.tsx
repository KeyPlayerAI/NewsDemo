import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './FeaturedCarousel.css';

interface CarouselItem {
  id: number;
  image: string;
  title: string;
  description: string;
  category: 'news' | 'sports' | 'community';
}

interface FeaturedCarouselProps {
  items: CarouselItem[];
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length, isTransitioning]);

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'sports':
        return 'featured-category-sports';
      case 'community':
        return 'featured-category-community';
      default:
        return 'featured-category-news';
    }
  };

  return (
    <div className="featured-carousel">
      <button className="carousel-arrow carousel-arrow-left" onClick={goToPrev}>
        <ChevronLeft size={24} />
      </button>
      
      <div className="carousel-content">
        {items.map((item, index) => (
          <div 
            key={item.id}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${item.image})`,
              transform: `translateX(${(index - currentIndex) * 100}%)`,
            }}
          >
            <div className="carousel-item-content animate-fade-in">
              <div className={`featured-category ${getCategoryClass(item.category)}`}>
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </div>
              <h2 className="featured-title">{item.title}</h2>
              <p className="featured-description">{item.description}</p>
              <button className="read-more-btn">Read Full Story</button>
            </div>
          </div>
        ))}
      </div>
      
      <button className="carousel-arrow carousel-arrow-right" onClick={goToNext}>
        <ChevronRight size={24} />
      </button>
      
      <div className="carousel-indicators">
        {items.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};