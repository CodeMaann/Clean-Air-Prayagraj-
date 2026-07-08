export interface Station {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'industrial' | 'peri_urban' | 'market' | 'residential' | 'transport';
}

export const STATIONS: Station[] = [
  { id: '1', name: 'Naini Industrial Area', lat: 25.3810, lng: 81.8530, type: 'industrial' },
  { id: '2', name: 'Phaphamau', lat: 25.4870, lng: 81.8390, type: 'peri_urban' },
  { id: '3', name: 'Katra Market', lat: 25.4530, lng: 81.8280, type: 'market' },
  { id: '4', name: 'Civil Lines', lat: 25.4480, lng: 81.8360, type: 'residential' },
  { id: '5', name: 'Allahabad Junction', lat: 25.4415, lng: 81.8195, type: 'transport' },
  { id: '6', name: 'Jhunsi', lat: 25.4390, lng: 81.9020, type: 'residential' },
  { id: '7', name: 'Daraganj', lat: 25.4380, lng: 81.8730, type: 'residential' },
  { id: '8', name: 'George Town', lat: 25.4560, lng: 81.8410, type: 'market' },
  { id: '9', name: 'Mundera Mandi', lat: 25.4200, lng: 81.7950, type: 'market' },
  { id: '10', name: 'Colonelganj', lat: 25.4470, lng: 81.8410, type: 'residential' },
  { id: '11', name: 'Tagore Town', lat: 25.4750, lng: 81.8450, type: 'residential' },
  { id: '12', name: 'Bamrauli / Airport Road', lat: 25.4400, lng: 81.7350, type: 'peri_urban' },
  { id: '13', name: 'Allahabad University', lat: 25.4590, lng: 81.8500, type: 'residential' },
  { id: '14', name: 'Kydganj', lat: 25.4280, lng: 81.8490, type: 'residential' },
  { id: '15', name: 'Mutthiganj', lat: 25.4300, lng: 81.8380, type: 'market' },
  { id: '16', name: 'Alopibagh', lat: 25.4410, lng: 81.8650, type: 'residential' },
  { id: '17', name: 'Dhoomanganj', lat: 25.4390, lng: 81.7850, type: 'residential' },
  { id: '18', name: 'Kareli', lat: 25.4190, lng: 81.8120, type: 'residential' },
  { id: '19', name: 'Teliyarganj', lat: 25.4740, lng: 81.8550, type: 'market' },
  { id: '20', name: 'Subedarganj', lat: 25.4480, lng: 81.7980, type: 'transport' },
  { id: '21', name: 'Naini Bridge', lat: 25.4230, lng: 81.8790, type: 'transport' },
  { id: '22', name: 'Chaufatka', lat: 25.4520, lng: 81.8020, type: 'transport' },
  { id: '23', name: 'Civil Lines Sector A', lat: 25.4570, lng: 81.8250, type: 'residential' },
  { id: '24', name: 'Civil Lines Sector B', lat: 25.4520, lng: 81.8320, type: 'residential' },
  { id: '25', name: 'Katra Sector 2', lat: 25.4650, lng: 81.8480, type: 'residential' },
  { id: '26', name: 'Katra Sector 3', lat: 25.4600, lng: 81.8550, type: 'residential' },
  { id: '27', name: 'Chowk Sector 1', lat: 25.4350, lng: 81.8350, type: 'market' },
  { id: '28', name: 'Chowk Sector 2', lat: 25.4320, lng: 81.8400, type: 'market' },
  { id: '29', name: 'Lukerganj', lat: 25.4420, lng: 81.8200, type: 'residential' },
  { id: '30', name: 'Nai Basti', lat: 25.4380, lng: 81.8150, type: 'residential' },
  { id: '31', name: 'Daraganj Sector 1', lat: 25.4480, lng: 81.8700, type: 'residential' },
  { id: '32', name: 'Daraganj Sector 2', lat: 25.4530, lng: 81.8750, type: 'residential' },
  { id: '33', name: 'Geeta Nagar', lat: 25.4250, lng: 81.8200, type: 'residential' },
  { id: '34', name: 'Meerapur', lat: 25.4220, lng: 81.8250, type: 'residential' },
  { id: '35', name: 'Allahapur Sector 1', lat: 25.4580, lng: 81.8650, type: 'residential' },
  { id: '36', name: 'Allahapur Sector 2', lat: 25.4620, lng: 81.8720, type: 'residential' },
  { id: '37', name: 'Sohbatiabagh', lat: 25.4500, lng: 81.8580, type: 'residential' },
  { id: '38', name: 'Rambagh', lat: 25.4350, lng: 81.8520, type: 'residential' },
  { id: '39', name: 'Bairhana', lat: 25.4300, lng: 81.8580, type: 'residential' },
  { id: '40', name: 'George Town Extension', lat: 25.4550, lng: 81.8450, type: 'residential' },
  { id: '41', name: 'Triveni Nagar', lat: 25.4180, lng: 81.8300, type: 'residential' },
  { id: '42', name: 'Kareli Sector A', lat: 25.4150, lng: 81.8100, type: 'residential' },
  { id: '43', name: 'Kareli Sector B', lat: 25.4100, lng: 81.8050, type: 'residential' },
  { id: '44', name: 'Naini Sector 1', lat: 25.4150, lng: 81.8850, type: 'residential' },
  { id: '45', name: 'Naini Sector 2', lat: 25.4100, lng: 81.8900, type: 'residential' }
];

