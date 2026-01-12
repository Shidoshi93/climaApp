import { describe, it, expect } from 'vitest';

// Testes unitários para funções utilitárias
const weatherDescriptions = {
  0: 'Céu Limpo',
  1: 'Parcialmente Nublado',
  2: 'Nublado',
  3: 'Muito Nublado',
  45: 'Nevoeiro',
  48: 'Nevoeiro com Geada',
  61: 'Chuva Leve',
  63: 'Chuva Moderada',
  65: 'Chuva Forte',
  95: 'Tempestade',
};

const weatherEmojis = {
  0: '☀️',
  1: '⛅',
  2: '☁️',
  45: '🌫️',
  61: '🌧️',
  63: '🌧️',
  65: '⛈️',
  95: '⛈️',
};

const getUVRisk = (uv) => {
  if (uv < 3) return { text: 'Baixo', color: '#34d399' };
  if (uv < 6) return { text: 'Moderado', color: '#fbbf24' };
  if (uv < 8) return { text: 'Alto', color: '#fb923c' };
  return { text: 'Muito Alto', color: '#ef4444' };
};

const formatTime = (timeString) => {
  if (!timeString) return '--:--';
  return timeString.split('T')[1];
};

describe('Funções Utilitárias de Clima', () => {
  it('deve retornar descrição correta para código de clima', () => {
    expect(weatherDescriptions[0]).toBe('Céu Limpo');
    expect(weatherDescriptions[65]).toBe('Chuva Forte');
    expect(weatherDescriptions[95]).toBe('Tempestade');
  });

  it('deve retornar emoji correto para código de clima', () => {
    expect(weatherEmojis[0]).toBe('☀️');
    expect(weatherEmojis[61]).toBe('🌧️');
    expect(weatherEmojis[95]).toBe('⛈️');
  });

  it('deve calcular risco UV baixo corretamente', () => {
    const risk = getUVRisk(2);
    expect(risk.text).toBe('Baixo');
    expect(risk.color).toBe('#34d399');
  });

  it('deve calcular risco UV moderado corretamente', () => {
    const risk = getUVRisk(4);
    expect(risk.text).toBe('Moderado');
    expect(risk.color).toBe('#fbbf24');
  });

  it('deve calcular risco UV alto corretamente', () => {
    const risk = getUVRisk(7);
    expect(risk.text).toBe('Alto');
    expect(risk.color).toBe('#fb923c');
  });

  it('deve calcular risco UV muito alto corretamente', () => {
    const risk = getUVRisk(10);
    expect(risk.text).toBe('Muito Alto');
    expect(risk.color).toBe('#ef4444');
  });

  it('deve formatar horário corretamente', () => {
    expect(formatTime('2026-01-12T14:30')).toBe('14:30');
    expect(formatTime('2026-01-12T06:15')).toBe('06:15');
  });

  it('deve retornar valor padrão para horário inválido', () => {
    expect(formatTime(null)).toBe('--:--');
    expect(formatTime('')).toBe('--:--');
  });
});
