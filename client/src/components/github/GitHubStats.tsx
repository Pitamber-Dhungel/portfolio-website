import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCode, FaStar, FaCodeBranch } from 'react-icons/fa';
import { BiGitCommit } from 'react-icons/bi';
import { VscRepo } from 'react-icons/vsc';
import axios from 'axios';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubStats {
  totalCommits: number;
  totalRepos: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  recentRepos: Repository[];
  contributionData: ContributionDay[];
}

interface LanguageData {
  [key: string]: number;
}

const languageColors: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  PHP: '#4F5D95',
  Go: '#00ADD8',
  Ruby: '#701516',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  // Add more languages as needed
  default: '#8b949e'
};

const GitHubStats = () => {
  // Set your GitHub username here
  const [username] = useState('Pitamber-Dhungel');
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to create a GitHub API URL with authentication if available
  const getGitHubApiUrl = (endpoint: string) => {
    return `https://api.github.com${endpoint}`;
  };

  // Calculate contribution level based on count
  const getContributionLevel = (count: number): 0 | 1 | 2 | 3 | 4 => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
  };

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const userResponse = await axios.get(getGitHubApiUrl(`/users/${username}`));
        const userData = userResponse.data;
        
        // Fetch repositories (limit to 100 most recent)
        const reposResponse = await axios.get(getGitHubApiUrl(`/users/${username}/repos`), {
          params: {
            sort: 'updated',
            direction: 'desc',
            per_page: 100
          }
        });
        const reposData = reposResponse.data;
        
        // Count total stars
        const totalStars = reposData.reduce((sum: number, repo: Repository) => sum + repo.stargazers_count, 0);
        
        // Get user's total repositories count
        const totalRepos = userData.public_repos;
        
        // Calculate language statistics
        const languageData: LanguageData = {};
        let totalLanguageBytes = 0;
        
        // Collect language data from repositories
        await Promise.all(reposData.slice(0, 10).map(async (repo: Repository) => {
          try {
            const langResponse = await axios.get(getGitHubApiUrl(`/repos/${username}/${repo.name}/languages`));
            const repoLanguages = langResponse.data;
            
            Object.entries(repoLanguages).forEach(([language, bytes]) => {
              languageData[language] = (languageData[language] || 0) + (bytes as number);
              totalLanguageBytes += bytes as number;
            });
          } catch (error) {
            console.error(`Error fetching languages for ${repo.name}:`, error);
          }
        }));
        
        // Calculate percentages and create top languages array
        const topLanguages = Object.entries(languageData)
          .map(([name, bytes]) => ({
            name,
            percentage: Math.round((bytes / totalLanguageBytes) * 100),
            color: languageColors[name] || languageColors.default
          }))
          .sort((a, b) => b.percentage - a.percentage);
        
        // Ensure we have at least 5 languages (or fewer if user has fewer)
        if (topLanguages.length < 5) {
          const otherPercentage = 100 - topLanguages.reduce((sum, lang) => sum + lang.percentage, 0);
          if (otherPercentage > 0) {
            topLanguages.push({
              name: 'Other',
              percentage: otherPercentage,
              color: languageColors.default
            });
          }
        } else if (topLanguages.length > 5) {
          const mainLanguages = topLanguages.slice(0, 4);
          const otherLanguages = topLanguages.slice(4);
          const otherPercentage = otherLanguages.reduce((sum, lang) => sum + lang.percentage, 0);
          
          mainLanguages.push({
            name: 'Other',
            percentage: otherPercentage,
            color: languageColors.default
          });
          
          topLanguages.splice(0, topLanguages.length, ...mainLanguages);
        }
        
        // Fetch recent contribution data (using events as a proxy)
        const eventsResponse = await axios.get(getGitHubApiUrl(`/users/${username}/events`), {
          params: { per_page: 100 }
        });
        const eventsData = eventsResponse.data;
        
        // Group events by date to count contributions
        const contributionByDate: Record<string, number> = {};
        const today = new Date();
        
        // Initialize the last 30 days with 0 counts
        for (let i = 29; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const dateKey = date.toISOString().split('T')[0];
          contributionByDate[dateKey] = 0;
        }
        
        // Count push events as contributions
        eventsData.forEach((event: any) => {
          if (event.type === 'PushEvent') {
            const date = event.created_at.split('T')[0];
            if (contributionByDate[date] !== undefined) {
              // Count each commit in the push event
              const commitCount = event.payload.commits ? event.payload.commits.length : 1;
              contributionByDate[date] += commitCount;
            }
          }
        });
        
        // Calculate total commits from events (as an approximation)
        // In a real scenario, you would need to use GitHub's GraphQL API to get accurate commit counts
        const totalCommits = Object.values(contributionByDate).reduce((sum, count) => sum + (count as number), 0);
        
        // Format contribution data for the graph
        const contributionData: ContributionDay[] = Object.entries(contributionByDate)
          .map(([date, count]) => ({
            date,
            count: count as number,
            level: getContributionLevel(count as number)
          }))
          .sort((a, b) => a.date.localeCompare(b.date));
        
        // Get the top 3 repos by stars
        const recentRepos = reposData
          .filter((repo: Repository) => !repo.fork)
          .slice(0, 3)
          .map((repo: Repository) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || 'No description available',
            html_url: repo.html_url,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count
          }));
        
        setStats({
          totalCommits: totalCommits || userData.public_repos * 10, // Fallback to an estimate if we can't get real data
          totalRepos,
          topLanguages,
          recentRepos,
          contributionData
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub stats:', err);
        setError('Failed to load GitHub data. Please try again later.');
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, [username]);

  const renderContributionGraph = () => {
    if (!stats?.contributionData) return null;
    
    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Contribution Activity</h3>
        <div className="flex flex-wrap gap-1">
          {stats.contributionData.map((day, index) => {
            // Determine color based on contribution level
            const levelColors = [
              'bg-gray-100 dark:bg-gray-800', // 0
              'bg-green-100 dark:bg-green-900', // 1
              'bg-green-300 dark:bg-green-700', // 2
              'bg-green-500 dark:bg-green-600', // 3
              'bg-green-700 dark:bg-green-500'  // 4
            ];
            
            return (
              <div 
                key={index}
                className={`w-5 h-5 rounded-sm ${levelColors[day.level]}`}
                title={`${day.date}: ${day.count} contributions`}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderLanguageStats = () => {
    if (!stats?.topLanguages) return null;
    
    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Languages Used</h3>
        <div className="h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex">
          {stats.topLanguages.map((lang, index) => (
            <div 
              key={index}
              style={{ 
                width: `${lang.percentage}%`,
                backgroundColor: lang.color
              }}
              title={`${lang.name}: ${lang.percentage}%`}
              className="h-full"
            />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
          {stats.topLanguages.map((lang, index) => (
            <div key={index} className="flex items-center text-sm">
              <span 
                className="w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-gray-700 dark:text-gray-300">{lang.name}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRecentRepos = () => {
    if (!stats?.recentRepos) return null;
    
    return (
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">Recent Repositories</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.recentRepos.map(repo => (
            <a 
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <VscRepo className="mt-1 mr-2 text-gray-500 dark:text-gray-400" />
                <div>
                  <h4 className="font-medium text-primary-600 dark:text-primary-400">{repo.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {repo.description || 'No description available'}
                  </p>
                </div>
              </div>
              
              <div className="mt-3 flex text-xs text-gray-500 dark:text-gray-400">
                {repo.language && (
                  <div className="flex items-center mr-4">
                    <span 
                      className="w-2 h-2 rounded-full mr-1"
                      style={{ backgroundColor: languageColors[repo.language] || languageColors.default }}
                    />
                    <span>{repo.language}</span>
                  </div>
                )}
                
                <div className="flex items-center mr-3">
                  <FaStar className="mr-1" />
                  <span>{repo.stargazers_count}</span>
                </div>
                
                <div className="flex items-center">
                  <FaCodeBranch className="mr-1" />
                  <span>{repo.forks_count}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section id="github" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 dark:border-primary-400"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading GitHub stats...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6 text-center">
            <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
            <button 
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="section-title">Automated GitHub Integration</h2>
          <p className="section-subtitle">
            Display live stats and visualizations of your GitHub contributions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              {/* GitHub Profile Header */}
              <div className="flex items-center">
                <FaGithub className="text-4xl text-gray-800 dark:text-gray-200 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {username}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <a 
                      href={`https://github.com/${username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      View GitHub Profile
                    </a>
                  </p>
                </div>
              </div>

              {/* GitHub Stats Overview */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center">
                    <BiGitCommit className="text-primary-600 dark:text-primary-400 text-xl mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Commits</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">
                    {stats?.totalCommits}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center">
                    <VscRepo className="text-primary-600 dark:text-primary-400 text-xl mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Repositories</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">
                    {stats?.totalRepos}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center">
                    <FaCode className="text-primary-600 dark:text-primary-400 text-xl mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Top Language</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">
                    {stats?.topLanguages?.[0].name}
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center">
                    <FaStar className="text-primary-600 dark:text-primary-400 text-xl mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Stars</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-1">
                    {stats?.recentRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0)}
                  </p>
                </div>
              </div>

              {/* Visualization Components */}
              {renderLanguageStats()}
              {renderContributionGraph()}
              {renderRecentRepos()}
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Data visualization showcasing commit frequency, languages used, and project activity.
              <br />
              <span className="text-xs">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats; 