export interface DataPoint {
  time: string;
  pm25: number;
  pm10: number;
  aqi: number;
}

export function calculateAQI(pm25: number): number {
  const breakpoints = [
    { c_low: 0.0, c_high: 12.0, aqi_low: 0, aqi_high: 50 },
    { c_low: 12.1, c_high: 35.4, aqi_low: 51, aqi_high: 100 },
    { c_low: 35.5, c_high: 55.4, aqi_low: 101, aqi_high: 150 },
    { c_low: 55.5, c_high: 150.4, aqi_low: 151, aqi_high: 200 },
    { c_low: 150.5, c_high: 250.4, aqi_low: 201, aqi_high: 300 },
    { c_low: 250.5, c_high: 350.4, aqi_low: 301, aqi_high: 400 },
    { c_low: 350.5, c_high: 500.4, aqi_low: 401, aqi_high: 500 }
  ];
  
  for (const bp of breakpoints) {
    if (pm25 >= bp.c_low && pm25 <= bp.c_high) {
      return Math.round(((bp.aqi_high - bp.aqi_low) / (bp.c_high - bp.c_low)) * (pm25 - bp.c_low) + bp.aqi_low);
    }
  }
  
  if (pm25 > 500.4) {
    return 500;
  }
  return 0;
}

// Memory store for our simulated data
const stationData: Record<string, DataPoint[]> = {};

export function getWeatherMultiplier(timeMs: number): { multiplier: number, state: string } {
  const nowMs = new Date().getTime();
  const diffHours = (timeMs - nowMs) / (1000 * 60 * 60);
  
  if (diffHours < -24) {
    return { multiplier: 0.6, state: 'Rain' };
  } else if (diffHours < 4) {
    return { multiplier: 0.5, state: 'Thunderstorm' };
  } else if (diffHours < 12) {
    return { multiplier: 0.7, state: 'Rain Showers' };
  } else {
    return { multiplier: 1.1, state: 'Clear' };
  }
}

export function generateData() {
  const now = new Date();
  now.setMinutes(0, 0, 0); // truncate to hour
  
  for (const station of STATIONS) {
    const data: DataPoint[] = [];
    
    let basePm25 = 40;
    if (['industrial', 'peri_urban', 'transport'].includes(station.type)) {
      basePm25 = 55;
    } else if (station.type === 'market') {
      basePm25 = 45;
    } else {
      basePm25 = 35;
    }
    
    for (let i = 48; i >= 0; i--) { // T-48h to T
      const t = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hour = t.getHours();
      
      // Diurnal pattern: peaks around 9am and 9pm
      const diurnal = Math.cos((hour - 9) * Math.PI / 6) * 15;
      
      // Add some noise
      const noise = (Math.random() * 10) - 5;
      
      let pm25 = basePm25 + diurnal + noise;
      
      // Inject spike in the last 6 hours (i <= 5) for Naini (1) and Phaphamau (2)
      if (i <= 5 && (station.id === '1' || station.id === '2')) {
        pm25 += 100 + (Math.random() * 20);
      }
      
      const w = getWeatherMultiplier(t.getTime());
      pm25 = pm25 * w.multiplier;

      if (pm25 < 0) pm25 = 0;
      
      data.push({
        time: t.toISOString(),
        pm25: pm25,
        pm10: pm25 * 2,
        aqi: calculateAQI(pm25)
      });
    }
    stationData[station.id] = data;
  }
}

