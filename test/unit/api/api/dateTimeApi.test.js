const moment = require('moment');
const dateTimeApi = require('../../../../src/api/dateTimeApi');
const { dayNamesZh } = require('../../../../src/utils/sharedObject');
/**
 * @description unit test for dateTimeApi
 */
describe('Test dateTimeApi', () => {
  /**
   * @description unit test for dateTimeApi()
   */
  describe('Test dateTimeApi', () => {
    it('Test dateTimeApi should be a function', () => {
      // Assert
      expect(dateTimeApi).toBeInstanceOf(Function);
    });
    it('Test when tw_date is today and tw_time is now, should return a json include Date is today and Time is now', async () => {
      // Arrange
      const twDate = moment(new Date()).format('YYYY/MM/DD');
      const twTime = moment(new Date()).format('HH:mm:ss');
      const twDay = new Date().getDay();
      const result = {
        tw_date: twDate,
        tw_time: twTime,
        tw_day: dayNamesZh[twDay],
      };

      // Act
      const res = (await dateTimeApi()).data;

      // Assert
      expect(res).toEqual(result);
    });
  });
});
