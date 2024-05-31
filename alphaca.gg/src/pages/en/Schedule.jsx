import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/Schedule.css';
import { MoonLoader } from 'react-spinners';

function formatDate(dateString) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(1, '0');
  const day = date.getDate().toString().padStart(1, '0');
  const dayOfWeek = days[date.getDay()];
  return `${month} / ${day} (${dayOfWeek})`;
}

function formatTime(timeString) {
  const options = { hour: '2-digit', minute: '2-digit', hour12: false };
  const formattedTime = new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', options);
  return formattedTime;
}

function formatResult(result) {
  if (result === "Schedule") {
    return <span className="will">{result}</span>;
  } else {
    return <span className="end">Termination</span>;
  }
}

function Schedule() {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:4401/');
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
  };

  const filteredData = selectedMonth
    ? data.filter(item => item.Date.includes(selectedMonth))
    : data;

  const groupedData = filteredData.reduce((groups, match) => {
    const date = match.Date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(match);
    return groups;
  }, {});

  const teamLogos = {
    "Liverpool": "https://sports-phinf.pstatic.net/team/wfootball/default/9.png?type=f25_25",
    "Manchester City": "https://sports-phinf.pstatic.net/team/wfootball/default/11.png?type=f25_25",
    "Arsenal": "https://sports-phinf.pstatic.net/team/wfootball/default/1006.png?type=f25_25",
    "Aston Villa": "https://sports-phinf.pstatic.net/team/wfootball/default/2.png?type=f25_25",
    "Tottenham Hotspur": "https://sports-phinf.pstatic.net/team/wfootball/default/19.png?type=f25_25",
    "Manchester United": "https://sports-phinf.pstatic.net/team/wfootball/default/12.png?type=f25_25",
    "West Ham United": "https://sports-phinf.pstatic.net/team/wfootball/default/43.png?type=f25_25",
    "Newcastle United": "https://sports-phinf.pstatic.net/team/wfootball/default/31.png?type=f25_25",
    "Brighton & Hove Albion": "https://sports-phinf.pstatic.net/team/wfootball/default/6795.png?type=f25_25",
    "Wolverhampton Wanderers": "https://sports-phinf.pstatic.net/team/wfootball/default/44.png?type=f25_25",
    "Chelsea": "https://sports-phinf.pstatic.net/team/wfootball/default/4.png?type=f25_25",
    "Fulham": "https://sports-phinf.pstatic.net/team/wfootball/default/55.png?type=f25_25",
    "AFC Bournemouth": "https://sports-phinf.pstatic.net/team/wfootball/default/23.png?type=f25_25",
    "Crystal Palace": "https://sports-phinf.pstatic.net/team/wfootball/default/5.png?type=f25_25",
    "Brentford": "https://sports-phinf.pstatic.net/team/wfootball/default/48.png?type=f25_25",
    "Everton": "https://sports-phinf.pstatic.net/team/wfootball/default/8.png?type=f25_25",
    "Nottingham Forest": "https://sports-phinf.pstatic.net/team/wfootball/default/15.png?type=f25_25",
    "Luton Town": "https://sports-phinf.pstatic.net/team/wfootball/default/10.png?type=f25_25",
    "Burnley": "https://sports-phinf.pstatic.net/team/wfootball/default/70.png?type=f25_25",
    "Sheffield United": "https://sports-phinf.pstatic.net/team/wfootball/default/37.png?type=f25_25"
  };

  return (
    <div className="schedulebox">
      {loading ? (
        <div className="schedule-loading">
          <MoonLoader color={'#c98aff'} loading={loading} size={40} />
        </div>
      ) : (
        <>
          <h1 className="title">2023-24</h1>
          <div className="button-container">
            {[...new Set(data.map(item => item.Date.slice(0, 7)))].reverse().map((month, index) => (
              <button key={index} onClick={() => handleMonthClick(month)} className="month-button">{new Date(month).getMonth() + 1}
                <span> month</span></button>
            ))}
            <button className="death-button">6<span> month</span></button>
            <button className="death-button">7<span> month</span></button>

          </div>
          {Object.keys(groupedData).reverse().map((date, index) => {
            return (
              <div key={index}>
                <table className="match-table">
                  <thead>
                    <tr>
                      <th colSpan="9" style={{ textAlign: 'left' }}>　{formatDate(date)}</th>
                    </tr>
                  </thead>
                  {groupedData[date].map((item, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: 'left', fontSize: 'small', fontWeight: 'bold', verticalAlign: 'middle' }}>
                        {formatTime(item.Time)}
                      </td>
                      <td className="end" style={{ textAlign: 'left' }}>{item.Place}</td>

                      <td>
                        {item.Team[0].position === 'home' ?
                          <div>
                            {item.Team[0].name}{' '}
                            <img src={teamLogos[item.Team[0].name]} alt={item.Team[0].name} style={{ verticalAlign: 'middle' }} />
                          </div>
                          :
                          <div>
                            {item.Team[1].name}{' '}
                            <img src={teamLogos[item.Team[1].name]} alt={item.Team[1].name} style={{ verticalAlign: 'middle' }} />
                          </div>
                        }
                      </td>
                      <td>{item.Result === "예정" ? "" : item.Result.home}</td>
                      <td>{formatResult(item.Result)}</td>
                      <td>{item.Result === "예정" ? "" : item.Result.away}</td>
                      <td>
                        {item.Team[0].position === 'home' ?
                          <div>
                            <img src={teamLogos[item.Team[1].name]} alt={item.Team[1].name} style={{ verticalAlign: 'middle' }} />{' '}
                            {item.Team[1].name}
                          </div>
                          :
                          <div>
                            <img src={teamLogos[item.Team[0].name]} alt={item.Team[0].name} style={{ verticalAlign: 'middle' }} />{' '}
                            {item.Team[0].name}
                          </div>
                        }
                      </td>
                      <td className="end">{item.Round}R</td>
                      <td><button className="record-button">Record</button> </td>
                    </tr>
                  ))}
                </table>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Schedule;
