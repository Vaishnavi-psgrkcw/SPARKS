import React, { useState } from 'react';

const quizData = {
  Programming: [
    { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Module"], answer: 0 },
    { q: "Which symbol is used for comments in JavaScript?", options: ["#", "//", "<!-- -->", "**"], answer: 1 },
    { q: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Color Style Sheets"], answer: 1 },
    { q: "Which is a JavaScript framework?", options: ["Django", "Laravel", "React", "Flask"], answer: 2 },
    { q: "What tag creates a hyperlink in HTML?", options: ["<link>", "<a>", "<href>", "<url>"], answer: 1 }
  ],
  Science: [
    { q: "What is Python primarily used for?", options: ["Only games", "Data Science & AI", "Only mobile apps", "Only websites"], answer: 1 },
    { q: "What does AI stand for?", options: ["Automated Internet", "Artificial Intelligence", "Active Interface", "Auto Integration"], answer: 1 },
    { q: "Which library is used for data analysis in Python?", options: ["Pandas", "Photoshop", "Premiere", "PowerPoint"], answer: 0 },
    { q: "What is Machine Learning?", options: ["Manual coding", "Computers learning from data", "Hardware repair", "Network setup"], answer: 1 },
    { q: "Which is a Python data type?", options: ["HTML", "List", "CSS", "Tag"], answer: 1 }
  ],
  Design: [
    { q: "What are the primary colors?", options: ["Red, Green, Blue", "Red, Yellow, Blue", "Black, White, Grey", "Orange, Purple, Green"], answer: 1 },
    { q: "What does UX stand for?", options: ["User Experience", "Universal Export", "Unique Exchange", "User Extension"], answer: 0 },
    { q: "Which tool is popular for UI design?", options: ["Excel", "Figma", "Notepad", "Calculator"], answer: 1 },
    { q: "What is typography?", options: ["Color theory", "Art of arranging text", "Image editing", "Video editing"], answer: 1 },
    { q: "What does UI stand for?", options: ["User Interface", "Universal Index", "Unique Identity", "User Integration"], answer: 0 }
  ],
  Business: [
    { q: "What is SEO?", options: ["Search Engine Optimization", "Sales Email Outreach", "System Error Output", "Social Engagement Online"], answer: 0 },
    { q: "What does ROI stand for?", options: ["Rate of Interest", "Return on Investment", "Risk of Income", "Range of Inventory"], answer: 1 },
    { q: "What is a target audience?", options: ["All people", "Specific group you market to", "Random people", "Competitors"], answer: 1 },
    { q: "What is branding?", options: ["Selling products", "Creating company identity", "Hiring staff", "Office design"], answer: 1 },
    { q: "What is networking in business?", options: ["Computer networks", "Building professional relationships", "Internet setup", "Email marketing"], answer: 1 }
  ]
};

export default function Quiz() {
  const [category, setCategory] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const questions = category ? quizData[category] : [];

  const handleAnswer = (index) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === questions[currentQ].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCategory(null);
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  // Category Selection Screen
  if (!category) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>🎯 Daily Quiz Challenge</h1>
          <p style={styles.subtitle}>
            Test your knowledge and earn points!
          </p>
          <div style={styles.categoryGrid}>
            {Object.keys(quizData).map(cat => (
              <button
                key={cat}
                style={styles.categoryBtn}
                onClick={() => setCategory(cat)}
              >
                {cat === 'Programming' && '💻'}
                {cat === 'Science' && '🔬'}
                {cat === 'Design' && '🎨'}
                {cat === 'Business' && '📈'}
                <span>{cat}</span>
              </button>
            ))}
          </div>
          <a href="/dashboard" style={styles.backLink}>
            ← Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  // Result Screen
  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.resultIcon}>
            {percentage >= 80 ? '🏆' : percentage >= 50 ? '👍' : '💪'}
          </div>
          <h1 style={styles.title}>Quiz Complete!</h1>
          <p style={styles.scoreText}>
            You scored {score} out of {questions.length}
          </p>
          <div style={styles.percentCircle}>
            <span style={styles.percentText}>{percentage}%</span>
          </div>
          <p style={styles.pointsEarned}>
            ⭐ +{score * 10} Points Earned!
          </p>
          <div style={styles.resultButtons}>
            <button style={styles.tryAgainBtn} onClick={handleRestart}>
              🔄 Try Another Quiz
            </button>
            <a href="/dashboard" style={styles.dashBtn}>
              🏠 Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Question Screen
  const q = questions[currentQ];
  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Progress */}
        <div style={styles.progressInfo}>
          <span>Question {currentQ + 1} of {questions.length}</span>
          <span>⭐ Score: {score}</span>
        </div>
        <div style={styles.progressBar}>
          <div style={{
            ...styles.progressFill,
            width: `${((currentQ + 1) / questions.length) * 100}%`
          }} />
        </div>

        {/* Question */}
        <h2 style={styles.question}>{q.q}</h2>

        {/* Options */}
        <div style={styles.options}>
          {q.options.map((option, i) => (
            <button
              key={i}
              style={{
                ...styles.option,
                ...(answered && i === q.answer ? styles.correctOption : {}),
                ...(answered && selected === i && i !== q.answer ? styles.wrongOption : {}),
                ...(!answered && selected === i ? styles.selectedOption : {})
              }}
              onClick={() => handleAnswer(i)}
            >
              {option}
              {answered && i === q.answer && ' ✅'}
              {answered && selected === i && i !== q.answer && ' ❌'}
            </button>
          ))}
        </div>

        {/* Next Button */}
        {answered && (
          <button style={styles.nextBtn} onClick={handleNext}>
            {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results →'}
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a237e, #0d47a1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  card: {
    background: 'white',
    borderRadius: '24px',
    padding: '40px',
    width: '100%',
    maxWidth: '550px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  title: {
    fontSize: '26px',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: '8px'
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '32px'
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '24px'
  },
  categoryBtn: {
    padding: '24px',
    borderRadius: '16px',
    border: '2px solid #e0e0e0',
    background: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1a237e',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  backLink: {
    display: 'block',
    textAlign: 'center',
    color: '#1a237e',
    textDecoration: 'none',
    fontSize: '14px'
  },
  progressInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: '#666',
    marginBottom: '8px'
  },
  progressBar: {
    background: '#e0e0e0',
    borderRadius: '10px',
    height: '8px',
    marginBottom: '32px'
  },
  progressFill: {
    background: 'linear-gradient(135deg, #1a237e, #0d47a1)',
    borderRadius: '10px',
    height: '8px',
    transition: 'width 0.3s ease'
  },
  question: {
    fontSize: '20px',
    color: '#1a237e',
    marginBottom: '24px'
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px'
  },
  option: {
    padding: '16px',
    borderRadius: '12px',
    border: '2px solid #e0e0e0',
    background: 'white',
    fontSize: '15px',
    cursor: 'pointer',
    textAlign: 'left'
  },
  selectedOption: {
    border: '2px solid #1a237e',
    background: '#e8eaf6'
  },
  correctOption: {
    border: '2px solid #2e7d32',
    background: '#e8f5e9',
    color: '#2e7d32'
  },
  wrongOption: {
    border: '2px solid #c62828',
    background: '#ffebee',
    color: '#c62828'
  },
  nextBtn: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #1a237e, #0d47a1)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  resultIcon: {
    fontSize: '64px',
    textAlign: 'center',
    marginBottom: '16px'
  },
  scoreText: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
    marginBottom: '24px'
  },
  percentCircle: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #1a237e, #0d47a1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px'
  },
  percentText: {
    color: 'white',
    fontSize: '32px',
    fontWeight: 'bold'
  },
  pointsEarned: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#f57f17',
    fontWeight: 'bold',
    marginBottom: '24px'
  },
  resultButtons: {
    display: 'flex',
    gap: '12px'
  },
  tryAgainBtn: {
    flex: 1,
    padding: '14px',
    background: '#1a237e',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  dashBtn: {
    flex: 1,
    padding: '14px',
    background: 'white',
    color: '#1a237e',
    border: '2px solid #1a237e',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none'
  }
};