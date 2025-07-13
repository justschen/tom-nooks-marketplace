import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TurnipPrice } from '../types';
import './TurnipPricesPage.css';

const TurnipPricesPage: React.FC = () => {
  // Mock data for weekly turnip prices (AM and PM)
  const weeklyPrices: TurnipPrice[] = [
    { day: 'Monday', am: 95, pm: 87 },
    { day: 'Tuesday', am: 82, pm: 78 },
    { day: 'Wednesday', am: 105, pm: 112 },
    { day: 'Thursday', am: 118, pm: 125 },
    { day: 'Friday', am: 132, pm: 128 },
    { day: 'Saturday', am: 98, pm: 89 },
    { day: 'Sunday', am: 110, pm: 110 }, // Daisy Mae sells on Sunday morning only
  ];

  // Get current day and prices (for demo, we'll use Thursday)
  const currentDay = 'Thursday';
  const currentPrices = weeklyPrices.find(p => p.day === currentDay) || weeklyPrices[3];

  // Transform data for the chart to show both AM and PM as separate points
  const chartData = weeklyPrices.flatMap(price => [
    { day: price.day, time: 'AM', price: price.am, fullLabel: `${price.day} AM` },
    { day: price.day, time: 'PM', price: price.pm, fullLabel: `${price.day} PM` }
  ]).filter(item => !(item.day === 'Sunday' && item.time === 'PM')); // No PM prices on Sunday

  return (
    <div className="turnip-prices-page">
      <h1>🥕 Turnip Prices</h1>
      <p>Track turnip prices throughout the week to maximize your profits!</p>
      
      {/* Current Prices Section */}
      <div className="current-prices">
        <h2>Today's Prices ({currentDay})</h2>
        <div className="price-display">
          <div className="price-card current-am">
            <h3>🌅 Morning (AM)</h3>
            <div className="price">{currentPrices.am} Bells</div>
          </div>
          <div className="price-card current-pm">
            <h3>🌆 Evening (PM)</h3>
            <div className="price">{currentPrices.pm} Bells</div>
          </div>
        </div>
      </div>

      {/* Weekly Graph Section */}
      <div className="weekly-graph">
        <h2>Weekly Price Trends</h2>
        <div className="graph-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
            }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="fullLabel" 
                angle={-45}
                textAnchor="end"
                height={60}
                fontSize={12}
              />
              <YAxis 
                label={{ value: 'Price (Bells)', angle: -90, position: 'insideLeft' }}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip 
                formatter={(value, name) => [`${value} Bells`, 'Price']}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#8884d8" 
                strokeWidth={3}
                dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
                name="Turnip Price"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tips Section */}
      <div className="tips-section">
        <h2>💡 Trading Tips</h2>
        <div className="tips-grid">
          <div className="tip">
            <h3>🕘 Best Times to Sell</h3>
            <p>Prices change twice daily at 12 PM. Check both morning and evening prices!</p>
          </div>
          <div className="tip">
            <h3>📈 Price Patterns</h3>
            <p>Watch for spikes on Wednesday-Friday. Some weeks have decreasing patterns.</p>
          </div>
          <div className="tip">
            <h3>🤝 Visit Friends</h3>
            <p>Check other islands' prices - you might find better deals elsewhere!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurnipPricesPage;