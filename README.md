# ClimApp 🌍 ⚡

Um aplicativo de previsão de tempo moderno e responsivo com foco em atividades físicas outdoor.

## 📋 Descrição

ClimApp é uma aplicação web que fornece informações detalhadas de clima em tempo real para atletas e entusiastas de atividades ao ar livre. Com uma interface glassmorphic elegante e dados integrados de APIs públicas, oferece previsões horárias, métricas detalhadas e recomendações de atividades.

## ✨ Funcionalidades

- **Busca de Cidades**: Pesquise qualquer cidade do Brasil via input de texto
- **Seletores Cascata**: Selecione estado e depois cidade com dados em tempo real da API
- **Clima Atual**: Temperatura, umidade, velocidade do vento, índice UV
- **Previsão Horária**: Grade com todas as 24 horas do dia
  - Temperatura por hora
  - Código de clima com emoji
  - Umidade relativa
  - Velocidade do vento
  - **Auto-scroll** para a hora atual
  - **Scroll com mouse wheel** responsivo
- **Previsão de 5 dias**: Temperatura máxima/mínima e precipitação
- **Métricas Detalhadas (Today Highlights)**:
  - Índice UV
  - Umidade
  - Velocidade do vento
  - Sensação térmica
  - Sunrise/Sunset
  - Visibilidade
  - Qualidade do ar (US AQI)
- **Recomendações de Atividades**: Sugestões para corrida, ciclismo, natação, trilha, surfe, escalada

## 🛠️ Stack Técnico

- **Frontend**: React 18.x com Vite 7.x
- **Styling**: CSS-in-JS com inline styles (glassmorphism design)
- **APIs Utilizadas**:
  - [Open-Meteo Weather API](https://open-meteo.com/en/docs/weather-api) - Dados de clima
  - [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api) - Qualidade do ar
  - [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) - Busca de cidades

## 📦 Instalação

### Pré-requisitos
- Node.js 16+ instalado

### Passos

```bash
# Clone o repositório
git clone <repository-url>
cd clima-app

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5174`

## 🚀 Uso

1. **Selecionar Localização**:
   - Use o dropdown de Estado e Cidade no topo
   - Ou digite o nome de uma cidade na busca

2. **Visualizar Clima**:
   - Temperatura atual em grande destaque
   - Descrição do clima com emoji
   - Sunrise/Sunset times

3. **Explorar Previsões**:
   - Scroll horizontal na grade de 24 horas (auto-posiciona na hora atual)
   - Grade de 5 dias abaixo com tendências
   - Todas as métricas detalhadas

4. **Dicas de Atividades**:
   - Verifique as recomendações para sua atividade favorita

## 🎨 Design

- **Glassmorphism**: Cards com efeito de vidro fosco (`backdrop-filter: blur(10px)`)
- **Cores**: Tema escuro com acentos azuis
- **Responsivo**: Layout adaptável para mobile, tablet e desktop
- **Animações**: Transições suaves em botões e elementos interativos

## 📝 Componentes Principais

### App.jsx
- Gerenciamento de estado global (cidade, coordenadas, dados)
- Fetches das APIs Open-Meteo
- Layout principal com header e footer

### SearchBar.jsx
- Input com busca por texto
- Design glassmorphic
- Exibe cidade atual selecionada

### WeatherCard.jsx
- Temperatura atual em grande destaque
- Sunrise/Sunset
- Previsão de 5 dias
- Cards de métricas

### HourlyForecast.jsx
- Grade de 24 horas do dia
- Auto-scroll para hora atual
- Scroll com mouse wheel
- Exibe temperatura, umidade, vento

### TodayHighlights.jsx
- 9 métricas principais do dia
- Cards coloridos por tipo
- Inclui qualidade do ar (US AQI)

### ActivityRecommendations.jsx
- 6 atividades outdoor
- Recomendações baseadas no clima

## 🌐 APIs

Todas as APIs utilizadas são **gratuitas e públicas**:

```
GET https://api.open-meteo.com/v1/forecast
  ?latitude=LAT&longitude=LON
  &current=...
  &hourly=...
  &daily=...

GET https://air-quality-api.open-meteo.com/v1/air-quality
  ?latitude=LAT&longitude=LON
  &current=us_aqi

GET https://geocoding-api.open-meteo.com/v1/search
  ?name=CITY&count=1&language=pt
```

## 🔧 Scripts Disponíveis

```bash
npm run dev       # Inicia servidor de desenvolvimento
npm run build     # Build para produção
npm run lint      # Verifica linting
npm run preview   # Preview do build
```

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 Licença

Este projeto é de uso livre.

## 👨‍💻 Desenvolvedor

Criado com ❤️ para atletas e entusiastas de atividades ao ar livre.

---

**Desenvolvido com React + Vite + Open-Meteo APIs**
