import 'dotenv/config';
import express from 'express';
import path from 'path';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { STATIONS, generateData, getStationData, detectHotspots, forecastNext24h, getWeatherMultiplier } from './analysis';

// Initialize data on startup
generateData();

async function startServer() {
  console.log(`GEMINI_API_KEY is ${process.env.GEMINI_API_KEY ? 'defined' : 'undefined'} on startup`);
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());
  
  // Configure multer for file uploads
  const upload = multer({ storage: multer.memoryStorage() });
  
  const citizenReports: any[] = [];
  const dispatchLog: any[] = [];

  // APIs
  app.get('/api/stations', (req, res) => {
    const stationsWithLatest = STATIONS.map(st => {
      const data = getStationData(st.id);
      const latest = data && data.length > 0 ? data[data.length - 1] : null;
      return {
        ...st,
        latestAqi: latest ? latest.aqi : 0,
        latestPm25: latest ? latest.pm25 : 0
      };
    });
    res.json(stationsWithLatest);
  });
  
  app.get('/api/citizen-reports', (req, res) => {
    res.json(citizenReports);
  });
  
  app.get('/api/dispatch-log', (req, res) => {
    res.json(dispatchLog);
  });
  
  app.post('/api/dispatch-alert', (req, res) => {
    const { stationId, action, stationName } = req.body;
    if (!stationId || !action || !stationName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const dispatch = {
      id: Math.random().toString(36).substr(2, 9),
      stationId,
      stationName,
      action,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    
    dispatchLog.push(dispatch);
    res.json(dispatch);
  });
  
  app.get('/api/history/:id', (req, res) => {
    res.json(getStationData(req.params.id));
  });
  
  app.get('/api/forecast/:id', (req, res) => {
    res.json(forecastNext24h(req.params.id));
  });
  
  app.get('/api/hotspots', (req, res) => {
    const hotspots = detectHotspots();
    
    // Calculate city-snapshot stats
    let totalAqi = 0;
    let worstAqi = 0;
    let count = 0;
    
    STATIONS.forEach(st => {
      const data = getStationData(st.id);
      if (data && data.length > 0) {
        const aqi = data[data.length - 1].aqi;
        totalAqi += aqi;
        worstAqi = Math.max(worstAqi, aqi);
        count++;
      }
    });
    
    const avgAqi = count > 0 ? Math.round(totalAqi / count) : 0;
    
    const w = getWeatherMultiplier(new Date().getTime());
    let wDesc = "levels modified";
    if (w.multiplier < 1) wDesc = "pollutant levels reduced";
    if (w.multiplier > 1) wDesc = "pollutant levels elevated";

    res.json({
      hotspots,
      stats: {
        avgAqi,
        worstAqi,
        activeHotspots: hotspots.length,
        weatherLabel: `Weather: ${w.state} — ${wDesc}`
      }
    });
  });
  
  app.post('/api/analyze-photo', upload.single('photo'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No photo uploaded' });
      }
      
      let result;
      const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
      if (!apiKey) {
        result = {
          fallback: true,
          smoke_detected: true,
          dust_detected: false,
          severity: "medium",
          description: "FALLBACK: No API key found. Simulating smoke detection from photo."
        };
      } else {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Analyze this image for air pollution signs.
        Respond strictly with JSON matching this schema:
        {
          "smoke_detected": boolean,
          "dust_detected": boolean,
          "severity": "low" | "medium" | "high" | "none",
          "description": "A short sentence describing the visible pollution"
        }`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            prompt,
            {
              inlineData: {
                data: req.file.buffer.toString('base64'),
                mimeType: req.file.mimetype
              }
            }
          ],
          config: {
            responseMimeType: 'application/json'
          }
        });
        
        const text = response.text;
        try {
          result = JSON.parse(text);
        } catch (e) {
          const cleaned = text.replace(/```json\n?/, '').replace(/```\n?$/, '');
          result = JSON.parse(cleaned);
        }
      }
      
      const lat = parseFloat(req.body.lat);
      const lng = parseFloat(req.body.lng);
      
      const report = {
        ...result,
        lat: isNaN(lat) ? null : lat,
        lng: isNaN(lng) ? null : lng,
        timestamp: new Date().toISOString()
      };
      
      citizenReports.push(report);
      res.json(report);
    } catch (error: any) {
      console.error("Error analyzing photo:", error);
      res.status(500).json({ error: 'Error analyzing photo' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
