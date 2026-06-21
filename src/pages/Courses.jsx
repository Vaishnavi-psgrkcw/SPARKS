import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    fetchCourses();
    const savedEnrolled = JSON.parse(
      localStorage.getItem('enrolledCourses') || '[]'
    );
    setEnrolled(savedEnrolled);
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/courses'
      );
      setCourses(res.data.courses);
    } catch (err) {
      console.log('Error:', err);
    }
    setLoading(false);
  };

  const handleEnroll = (course) => {
    const newEnrolled = [...enrolled, course._id];
    setEnrolled(newEnrolled);
    localStorage.setItem(
      'enrolledCourses',
      JSON.stringify(newEnrolled)
    );
    alert(`🎉 Successfully enrolled in ${course.title}!`);
  };

  const categories = [
    'All', 'Programming', 'Design',
    'Business', 'Science', 'Mathematics', 'Language'
  ];

  const filtered = courses.filter(course => {
    const matchSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchFilter = filter === 'All' ||
      course.category === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={styles.container}>

      {/* Navbar */}
      <div style={styles.navbar}>
        <span style={styles.logo}>⚡ SPARKS</span>
        <div style={styles.navLinks}>
          <a href="/" style={styles.navLink}>🏠 Home</a>
          <a href="/courses" style={styles.navLinkActive}>
            📚 Courses
          </a>
          <a href="/study-buddy" style={styles.navLink}>
            🤖 AI Buddy
          </a>
          <a href="/progress" style={styles.navLink}>
            📊 Progress
          </a>
          <a href="/" style={styles.loginBtn}>
            Login / Register
          </a>
        </div>
      </div>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>
          📚 Explore Our Courses
        </h1>
        <p style={styles.headerSub}>
          Learn anything for FREE — No login required!
        </p>
        <input
          style={styles.search}
          placeholder="🔍 Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Stats Bar */}
      <div style={styles.statsBar}>
        <div style={styles.statItem}>
          📚 <strong>{courses.length}</strong> Courses
        </div>
        <div style={styles.statItem}>
          👥 <strong>10,000+</strong> Students
        </div>
        <div style={styles.statItem}>
          🎓 <strong>100%</strong> Free
        </div>
        <div style={styles.statItem}>
          🤖 <strong>AI</strong> Study Buddy
        </div>
      </div>

      {/* Filter Buttons */}
      <div style={styles.filters}>
        {categories.map(cat => (
          <button
            key={cat}
            style={{
              ...styles.filterBtn,
              ...(filter === cat ? styles.filterActive : {})
            }}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={styles.loading}>
          ⏳ Loading courses...
        </div>
      )}

      {/* Courses Grid */}
      {!loading && (
        <div style={styles.grid}>
          {filtered.map(course => (
            <CourseCard
              key={course._id}
              course={course}
              isEnrolled={enrolled.includes(course._id)}
              onEnroll={() => handleEnroll(course)}
            />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && filtered.length === 0 && (
        <div style={styles.noResults}>
          😔 No courses found for "{search}"
        </div>
      )}

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          ⚡ SPARKS — Smart Personalized Adaptive
          Learning and Knowledge System
        </p>
      </div>

    </div>
  );
}

const CourseCard = ({ course, isEnrolled, onEnroll }) => (
  <div style={styles.card}>
    <img
      src={course.thumbnail}
      alt={course.title}
      style={styles.thumbnail}
    />
    <div style={styles.cardBody}>
      <div style={styles.cardTop}>
        <span style={styles.category}>
          {course.category}
        </span>
        <span style={styles.level}>
          {course.level}
        </span>
      </div>
      <h3 style={styles.cardTitle}>{course.title}</h3>
      <p style={styles.cardDesc}>
        {course.description.substring(0, 100)}...
      </p>
      <div style={styles.cardFooter}>
        <span style={styles.rating}>
          ⭐ {course.rating}
        </span>
        <span style={styles.students}>
          👥 {course.totalStudents}
        </span>
      </div>
      <div style={styles.cardButtons}>
        <button
          style={styles.viewBtn}
          onClick={() =>
            window.location.href = `/courses/${course._id}`
          }
        >
          View Course
        </button>
        <button
          style={{
            ...styles.enrollBtn,
            background: isEnrolled ? '#2e7d32' : '#1a237e'
          }}
          onClick={onEnroll}
          disabled={isEnrolled}
        >
          {isEnrolled ? '✅ Enrolled!' : '🚀 Enroll Free'}
        </button>
      </div>
    </div>
  </div>
);

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f7ff',
    fontFamily: 'Arial, sans-serif'
  },
  navbar: {
    background: 'linear-gradient(135deg, #1a237e, #0d47a1)',
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  navLinks: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  navLink: {
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    fontSize: '14px'
  },
  navLinkActive: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    borderBottom: '2px solid white',
    paddingBottom: '4px'
  },
  loginBtn: {
    background: 'white',
    color: '#1a237e',
    padding: '8px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: 'bold'
  },
  header: {
    background: 'linear-gradient(135deg, #1a237e, #0d47a1)',
    padding: '60px 32px',
    textAlign: 'center',
    color: 'white'
  },
  headerTitle: {
    fontSize: '40px',
    marginBottom: '12px',
    marginTop: 0
  },
  headerSub: {
    fontSize: '18px',
    opacity: 0.9,
    marginBottom: '32px'
  },
  search: {
    width: '100%',
    maxWidth: '600px',
    padding: '16px 24px',
    borderRadius: '30px',
    border: 'none',
    fontSize: '16px',
    outline: 'none',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  statsBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '48px',
    padding: '20px',
    background: 'white',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '15px',
    color: '#555'
  },
  statItem: { display: 'flex', gap: '8px' },
  filters: {
    display: 'flex',
    gap: '12px',
    padding: '24px 32px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  filterBtn: {
    padding: '10px 24px',
    borderRadius: '30px',
    border: '2px solid #1a237e',
    background: 'white',
    color: '#1a237e',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  },
  filterActive: {
    background: '#1a237e',
    color: 'white'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    padding: '0 32px 32px'
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },
  thumbnail: {
    width: '100%',
    height: '180px',
    objectFit: 'cover'
  },
  cardBody: { padding: '20px' },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px'
  },
  category: {
    background: '#e8eaf6',
    color: '#1a237e',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  level: {
    background: '#e8f5e9',
    color: '#2e7d32',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: '8px',
    marginTop: 0
  },
  cardDesc: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '12px'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  rating: { fontSize: '13px', color: '#f57f17' },
  students: { fontSize: '13px', color: '#666' },
  cardButtons: {
    display: 'flex',
    gap: '8px'
  },
  viewBtn: {
    flex: 1,
    padding: '10px',
    background: 'white',
    color: '#1a237e',
    border: '2px solid #1a237e',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  enrollBtn: {
    flex: 1,
    padding: '10px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  loading: {
    textAlign: 'center',
    padding: '60px',
    fontSize: '18px',
    color: '#666'
  },
  noResults: {
    textAlign: 'center',
    padding: '60px',
    fontSize: '18px',
    color: '#666'
  },
  footer: {
    background: '#1a237e',
    padding: '24px',
    textAlign: 'center'
  },
  footerText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '14px',
    margin: 0
  }
};