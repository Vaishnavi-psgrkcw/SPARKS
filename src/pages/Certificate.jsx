import React, { useState } from 'react';
import jsPDF from 'jspdf';

export default function Certificate() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [generated, setGenerated] = useState(false);

  const courses = [
    'Complete Web Development Bootcamp',
    'Python for Data Science',
    'UI/UX Design Fundamentals',
    'Machine Learning Basics',
    'Business Communication',
    'React.js Complete Guide',
    'Digital Marketing Mastery',
    'Node.js Backend Development'
  ];

  const generateCertificate = () => {
    if (!selectedCourse) {
      alert('Please select a course first!');
      return;
    }

    const doc = new jsPDF('landscape', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Border
    doc.setDrawColor(26, 35, 126);
    doc.setLineWidth(2);
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

    doc.setDrawColor(13, 71, 161);
    doc.setLineWidth(0.5);
    doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

    // Logo / Title
    doc.setFontSize(28);
    doc.setTextColor(26, 35, 126);
    doc.setFont('helvetica', 'bold');
    doc.text('⚡ SPARKS', pageWidth / 2, 35, { align: 'center' });

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'Smart Personalized Adaptive Learning and Knowledge System',
      pageWidth / 2,
      43,
      { align: 'center' }
    );

    // Certificate Title
    doc.setFontSize(32);
    doc.setTextColor(13, 71, 161);
    doc.setFont('helvetica', 'bold');
    doc.text('Certificate of Completion', pageWidth / 2, 70, {
      align: 'center'
    });

    // This certifies
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.text('This is to certify that', pageWidth / 2, 90, {
      align: 'center'
    });

    // Student Name
    doc.setFontSize(26);
    doc.setTextColor(26, 35, 126);
    doc.setFont('helvetica', 'bold');
    doc.text(user.name || 'Student Name', pageWidth / 2, 105, {
      align: 'center'
    });

    // Has completed
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'has successfully completed the course',
      pageWidth / 2,
      120,
      { align: 'center' }
    );

    // Course Name
    doc.setFontSize(20);
    doc.setTextColor(13, 71, 161);
    doc.setFont('helvetica', 'bold');
    doc.text(selectedCourse, pageWidth / 2, 133, { align: 'center' });

    // Date
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date of Completion: ${today}`, pageWidth / 2, 148, {
      align: 'center'
    });

    // Signature line
    doc.setDrawColor(150, 150, 150);
    doc.line(pageWidth / 2 - 35, 175, pageWidth / 2 + 35, 175);
    doc.setFontSize(11);
    doc.text('SPARKS Academy', pageWidth / 2, 182, { align: 'center' });

    // Save the PDF
    doc.save(`SPARKS_Certificate_${user.name || 'Student'}.pdf`);
    setGenerated(true);
  };

  return (
    <div style={styles.container}>

      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <span style={styles.logo}>⚡ SPARKS</span>
        </div>
        <nav style={styles.nav}>
          <a href="/dashboard" style={styles.navItem}>🏠 Dashboard</a>
          <a href="/courses" style={styles.navItem}>📚 Courses</a>
          <a href="/tasks" style={styles.navItem}>✅ Study Tasks</a>
          <a href="/quiz" style={styles.navItem}>🎯 Daily Quiz</a>
          <a href="/progress" style={styles.navItem}>📊 My Progress</a>
          <a href="/certificate" style={styles.navItemActive}>🎓 Certificates</a>
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

      <div style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>🎓 Get Your Certificate</h1>
          <p style={styles.headerSub}>
            Download a professional certificate for your completed courses!
          </p>
        </div>

        <div style={styles.content}>

          <div style={styles.previewCard}>
            <div style={styles.certPreview}>
              <span style={styles.certPreviewLogo}>⚡ SPARKS</span>
              <p style={styles.certPreviewSub}>
                Certificate of Completion
              </p>
              <div style={styles.certPreviewLine} />
              <p style={styles.certPreviewName}>
                {user.name || 'Your Name'}
              </p>
              <p style={styles.certPreviewText}>
                has successfully completed
              </p>
              <p style={styles.certPreviewCourse}>
                {selectedCourse || 'Select a course below'}
              </p>
            </div>
          </div>

          <div style={styles.selectorCard}>
            <h2 style={styles.sectionTitle}>
              Choose Your Completed Course
            </h2>
            <select
              style={styles.select}
              value={selectedCourse}
              onChange={e => {
                setSelectedCourse(e.target.value);
                setGenerated(false);
              }}
            >
              <option value="">-- Select a Course --</option>
              {courses.map((course, i) => (
                <option key={i} value={course}>{course}</option>
              ))}
            </select>

            <button
              style={styles.generateBtn}
              onClick={generateCertificate}
            >
              📜 Generate & Download Certificate
            </button>

            {generated && (
              <p style={styles.successMsg}>
                ✅ Certificate downloaded successfully!
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

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
  content: { padding: '24px 32px', maxWidth: '800px' },
  previewCard: { background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  certPreview: { border: '3px solid #1a237e', borderRadius: '12px', padding: '40px', textAlign: 'center', background: 'linear-gradient(135deg, #f5f7ff, #ffffff)' },
  certPreviewLogo: { fontSize: '24px', fontWeight: 'bold', color: '#1a237e' },
  certPreviewSub: { fontSize: '14px', color: '#666', margin: '8px 0 20px' },
  certPreviewLine: { width: '60px', height: '3px', background: '#1a237e', margin: '0 auto 20px' },
  certPreviewName: { fontSize: '22px', fontWeight: 'bold', color: '#1a237e', margin: '0 0 8px' },
  certPreviewText: { fontSize: '13px', color: '#666', margin: '0 0 8px' },
  certPreviewCourse: { fontSize: '16px', fontWeight: '600', color: '#0d47a1', margin: 0 },
  selectorCard: { background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  sectionTitle: { fontSize: '18px', color: '#1a237e', marginTop: 0, marginBottom: '16px' },
  select: { width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px', marginBottom: '20px', background: 'white' },
  generateBtn: { width: '100%', padding: '16px', background: 'linear-gradient(135deg, #1a237e, #0d47a1)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' },
  successMsg: { textAlign: 'center', color: '#2e7d32', fontWeight: 'bold', marginTop: '16px' }
};