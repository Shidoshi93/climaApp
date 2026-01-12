import { describe, it, expect, beforeEach, vi } from 'vitest';

// Teste de integração com a API
describe('Open-Meteo API Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve buscar dados de clima da API', async () => {
    const lat = -23.5505;
    const lon = -46.6333;

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,uv_index&hourly=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,wind_speed_10m_max,sunrise,sunset&timezone=auto`
    );

    expect(response.ok).toBe(true);
    const data = await response.json();
    
    expect(data).toHaveProperty('current');
    expect(data.current).toHaveProperty('temperature_2m');
    expect(data.current).toHaveProperty('weather_code');
    expect(data.current).toHaveProperty('wind_speed_10m');
    expect(data.current).toHaveProperty('relative_humidity_2m');
  });

  it('deve buscar dados de qualidade do ar', async () => {
    const lat = -23.5505;
    const lon = -46.6333;

    const response = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi&timezone=auto`
    );

    expect(response.ok).toBe(true);
    const data = await response.json();
    
    expect(data).toHaveProperty('current');
    expect(data.current).toHaveProperty('us_aqi');
  });

  it('deve buscar cidades pelo nome', async () => {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=São Paulo&count=1&language=pt&format=json`
    );

    expect(response.ok).toBe(true);
    const data = await response.json();
    
    expect(data).toHaveProperty('results');
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results[0]).toHaveProperty('name');
    expect(data.results[0]).toHaveProperty('latitude');
    expect(data.results[0]).toHaveProperty('longitude');
  });
});
