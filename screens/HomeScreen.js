import React, { useState, useEffect } from 'react';
import { Camera, CheckSquare, BookOpen, Target, Trophy, Clock, TrendingUp, Calendar, FileText, Brain, Bell, ChevronRight, Flame } from 'lucide-react';

// Mock data generator
const generateMockData = () => ({
  tasks: [
    { id: 1, title: 'Complete Math Assignment', priority: 'high', deadline: new Date(Date.now() + 86400000).toISOString(), completed: false },
    { id: 2, title: 'Study for Biology Quiz', priority: 'medium', deadline: new Date(Date.now() + 172800000).toISOString(), completed: false },
    { id: 3, title: 'Read Chapter 5', priority: 'low', deadline: new Date(Date.now() + 259200000).toISOString(), completed: true },
    { id: 4, title: 'Prepare Presentation', priority: 'high', deadline: new Date(Date.now() + 345600000).toISOString(), completed: false },
  ],
  exams: [
    { id: 1, subject: 'Mathematics', title: 'Midterm Exam', date: new Date(Date.now() + 432000000).toISOString() },
    { id: 2, subject: 'Physics', title: 'Final Exam', date: new Date(Date.now() + 864000000).toISOString() },
  ],
  notes: [
    { id: 1, title: 'Chemistry Notes - Organic Compounds', content: 'Key concepts: Hydrocarbons, functional groups, nomenclature...' },
    { id: 2, title: 'History - World War II', content: 'Important dates and events leading to WWII...' },
    { id: 3, title: 'Programming - Data Structures', content: 'Arrays, linked lists, stacks, queues, trees...' },
  ],
  pomodoroStats: {
    todaySessions: 4,
    completed: 48,
    totalMinutes: 1200
  },
  achievements: [
    { id: 1, unlocked: true, name: 'First Step', icon: '🌟' },
    { id: 2, unlocked: true, name: 'Week Warrior', icon: '⚡' },
    { id: 3, unlocked: true, name: 'Focus Master', icon: '🎯' },
    { id: 4, unlocked: false, name: 'Study Legend', icon: '👑' },
    { id: 5, unlocked: false, name: 'Perfect Score', icon: '💯' },
  ],
  appSettings: {
    dailyGoalMinutes: 120,
    userName: 'Student'
  },
  grades: [
    { subject: 'Math', grade: 92 },
    { subject: 'Science', grade: 88 },
    { subject: 'English', grade: 95 },
  ],
  lastStudyDate: new Date(Date.now() - 86400000).toISOString(),
  studyStreak: 7
});

