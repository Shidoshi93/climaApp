import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ActivityRecommendations from './components/ActivityRecommendations';
import HourlyForecast from './components/HourlyForecast';
import './App.css';

function App() {
  const [city, setCity] = useState('São Paulo');
  const [latitude, setLatitude] = useState(-23.5505);
  const [longitude, setLongitude] = useState(-46.6333);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    fetchWeather(latitude, longitude);
  }, [latitude, longitude]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const fetchWeather = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,uv_index&hourly=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,wind_speed_10m_max,sunrise,sunset&timezone=auto`
      );
      
      const airQualityResponse = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi&timezone=auto`
      );
      
      const data = await response.json();
      const airQualityData = await airQualityResponse.json();
      data.airQuality = airQualityData.current?.us_aqi || 50;
      
      setWeatherData(data);
    } catch (err) {
      setError('Erro ao buscar dados de clima');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchCity) => {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchCity}&count=1&language=pt&format=json`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const result = data.results[0];
          setCity(`${result.name}, ${result.admin1 || result.country}`);
          setLatitude(result.latitude);
          setLongitude(result.longitude);
        } else {
          setError('Cidade não encontrada');
        }
      })
      .catch(err => {
        setError('Erro ao buscar cidade');
        console.error(err);
      });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '0 0 16px 16px',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(15, 23, 42, 0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transform: `translateY(${headerVisible ? '0' : '-100%'})`,
        transition: 'transform 0.3s ease-out'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '24px 16px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#fff',
              margin: 0,
              marginBottom: '8px'
            }}>
              ClimApp 🌍
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#cbd5e1',
              margin: 0
            }}>
              Clima para Atletas
            </p>
          </div>
        </div>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px 16px' }}>
          <SearchBar onSearch={handleSearch} currentCity={city} />
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '32px 16px'
        }}>
          {loading && (
            <div style={{
              textAlign: 'center',
              paddingTop: '48px',
              paddingBottom: '48px'
            }}>
              <div style={{
                display: 'inline-block',
                width: '64px',
                height: '64px',
                border: '4px solid rgba(255, 255, 255, 0.2)',
                borderTop: '4px solid #fff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{
                color: '#fff',
                marginTop: '16px',
                fontSize: '18px'
              }}>
                Carregando dados de clima...
              </p>
            </div>
          )}

          {error && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              ❌ {error}
            </div>
          )}

          {weatherData && !loading && (
            <div style={{ animation: 'fadeIn 0.5s ease-out', display: 'flex',
                flexDirection: 'column',
                gap: '50px' }}>
                <div>
                  <WeatherCard 
                    city={city}
                    current={weatherData.current}
                    daily={weatherData.daily}
                  />
                </div>

                <div>
                  {/* Hourly Forecast */}
                  <HourlyForecast 
                    hourly={weatherData.hourly}
                  />
                </div>

              {/* Atividades em tela cheia abaixo */}
              <ActivityRecommendations 
                current={weatherData.current}
                daily={weatherData.daily}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        marginTop: '32px',
        paddingTop: '24px',
        paddingBottom: '24px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 16px',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#cbd5e1',
            margin: '0 0 8px'
          }}>
            Dados fornecidos por <strong>Open-Meteo API</strong>
          </p>
          <p style={{
            fontSize: '12px',
            color: '#94a3b8',
            margin: 0
          }}>
            © 2026 ClimApp. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1024px) {
          [style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
