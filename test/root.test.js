const appInit = require('../app');
const app = appInit.build();
/**
 * @description unit test for root router
 */
describe('Test Root Router', () => {
  /**
   * @description unit test for root router
   */
  afterAll((done) => {
    app.close();
    done();
  });
  const rootUrl = '/';
  describe('Test Root Router', () => {
    it(`Test when visit root router, should return a json include hello with world`, async () => {
      // Arrange
      const result = { hello: 'world' };

      // Act
      const res = await app.inject({
        method: 'GET',
        url: rootUrl,
      });
      const body = JSON.parse(res.body);

      // Assert
      expect(body).toEqual(result);
    });
  });
});