export default function HomeScreen() {
  const [data, setData] = useState(generateMockData());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const motivationalQuotes = [
    "Success is the sum of small efforts repeated day in and day out.",
    "The expert in anything was once a beginner.",
    "Focus on being productive instead of busy.",
    "Your only limit is you.",
    "Dream big, start small, act now."
  ];

  const getRandomQuote = () => {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  };

  const getTodayProgress = () => {
    const completed = (data.pomodoroStats.todaySessions * 25);
    const goal = data.appSettings.dailyGoalMinutes;
    return Math.min((completed / goal) * 100, 100);
  };

  const calculateGPA = () => {
    if (!data.grades.length) return 'N/A';
    const sum = data.grades.reduce((acc, g) => acc + g.grade, 0);
    const avg = sum / data.grades.length;
    return (avg / 25).toFixed(2);
  };

  const getStreakDays = () => {
    const lastStudy = new Date(data.lastStudyDate);
    const today = new Date();
    const diffTime = Math.abs(today - lastStudy);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1 ? data.studyStreak : 0;
  };

  const getUpcomingTasks = () => {
    return data.tasks
      .filter(t => !t.completed)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 3);
  };

  const getUpcomingExams = () => {
    return data.exams
      .filter(e => new Date(e.date) > new Date())
      .slice(0, 2);
  };

  const getRecentNotes = () => {
    return data.notes.slice(0, 3);
  };

  const getUnlockedAchievements = () => {
    return data.achievements.filter(a => a.unlocked).length;
  };

  const quickActions = [
    { name: 'Pomodoro', icon: Clock, color: '#667eea', screen: 'Pomodoro' },
    { name: 'Tasks', icon: CheckSquare, color: '#764ba2', screen: 'Tasks' },
    { name: 'Notes', icon: FileText, color: '#f093fb', screen: 'Notes' },
    { name: 'Flashcards', icon: Brain, color: '#4facfe', screen: 'Flashcards' },
  ];

  const handleNavigation = (screen) => {
    console.log(`Navigate to ${screen}`);
    // In real app: navigation.navigate(screen)
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f3ff 0%, #e0e7ff 50%, #fce7f3 100%)',
      padding: '24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    contentWrapper: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    greetingCard: {
      background: 'linear-gradient(135deg, #667eea 0%, #4c8bf5 100%)',
      borderRadius: '24px',
      boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
      padding: '32px',
      color: 'white',
      marginBottom: '24px'
    },
    greetingTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    greetingDate: {
      fontSize: '14px',
      opacity: 0.9,
      marginBottom: '16px'
    },
    greetingQuote: {
      fontSize: '18px',
      fontStyle: 'italic',
      opacity: 0.95
    },
    streakCard: {
      background: 'linear-gradient(135deg, #fb923c 0%, #ef4444 100%)',
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(251, 146, 60, 0.3)',
      padding: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      marginBottom: '24px'
    },
    streakText: {
      fontSize: '14px',
      fontWeight: '600',
      opacity: 0.9
    },
    streakValue: {
      fontSize: '32px',
      fontWeight: 'bold'
    },
    quickActionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    quickActionButton: {
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    quickActionIconWrapper: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s ease'
    },
    quickActionText: {
      fontWeight: '600',
      color: '#374151',
      fontSize: '14px'
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '24px'
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      padding: '24px',
      marginBottom: '24px'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f2937'
    },
    viewAllButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      color: '#667eea',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: '4px 8px',
      borderRadius: '6px',
      transition: 'background 0.2s'
    },
    progressSection: {
      marginTop: '12px'
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px'
    },
    progressLabel: {
      color: '#6b7280',
      fontWeight: '500'
    },
    progressValue: {
      color: '#667eea',
      fontWeight: 'bold'
    },
    progressBar: {
      width: '100%',
      height: '12px',
      backgroundColor: '#e5e7eb',
      borderRadius: '6px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #667eea 0%, #4c8bf5 100%)',
      borderRadius: '6px',
      transition: 'width 0.5s ease'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px'
    },
    statBox: {
      borderRadius: '12px',
      padding: '20px',
      textAlign: 'center'
    },
    statValue: {
      fontSize: '32px',
      fontWeight: 'bold',
      marginBottom: '4px'
    },
    statLabel: {
      fontSize: '13px',
      color: '#6b7280'
    },
    examCard: {
      borderLeft: '4px solid #ef4444',
      backgroundColor: '#fef2f2',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px'
    },
    examTitle: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '4px'
    },
    examDate: {
      fontSize: '14px',
      color: '#6b7280',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    taskCard: {
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px'
    },
    taskTitle: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '4px'
    },
    taskInfo: {
      fontSize: '14px',
      color: '#6b7280'
    },
    noteCard: {
      background: 'linear-gradient(135deg, #f5f3ff 0%, #e0e7ff 100%)',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      border: 'none',
      width: '100%',
      textAlign: 'left'
    },
    noteTitle: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    noteExcerpt: {
      fontSize: '14px',
      color: '#6b7280',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    achievementButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.2s'
    },
    achievementContent: {
      flex: 1,
      textAlign: 'center',
      margin: '0 16px'
    },
    achievementCount: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937'
    },
    achievementLabel: {
      fontSize: '14px',
      color: '#6b7280',
      marginTop: '4px'
    },
    emptyText: {
      textAlign: 'center',
      color: '#6b7280',
      padding: '32px',
      fontSize: '15px'
    }
  };

  const mediaQueryStyles = `
    @media (min-width: 1024px) {
      .main-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .quick-actions-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    @media (max-width: 768px) {
      .greeting-title {
        font-size: 28px !important;
      }
      .quick-actions-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    .quick-action-button:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
    .quick-action-button:hover .icon-wrapper {
      transform: scale(1.1);
    }
    .view-all-button:hover {
      background: #f3f4f6;
    }
    .note-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
    .achievement-button:hover {
      box-shadow: 0 8px 24px rgba(251, 191, 36, 0.3);
    }
  `;

  return (
    <>
      <style>{mediaQueryStyles}</style>
      <div style={styles.container}>
        <div style={styles.contentWrapper}>
          
          {/* Greeting Card */}
          <div style={styles.greetingCard}>
            <h1 style={styles.greetingTitle} className="greeting-title">
              {getGreeting()}, {data.appSettings.userName}! 👋
            </h1>
            <p style={styles.greetingDate}>
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p style={styles.greetingQuote}>"{getRandomQuote()}"</p>
          </div>

          {/* Study Streak */}
          {getStreakDays() > 0 && (
            <div style={styles.streakCard}>
              <div>
                <p style={styles.streakText}>Study Streak</p>
                <p style={styles.streakValue}>{getStreakDays()} days</p>
              </div>
              <Flame size={64} style={{ opacity: 0.8 }} />
            </div>
          )}

          {/* Quick Actions */}
          <div style={styles.quickActionsGrid} className="quick-actions-grid">
            {quickActions.map((action) => (
              <button
                key={action.name}
                style={{
                  ...styles.quickActionButton,
                  borderTop: `4px solid ${action.color}`
                }}
                className="quick-action-button"
                onClick={() => handleNavigation(action.screen)}
              >
                <div 
                  style={{
                    ...styles.quickActionIconWrapper,
                    backgroundColor: `${action.color}20`
                  }}
                  className="icon-wrapper"
                >
                  <action.icon size={32} color={action.color} />
                </div>
                <span style={styles.quickActionText}>{action.name}</span>
              </button>
            ))}
          </div>

          {/* Main Grid */}
          <div style={styles.mainGrid} className="main-grid">
            
            {/* Left Column */}
            <div>
              
              {/* Today's Progress */}
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h2 style={styles.cardTitle}>Today's Progress</h2>
                </div>
                <div style={styles.progressSection}>
                  <div style={styles.progressHeader}>
                    <span style={styles.progressLabel}>Study Goal</span>
                    <span style={styles.progressValue}>
                      {(data.pomodoroStats.todaySessions * 25)} / {data.appSettings.dailyGoalMinutes} min
                    </span>
                  </div>
                  <div style={styles.progressBar}>
                    <div 
                      style={{
                        ...styles.progressFill,
                        width: `${getTodayProgress()}%`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Statistics Overview */}
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h2 style={styles.cardTitle}>Overview</h2>
                  <button 
                    style={styles.viewAllButton}
                    className="view-all-button"
                    onClick={() => handleNavigation('Stats')}
                  >
                    View All <ChevronRight size={16} />
                  </button>
                </div>
                <div style={styles.statsGrid}>
                  <div style={{ ...styles.statBox, background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)' }}>
                    <p style={{ ...styles.statValue, color: '#667eea' }}>
                      {data.tasks.filter(t => !t.completed).length}
                    </p>
                    <p style={styles.statLabel}>Pending Tasks</p>
                  </div>
                  <div style={{ ...styles.statBox, background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' }}>
                    <p style={{ ...styles.statValue, color: '#3b82f6' }}>
                      {data.pomodoroStats.completed}
                    </p>
                    <p style={styles.statLabel}>Total Sessions</p>
                  </div>
                  <div style={{ ...styles.statBox, background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' }}>
                    <p style={{ ...styles.statValue, color: '#ec4899' }}>
                      {calculateGPA()}
                    </p>
                    <p style={styles.statLabel}>Current GPA</p>
                  </div>
                  <div style={{ ...styles.statBox, background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' }}>
                    <p style={{ ...styles.statValue, color: '#10b981' }}>
                      {getUnlockedAchievements()}
                    </p>
                    <p style={styles.statLabel}>Achievements</p>
                  </div>
                </div>
              </div>

              {/* Upcoming Exams */}
              {getUpcomingExams().length > 0 && (
                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <h2 style={styles.cardTitle}>
                      <Bell size={20} color="#ef4444" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                      Upcoming Exams
                    </h2>
                  </div>
                  {getUpcomingExams().map(exam => (
                    <div key={exam.id} style={styles.examCard}>
                      <p style={styles.examTitle}>{exam.subject} - {exam.title}</p>
                      <p style={styles.examDate}>
                        <Calendar size={16} />
                        {new Date(exam.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column */}
            <div>
              
              {/* Upcoming Tasks */}
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h2 style={styles.cardTitle}>Upcoming Tasks</h2>
                  <button 
                    style={styles.viewAllButton}
                    className="view-all-button"
                    onClick={() => handleNavigation('Tasks')}
                  >
                    View All <ChevronRight size={16} />
                  </button>
                </div>
                {getUpcomingTasks().length === 0 ? (
                  <p style={styles.emptyText}>No upcoming tasks! You're all caught up! 🎉</p>
                ) : (
                  getUpcomingTasks().map(task => {
                    const priorityColors = {
                      high: { border: '#ef4444', bg: '#fef2f2' },
                      medium: { border: '#f59e0b', bg: '#fffbeb' },
                      low: { border: '#10b981', bg: '#ecfdf5' }
                    };
                    return (
                      <div 
                        key={task.id} 
                        style={{
                          ...styles.taskCard,
                          borderLeft: `4px solid ${priorityColors[task.priority].border}`,
                          backgroundColor: priorityColors[task.priority].bg
                        }}
                      >
                        <p style={styles.taskTitle}>{task.title}</p>
                        <p style={styles.taskInfo}>
                          Priority: <span style={{ fontWeight: '500', textTransform: 'uppercase' }}>{task.priority}</span> | {new Date(task.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Recent Notes */}
              {getRecentNotes().length > 0 && (
                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <h2 style={styles.cardTitle}>Recent Notes</h2>
                    <button 
                      style={styles.viewAllButton}
                      className="view-all-button"
                      onClick={() => handleNavigation('Notes')}
                    >
                      View All <ChevronRight size={16} />
                    </button>
                  </div>
                  {getRecentNotes().map(note => (
                    <button
                      key={note.id}
                      style={styles.noteCard}
                      className="note-card"
                      onClick={() => handleNavigation('Notes')}
                    >
                      <p style={styles.noteTitle}>
                        <FileText size={16} color="#667eea" />
                        {note.title}
                      </p>
                      <p style={styles.noteExcerpt}>{note.content}</p>
                    </button>
                  ))}
                </div>
              )}

              {/* Achievement Preview */}
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h2 style={styles.cardTitle}>Achievements</h2>
                  <button 
                    style={styles.viewAllButton}
                    className="view-all-button"
                    onClick={() => handleNavigation('Achievements')}
                  >
                    View All <ChevronRight size={16} />
                  </button>
                </div>
                <button
                  style={styles.achievementButton}
                  className="achievement-button"
                  onClick={() => handleNavigation('Achievements')}
                >
                  <Trophy size={48} color="#f59e0b" />
                  <div style={styles.achievementContent}>
                    <p style={styles.achievementCount}>
                      {getUnlockedAchievements()} / {data.achievements.length}
                    </p>
                    <p style={styles.achievementLabel}>Badges Unlocked</p>
                  </div>
                  <ChevronRight size={24} color="#667eea" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}