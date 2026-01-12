import { useState } from 'react';

export default function SearchBar({ onSearch, currentCity }) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput('');
    }
  };

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '24px'
    }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        gap: '12px',
        flexDirection: window.innerWidth < 640 ? 'column' : 'row'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Buscar cidade..."
          style={{
            flex: 1,
            padding: '14px 18px',
            borderRadius: '12px',
            backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)',
            color: '#fff',
            border: isFocused ? '2px solid rgba(96, 165, 250, 0.8)' : '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '14px',
            fontFamily: 'inherit',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '14px 28px',
            backgroundColor: 'rgba(59, 130, 246, 0.3)',
            color: '#fff',
            fontWeight: '600',
            borderRadius: '12px',
            border: '1px solid rgba(96, 165, 250, 0.5)',
            cursor: 'pointer',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.5)';
            e.target.style.borderColor = 'rgba(96, 165, 250, 0.8)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
            e.target.style.borderColor = 'rgba(96, 165, 250, 0.5)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          🔍 Buscar
        </button>
      </form>
      {currentCity && (
        <p style={{
          fontSize: '14px',
          color: '#cbd5e1',
          marginTop: '16px',
          marginBottom: '0',
          textAlign: window.innerWidth < 640 ? 'center' : 'left'
        }}>
          📍 <strong style={{ color: '#fff' }}>{currentCity}</strong>
        </p>
      )}
    </div>
  );
}