export function detectHotspots() {
  const hotspots = [];
  
  for (const station of STATIONS) {
    const data = stationData[station.id];
    if (!data || data.length < 30) continue;
    
    const last6 = data.slice(-6);
    const prior24 = data.slice(-30, -6);
    
    const meanPrior24 = prior24.reduce((sum, d) => sum + d.pm25, 0) / prior24.length;
    let varSum = 0;
    for (const d of prior24) {
      varSum += Math.pow(d.pm25 - meanPrior24, 2);
    }
    const stdDevPrior24 = Math.sqrt(varSum / prior24.length) || 1;
    
    const meanLast6 = last6.reduce((sum, d) => sum + d.pm25, 0) / last6.length;
    
    const zScore = (meanLast6 - meanPrior24) / stdDevPrior24;
    const percentAbove = ((meanLast6 - meanPrior24) / meanPrior24) * 100;
    const latestAqi = last6[last6.length - 1].aqi;
    
    if ((zScore >= 1.5 && percentAbove >= 20) || latestAqi >= 151) {
      const severity = (zScore * 20) + latestAqi;
      let action = 'Health advisory';
      if (station.type === 'industrial') action = 'Deploy inspection team';
      else if (station.type === 'peri_urban') action = 'Dispatch fire/cleanup crew';
      else if (station.type === 'market') action = 'Water-mist cannon + vehicle restriction';
      else if (station.type === 'transport') action = 'Water-mist cannon + traffic coordination';
      
      hotspots.push({
        station,
        latestAqi,
        percentAboveBaseline: percentAbove.toFixed(1),
        zScore: zScore.toFixed(2),
        severity,
        recommendedAction: action,
        trend: last6.map(d => d.aqi)
      });
    }
  }
  
  return hotspots.sort((a, b) => b.severity - a.severity);
}

export function forecastNext24h(stationId: string) {
  const data = stationData[stationId];
  if (!data) return [];
  
  const last6 = data.slice(-6);
  // Calculate trend slope
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  for (let i = 0; i < last6.length; i++) {
    sumX += i;
    sumY += last6[i].pm25;
    sumXY += i * last6[i].pm25;
    sumX2 += i * i;
  }
  const n = last6.length;
  // If variance in X is 0, slope is 0, but here n=6 so variance is not 0
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  
  // Calculate historical hour averages
  const hourAverages: Record<number, number[]> = {};
  for (const d of data) {
    const hr = new Date(d.time).getHours();
    if (!hourAverages[hr]) hourAverages[hr] = [];
    hourAverages[hr].push(d.pm25);
  }
  const histAverages: Record<number, number> = {};
  for (const hr in hourAverages) {
    histAverages[hr] = hourAverages[hr].reduce((a, b) => a + b, 0) / hourAverages[hr].length;
  }
  
  const forecast = [];
  const latestTime = new Date(data[data.length - 1].time);
  const latestPm25 = data[data.length - 1].pm25;
  
  for (let i = 1; i <= 24; i++) {
    const t = new Date(latestTime.getTime() + i * 60 * 60 * 1000);
    const hr = t.getHours();
    
    const trendPrediction = Math.max(0, latestPm25 + slope * i);
    const histPrediction = histAverages[hr] || latestPm25;
    
    // Fade out trend weight over 12 hours
    const trendWeight = Math.max(0, 1 - (i / 12)); 
    const histWeight = 1 - trendWeight;
    
    let predictedPm25 = (trendPrediction * trendWeight) + (histPrediction * histWeight);
    // Mean reversion
    if (predictedPm25 > 250) {
      predictedPm25 = predictedPm25 * 0.95; 
    }
    
    // Apply relative weather change
    const currentW = getWeatherMultiplier(latestTime.getTime());
    const futureW = getWeatherMultiplier(t.getTime());
    predictedPm25 = predictedPm25 * (futureW.multiplier / currentW.multiplier);
    
    forecast.push({
      time: t.toISOString(),
      pm25: predictedPm25,
      aqi: calculateAQI(predictedPm25)
    });
  }
  
  return forecast;
}

export function getStationData(id: string) {
  return stationData[id] || [];
}
