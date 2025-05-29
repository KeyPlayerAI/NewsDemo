import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import './EventCard.css';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  time,
  location,
  description,
  image,
}) => {
  return (
    <div className="event-card animate-slide-up">
      {image && (
        <div className="event-card-image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="event-card-content">
        <h3 className="event-card-title">{title}</h3>
        <div className="event-card-details">
          <div className="event-detail">
            <Calendar size={16} />
            <span>{date}</span>
          </div>
          <div className="event-detail">
            <Clock size={16} />
            <span>{time}</span>
          </div>
          <div className="event-detail">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        </div>
        <p className="event-card-description">{description}</p>
        <button className="event-card-button">View Details</button>
      </div>
    </div>
  );
};