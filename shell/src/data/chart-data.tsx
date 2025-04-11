function generateChartData(range: string): [number, number][] {
  const now = new Date();
  const data: [number, number][] = [];

  let count = 0;
  let stepMs = 0;
  let isMonthly = false;

  switch (range) {
    case '1d':
      count = 24;
      stepMs = 60 * 60 * 1000;
      break;
    case '3d':
      count = 3;
      stepMs = 24 * 60 * 60 * 1000;
      break;
    case '1w':
      count = 7;
      stepMs = 24 * 60 * 60 * 1000;
      break;
    case '1m':
      count = 30;
      stepMs = 24 * 60 * 60 * 1000;
      break;
    case '6m':
      count = 6;
      isMonthly = true;
      break;
    case '1yr':
      count = 12;
      isMonthly = true;
      break;
    case 'max':
      count = 5 * 12;
      isMonthly = true;
      break;
    default:
      return [];
  }

  if (isMonthly) {
    for (let i = count - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const timestamp = date.getTime();
      const value = +(50 + Math.random() * 10 - 5).toFixed(2);
      data.push([timestamp, value]);
    }
  } else {
    for (let i = count - 1; i >= 0; i--) {
      const timestamp = now.getTime() - i * stepMs;
      const value = +(50 + Math.random() * 10 - 5).toFixed(2);
      data.push([timestamp, value]);
    }
  }

  return data;
}



export const ChartData = {
  '1d': generateChartData('1d'),
  '3d': generateChartData('3d'),
  '1w': generateChartData('1w'),
  '1m': generateChartData('1m'),
  '6m': generateChartData('6m'),
  '1yr': generateChartData('1yr'),
  'max': generateChartData('max'),
};
