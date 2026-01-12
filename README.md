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
npm test          # Executa testes unitários e de integração
npm run test:ui   # Executa testes com interface visual
```

## 🧪 Testes

O projeto inclui testes automatizados para validar a integração com as APIs e funções utilitárias.

### Rodar Testes

```bash
# Executa todos os testes
npm test

# Executa testes com interface visual (recomendado)
npm run test:ui

# Executa testes em modo watch
npm test -- --watch
```

### Cobertura de Testes

**Testes de Integração** (`src/test/api.test.js`):
- ✅ Validação de conexão com Open-Meteo Weather API
- ✅ Validação de conexão com Air Quality API
- ✅ Validação de busca de cidades com Geocoding API

**Testes Unitários** (`src/test/utils.test.js`):
- ✅ Mapeamento de códigos de clima para descrições
- ✅ Mapeamento de códigos de clima para emojis
- ✅ Cálculo de níveis de risco UV
- ✅ Formatação de horários

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## � Próximos Passos

### 📲 Melhorias de Responsividade

- [ ] Otimizar layout mobile para telas < 360px
- [ ] Melhorar spacing e padding em dispositivos pequenos
- [ ] Ajustar tamanhos de fonte para melhor legibilidade mobile
- [ ] Implementar drawer menu para navegação em mobile
- [ ] Testar em dispositivos reais (iOS e Android)
- [ ] Adicionar orientação landscape com layout otimizado

### 💾 Sistema de Cache

- [ ] Implementar cache local com LocalStorage para dados de clima
- [ ] Adicionar Service Worker para funcionar offline
- [ ] Cache de imagens e assets estáticos
- [ ] Expiração automática de cache (ex: 30 minutos para dados de clima)
- [ ] Indicador visual quando dados vêm do cache
- [ ] Sincronização automática quando conexão retorna

### 🎯 Outras Melhorias Futuras

- [ ] Suporte a múltiplas localidades favoritas
- [ ] Histórico de buscas
- [ ] Notificações de alertas de clima severo
- [ ] Gráficos de tendência de temperatura
- [ ] Integração com calendário para sugerir melhores dias para atividades
- [ ] Tema claro/escuro configurável

## �📄 Licença

Este projeto é de uso livre.

## 👨‍💻 Desenvolvedor

Criado com ❤️ para atletas e entusiastas de atividades ao ar livre.

---

**Desenvolvido com React + Vite + Open-Meteo APIs**
