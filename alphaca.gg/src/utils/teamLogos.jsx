import AFC from '../assets/images/team-Logo/AFC_Logo.png';
import Arsenal from '../assets/images/team-Logo/Arsenal_Logo.png';
import Aston from '../assets/images/team-Logo/Aston_Logo.png';
import Brentford from '../assets/images/team-Logo/Brentford_Logo.png';
import Brighton from '../assets/images/team-Logo/Brighton_Logo.png';
import Burnley from '../assets/images/team-Logo/Burnley_Logo.png';
import Chelsea from '../assets/images/team-Logo/Chelsea_Logo.png';
import Crystal from '../assets/images/team-Logo/Crystal_Logo.png';
import Everton from '../assets/images/team-Logo/Everton_Logo.png';
import Fulham from '../assets/images/team-Logo/Fulham_Logo.png';
import Liverpool from '../assets/images/team-Logo/Liverpool_Logo.png';
import Luton from '../assets/images/team-Logo/Luton_Logo.png';
import ManCity from '../assets/images/team-Logo/ManCity_Logo.png';
import ManUtd from '../assets/images/team-Logo/ManUtd_Logo.png';
import NewCastle from '../assets/images/team-Logo/NewCastle_Logo.png';
import Nottingham from '../assets/images/team-Logo/Nottingham_Logo.png';
import Sheffield from '../assets/images/team-Logo/Sheffield_Logo.png';
import Tottenham from '../assets/images/team-Logo/Tottenham_Logo.png';
import WestHam from '../assets/images/team-Logo/WestHam_Logo.png';
import Wolves from '../assets/images/team-Logo/Wolves_Logo.png';

import Daegu from '../assets/images/team-Logo/K-League/Daegu_Logo.png';
import Daejeon from '../assets/images/team-Logo/K-League/Daejeon_Logo.png';
import Gangwon from '../assets/images/team-Logo/K-League/Gangwon_Logo.png';
import Gimcheon from '../assets/images/team-Logo/K-League/Gimcheon_Logo.png';
import Gwangju from '../assets/images/team-Logo/K-League/Gwangju_Logo.png';
import Incheon from '../assets/images/team-Logo/K-League/Incheon_Logo.png';
import JeonBuk from '../assets/images/team-Logo/K-League/Jeonbuk_Logo.png';
import Pohang from '../assets/images/team-Logo/K-League/Pohang_Logo.png';
import Suwon from '../assets/images/team-Logo/K-League/Suwon_Logo.png';
import Ulsan from '../assets/images/team-Logo/K-League/Ulsan_Logo.png';
import Seoul from '../assets/images/team-Logo/K-League/Seoul_Logo.png';
import Jeju from '../assets/images/team-Logo/K-League/Jeju_Logo.png';


const teamLogos = {
    // 한글 팀 이름과 이미지 경로 추가
    "AFC 본머스": AFC,
    "본머스": AFC,
    "아스날": Arsenal,
    "애스턴 빌라": Aston,
    "브렌트포드": Brentford,
    "브라이튼 앤 호브 앨비언": Brighton,
    "번리": Burnley,
    "첼시": Chelsea,
    "크리스탈 팰리스": Crystal,
    "에버턴": Everton,
    "풀럼": Fulham,
    "리버풀": Liverpool,
    "루턴 타운": Luton,
    "맨체스터 시티": ManCity,
    "맨체스터 유나이티드": ManUtd,
    "뉴캐슬 유나이티드": NewCastle,
    "노팅엄 포레스트": Nottingham,
    "셰필드 유나이티드": Sheffield,
    "토트넘 홋스퍼": Tottenham,
    "웨스트햄 유나이티드": WestHam,
    "울버햄튼 원더러스": Wolves,

    "대구": Daegu,
    "대전하나시티즌": Daejeon,
    "강원": Gangwon,
    "김천 상무": Gimcheon,
    "광주": Gwangju,
    "인천 유나이티드": Incheon,
    "제주 유나이티드": Jeju,
    "전북모터스": JeonBuk,
    "포항 스틸러스": Pohang,
    "서울": Seoul,
    "수원": Suwon,
    "울산HD": Ulsan,


    // 영어 팀 이름과 이미지 경로 추가
    "AFC Bournemouth": AFC,
    "Bournemouth": AFC,
    "Arsenal": Arsenal,
    "Aston Villa": Aston,
    "Brentford": Brentford,
    "Brighton & Hove Albion": Brighton,
    "Brighton and Hove Albion": Brighton,
    "Burnley": Burnley,
    "Chelsea": Chelsea,
    "Crystal Palace": Crystal,
    "Everton": Everton,
    "Fulham": Fulham,
    "Liverpool": Liverpool,
    "Luton Town": Luton,
    "Manchester City": ManCity,
    "Manchester United": ManUtd,
    "Newcastle United": NewCastle,
    "Nottingham Forest": Nottingham,
    "Sheffield United": Sheffield,
    "Tottenham Hotspur": Tottenham,
    "West Ham United": WestHam,
    "Wolverhampton Wanderers": Wolves,

    "Daegu": Daegu,
    "Daejeon Hana Citizen": Daejeon,
    "Gangwon": Gangwon,
    "Gimcheon Sangmu": Gimcheon,
    "Gwangju": Gwangju,
    "Incheon United": Incheon,
    "Jeju United": Jeju,
    "Jeonbuk Motors": JeonBuk,
    "Pohang Steelers": Pohang,
    "Seoul": Seoul,
    "Suwon": Suwon,
    "Ulsan HD": Ulsan,

    // 일본어 팀 이름과 이미지 경로 추가
    "AFCボーンマス": AFC,
    "ボーンマス": AFC,
    "アーセナル": Arsenal,
    "アストン·ヴィラ": Aston,
    "ブレントフォード": Brentford,
    "ブライトン·アンド·ホーヴ·アルビオン": Brighton,
    "バーンリー": Burnley,
    "チェルシー": Chelsea,
    "クリスタルパレス": Crystal,
    "エバートン": Everton,
    "フラム": Fulham,
    "リバプール": Liverpool,
    "ルートン町": Luton,
    "マンチェスター·シティ": ManCity,
    "マンチェスター·ユナイテッド": ManUtd,
    "ニューカッスル·ユナイテッド": NewCastle,
    "ノッティンガム·フォレスト": Nottingham,
    "シェフィールド·ユナイテッド": Sheffield,
    "トッテナム·ホットスパー": Tottenham,
    "ウェストハム·ユナイテッド": WestHam,
    "ウルヴァーハンプトン·ワンダラーズ": Wolves,


    "大邱": Daegu,
    "大田ハナシチズン": Daejeon,
    "江原": Gangwon,
    "金泉尚武": Gimcheon,
    "光州": Gwangju,
    "仁川ユナイテッド": Incheon,
    "済州ユナイテッド": Jeju,
    "全北自動車": JeonBuk,
    "浦項スティーラーズ": Pohang,
    "ソウル": Seoul,
    "水原": Suwon,
    "蔚山HD": Ulsan,
};

export default teamLogos;
