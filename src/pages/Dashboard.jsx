import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      window.location.href = '/';
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (!user) return null;

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={styles.logo}>⚡ SPARKS</span>
          <p style={styles.logoSub}>Smart Learning System</p>
        </div>

        <nav style={styles.nav}>
          <a href="/dashboard" style={styles.navItemActive}>
            🏠 Dashboard
          </a>
          <a href="/courses" style={styles.navItem}>
            📚 Courses
          </a>
          <a href="/tasks" style={styles.navItem}>
            ✅ Study Tasks
          </a>
          <a href="/quiz" style={styles.navItem}>
            🎯 Daily Quiz
          </a>
          <a href="/progress" style={styles.navItem}>
            📊 My Progress
          </a>
          <a href="/onboarding" style={styles.navItem}>
            🧭 Learning Path
          </a>
        </nav>

        <div style={styles.userBox}>
          <div style={styles.userAvatar}>
            {user.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <p style={styles.userName}>{user.name}</p>
            <p style={styles.userRole}>{user.role}</p>
          </div>
        </div>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.main}>

        <div style={styles.header}>
          <div>
            <h1 style={styles.headerTitle}>
              Welcome back, {user.name}! 👋
            </h1>
            <p style={styles.headerSub}>
              Ready to learn something amazing today?
            </p>
          </div>
          <div style={styles.streakBox}>
            <span style={styles.streakIcon}>🔥</span>
            <span style={styles.streakText}>5 Day Streak!</span>
          </div>
        </div>

        <div style={styles.content}>

          {/* Stats */}
          <div style={styles.statsRow}>
            <StatCard icon="📚" label="Courses Enrolled" value="3" color="#1a237e" link="/courses" />
            <StatCard icon="✅" label="Tasks Pending" value="3" color="#2e7d32" link="/tasks" />
            <StatCard icon="⭐" label="Points" value="450" color="#f57f17" link="/progress" />
            <StatCard icon="🎯" label="Your Role" value={user.role} color="#6a1b9a" link="/progress" />
          </div>

          {/* Quick Actions */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🚀 Quick Actions</h2>
            <div style={styles.actionsGrid}>
              <ActionCard
                icon="📚"
                title="Browse Courses"
                desc="Explore all available courses"
                color="#1a237e"
                link="/courses"
              />
              <ActionCard
                icon="✅"
                title="Study Tasks"
                desc="Plan and track your daily goals"
                color="#2e7d32"
                link="/tasks"
              />
              <ActionCard
                icon="🎯"
                title="Daily Quiz"
                desc="Test your knowledge & earn points"
                color="#e65100"
                link="/quiz"
              />
              <ActionCard
                icon="📊"
                title="My Progress"
                desc="Track your learning journey"
                color="#6a1b9a"
                link="/progress"
              />
            </div>
          </div>

          {/* Welcome Banner */}
          <div style={styles.banner}>
            <h2 style={styles.bannerTitle}>
              ⚡ Welcome to SPARKS!
            </h2>
            <p style={styles.bannerText}>
              Smart Personalized Adaptive Learning and Knowledge System.
              Start exploring courses, plan your study tasks, take daily
              quizzes, and track your progress!
            </p>
            <button
              style={styles.bannerBtn}
              onClick={() => window.location.href = '/courses'}
            >
              Browse Courses →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

const StatCard = ({ icon, label, value, color, link }) => (
  <div
    style={{ ...styles.statCard, borderTopColor: color, cursor: 'pointer' }}
    onClick={() => link && (window.location.href = link)}
  >
    <span style={styles.statIcon}>{icon}</span>
    <span style={{ ...styles.statValue, color }}>{value}</span>
    <span style={styles.statLabel}>{label}</span>
  </div>
);

const ActionCard = ({ icon, title, desc, color, link }) => (
  <div
    style={styles.actionCard}
    onClick={() => window.location.href = link}
  >
    <div style={{ ...styles.actionIcon, background: color }}>
      {icon}
    </div>
    <h3 style={styles.actionTitle}>{title}</h3>
    <p style={styles.actionDesc}>{desc}</p>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f3f2ef',
    fontFamily: 'Arial, sans-serif'
  },
  sidebar: {
    width: '260px',
    background: 'white',
    borderRight: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
    position: 'fixed',
    height: '100vh'
  },
  sidebarHeader: {
    padding: '0 20px 20px',
    borderBottom: '1px solid #e0e0e0',
    marginBottom: '16px'
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1a237e'
  },
  logoSub: {
    fontSize: '11px',
    color: '#888',
    margin: '4px 0 0'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '0 12px',
    flex: 1
  },
  navItem: {
    padding: '12px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#333',
    fontSize: '14px',
    fontWeight: '500'
  },
  navItemActive: {
    padding: '12px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#1a237e',
    fontSize: '14px',
    fontWeight: 'bold',
    background: '#e8eaf6'
  },
  userBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    borderTop: '1px solid #e0e0e0',
    marginTop: 'auto'
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#1a237e',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  userName: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
    textTransform: 'capitalize'
  },
  userRole: {
    fontSize: '12px',
    color: '#666',
    margin: 0,
    textTransform: 'capitalize'
  },
  logoutBtn: {
    margin: '8px 20px',
    padding: '10px',
    background: '#ffebee',
    color: '#c62828',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  },
  main: {
    marginLeft: '260px',
    flex: 1
  },
  header: {
    background: 'linear-gradient(135deg, #1a237e, #0d47a1)',
    padding: '32px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: '28px',
    margin: 0,
    marginBottom: '8px'
  },
  headerSub: {
    margin: 0,
    opacity: 0.8,
    fontSize: '15px'
  },
  streakBox: {
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '12px',
    padding: '16px 24px',
    textAlign: 'center'
  },
  streakIcon: { fontSize: '32px' },
  streakText: {
    display: 'block',
    color: 'white',
    fontWeight: 'bold',
    marginTop: '4px'
  },
  content: { padding: '24px 32px' },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    borderTop: '4px solid',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  statIcon: { fontSize: '28px' },
  statValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  statLabel: {
    fontSize: '12px',
    color: '#888',
    textAlign: 'center'
  },
  section: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  sectionTitle: {
    fontSize: '18px',
    color: '#1a237e',
    marginBottom: '20px',
    marginTop: 0
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px'
  },
  actionCard: {
    background: '#f5f7ff',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    border: '1px solid #e0e0e0'
  },
  actionIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    margin: '0 auto 12px',
    color: 'white'
  },
  actionTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#1a237e',
    margin: '0 0 8px'
  },
  actionDesc: {
    fontSize: '12px',
    color: '#666',
    margin: 0
  },
  banner: {
    background: 'linear-gradient(135deg, #1a237e, #0d47a1)',
    borderRadius: '16px',
    padding: '32px',
    color: 'white'
  },
  bannerTitle: {
    fontSize: '24px',
    marginBottom: '12px',
    marginTop: 0
  },
  bannerText: {
    fontSize: '15px',
    opacity: 0.9,
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  bannerBtn: {
    background: 'white',
    color: '#1a237e',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};