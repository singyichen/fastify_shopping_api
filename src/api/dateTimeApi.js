const axios = require('axios');
/**
 * @description dateTime api
 */
const request = axios.create({
  // 設定 api baseURL
  baseURL: process.env.DATETIME_BASE_URL, // 部屬到 docker 的 url
});

/**
 * @description 取得台灣日期時間 api
 * @returns { Object } JSON include tw_date and tw_time and tw_day
 */
const dateTimeApi = async () => {
  return request.get('/api/public/dateTimeFromNtp');
};

module.exports = dateTimeApi;
