import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Schedule.css';
import { MoonLoader } from 'react-spinners';
import languageTexts from '../utils/languageTexts';
import teamLogos from '../utils/teamLogos';

function formatDate(dateString, selectedLanguage) {
  const days = languageTexts[selectedLanguage].days;
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(1, '0');
  const day = date.getDate().toString().padStart(1, '0');
  const dayOfWeek = days[date.getDay()];
  return `${month} / ${day} (${dayOfWeek})`;
}

function formatTime(timeString) {
  const options = { hour: '2-digit', minute: '2-digit', hour12: false };
  const formattedTime = new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', options);
  return formattedTime;
}

function formatResult(result, selectedLanguage) {
  const texts = languageTexts[selectedLanguage].status;

  if (result === "예정") {
    return <span className="will">{texts.scheduled}</span>;
  } else {
    return <span className="end">{texts.ended}</span>;
  }
}

function Schedule({ selectedLanguage }) {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const port = {
      ko: '8201',
      ja: '8101',
      en: '4401'
    }[selectedLanguage];

    const fetchData = async () => {
      try {
        const result = await axios.get(`http://${process.env.REACT_APP_API_HOST}:${port}/`);
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedLanguage]);

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
                <span> {languageTexts[selectedLanguage].month}</span></button>
            ))}
            <button className="death-button">6<span> {languageTexts[selectedLanguage].month}</span></button>
            <button className="death-button">7<span> {languageTexts[selectedLanguage].month}</span></button>
          </div>
          {Object.keys(groupedData).reverse().map((date, index) => {
            return (
              <div key={index}>
                <table className="match-table">
                  <thead>
                    <tr>
                      <th colSpan="9" style={{ textAlign: 'left' }}>　{formatDate(date, selectedLanguage)}</th>
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
                      <td>{formatResult(item.Result, selectedLanguage)}</td>
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
                      <td><button className="record-button">{languageTexts[selectedLanguage].record}</button> </td>
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
