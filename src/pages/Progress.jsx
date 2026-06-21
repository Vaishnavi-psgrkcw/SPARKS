import React, { useState } from 'react';

export default function Progress() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [stats] = useState({
    coursesEnrolled: 3,
    coursesCompleted: 1,
    hoursLearned: 12,
    streak: 5,
    points: 450
  });

  const [courses] = useState([
    { name: 'Complete Web Development', progress: 75, color: '#1a237e' },
    { name: 'Python for Data Science', progress: 45, color: '#2e7d32' },
    { name: 'UI/UX Design', progress: 20, color: '#6a1b9a' }
  ]);

  const [achievements] = useState([
    { icon: '🏆', title: 'First Course', desc: 'Started first course', earned: true },
    { icon: '🔥', title: '5 Day Streak', desc: 'Learned 5 days in a row', earned: true },
    { icon: '⭐', title: 'Quiz Master', desc: 'Scored 100% in a quiz', earned: false },
    { icon: '🎓', title: 'Graduate', desc: 'Complete a full course', earned: false },
    { icon: '💡', title: 'Fast Learner', desc: 'Complete 3 lessons in a day', earned: false },
    { icon: '🚀', title: 'Achiever', desc: 'Earn 1000 points', earned: false }
  ]);

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={styles.logo}>⚡ SPARKS</span>
        </div>
        <nav style={styles.nav}>
          <a href="/dashboard" style={styles.navItem}>🏠 Dashboard</a>
          <a href="/courses" style={styles.navItem}>📚 Courses</a>
          <a href="/progress" style={styles.navItemActive}>📊 My Progress</a>
        </nav>
        <div style={styles.userBox}>
          <div style={styles.userAvatar}>
            {user.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <p style={styles.userName}>{user.name || 'Student'}</p>
            <p style={styles.userRole}>{user.role || 'student'}</p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={styles.main}>

        <div style={styles.header}>
          <h1 style={styles.headerTitle}>📊 My Progress</h1>
          <p style={styles.headerSub}>Track your learning journey!</p>
        </div>

        <div style={styles.content}>

          {/* Stats */}
          <div style={styles.statsRow}>
            <StatCard icon="📚" label="Enrolled" value={stats.coursesEnrolled} color="#1a237e" />
            <StatCard icon="✅" label="Completed" value={stats.coursesCompleted} color="#2e7d32" />
            <StatCard icon="⏱️" label="Hours" value={stats.hoursLearned} color="#e65100" />
            <StatCard icon="🔥" label="Streak" value={stats.streak} color="#c62828" />
            <StatCard icon="⭐" label="Points" value={stats.points} color="#f57f17" />
          </div>

          {/* Course Progress */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📈 Course Progress</h2>
            {courses.map((course, i) => (
              <div key={i} style={styles.courseProgress}>
                <div style={styles.courseHeader}>
                  <span style={styles.courseName}>{course.name}</span>
                  <span style={styles.coursePercent}>{course.progress}%</span>
                </div>
                <div style={styles.progressBar}>
                  <div style={{
                    ...styles.progressFill,
                    width: `${course.progress}%`,
                    background: course.color
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Leaderboard */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🏆 Leaderboard</h2>
            {[
              { rank: 1, name: 'Priya S.', points: 1250, icon: '🥇' },
              { rank: 2, name: 'Rahul M.', points: 1100, icon: '🥈' },
              { rank: 3, name: 'You', points: 450, icon: '🥉', isUser: true },
              { rank: 4, name: 'Anitha K.', points: 380, icon: '4' },
              { rank: 5, name: 'Karthik R.', points: 290, icon: '5' }
            ].map((player, i) => (
              <div key={i} style={{
                ...styles.leaderRow,
                background: player.isUser ? '#e8eaf6' : 'transparent'
              }}>
                <span style={styles.leaderRank}>{player.icon}</span>
                <span style={{
                  ...styles.leaderName,
                  fontWeight: player.isUser ? 'bold' : '500'
                }}>
                  {player.name}
                </span>
                <span style={styles.leaderPoints}>{player.points} pts</span>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🏅 Achievements</h2>
            <div style={styles.achievementsGrid}>
              {achievements.map((achievement, i) => (
                <div key={i} style={{
                  ...styles.achievementCard,
                  opacity: achievement.earned ? 1 : 0.4
                }}>
                  <span style={styles.achievementIcon}>{achievement.icon}</span>
                  <h3 style={styles.achievementTitle}>{achievement.title}</h3>
                  <p style={styles.achievementDesc}>{achievement.desc}</p>
                  {achievement.earned && (
                    <span style={styles.earnedBadge}>✅ Earned!</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Activity */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📅 Weekly Activity</h2>
            <div style={styles.weeklyGrid}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <div key={i} style={styles.dayBox}>
                  <div style={{
                    ...styles.dayBar,
                    height: `${[60, 80, 40, 90, 70, 30, 50][i]}px`,
                    background: i < 5 ? '#1a237e' : '#e0e0e0'
                  }} />
                  <span style={styles.dayLabel}>{day}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const StatCard = ({ icon, label, value, color }) => (
  <div style={{ ...styles.statCard, borderTopColor: color }}>
    <span style={styles.statIcon}>{icon}</span>
    <span style={{ ...styles.statValue, color }}>{value}</span>
    <span style={styles.statLabel}>{label}</span>
  </div>
);

const styles = {
  container: { display: 'flex', minHeight: '100vh', background: '#f3f2ef', fontFamily: 'Arial, sans-serif' },
  sidebar: { width: '260px', background: 'white', borderRight: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', padding: '20px 0', position: 'fixed', height: '100vh' },
  sidebarHeader: { padding: '0 20px 20px', borderBottom: '1px solid #e0e0e0', marginBottom: '16px' },
  logo: { fontSize: '22px', fontWeight: 'bold', color: '#1a237e' },
  nav: { display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 12px', marginBottom: '24px', flex: 1 },
  navItem: { padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', color: '#333', fontSize: '14px', fontWeight: '500' },
  navItemActive: { padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', color: '#1a237e', fontSize: '14px', fontWeight: 'bold', background: '#e8eaf6' },
  userBox: { display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', marginTop: 'auto', borderTop: '1px solid #e0e0e0' },
  userAvatar: { width: '40px', height: '40px', borderRadius: '50%', background: '#1a237e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' },
  userName: { fontSize: '14px', fontWeight: 'bold', color: '#333', margin: 0, textTransform: 'capitalize' },
  userRole: { fontSize: '12px', color: '#666', margin: 0, textTransform: 'capitalize' },
  main: { marginLeft: '260px', flex: 1 },
  header: { background: 'linear-gradient(135deg, #1a237e, #0d47a1)', padding: '32px', color: 'white' },
  headerTitle: { fontSize: '28px', margin: 0, marginBottom: '8px' },
  headerSub: { margin: 0, opacity: 0.8 },
  content: { padding: '24px 32px' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' },
  statCard: { background: 'white', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', borderTop: '4px solid', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  statIcon: { fontSize: '24px' },
  statValue: { fontSize: '28px', fontWeight: 'bold' },
  statLabel: { fontSize: '12px', color: '#888', textAlign: 'center' },
  section: { background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  sectionTitle: { fontSize: '18px', color: '#1a237e', marginBottom: '20px', marginTop: 0 },
  courseProgress: { marginBottom: '20px' },
  courseHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  courseName: { fontSize: '14px', fontWeight: '600', color: '#333' },
  coursePercent: { fontSize: '14px', fontWeight: 'bold', color: '#1a237e' },
  progressBar: { background: '#e0e0e0', borderRadius: '10px', height: '10px' },
  progressFill: { borderRadius: '10px', height: '10px', transition: 'width 0.3s ease' },
  leaderRow: { display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px', borderRadius: '10px', marginBottom: '8px' },
  leaderRank: { fontSize: '20px', width: '32px', textAlign: 'center' },
  leaderName: { flex: 1, fontSize: '14px', color: '#333' },
  leaderPoints: { fontSize: '14px', fontWeight: 'bold', color: '#1a237e' },
  achievementsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
  achievementCard: { background: '#f5f7ff', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '1px solid #e0e0e0' },
  achievementIcon: { fontSize: '32px' },
  achievementTitle: { fontSize: '14px', fontWeight: 'bold', color: '#1a237e', margin: '8px 0 4px' },
  achievementDesc: { fontSize: '12px', color: '#666', margin: '0 0 8px' },
  earnedBadge: { background: '#e8f5e9', color: '#2e7d32', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
  weeklyGrid: { display: 'flex', gap: '16px', alignItems: 'flex-end', height: '120px' },
  dayBox: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' },
  dayBar: { width: '100%', borderRadius: '4px 4px 0 0' },
  dayLabel: { fontSize: '12px', color: '#666' }
};