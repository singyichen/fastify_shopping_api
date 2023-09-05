/**
 * @description logger plugin
 */

const pino = require('pino');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const rotatingFileStream = require('rotating-file-stream');

// 設定日誌分類
const levels = {
  info: 30,
  error: 50,
};
// 設定日誌資料夾路徑
const logDirectory = path.join(__dirname, '../../logs');
// 日誌資料夾的存在檢核
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const stream = Object.keys(levels).map((level) => {
  return {
    level: level,
    stream: rotatingFileStream.createStream(`${level}.log`, {
      interval: '1d', // 設定循環寫入的時間間隔
      path: `${logDirectory}/${level}`, // 設定日誌資料夾路徑，並按照 level 建立資料夾
      maxFiles: 7, // 保留最近 7 天的日誌文件
    }),
  };
});
const logger = pino(
  {
    level: 'info', // must be the lowest level of all streams
    customLevels: levels,
    useOnlyCustomLevels: true,
    // 日誌中的日期時間格式化
    timestamp: () =>
      `,"time":"${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}"`,
    formatters: {
      // 將 level 從數字轉成文字
      level: (label) => {
        return { level: label };
      },
    },
    // 不記錄 pid，hostname
    base: undefined,
    // console log 顯示設定，目前無法跟寫入 log 同時運作
    // transport: {
    //   target: 'pino-pretty',
    //   options: {
    //     colorize: true,
    //     translateTime: 'SYS:yyyy-mm-dd hh:MM:ss', // 格式化日期時間
    //     ignore: 'pid',
    //   },
    // },
  },
  pino.multistream(stream, {
    levels,
    dedupe: true, // Set this to true to send logs only to the stream with the higher level
  }),
);

module.exports = logger;
