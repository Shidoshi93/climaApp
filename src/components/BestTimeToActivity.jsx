// Calcula os melhores horários para cada atividade baseado em temperatura e UV
function calculateBestTimes(current, temp) {
  // Simulamos dados horários (na vida real viria de uma API)
  // Assumindo que é meio-dia agora, calculamos variações
  const currentHour = new Date().getHours();
  
  const hourlyTempVariation = {
    // Madrugada (0-6): mais frio
    // Manhã (6-12): aquecendo
    // Tarde (12-17): mais quente
    // Noite (17-24): esfriando
  };

  return {
    corrida: {
      bestHours: ['06:00-08:00', '17:00-19:00'],
      reason: 'Temperaturas amenas e menos UV'
    },
    ciclismo: {
      bestHours: ['07:00-10:00', '15:00-18:00'],
      reason: 'Manhã cedo ou final da tarde'
    },
    natacao: {
      bestHours: ['10:00-14:00', '15:00-17:00'],
      reason: 'Água mais morna e boa visibilidade'
    },
    trilha: {
      bestHours: ['06:30-11:00', '15:00-18:00'],
      reason: 'Evita calor extremo'
    },
    surfe: {
      bestHours: ['06:00-09:00', '16:00-19:00'],
      reason: 'Ondas melhores ao amanhecer e entardecer'
    },
    escalada: {
      bestHours: ['07:00-11:00', '14:00-17:00'],
      reason: 'Temperaturas moderadas e melhor tração'
    }
  };
}

export default function BestTimeToActivity({ activity, current }) {
  const temp = current.temperature_2m;
  const uvIndex = current.uv_index;
  const windSpeed = current.wind_speed_10m;

  // Mapeamento de atividades
  const activityMap = {
    '🏃 Corrida': 'corrida',
    '🚴 Ciclismo': 'ciclismo',
    '🏊 Natação': 'natacao',
    '⛰️ Trilha': 'trilha',
    '🏄 Surfe': 'surfe',
    '🧗 Escalada': 'escalada'
  };

  const bestTimes = calculateBestTimes(current, temp);
  const activityKey = activityMap[activity] || 'corrida';
  const times = bestTimes[activityKey];

  // Determina melhor hora do dia baseado em condições atuais
  const getBestTimeNow = () => {
    if (uvIndex > 8) return 'Horários com menos UV seriam melhores';
    if (temp > 30) return 'Prefira madrugada/amanhecer para evitar calor';
    if (windSpeed > 30) return 'Vento forte - considere outro horário';
    return 'Condições boas para atividade agora';
  };

  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      marginTop: '12px'
    }}>
      <h4 style={{
        fontSize: '14px',
        fontWeight: '600',
        color: '#fff',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        ⏰ Melhores Horários
      </h4>

      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '12px',
        flexWrap: 'wrap'
      }}>
        {times.bestHours.map((time, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'rgba(59, 130, 246, 0.3)',
              color: '#60a5fa',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              border: '1px solid rgba(59, 130, 246, 0.5)'
            }}
          >
            {time}
          </div>
        ))}
      </div>

      <p style={{
        fontSize: '12px',
        color: '#cbd5e1',
        marginBottom: '8px',
        lineHeight: '1.4'
      }}>
        💡 {times.reason}
      </p>

      <p style={{
        fontSize: '12px',
        color: '#fbbf24',
        padding: '8px',
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        borderRadius: '6px',
        border: '1px solid rgba(251, 191, 36, 0.3)'
      }}>
        📍 Agora: {getBestTimeNow()}
      </p>
    </div>
  );
}
