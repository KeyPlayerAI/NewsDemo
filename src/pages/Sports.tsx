import React from 'react';
import { NewsCard } from '../components/NewsCard';
import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Sports.css';

// Mock data for sports articles
const sportsArticles = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/3076509/pexels-photo-3076509.jpeg',
    title: 'Eagles Quarterback Breaks School Record',
    excerpt: 'Senior quarterback Jake Thompson broke the school\'s all-time passing record during Friday\'s game.',
    category: 'sports',
    timestamp: '1 day ago',
    author: 'Alex Rivera',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/269948/pexels-photo-269948.jpeg',
    title: 'Local Runner Qualifies for Boston Marathon',
    excerpt: 'Carroll County native Emma Williams has qualified for the Boston Marathon with an impressive time.',
    category: 'sports',
    timestamp: '2 days ago',
    author: 'Jessica Lee',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/8472146/pexels-photo-8472146.jpeg',
    title: 'Middle School Soccer Team Wins Regional Championship',
    excerpt: 'The Carroll County Middle School soccer team defeated rival Jefferson County in the final match.',
    category: 'sports',
    timestamp: '3 days ago',
    author: 'Michael Brooks',
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/5307753/pexels-photo-5307753.jpeg',
    title: 'Local Golf Course Announces Summer Tournament',
    excerpt: 'Pine Hills Golf Club will host its annual summer tournament with proceeds going to charity.',
    category: 'sports',
    timestamp: '4 days ago',
    author: 'Sarah Johnson',
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/5384424/pexels-photo-5384424.jpeg',
    title: 'High School Wrestler Advances to State Finals',
    excerpt: 'Junior Tyler Matthews will represent Carroll County in the state wrestling championship.',
    category: 'sports',
    timestamp: '5 days ago',
    author: 'David Wilson',
  },
  {
    id: 6,
    image: 'https://images.pexels.com/photos/5067814/pexels-photo-5067814.jpeg',
    title: 'Youth Basketball League Registration Now Open',
    excerpt: 'Registration for the summer youth basketball league is now open for ages 8-14.',
    category: 'sports',
    timestamp: '1 week ago',
    author: 'Lisa Thompson',
  },
];

// Mock data for sports standings
const sportsStandings = [
  {
    team: 'Carroll Eagles',
    wins: 12,
    losses: 3,
    pct: 0.800,
    last10: '8-2',
  },
  {
    team: 'Jefferson Lions',
    wins: 10,
    losses: 5,
    pct: 0.667,
    last10: '6-4',
  },
  {
    team: 'Smithville Hawks',
    wins: 9,
    losses: 6,
    pct: 0.600,
    last10: '7-3',
  },
  {
    team: 'Oakridge Tigers',
    wins: 8,
    losses: 7,
    pct: 0.533,
    last10: '5-5',
  },
  {
    team: 'Riverside Wolves',
    wins: 6,
    losses: 9,
    pct: 0.400,
    last10: '3-7',
  },
];

// Mock data for upcoming games
const upcomingGames = [
  {
    id: 1,
    homeTeam: 'Carroll Eagles',
    awayTeam: 'Jefferson Lions',
    date: 'April 15',
    time: '7:00 PM',
    location: 'Carroll High School Stadium',
  },
  {
    id: 2,
    homeTeam: 'Smithville Hawks',
    awayTeam: 'Oakridge Tigers',
    date: 'April 18',
    time: '6:30 PM',
    location: 'Smithville Sports Complex',
  },
  {
    id: 3,
    homeTeam: 'Riverside Wolves',
    awayTeam: 'Carroll Eagles',
    date: 'April 22',
    time: '7:00 PM',
    location: 'Riverside Community Field',
  },
];

export const Sports: React.FC = () => {
  const handleViewSchedule = (e: React.MouseEvent) => {
    e.preventDefault();
    // Handle view schedule click - can be implemented later
  };

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    // Handle vote click - can be implemented later
  };

  return (
    <div className="sports-page">
      <div className="page-header">
        <h1>Sports</h1>
        <p>The latest sports news and updates from Carroll County</p>
      </div>
      
      <div className="sports-content">
        <div className="sports-main">
          <div className="sports-featured">
            <div className="sports-featured-image">
              <img src="https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg" alt="Featured sports" />
              <div className="featured-badge">Featured</div>
            </div>
            <div className="sports-featured-content">
              <h2>High School Football Team Advances to State Championship</h2>
              <p>The Carroll County Eagles have advanced to the state championship after a thrilling victory last Friday night. The team rallied from a 14-point deficit in the fourth quarter to secure a 28-21 win over the defending champions.</p>
              <div className="featured-meta">
                <span className="featured-author">By Robert Davis</span>
                <span className="featured-time">Yesterday</span>
              </div>
              <button onClick={(e) => e.preventDefault()} className="read-more-btn sports-btn">Read Full Story</button>
            </div>
          </div>
          
          <div className="section-heading">
            <h2>Latest Sports News</h2>
            <button onClick={(e) => e.preventDefault()} className="view-all-link">View All</button>
          </div>
          
          <div className="sports-grid">
            {sportsArticles.map((article) => (
              <div key={article.id} className="sports-grid-item">
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
        </div>
        
        <div className="sports-sidebar">
          <div className="standings-widget">
            <div className="widget-header">
              <Trophy size={20} />
              <h3>League Standings</h3>
            </div>
            <div className="standings-table">
              <div className="standings-header">
                <span className="team-col">Team</span>
                <span className="stats-col">W</span>
                <span className="stats-col">L</span>
                <span className="stats-col">PCT</span>
                <span className="stats-col">Last 10</span>
              </div>
              {sportsStandings.map((team, index) => (
                <div key={index} className="standings-row">
                  <span className="team-col">{team.team}</span>
                  <span className="stats-col">{team.wins}</span>
                  <span className="stats-col">{team.losses}</span>
                  <span className="stats-col">{team.pct.toFixed(3)}</span>
                  <span className="stats-col">{team.last10}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="upcoming-games-widget">
            <div className="widget-header">
              <h3>Upcoming Games</h3>
            </div>
            <div className="games-list">
              {upcomingGames.map((game) => (
                <div key={game.id} className="game-item">
                  <div className="game-date">{game.date}</div>
                  <div className="game-teams">
                    <div className="away-team">{game.awayTeam}</div>
                    <div className="game-vs">@</div>
                    <div className="home-team">{game.homeTeam}</div>
                  </div>
                  <div className="game-details">
                    <div className="game-time">{game.time}</div>
                    <div className="game-location">{game.location}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleViewSchedule} className="view-all-games">View Full Schedule</button>
          </div>
          
          <div className="sports-poll">
            <div className="widget-header">
              <h3>Fan Poll</h3>
            </div>
            <div className="poll-question">
              Which team will win the state championship?
            </div>
            <div className="poll-options">
              <div className="poll-option">
                <input type="radio" id="team1" name="poll" />
                <label htmlFor="team1">Carroll Eagles</label>
              </div>
              <div className="poll-option">
                <input type="radio" id="team2" name="poll" />
                <label htmlFor="team2">Jefferson Lions</label>
              </div>
              <div className="poll-option">
                <input type="radio" id="team3" name="poll" />
                <label htmlFor="team3">Smithville Hawks</label>
              </div>
              <div className="poll-option">
                <input type="radio" id="team4" name="poll" />
                <label htmlFor="team4">Other</label>
              </div>
            </div>
            <button onClick={handleVote} className="vote-btn">Vote</button>
          </div>
        </div>
      </div>
    </div>
  );
};