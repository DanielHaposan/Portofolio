import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Moon, Sun, CheckCircle2, Circle } from 'lucide-react';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [isDark, setIsDark] = useState(false);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <div className="grain"></div>
      <div className="container">
        
        {/* Header */}
        <header className="header">
          <div className="title-section">
            <h1 className="title">Tasks</h1>
            <div className="stats">
              {tasks.length > 0 && (
                <span className="stat-badge">
                  {completedCount}/{tasks.length} done
                </span>
              )}
            </div>
          </div>
          
          <button 
            className="theme-toggle"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {/* Input Section */}
        <div className="input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="task-input"
          />
          <button onClick={addTask} className="add-button">
            <Plus size={20} />
          </button>
        </div>

        {/* Task List */}
        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Add one to get started!</p>
            </div>
          ) : (
            tasks.map((task, index) => (
              <div 
                key={task.id} 
                className={`task-item ${task.completed ? 'completed' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  className="check-button"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? (
                    <CheckCircle2 size={22} className="check-icon checked" />
                  ) : (
                    <Circle size={22} className="check-icon" />
                  )}
                </button>
                
                <span className="task-text">{task.text}</span>
                
                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete task"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app {
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow-x: hidden;
        }

        .app.light {
          background: linear-gradient(135deg, #fdfbf7 0%, #f5ebe0 100%);
          color: #2d1810;
        }

        .app.dark {
          background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
          color: #e8e8e8;
        }

        .grain {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .container {
          margin: 0;
          padding: 4rem 3rem;
          position: relative;
          z-index: 1;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 3rem;
          animation: slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .title-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .title {
          font-family: 'Instrument Serif', serif;
          font-size: 3.5rem;
          font-weight: 400;
          letter-spacing: -0.02em;
          font-style: italic;
        }

        .light .title {
          color: #2d1810;
          text-shadow: 2px 2px 0 rgba(212, 163, 115, 0.2);
        }

        .dark .title {
          color: #e8e8e8;
          text-shadow: 2px 2px 0 rgba(255, 255, 255, 0.1);
        }

        .stats {
          display: flex;
          gap: 0.5rem;
        }

        .stat-badge {
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.35rem 0.85rem;
          border-radius: 20px;
          animation: fadeIn 0.4s ease-out;
        }

        .light .stat-badge {
          background: rgba(212, 163, 115, 0.15);
          color: #8b5a3c;
          border: 1px solid rgba(212, 163, 115, 0.3);
        }

        .dark .stat-badge {
          background: rgba(255, 255, 255, 0.08);
          color: #a8a8a8;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.75rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .light .theme-toggle {
          color: #2d1810;
          background: rgba(212, 163, 115, 0.1);
        }

        .light .theme-toggle:hover {
          background: rgba(212, 163, 115, 0.2);
          transform: rotate(15deg);
        }

        .dark .theme-toggle {
          color: #e8e8e8;
          background: rgba(255, 255, 255, 0.05);
        }

        .dark .theme-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: rotate(-15deg);
        }

        .input-section {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2rem;
          animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .task-input {
          flex: 1;
          padding: 1rem 1.25rem;
          border: 2px solid transparent;
          border-radius: 16px;
          font-size: 1rem;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s ease;
        }

        .light .task-input {
          background: rgba(255, 255, 255, 0.7);
          color: #2d1810;
          box-shadow: 0 2px 8px rgba(45, 24, 16, 0.05);
        }

        .light .task-input:focus {
          outline: none;
          border-color: #d4a373;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 16px rgba(212, 163, 115, 0.15);
        }

        .dark .task-input {
          background: rgba(255, 255, 255, 0.05);
          color: #e8e8e8;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .dark .task-input:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 16px rgba(255, 255, 255, 0.1);
        }

        .task-input::placeholder {
          opacity: 0.5;
        }

        .add-button {
          padding: 1rem 1.25rem;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 600;
        }

        .light .add-button {
          background: linear-gradient(135deg, #d4a373 0%, #b8865f 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(212, 163, 115, 0.3);
        }

        .light .add-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 163, 115, 0.4);
        }

        .dark .add-button {
          background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%);
          color: #e8e8e8;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .dark .add-button:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #4a4a4a 0%, #3a3a3a 100%);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.1);
        }

        .add-button:active {
          transform: translateY(0);
        }

        .task-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .task-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: taskEnter 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        @keyframes taskEnter {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .light .task-item {
          background: rgba(255, 255, 255, 0.6);
          box-shadow: 0 2px 8px rgba(45, 24, 16, 0.04);
        }

        .light .task-item:hover {
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 16px rgba(45, 24, 16, 0.08);
          transform: translateX(4px);
        }

        .dark .task-item {
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .dark .task-item:hover {
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 4px 16px rgba(255, 255, 255, 0.05);
          transform: translateX(4px);
        }

        .task-item.completed {
          opacity: 0.6;
        }

        .check-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          transition: transform 0.2s ease;
        }

        .check-button:hover {
          transform: scale(1.1);
        }

        .check-icon {
          transition: all 0.3s ease;
        }

        .light .check-icon {
          color: #8b5a3c;
        }

        .light .check-icon.checked {
          color: #d4a373;
        }

        .dark .check-icon {
          color: #666;
        }

        .dark .check-icon.checked {
          color: #a8a8a8;
        }

        .task-text {
          flex: 1;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .completed .task-text {
          text-decoration: line-through;
          opacity: 0.6;
        }

        .delete-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .task-item:hover .delete-button {
          opacity: 0.6;
        }

        .delete-button:hover {
          opacity: 1 !important;
          transform: scale(1.1);
        }

        .light .delete-button {
          color: #c85a54;
        }

        .light .delete-button:hover {
          background: rgba(200, 90, 84, 0.1);
        }

        .dark .delete-button {
          color: #e57373;
        }

        .dark .delete-button:hover {
          background: rgba(229, 115, 115, 0.1);
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          opacity: 0.5;
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.5;
          }
        }

        .empty-state p {
          font-size: 1.1rem;
          font-style: italic;
        }

        @media (max-width: 640px) {
          .container {
            padding: 2rem 4%;
          }

          .title {
            font-size: 2.5rem;
          }

          .input-section {
            flex-direction: column;
          }

          .add-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
