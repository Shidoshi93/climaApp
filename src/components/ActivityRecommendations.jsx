const activities = [
  {
    name: 'Corrida',
    emoji: '🏃',
    bestHours: ['06:00-08:00', '17:00-19:00'],
    timeReason: 'Temperaturas amenas e menos UV. Evite o pico de calor',
    conditions: {
      minTemp: 5,
      maxTemp: 28,
      maxWindSpeed: 25,
      maxPrecipitation: 0,
      minUV: 0,
      maxUV: 12
    },
    tips: {
      perfect: 'Condições perfeitas para correr!',
      good: 'Bom para correr, mas cuidado com o clima',
      caution: 'Cuidado! Considere atividades alternativas'
    }
  },
  {
    name: 'Ciclismo',
    emoji: '🚴',
    bestHours: ['07:00-10:00', '15:00-18:00'],
    timeReason: 'Manhã cedo ou final da tarde com melhor visibilidade',
    conditions: {
      minTemp: 8,
      maxTemp: 30,
      maxWindSpeed: 30,
      maxPrecipitation: 0,
      minUV: 0,
      maxUV: 12
    },
    tips: {
      perfect: 'Ótimo dia para pedalar!',
      good: 'Possível andar de bicicleta com cuidado',
      caution: 'Não recomendado para ciclismo'
    }
  },
  {
    name: 'Natação',
    emoji: '🏊',
    bestHours: ['10:00-14:00', '15:00-17:00'],
    timeReason: 'Água mais morna durante o dia com melhor visibilidade',
    conditions: {
      minTemp: 15,
      maxTemp: 35,
      maxWindSpeed: 20,
      maxPrecipitation: 0,
      minUV: 0,
      maxUV: 12
    },
    tips: {
      perfect: 'Excelente para nadar!',
      good: 'Condições aceitáveis para natação',
      caution: 'Não é recomendado nadar'
    }
  },
  {
    name: 'Pokemon Go',
    emoji: '👾',
    bestHours: ['06:30-11:00', '15:00-18:00'],
    timeReason: 'Evita calor extremo da tarde.',
    conditions: {
      minTemp: 0,
      maxTemp: 32,
      maxWindSpeed: 35,
      maxPrecipitation: 0,
      minUV: 0,
      maxUV: 12
    },
    tips: {
      perfect: 'Dia perfeito para caçar pokemons!',
      good: 'Bom para jogar, mas fique atento ao clima',
      caution: 'Condições adversas para jogar Pokemon Go'
    }
  }
];

function evaluateActivity(activity, temp, windSpeed, precipitation, uvIndex) {
  const conditions = activity.conditions;
  
  if (
    temp >= conditions.minTemp &&
    temp <= conditions.maxTemp &&
    windSpeed <= conditions.maxWindSpeed &&
    precipitation <= conditions.maxPrecipitation &&
    uvIndex <= conditions.maxUV
  ) {
    return { status: 'perfect', color: '#34d399' };
  }
  
  if (
    temp >= conditions.minTemp - 5 &&
    temp <= conditions.maxTemp + 5 &&
    windSpeed <= conditions.maxWindSpeed * 1.2 &&
    precipitation <= conditions.maxPrecipitation + 2
  ) {
    return { status: 'good', color: '#fbbf24' };
  }
  
  return { status: 'caution', color: '#ef4444' };
}

