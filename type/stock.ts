export interface Stock {
    stockname: string;
    stockcode: string;
    currentprice: number;
    price_change_value: number;
    price_change_status: string;
    volume: number;
    volumechangerate: number;
    action: string;
    candle_pattern: string;
    macd_trend: string;
    rsi_status: string;
    volume_trend: string;
    price_vs_bollinger: string;
    slope_5: string;
    slope_20: string;
    slope_60: string;
    slope_120: string;
    recent_max_volume_date: string;
    recent_max_volume_change: number;
    recent_max_volume_trend: string;
    recent_max_volume_value: number;
    support_1: string;
    support_2: string;
    support_3: string;
    resistance_1: string;
    resistance_2: string;
    resistance_3: string;
  }
  
  export interface StockCamel {
    stockname: string;
    stockcode: string;
    currentprice: number;
    priceChangeValue: number;
    priceChangeStatus: string;
    volume: number;
    volumechangerate: number;
    action: string;
    candlePattern: string;
    macdTrend: string;
    rsiStatus: string;
    volumeTrend: string;
    priceVsBollinger: string;
    slope5: string;
    slope20: string;
    slope60: string;
    slope120: string;
    recentMaxVolumeDate: string;
    recentMaxVolumeChange: number;
    recentMaxVolumeTrend: string;
    recentMaxVolumeValue: number;
    support1: string;
    support2: string;
    support3: string;
    resistance1: string;
    resistance2: string;
    resistance3: string;
  }
  