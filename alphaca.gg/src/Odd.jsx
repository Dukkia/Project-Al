import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './Odd.css';
import { MoonLoader } from 'react-spinners';

function Odd() {
  const [groupedGames, setGroupedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOdds, setSelectedOdds] = useState(null);
  const [betAmount, setBetAmount] = useState(""); // 문자열로 초기화

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3204');
        const games = response.data.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

        // 날짜별로 그룹화
        const groups = {};
        games.forEach(game => {
          // 날짜를 'YYYY년 MM월 DD일' 형식의 문자열로 변환
          const date = new Date(game.start_date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(game);
        });

        setGroupedGames(Object.entries(groups)); // 날짜별 게임 배열을 상태에 저장
        setLoading(false);
      } catch (error) {
        console.error('데이터 불러오기 오류:', error);
      }
    };

    fetchData();
  }, []);

  const handleOddsClick = odds => {
    setSelectedOdds(selectedOdds === odds ? null : odds);
  };

  const handleBetAmountChange = event => {
    const value = event.target.value;
    // 입력 값이 숫자인지 확인하고, 숫자가 아닌 경우 0으로 설정
    setBetAmount(value === "" ? 0 : parseFloat(value) || 0);
  };

  const handleBet = () => {
    alert(`${selectedOdds.name}에 ${betAmount}원을 베팅하였습니다.`);
  };

  const potentialPayout = useMemo(() => {
    if (!selectedOdds || isNaN(betAmount) || betAmount <= 0) {
      return 0;
    }
    const price = selectedOdds.price;
    const payout = price >= 0
      ? ((price + 100) / 100 * betAmount)
      : ((100 / Math.abs(price) * betAmount) + betAmount);
    return payout - betAmount;
  }, [selectedOdds, betAmount]);

  return (
    <div className="odd-container">
      <div className="loading">
        <MoonLoader color={'white'} loading={loading} size={40} />
      </div>
      {!loading && (
        <div className="games-container">
          {groupedGames.map(([date, games], index) => (
            <div key={index} className="date-group">
              <div className="start-date">{date}</div>
              {games.map((game, gameIndex) => (
                <div key={gameIndex} className="game-container">
                  <div className="team-container">
                    <div className="start-time">{new Date(game.start_date).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })}　</div>
                    <div className="team-name">{game.home_team}</div>
                    <div className="team-name" >{game.away_team}</div>
                  </div>

                  <div className="odds-container">
                    {/* 홈팀 버튼 */}
                    {game.odds
                      .filter(o => o.name === game.home_team)
                      .map((odds, idx) => (
                        <button
                          key={idx}
                          className={`odds-button ${selectedOdds === odds ? 'selected' : ''
                            }`}
                          onClick={() => handleOddsClick(odds)}
                        >
                          {priceToOdds(odds.price)}
                        </button>
                      ))}

                    {/* 무승부 버튼 */}
                    {game.odds
                      .filter(o => o.name === '무승부')
                      .map((odds, idx) => (
                        <button
                          key={idx}
                          className={`odds-button ${selectedOdds === odds ? 'selected' : ''
                            }`}
                          onClick={() => handleOddsClick(odds)}
                        >
                          {priceToOdds(odds.price)}
                        </button>
                      ))}

                    {/* 어웨이 팀 버튼 */}
                    {game.odds
                      .filter(o => o.name === game.away_team)
                      .map((odds, idx) => (
                        <button
                          key={idx}
                          className={`odds-button ${selectedOdds === odds ? 'selected' : ''
                            }`}
                          onClick={() => handleOddsClick(odds)}
                        >
                          {priceToOdds(odds.price)}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="selected-odds">
        <div className='my-betting'>
          <span style={{ color: 'white' }}>　내 베팅</span>
        </div>
        {selectedOdds && (
          <div>
            <p className="team-names">
              {(groupedGames
                .flatMap(([_, games]) => games)
                .find(game => game.odds.includes(selectedOdds)) || {})
                .home_team}{' '}
              -{' '}
              {(groupedGames
                .flatMap(([_, games]) => games)
                .find(game => game.odds.includes(selectedOdds)) || {})
                .away_team}
            </p>

            <p>
              {selectedOdds.name}{' '}
              <span style={{ float: 'right', backgroundColor: '#9A0000', color: 'white' }}> {priceToOdds(selectedOdds.price)} </span>

            </p>

            <input
              type="number"
              value={betAmount}
              onChange={handleBetAmountChange}
              id="numberInput"
              placeholder="베팅 금액"
            />

            <p>
              총 베팅금액: <span style={{ float: 'right' }}>{betAmount} 원</span>
            </p>
            <p>
              예상 당첨금:{' '}
              <span style={{ float: 'right' }}>
                {potentialPayout > 0 ? potentialPayout.toFixed(0) : betAmount} 원
              </span>
            </p>

            <div className="bet-button-container">
              <button onClick={handleBet} className="bet-button">
                베팅 신청
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const priceToOdds = price => {
  return price >= 0
    ? ((price + 100) / 100).toFixed(3)
    : ((100 / Math.abs(price)) + 1).toFixed(3);
};

export default Odd;
