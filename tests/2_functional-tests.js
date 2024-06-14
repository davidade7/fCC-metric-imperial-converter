const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Test 2-1: Convert a valid input such as 10L', (done) => {
        // Setup
        const input = '10L';
        const expectedNum = 10;
        const expectedUnit = 'L';
        const expectedReturnNum = 2.64172;
        const expectedReturnUnit = 'gal';
        const expectedString = '10 liters converts to 2.64172 gallons';

        // Execute
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert')
            .query({ input })
            .end(function(err, res) {
                // Assert
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, expectedNum);
                assert.equal(res.body.initUnit, expectedUnit);
                assert.approximately(res.body.returnNum, expectedReturnNum, 0.1);
                assert.equal(res.body.returnUnit, expectedReturnUnit);
                assert.equal(res.body.string, expectedString);
                done();
            });
    }),
    test('Test 2-2: Convert an invalid input such as 32g', (done) => {
        // Setup
        const input = '32g';
        const expectedString = 'invalid unit';

        // Execute
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert')
            .query({ input })
            .end(function(err, res) {
                // Assert
                assert.equal(res.body.error, expectedString);
                done();
            });
    }),
    test('Test 2-3: Convert an invalid number such as 3/7.2/4kg', (done) => {
        // Setup
        const input = '3/7.2/4kg';
        const expectedString = 'invalid number';

        // Execute
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert')
            .query({ input })
            .end(function(err, res) {
                // Assert
                assert.equal(res.body.error, expectedString);
                done();
            });
    }),
    test('Test 2-4: Convert an invalid number AND unit such as 3/7.2/4kilomegagram', (done) => {
        // Setup
        const input = '3/7.2/4kilomegagram';
        const expectedString = 'invalid number and unit';

        // Execute
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert')
            .query({ input })
            .end(function(err, res) {
                // Assert
                assert.equal(res.body.error, expectedString);
                done();
            });
    }),
    test('Test 2-5: Convert with no number such as kg', (done) => {
        // Setup
        const input = 'kg';
        const expectedNum = 1;
        const expectedUnit = 'kg';
        const expectedReturnNum = 2.20462;
        const expectedReturnUnit = 'lbs';
        const expectedString = '1 kilograms converts to 2.20462 pounds';

        // Execute
        chai
            .request(server)
            .keepOpen()
            .get('/api/convert')
            .query({ input })
            .end(function(err, res) {
                // Assert
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, expectedNum);
                assert.equal(res.body.initUnit, expectedUnit);
                assert.approximately(res.body.returnNum, expectedReturnNum, 0.1);
                assert.equal(res.body.returnUnit, expectedReturnUnit);
                assert.equal(res.body.string, expectedString);
                done();
            });
    })
});
