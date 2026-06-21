import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    question: "🎯 What is your main learning goal?",
    options: [
      { label: "Get a Job / Career Change", value: "career" },
      { label: "Learn New Skills", value: "skills" },
      { label: "Academic Studies", value: "academic" },
      { label: "Personal Growth", value: "personal" }
    ]
  },
  {
    id: 2,
    question: "⏱️ How much time can you study daily?",
    options: [
      { label: "30 minutes", value: "30min" },
      { label: "1 hour", value: "1hr" },
      { label: "2 hours", value: "2hr" },
      { label: "3+ hours", value: "3hr" }
    ]
  },
  {
    id: 3,
    question: "📊 What is your current level?",
    options: [
      { label: "Complete Beginner", value: "beginner" },
      { label: "Some Experience", value: "some" },
      { label: "Intermediate", value: "intermediate" },
      { label: "Advanced", value: "advanced" }
    ]
  },
  {
    id: 4,
    question: "💡 Which field interests you most?",
    options: [
      { label: "💻 Programming", value: "Programming" },
      { label: "🎨 Design", value: "Design" },
      { label: "📈 Business", value: "Business" },
      { label: "🔬 Science & Math", value: "Science" }
    ]
  }
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);

  const handleSelect = (value) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (!selected) return;

    const newAnswers = {
      ...answers,
      [questions[current].id]: selected
    };
    setAnswers(newAnswers);
    setSelected(null);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      // Save answers and go to dashboard
      localStorage.setItem(
        'userPreferences',
        JSON.stringify(newAnswers)
      );
      setDone(true);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    }
  };

  const progress = ((current) / questions.length) * 100;

  if (done) {
    return (
      <div style={styles.container}>
        <div style={styles.doneCard}>
          <div style={styles.doneIcon}>🎉</div>
          <h2 style={styles.doneTitle}>
            Perfect! Your path is ready!
          </h2>
          <p style={styles.doneText}>
            Taking you to your personalized
            dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <span style={styles.logo}>⚡ SPARKS</span>
          <p style={styles.subtitle}>
            Let's personalize your learning!
          </p>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressBar}>
          <div
            style={{
              ...styles.progressFill,
              width: `${progress}%`
            }}
          />
        </div>
        <p style={styles.progressText}>
          Question {current + 1} of {questions.length}
        </p>

        {/* Question */}
        <h2 style={styles.question}>
          {questions[current].question}
        </h2>

        {/* Options */}
        <div style={styles.options}>
          {questions[current].options.map(opt => (
            <button
              key={opt.value}
              style={{
                ...styles.option,
                ...(selected === opt.value
                  ? styles.optionSelected
                  : {})
              }}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          style={{
            ...styles.nextBtn,
            opacity: selected ? 1 : 0.5
          }}
          onClick={handleNext}
          disabled={!selected}
        >
          {current === questions.length - 1
            ? '🚀 Get My Learning Path!'
            : 'Next →'}
        </button>

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
    padding: '20px'
  },
  card: {
    background: 'white',
    borderRadius: '24px',
    padding: '40px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  logo: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1a237e'
  },
  subtitle: {
    color: '#666',
    marginTop: '8px',
    fontSize: '15px'
  },
  progressBar: {
    background: '#e0e0e0',
    borderRadius: '10px',
    height: '8px',
    marginBottom: '8px'
  },
  progressFill: {
    background: 'linear-gradient(135deg, #1a237e, #0d47a1)',
    borderRadius: '10px',
    height: '8px',
    transition: 'width 0.3s ease'
  },
  progressText: {
    textAlign: 'right',
    fontSize: '12px',
    color: '#888',
    marginBottom: '24px'
  },
  question: {
    fontSize: '20px',
    color: '#1a237e',
    marginBottom: '24px',
    textAlign: 'center'
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
    textAlign: 'left',
    transition: 'all 0.2s'
  },
  optionSelected: {
    border: '2px solid #1a237e',
    background: '#e8eaf6',
    color: '#1a237e',
    fontWeight: 'bold'
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
  doneCard: {
    background: 'white',
    borderRadius: '24px',
    padding: '60px 40px',
    textAlign: 'center',
    maxWidth: '400px'
  },
  doneIcon: {
    fontSize: '64px',
    marginBottom: '16px'
  },
  doneTitle: {
    fontSize: '24px',
    color: '#1a237e',
    marginBottom: '12px'
  },
  doneText: {
    color: '#666',
    fontSize: '15px'
  }
};