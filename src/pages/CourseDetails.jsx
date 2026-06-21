import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [activeTab, setActiveTab] = useState('curriculum');

  const courseId = window.location.pathname.split('/')[2];

  const modules = {
    Programming: [
      { title: 'Introduction & Setup', duration: '30 mins', lessons: 3, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'HTML Fundamentals', duration: '1 hour', lessons: 5, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'CSS Styling', duration: '1.5 hours', lessons: 8, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'JavaScript Basics', duration: '2 hours', lessons: 10, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'React Components', duration: '2 hours', lessons: 8, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Final Project', duration: '3 hours', lessons: 5, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' }
    ],
    Science: [
      { title: 'Python Basics', duration: '1 hour', lessons: 5, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'NumPy & Pandas', duration: '2 hours', lessons: 8, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Data Visualization', duration: '1.5 hours', lessons: 6, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Machine Learning', duration: '3 hours', lessons: 12, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Final Project', duration: '2 hours', lessons: 4, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' }
    ],
    Design: [
      { title: 'Design Principles', duration: '1 hour', lessons: 4, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Color Theory', duration: '45 mins', lessons: 3, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Typography', duration: '1 hour', lessons: 5, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'UI Design', duration: '2 hours', lessons: 8, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'UX Research', duration: '1.5 hours', lessons: 6, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Figma Project', duration: '2 hours', lessons: 5, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' }
    ],
    Business: [
      { title: 'Communication Basics', duration: '1 hour', lessons: 4, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Email Writing', duration: '45 mins', lessons: 3, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Presentations', duration: '1.5 hours', lessons: 6, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Team Management', duration: '2 hours', lessons: 8, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Final Project', duration: '1 hour', lessons: 3, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' }
    ],
    Mathematics: [
      { title: 'Algebra Basics', duration: '1 hour', lessons: 5, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Calculus', duration: '2 hours', lessons: 8, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Linear Algebra', duration: '2 hours', lessons: 8, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Statistics', duration: '1.5 hours', lessons: 6, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Practice Problems', duration: '1 hour', lessons: 10, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' }
    ],
    Language: [
      { title: 'Basic Grammar', duration: '1 hour', lessons: 5, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Vocabulary Building', duration: '1 hour', lessons: 6, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Speaking Skills', duration: '1.5 hours', lessons: 8, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Writing Skills', duration: '1 hour', lessons: 5, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' },
      { title: 'Final Assessment', duration: '45 mins', lessons: 3, video: '[youtube.com](https://www.youtube.com/embed/UB1O30fR-EE)' }
    ]
  };

  // FIXED: The useEffect was corrupted — corrected syntax below
  useEffect(() => {
    fetchCourse();
    const savedEnrolled = JSON.parse(
      localStorage.getItem('enrolledCourses') || '[]'
    );
    setEnrolled(savedEnrolled.includes(courseId));
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(
        `[localhost](http://localhost:5000/api/courses/${courseId})`
      );
      setCourse(res.data.course);
    } catch (err) {
      console.log('Error:', err);
    }
    setLoading(false);
  };

  const handleEnroll = () => {
    const savedEnrolled = JSON.parse(
      localStorage.getItem('enrolledCourses') || '[]'
    );
    const newEnrolled = [...savedEnrolled, courseId];
    localStorage.setItem(
      'enrolledCourses',
      JSON.stringify(newEnrolled)
    );
    setEnrolled(true);
    alert('🎉 Successfully enrolled! All modules unlocked!');
  };

  const getCourseModules = () => {
    if (!course) return [];
    return modules[course.category] || modules['Programming'];
  };

  if (loading) return (
    <div style={styles.loading}>⏳ Loading course...</div>
  );

  if (!course) return (
    <div style={styles.loading}>❌ Course not found!</div>
  );

  const courseModules = getCourseModules();

  return (
    <div style={styles.container}>

      {/* Navbar */}
      <div style={styles.navbar}>
        <span style={styles.logo}>⚡ SPARKS</span>
        <div style={styles.navLinks}>
          <a href="/" style={styles.navLink}>🏠 Home</a>
          <a href="/courses" style={styles.navLink}>📚 Courses</a>
          <a href="/goals" style={styles.navLink}>🎯 Goals</a>
          <a href="/progress" style={styles.navLink}>📊 Progress</a>
          <a href="/todo" style={styles.navLink}>📋 Tasks</a>
        </div>
      </div>

      {/* Course Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <div style={styles.breadcrumb}>
              <a href="/courses" style={styles.breadcrumbLink}>
                Courses
              </a>
              <span style={styles.breadcrumbSep}>→</span>
              <span>{course.category}</span>
            </div>

            <h1 style={styles.courseTitle}>{course.title}</h1>
            <p style={styles.courseDesc}>{course.description}</p>

            <div style={styles.courseMeta}>
              <span style={styles.metaItem}>⭐ {course.rating} Rating</span>
              <span style={styles.metaItem}>👥 {course.totalStudents} Students</span>
              <span style={styles.metaItem}>📊 {course.level}</span>
              <span style={styles.metaItem}>🏷️ {course.category}</span>
              <span style={styles.metaItem}>🎓 Certificate Included</span>
            </div>

            <div style={styles.instructorBox}>
              <div style={styles.instructorAvatar}>
                {course.instructor?.name?.[0]?.toUpperCase() || 'S'}
              </div>
              <div>
                <p style={styles.instructorName}>
                  {course.instructor?.name || 'SPARKS Expert'}
                </p>
                <p style={styles.instructorTitle}>
                  ⭐ Expert Instructor • SPARKS Academy
                </p>
              </div>
            </div>
          </div>

          {/* Enroll Card */}
          <div style={styles.enrollCard}>
            <img
              src={course.thumbnail}
              alt={course.title}
              style={styles.thumbnail}
            />
            <div style={styles.enrollCardBody}>
              <p style={styles.freeLabel}>🎉 100% FREE!</p>
              <p style={styles.freeDesc}>
                Full access to all {courseModules.length} modules
              </p>
              <button
                style={{
                  ...styles.enrollBtn,
                  background: enrolled
                    ? '#2e7d32'
                    : 'linear-gradient(135deg, #1a237e, #0d47a1)'
                }}
                onClick={handleEnroll}
                disabled={enrolled}
              >
                {enrolled
                  ? '✅ Enrolled — Start Learning!'
                  : '🚀 Enroll Now — It\'s Free!'}
              </button>
              <div style={styles.features}>
                <p style={styles.feature}>✅ {courseModules.length} video lessons</p>
                <p style={styles.feature}>✅ Full lifetime access</p>
                <p style={styles.feature}>✅ Certificate of completion</p>
                <p style={styles.feature}>✅ No login required</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {['curriculum', 'overview', 'reviews'].map(tab => (
          <button
            key={tab}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.tabActive : {})
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'curriculum' && '📚 Curriculum'}
            {tab === 'overview' && '📖 Overview'}
            {tab === 'reviews' && '⭐ Reviews'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={styles.content}>

        {/* Curriculum Tab */}
        {activeTab === 'curriculum' && (
          <div style={styles.curriculumSection}>

            <div style={styles.curriculumHeader}>
              <h2 style={styles.sectionTitle}>
                📚 Course Curriculum
              </h2>
              <p style={styles.curriculumSub}>
                {courseModules.length} modules •
                All modules FREE & unlocked!
              </p>
            </div>

            {courseModules.map((module, i) => (
              <div key={i} style={styles.moduleWrapper}>
                <div
                  style={{
                    ...styles.moduleItem,
                    background: activeModule === i
                      ? '#e8eaf6'
                      : 'white'
                  }}
                  onClick={() => setActiveModule(
                    activeModule === i ? null : i
                  )}
                >
                  <div style={styles.moduleLeft}>
                    <div style={styles.moduleNum}>
                      {activeModule === i ? '▼' : '▶'}
                    </div>
                    <div>
                      <p style={styles.moduleTitle}>
                        Module {i + 1}: {module.title}
                      </p>
                      <p style={styles.moduleMeta}>
                        📹 {module.lessons} lessons •
                        ⏱️ {module.duration}
                      </p>
                    </div>
                  </div>
                  <span style={styles.freeTag}>
                    🔓 Free Access
                  </span>
                </div>

                {activeModule === i && (
                  <div style={styles.videoWrapper}>
                    <div style={styles.videoHeader}>
                      <span style={styles.videoTitle}>
                        📹 {module.title} — Video Lesson
                      </span>
                    </div>
                    <iframe
                      width="100%"
                      height="450"
                      src={module.video}
                      title={module.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={styles.videoPlayer}
                    />
                    <div style={styles.videoFooter}>
                      {i < courseModules.length - 1 && (
                        <button
                          style={styles.nextBtn}
                          onClick={() => setActiveModule(i + 1)}
                        >
                          Next Module →
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={styles.overviewSection}>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                📖 What You'll Learn
              </h2>
              <div style={styles.learnGrid}>
                {[
                  'Understand core concepts thoroughly',
                  'Build real-world projects from scratch',
                  'Industry best practices and standards',
                  'Problem solving and critical thinking',
                  'Hands-on practical experience',
                  'Career-ready professional skills',
                  'Portfolio-worthy projects',
                  'Interview preparation tips'
                ].map((item, i) => (
                  <div key={i} style={styles.learnItem}>
                    <span>✅</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                📋 Requirements
              </h2>
              <ul style={styles.requirementsList}>
                <li>Basic computer knowledge</li>
                <li>Willingness to learn</li>
                <li>Internet connection</li>
                <li>No prior experience needed!</li>
              </ul>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div style={styles.reviewsSection}>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>
                ⭐ Student Reviews
              </h2>
              <div style={styles.ratingBig}>
                <span style={styles.ratingNum}>
                  {course.rating}
                </span>
                <div>
                  <p style={styles.stars}>⭐⭐⭐⭐⭐</p>
                  <p style={styles.ratingTotal}>
                    Course Rating
                  </p>
                </div>
              </div>

              {[
                { name: 'Priya S.', rating: 5, comment: 'Amazing course! Very well explained and easy to understand. Highly recommended!' },
                { name: 'Rahul M.', rating: 5, comment: 'Best free course I have ever taken! The Tasks is a great addition!' },
                { name: 'Anitha K.', rating: 4, comment: 'Very helpful content. Learned a lot from this course. Thank you SPARKS!' },
                { name: 'Karthik R.', rating: 5, comment: 'Excellent teaching style. Clear explanations with practical examples!' }
              ].map((review, i) => (
                <div key={i} style={styles.reviewCard}>
                  <div style={styles.reviewHeader}>
                    <div style={styles.reviewAvatar}>
                      {review.name[0]}
                    </div>
                    <div>
                      <p style={styles.reviewName}>
                        {review.name}
                      </p>
                      <p style={styles.reviewStars}>
                        {'⭐'.repeat(review.rating)}
                      </p>
                    </div>
                  </div>
                  <p style={styles.reviewComment}>
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f7ff',
    fontFamily: 'Arial, sans-serif'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '20px'
  },
  navbar: {
    background: 'linear-gradient(135deg, #1a237e, #0d47a1)',
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  logo: {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center'
  },
  navLink: {
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    fontSize: '14px'
  },
  header: {
    background: 'linear-gradient(135deg, #1a237e, #0d47a1)',
    padding: '40px 32px',
    color: 'white'
  },
  headerContent: {
    display: 'flex',
    gap: '32px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  headerLeft: { flex: 1 },
  breadcrumb: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
    fontSize: '14px',
    opacity: 0.8
  },
  breadcrumbLink: {
    color: 'white',
    textDecoration: 'none'
  },
  breadcrumbSep: { opacity: 0.5 },
  courseTitle: {
    fontSize: '32px',
    marginBottom: '16px',
    marginTop: 0,
    lineHeight: '1.3'
  },
  courseDesc: {
    fontSize: '16px',
    opacity: 0.9,
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  courseMeta: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '20px'
  },
  metaItem: {
    background: 'rgba(255,255,255,0.15)',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px'
  },
  instructorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  instructorAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  instructorName: {
    margin: 0,
    fontWeight: 'bold',
    fontSize: '15px'
  },
  instructorTitle: {
    margin: 0,
    opacity: 0.7,
    fontSize: '13px'
  },
  enrollCard: {
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    width: '340px',
    flexShrink: 0,
    boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
  },
  thumbnail: {
    width: '100%',
    height: '190px',
    objectFit: 'cover'
  },
  enrollCardBody: { padding: '20px' },
  freeLabel: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2e7d32',
    margin: '0 0 4px'
  },
  freeDesc: {
    fontSize: '13px',
    color: '#666',
    margin: '0 0 16px'
  },
  enrollBtn: {
    width: '100%',
    padding: '14px',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '16px'
  },
  features: {
    borderTop: '1px solid #eee',
    paddingTop: '16px'
  },
  feature: {
    fontSize: '13px',
    color: '#555',
    margin: '8px 0'
  },
  tabs: {
    display: 'flex',
    background: 'white',
    borderBottom: '2px solid #e0e0e0',
    padding: '0 32px'
  },
  tab: {
    padding: '16px 24px',
    background: 'none',
    border: 'none',
    fontSize: '15px',
    cursor: 'pointer',
    color: '#666',
    fontWeight: '500'
  },
  tabActive: {
    color: '#1a237e',
    fontWeight: 'bold',
    borderBottom: '3px solid #1a237e'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px'
  },
  curriculumSection: {},
  curriculumHeader: {
    marginBottom: '20px'
  },
  sectionTitle: {
    fontSize: '22px',
    color: '#1a237e',
    marginTop: 0,
    marginBottom: '8px'
  },
  curriculumSub: {
    color: '#666',
    fontSize: '14px',
    margin: 0
  },
  moduleWrapper: {
    marginBottom: '8px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  moduleItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  moduleLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  moduleNum: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#e8eaf6',
    color: '#1a237e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    flexShrink: 0
  },
  moduleTitle: {
    margin: 0,
    fontWeight: '600',
    color: '#333',
    fontSize: '15px'
  },
  moduleMeta: {
    margin: '4px 0 0',
    fontSize: '13px',
    color: '#888'
  },
  freeTag: {
    background: '#e8f5e9',
    color: '#2e7d32',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    flexShrink: 0
  },
  videoWrapper: {
    background: '#000',
    padding: '0'
  },
  videoHeader: {
    background: '#1a237e',
    padding: '12px 20px'
  },
  videoTitle: {
    color: 'white',
    fontSize: '14px',
    fontWeight: '600'
  },
  videoPlayer: {
    display: 'block',
    borderRadius: '0'
  },
  videoFooter: {
    background: '#f5f7ff',
    padding: '16px 20px',
    display: 'flex',
    gap: '12px'
  },
  reviewsSection: {},
  ratingBig: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '24px',
    padding: '20px',
    background: '#f5f7ff',
    borderRadius: '12px'
  },
  ratingNum: {
    fontSize: '64px',
    fontWeight: 'bold',
    color: '#1a237e'
  },
  stars: {
    fontSize: '24px',
    margin: 0
  },
  ratingTotal: {
    color: '#666',
    fontSize: '14px',
    margin: '4px 0 0'
  },
  reviewCard: {
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '20px',
    marginBottom: '20px'
  },
  reviewHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px'
  },
  reviewAvatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: '#1a237e',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  reviewName: {
    margin: 0,
    fontWeight: 'bold',
    color: '#333'
  },
  reviewStars: {
    margin: '4px 0 0',
    fontSize: '14px'
  },
  reviewComment: {
    color: '#555',
    fontSize: '14px',
    lineHeight: '1.6',
    margin: 0
  }
};
