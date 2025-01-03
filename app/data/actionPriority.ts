
export const actionPriority: { [key: string]: number } = {
  "매수 적극 고려(장대양봉 확인, 강한 상승 추세)": 10,
  "매수 고려(거래량 급증, 강한 상승)": 20,
  "매수 고려(거래량 급증)": 25,
  "매수 고려(반등 가능성 높음)": 30,
  "매수 고려(볼린저 하단 근처, RSI 중립 이하)": 40,
  "매수 고려(이동평균선 상승, 추세 강화 가능성)": 50,
  "매수 고려(이동평균선 상승 일치)": 60,
  "매수 고려(과매도 상태, 반등 가능성)": 70,
  "매수 대기(반등 가능성 높음)": 75,
  "매수 대기(과매도, 거래량 부족)": 80,
  "매수 대기(돌파 가능성)": 90,
  "매수 대기(RSI 상승, 추세 확인 필요)": 100,
  "관망(거래량 급증)": 105,
  "관망(볼린저 상단, RSI 중립 상단)": 110,
  "관망(과매수 상태, 거래량 감소)": 120,
  "관망(추세 확인 필요)": 130,
  "관망(추세 강화 가능성)": 140,
  "관망(하락 중 거래량 급증, 추세 확인 필요)": 150,
  "관망(단기 하락세, 추세 확인 필요)": 160,
  "관망(볼린저 중간선, 신호 부족)": 170,
  "관망(볼린저 하단, 신호 부족)": 180,
  "관망(거래량 감소)": 190,
  "관망(추세 약화 가능성)": 200,
  "관망(조정 가능성)": 210,
  "관망(추가 하락 가능성)": 220,
  "매도 고려(과매수, 거래량 급증)": 230,
  "매도 고려(위꼬리 긴 음봉, 과매수 상태)": 240,
  "매도 고려(상승 피로 누적)": 250,
};