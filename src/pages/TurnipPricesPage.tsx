import React from 'react';
import { TurnipPrice } from '../types';
import './TurnipPricesPage.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import turnipIcon from '../images/Turnips_NH_Inv_Icon.png';

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

  // Format data for the chart
  const chartData = weeklyPrices.map(price => ({
    day: price.day,
    'Morning (AM)': price.am,
    'Evening (PM)': price.day === 'Sunday' ? null : price.pm
  }));

  return (
    <div className="turnip-prices-page">
      <h1><img src={turnipIcon} alt="Turnip" className="turnip-icon" /> Turnip Prices</h1>
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
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip formatter={(value) => [`${value} Bells`, undefined]} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Morning (AM)" 
                stroke="#4CAF50" 
                strokeWidth={2} 
                activeDot={{ r: 8 }} 
                dot={{ strokeWidth: 2, fill: "#4CAF50", stroke: "#2C5530" }}
              />
              <Line 
                type="monotone" 
                dataKey="Evening (PM)" 
                stroke="#3F51B5" 
                strokeWidth={2} 
                activeDot={{ r: 8 }} 
                dot={{ strokeWidth: 2, fill: "#3F51B5", stroke: "#303F9F" }}
                connectNulls={true}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="price-table">
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Morning (AM)</th>
                  <th>Evening (PM)</th>
                </tr>
              </thead>
              <tbody>
                {weeklyPrices.map((price) => (
                  <tr key={price.day}>
                    <td>{price.day}</td>
                    <td>{price.am} Bells</td>
                    <td>{price.day === 'Sunday' ? 'N/A' : `${price.pm} Bells`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
