import React from 'react';
import { EventCard } from '../components/EventCard';
import { CalendarIcon, Users, Bell } from 'lucide-react';
import './Community.css';

// Mock data for community events
const communityEvents = [
  {
    id: 1,
    title: "Farmer's Market Opening Weekend",
    date: "April 15, 2025",
    time: "9:00 AM - 2:00 PM",
    location: "Downtown Square",
    description: "Join us for the opening weekend of the Carroll County Farmer's Market featuring local produce, handmade crafts, and live music.",
    image: "https://images.pexels.com/photos/2284170/pexels-photo-2284170.jpeg",
  },
  {
    id: 2,
    title: "School Board Meeting",
    date: "April 18, 2025",
    time: "6:30 PM",
    location: "County Office Building",
    description: "Monthly meeting of the Carroll County School Board. Open to the public with time for community comments.",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
  },
  {
    id: 3,
    title: "Community Clean-Up Day",
    date: "April 20, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "Various Locations",
    description: "Volunteer to help clean up parks and public spaces throughout Carroll County. Supplies will be provided.",
    image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg",
  },
  {
    id: 4,
    title: "Arts and Crafts Festival",
    date: "April 22-23, 2025",
    time: "10:00 AM - 6:00 PM",
    location: "Community Center",
    description: "Annual arts and crafts festival featuring works from local artisans, workshops, and food vendors.",
    image: "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg",
  },
  {
    id: 5,
    title: "Library Book Sale",
    date: "April 25, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Public Library",
    description: "Quarterly book sale benefiting the Carroll County Public Library. Great deals on books, DVDs, and more.",
    image: "https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg",
  },
  {
    id: 6,
    title: "Career Fair",
    date: "April 28, 2025",
    time: "11:00 AM - 3:00 PM",
    location: "Community College",
    description: "Career fair with local employers looking to hire. Bring your resume and dress professionally.",
    image: "https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg",
  },
];

// Mock data for volunteer opportunities
const volunteerOpportunities = [
  {
    id: 1,
    title: "Food Bank Helpers",
    organization: "Carroll County Food Bank",
    commitment: "Flexible hours",
    description: "Sort and package food donations for distribution to those in need.",
  },
  {
    id: 2,
    title: "Youth Mentors",
    organization: "Big Brothers Big Sisters",
    commitment: "4-6 hours/week",
    description: "Mentor youth in our community through activities and guidance.",
  },
  {
    id: 3,
    title: "Animal Shelter Volunteers",
    organization: "County Animal Shelter",
    commitment: "2-4 hours/week",
    description: "Help care for animals and assist with adoption events.",
  },
];

export const Community: React.FC = () => {
  return (
    <div className="community-page">
      <div className="page-header">
        <h1>Community</h1>
        <p>Stay connected with events and opportunities in Carroll County</p>
      </div>
      
      <div className="community-banner">
        <div className="banner-content">
          <h2>Join Our Community</h2>
          <p>Get involved, stay informed, and connect with your neighbors in Carroll County.</p>
          <div className="banner-buttons">
            <button className="banner-btn primary">
              <CalendarIcon size={18} />
              <span>Submit an Event</span>
            </button>
            <button className="banner-btn secondary">
              <Bell size={18} />
              <span>Get Notifications</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="community-content">
        <div className="main-content">
          <div className="section-heading">
            <h2>Upcoming Events</h2>
            <a href="#" className="view-all-link">View Calendar</a>
          </div>
          
          <div className="events-grid">
            {communityEvents.map((event) => (
              <div key={event.id} className="event-grid-item">
                <EventCard
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  description={event.description}
                  image={event.image}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="community-sidebar">
          <div className="volunteer-widget">
            <div className="widget-header">
              <Users size={20} />
              <h3>Volunteer Opportunities</h3>
            </div>
            <div className="volunteer-list">
              {volunteerOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="volunteer-item">
                  <h4 className="volunteer-title">{opportunity.title}</h4>
                  <div className="volunteer-org">{opportunity.organization}</div>
                  <div className="volunteer-commitment">{opportunity.commitment}</div>
                  <p className="volunteer-description">{opportunity.description}</p>
                  <button className="volunteer-btn">Learn More</button>
                </div>
              ))}
            </div>
            <a href="#" className="view-all-volunteer">View All Opportunities</a>
          </div>
          
          <div className="community-resources">
            <div className="widget-header">
              <h3>Community Resources</h3>
            </div>
            <ul className="resources-list">
              <li><a href="#">County Services Directory</a></li>
              <li><a href="#">Emergency Preparedness Guide</a></li>
              <li><a href="#">Parks and Recreation</a></li>
              <li><a href="#">Public Transportation</a></li>
              <li><a href="#">Local Business Directory</a></li>
              <li><a href="#">School Calendar</a></li>
            </ul>
          </div>
          
          <div className="newsletter-signup">
            <h3>Stay Updated</h3>
            <p>Subscribe to our community newsletter for weekly updates.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};