export default function ActivityRecommendations({ current, daily }) {
  const temp = current.temperature_2m;
  const windSpeed = current.wind_speed_10m;
  const precipitation = daily.precipitation_sum[0] || 0;
  const uvIndex = current.uv_index;

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
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '32px' }}>
        Atividades Recomendadas
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {activities.map((activity) => {
          const evaluation = evaluateActivity(activity, temp, windSpeed, precipitation, uvIndex);
          
          const statusIcon = 
            evaluation.status === 'perfect' ? '✅' :
            evaluation.status === 'good' ? '⚠️' :
            '❌';
          
          const statusText =
            evaluation.status === 'perfect' ? 'RECOMENDADO' :
            evaluation.status === 'good' ? 'POSSÍVEL' :
            'NÃO RECOMENDADO';

          return (
            <div
              key={activity.name}
              style={{
                border: `2px solid ${evaluation.color}`,
                borderRadius: '12px',
                padding: '20px',
                transition: 'all 0.3s ease',
                backgroundColor: `rgba(${
                  evaluation.color === '#34d399' ? '52, 211, 153' :
                  evaluation.color === '#fbbf24' ? '251, 191, 36' :
                  '239, 68, 68'
                }, 0.1)`,
                backdropFilter: 'blur(10px)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.backgroundColor = `rgba(${
                  evaluation.color === '#34d399' ? '52, 211, 153' :
                  evaluation.color === '#fbbf24' ? '251, 191, 36' :
                  '239, 68, 68'
                }, 0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = `rgba(${
                  evaluation.color === '#34d399' ? '52, 211, 153' :
                  evaluation.color === '#fbbf24' ? '251, 191, 36' :
                  '239, 68, 68'
                }, 0.1)`;
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '32px' }}>{activity.emoji}</span>
                  <h3 style={{ fontWeight: 'bold', fontSize: '16px' }}>{activity.name}</h3>
                </div>
                <span style={{ fontSize: '20px' }}>{statusIcon}</span>
              </div>
              
              <p style={{
                fontSize: '12px',
                fontWeight: '600',
                color: evaluation.color,
                marginBottom: '12px'
              }}>
                {statusText}
              </p>
              
              <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' }}>
                {activity.tips[evaluation.status]}
              </p>

              {/* Melhores Horários */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '12px',
                marginTop: '12px',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}>
                <p style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#60a5fa',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  ⏰ Melhores Horários
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '8px',
                  flexWrap: 'wrap'
                }}>
                  {activity.bestHours.map((time, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: 'rgba(96, 165, 250, 0.2)',
                        color: '#60a5fa',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                        border: '1px solid rgba(96, 165, 250, 0.4)'
                      }}
                    >
                      {time}
                    </span>
                  ))}
                </div>
                <p style={{
                  fontSize: '11px',
                  color: '#cbd5e1',
                  margin: 0
                }}>
                  💡 {activity.timeReason}
                </p>
              </div>

              {evaluation.status !== 'perfect' && (
                <div style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '11px',
                  color: '#cbd5e1'
                }}>
                  {evaluation.status === 'good' && (
                    <p>⚠️ Fique atento às condições</p>
                  )}
                  {evaluation.status === 'caution' && (
                    <p>❌ Clima adverso para esta atividade</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dicas Gerais */}
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '16px' }}>
          💡 Dicas Gerais
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          {uvIndex > 6 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>☀️</span>
              <p style={{ fontSize: '13px', color: '#cbd5e1' }}>Use protetor solar SPF 30+</p>
            </div>
          )}
          {windSpeed > 20 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>💨</span>
              <p style={{ fontSize: '13px', color: '#cbd5e1' }}>Vento forte! Cuidado para não sair voando.</p>
            </div>
          )}
          {precipitation > 0 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>🌧️</span>
              <p style={{ fontSize: '13px', color: '#cbd5e1' }}>Chuva prevista! Leve um guarda-chuva.</p>
            </div>
          )}
          {temp < 10 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>🧊</span>
              <p style={{ fontSize: '13px', color: '#cbd5e1' }}>Temperatura baixa! Use roupas apropriadas.</p>
            </div>
          )}
          {temp > 28 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>🌡️</span>
              <p style={{ fontSize: '13px', color: '#cbd5e1' }}>Calor! Hidrate-se bem.</p>
            </div>
          )}
          {uvIndex <= 6 && windSpeed <= 20 && precipitation === 0 && temp >= 10 && temp <= 28 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ fontSize: '20px' }}>👍</span>
              <p style={{ fontSize: '13px', color: '#cbd5e1' }}>Condições ideais para atividades outdoor!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
