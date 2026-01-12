import { useState, useEffect, useRef } from 'react';

// Gera previsão horária baseada nos dados da API
function generateHourlyForecast(hourly) {
  if (!hourly || !hourly.time) return [];
  
  const hours = [];
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  // Pega todas as horas de hoje
  for (let i = 0; i < hourly.time.length; i++) {
    const time = hourly.time[i];
    const timeDate = new Date(time);
    const dateStr = time.split('T')[0]; // "2026-01-12"
    
    // Se a data for hoje, adiciona à lista
    if (dateStr === today) {
      const hour = timeDate.getHours();
      
      hours.push({
        hour: `${String(hour).padStart(2, '0')}:00`,
        temperature: Math.round(hourly.temperature_2m[i]),
        code: hourly.weather_code[i],
        humidity: Math.round(hourly.relative_humidity_2m[i]),
        windSpeed: Math.round(hourly.wind_speed_10m[i]),
        windDirection: Math.round(hourly.wind_direction_10m[i])
      });
    } else if (dateStr > today) {
      // Se passou do dia de hoje, para de adicionar
      break;
    }
  }
  
  return hours;
}

const weatherEmojis = {
  0: '☀️', 1: '⛅', 2: '☁️', 3: '☁️', 45: '🌫️', 48: '🌫️', 51: '🌧️', 53: '🌧️', 55: '🌧️',
  61: '🌧️', 63: '🌧️', 65: '⛈️', 71: '❄️', 73: '❄️', 75: '❄️', 80: '🌧️', 81: '⛈️', 82: '⛈️',
  85: '❄️', 86: '❄️', 95: '⛈️', 96: '⛈️', 99: '⛈️'
};

// Converte direção em graus para cardinal
const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export default function HourlyForecast({ hourly }) {
  const containerRef = useRef(null);
  const currentHourRef = useRef(null);
  const hours = generateHourlyForecast(hourly);

  // Encontra o índice da hora atual
  const currentHour = new Date().getHours();
  const currentHourIndex = hours.findIndex(h => parseInt(h.hour) === currentHour);
  
  // Auto-scroll para a hora atual quando carregar
  useEffect(() => {
    if (currentHourRef.current && containerRef.current) {
      // Pequeno delay para garantir que o DOM foi renderizado
      setTimeout(() => {
        const container = containerRef.current;
        const currentElement = currentHourRef.current;
        
        // Calcula a posição para centralizar a hora atual mais para a esquerda
        const scrollPosition = currentElement.offsetLeft - 20;
        container.scrollLeft = scrollPosition;
      }, 0);
    }
  }, [hours, currentHourIndex]);

  // Habilita scroll horizontal com mouse wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Se o scroll é principalmente vertical, não interfere
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        container.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div style={{
      backgroundColor: 'rgba(30, 58, 138, 0.4)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '32px 0',
      color: '#fff',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#fff',
        marginBottom: '16px'
      }}>
        Previsão por Hora (24h)
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(24, minmax(110px, 1fr))',
        gap: '8px',
        overflowX: 'auto',
        padding: '16px',
      }}
      ref={containerRef}
      >
        {hours.map((hour, idx) => {
          const isCurrentHour = parseInt(hour.hour) === currentHour;
          return (
            <div
              key={idx}
              ref={isCurrentHour ? currentHourRef : null}
              style={{
                backgroundColor: isCurrentHour ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                border: isCurrentHour ? '2px solid rgba(96, 165, 250, 0.8)' : '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '16px 10px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                if (!isCurrentHour) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                if (!isCurrentHour) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <p style={{
                fontSize: '12px',
                fontWeight: '600',
                color: isCurrentHour ? '#60a5fa' : '#cbd5e1',
                marginBottom: '4px',
                margin: 0,
                marginBottom: '6px'
              }}>
                {hour.hour}
                {isCurrentHour && ' ⏰'}
              </p>
              <p style={{
                fontSize: '28px',
                marginBottom: '4px',
                minHeight: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {weatherEmojis[hour.code] || '❓'}
              </p>
              <p style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#fff',
                margin: 0,
                marginBottom: '4px'
              }}>
                {hour.temperature}°
              </p>
              <p style={{
                fontSize: '10px',
                color: '#94a3b8',
                margin: 0,
                marginBottom: '2px'
              }}>
                💧{Math.round(hour.humidity)}%
              </p>
              <p style={{
                fontSize: '10px',
                color: '#60a5fa',
                margin: 0
              }}>
                💨 {hour.windSpeed} km/h {getWindDirection(hour.windDirection)}   
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
