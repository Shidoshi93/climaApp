const weatherDescriptions = {
  0: 'Céu Limpo',
  1: 'Parcialmente Nublado',
  2: 'Nublado',
  3: 'Muito Nublado',
  45: 'Nevoeiro',
  48: 'Nevoeiro com Geada',
  51: 'Garoa Leve',
  53: 'Garoa Moderada',
  55: 'Garoa Densa',
  61: 'Chuva Leve',
  63: 'Chuva Moderada',
  65: 'Chuva Forte',
  71: 'Neve Leve',
  73: 'Neve Moderada',
  75: 'Neve Forte',
  80: 'Pancadas de Chuva',
  81: 'Pancadas de Chuva Fortes',
  82: 'Pancadas de Chuva Violentas',
  85: 'Pancadas de Neve Leve',
  86: 'Pancadas de Neve Forte',
  95: 'Tempestade',
  96: 'Tempestade com Granizo',
  99: 'Tempestade com Granizo Forte'
};

const weatherEmojis = {
  0: '☀️', 1: '⛅', 2: '☁️', 3: '☁️', 45: '🌫️', 48: '🌫️', 51: '🌧️', 53: '🌧️', 55: '🌧️',
  61: '🌧️', 63: '🌧️', 65: '⛈️', 71: '❄️', 73: '❄️', 75: '❄️', 80: '🌧️', 81: '⛈️', 82: '⛈️',
  85: '❄️', 86: '❄️', 95: '⛈️', 96: '⛈️', 99: '⛈️'
};

const getUVRisk = (uv) => {
  if (uv < 3) return { text: 'Baixo', color: '#34d399' };
  if (uv < 6) return { text: 'Moderado', color: '#fbbf24' };
  if (uv < 8) return { text: 'Alto', color: '#fb923c' };
  return { text: 'Muito Alto', color: '#ef4444' };
};

export default function WeatherCard({ city, current, daily }) {
  const weatherCode = current.weather_code;
  const temp = current.temperature_2m;
  const windSpeed = current.wind_speed_10m;
  const humidity = current.relative_humidity_2m;
  const uvIndex = current.uv_index;
  const apparentTemperature = current.apparent_temperature;
  const uvRisk = getUVRisk(uvIndex);

  // Formata sunrise/sunset da API
  const formatTime = (timeString) => {
    if (!timeString) return '--:--';
    // timeString é algo como "2026-01-12T05:31"
    return timeString.split('T')[1]; // Retorna "hh:mm"
  };

  const sunrise = daily?.sunrise ? formatTime(daily.sunrise[0]) : '--:--';
  const sunset = daily?.sunset ? formatTime(daily.sunset[0]) : '--:--';

  return (
    <div style={{
      backgroundColor: 'rgba(30, 58, 138, 0.4)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '32px',
      color: '#fff',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            {city}
          </h2>
          <p style={{ fontSize: '16px', color: '#cbd5e1' }}>
            {weatherDescriptions[weatherCode]}
          </p>
        </div>
        <div style={{ 
            fontSize: '72px', 
            lineHeight: '1', 
            fontWeight: 'bold', 
            display: 'flex', 
            alignItems: 'center',
            gap : '12px' }}>
            <p>{Math.round(temp)}°C</p>
            <span>{weatherEmojis[weatherCode]}</span>
        </div>  
      </div>

      {/* Info Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '12px' }}>💨 Vento</p>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>{Math.round(windSpeed)}</p>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>km/h</p>
        </div>
        
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '12px' }}>💧 Umidade</p>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>{humidity}%</p>
        </div>
        
        <div style={{
          backgroundColor: `rgba(${uvRisk.color === '#34d399' ? '52, 211, 153' : uvRisk.color === '#fbbf24' ? '251, 191, 36' : uvRisk.color === '#fb923c' ? '251, 146, 60' : '239, 68, 68'}, 0.2)`,
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '12px' }}>☀️ UV Index</p>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: uvRisk.color }}>{uvIndex.toFixed(1)}</p>
          <p style={{ fontSize: '11px', color: '#cbd5e1' }}>{uvRisk.text}</p>
        </div>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '12px' }}>🌡️ Sensação</p>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>
            {Math.round(apparentTemperature)}°C
          </p>
        </div>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '12px' }}>🌅 Nascer do sol</p>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>
            {sunrise}
          </p>
        </div>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '12px' }}>🌇 Pôr do sol</p>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>
            {sunset}
          </p>
        </div>
      </div>

      {daily && (
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '24px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
            Previsão próximos dias
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '12px'
          }}>
            {daily.time.slice(0, 7).map((date, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <p style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '12px', fontWeight: '600' }}>
                  {new Date(date).toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })}
                </p>
                <p style={{ fontSize: '36px', marginBottom: '8px', minHeight: '40px' }}>
                  {weatherEmojis[daily.weather_code[idx]] || '❓'}
                </p>
                <p style={{ fontSize: '12px' }}>
                  <strong style={{ color: '#fff' }}>{Math.round(daily.temperature_2m_max[idx])}°</strong>
                  <span style={{ color: '#94a3b8' }}> / {Math.round(daily.temperature_2m_min[idx])}°</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
