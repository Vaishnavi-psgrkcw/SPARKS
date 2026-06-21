import React, { useState, useEffect } from 'react';

export default function Tasks() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('sparksTasks') || '[]');
    if (saved.length > 0) {
      setTasks(saved);
    } else {
      // Sample starter tasks
      const starterTasks = [
        { id: 1, text: 'Complete HTML basics module', done: true, priority: 'high', date: new Date().toLocaleDateString() },
        { id: 2, text: 'Practice JavaScript functions', done: false, priority: 'high', date: new Date().toLocaleDateString() },
        { id: 3, text: 'Watch React tutorial video', done: false, priority: 'medium', date: new Date().toLocaleDateString() },
        { id: 4, text: 'Take daily quiz', done: false, priority: 'low', date: new Date().toLocaleDateString() }
      ];
      setTasks(starterTasks);
      localStorage.setItem('sparksTasks', JSON.stringify(starterTasks));
    }
  }, []);

  const saveTasks = (updated) => {
    setTasks(updated);
    localStorage.setItem('sparksTasks', JSON.stringify(updated));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      text: newTask,
      done: false,
      priority: priority,
      date: new Date().toLocaleDateString()
    };
    saveTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    saveTasks(updated);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !== id);
    saveTasks(updated);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTask();
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  const completedCount = tasks.filter(t => t.done).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  const priorityColors = {
    high: '#c62828',
    medium: '#f57f17',
    low: '#2e7d32'
  };

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
          <a href="/progress" style={styles.navItem}>📊 My Progress</a>
          <a href="/quiz" style={styles.navItem}>🎯 Daily Quiz</a>
          <a href="/tasks" style={styles.navItemActive}>✅ Study Tasks</a>
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
          <h1 style={styles.headerTitle}>✅ Study Task Planner</h1>
          <p style={styles.headerSub}>
            Stay organized and track your daily learning goals!
          </p>
        </div>

        <div style={styles.content}>

          {/* Progress Overview */}
          <div style={styles.progressCard}>
            <div style={styles.progressLeft}>
              <h3 style={styles.progressTitle}>Today's Progress</h3>
              <p style={styles.progressSub}>
                {completedCount} of {totalCount} tasks completed
              </p>
            </div>
            <div style={styles.progressCircleWrapper}>
              <div style={styles.progressCircle}>
                <span style={styles.progressPercentText}>
                  {progressPercent}%
                </span>
              </div>
            </div>
          </div>

          {/* Add Task */}
          <div style={styles.addTaskBox}>
            <input
              style={styles.taskInput}
              placeholder="What do you want to study today?"
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <select
              style={styles.prioritySelect}
              value={priority}
              onChange={e => setPriority(e.target.value)}
            >
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
            <button style={styles.addBtn} onClick={addTask}>
              + Add Task
            </button>
          </div>

          {/* Filter Tabs */}
          <div style={styles.filterTabs}>
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                style={{
                  ...styles.filterTab,
                  ...(filter === f ? styles.filterTabActive : {})
                }}
                onClick={() => setFilter(f)}
              >
                {f === 'all' && `All (${totalCount})`}
                {f === 'active' && `Active (${totalCount - completedCount})`}
                {f === 'completed' && `Completed (${completedCount})`}
              </button>
            ))}
          </div>

          {/* Task List */}
          <div style={styles.taskList}>
            {filteredTasks.length === 0 && (
              <div style={styles.emptyState}>
                📝 No tasks here! Add a new study task above.
              </div>
            )}
            {filteredTasks.map(task => (
              <div key={task.id} style={styles.taskItem}>
                <div style={styles.taskLeft}>
                  <button
                    style={{
                      ...styles.checkbox,
                      background: task.done ? '#2e7d32' : 'white',
                      borderColor: task.done ? '#2e7d32' : '#ccc'
                    }}
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.done && '✓'}
                  </button>
                  <div>
                    <p style={{
                      ...styles.taskText,
                      textDecoration: task.done ? 'line-through' : 'none',
                      color: task.done ? '#999' : '#333'
                    }}>
                      {task.text}
                    </p>
                    <span style={styles.taskDate}>{task.date}</span>
                  </div>
                </div>
                <div style={styles.taskRight}>
                  <span style={{
                    ...styles.priorityBadge,
                    background: priorityColors[task.priority] + '20',
                    color: priorityColors[task.priority]
                  }}>
                    {task.priority}
                  </span>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteTask(task.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
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
  content: { padding: '24px 32px', maxWidth: '900px' },
  progressCard: { background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  progressLeft: {},
  progressTitle: { margin: 0, fontSize: '16px', color: '#1a237e' },
  progressSub: { margin: '4px 0 0', fontSize: '13px', color: '#666' },
  progressCircleWrapper: {},
  progressCircle: { width: '70px', height: '70px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a237e, #0d47a1)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  progressPercentText: { color: 'white', fontSize: '18px', fontWeight: 'bold' },
  addTaskBox: { display: 'flex', gap: '10px', marginBottom: '20px' },
  taskInput: { flex: 1, padding: '14px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' },
  prioritySelect: { padding: '14px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px', background: 'white' },
  addBtn: { padding: '14px 24px', background: '#1a237e', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' },
  filterTabs: { display: 'flex', gap: '8px', marginBottom: '16px' },
  filterTab: { padding: '8px 18px', borderRadius: '20px', border: '1px solid #ddd', background: 'white', color: '#666', fontSize: '13px', cursor: 'pointer' },
  filterTabActive: { background: '#1a237e', color: 'white', border: '1px solid #1a237e' },
  taskList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  emptyState: { textAlign: 'center', padding: '40px', color: '#999', background: 'white', borderRadius: '12px' },
  taskItem: { background: 'white', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  taskLeft: { display: 'flex', alignItems: 'center', gap: '14px' },
  checkbox: { width: '24px', height: '24px', borderRadius: '6px', border: '2px solid #ccc', cursor: 'pointer', color: 'white', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  taskText: { margin: 0, fontSize: '14px', fontWeight: '500' },
  taskDate: { fontSize: '11px', color: '#aaa' },
  taskRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  priorityBadge: { padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', textTransform: 'capitalize' },
  deleteBtn: { background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }
};