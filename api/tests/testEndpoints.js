require('dotenv').config({path: __dirname + '/../.env'});

const algoliasearch = require('algoliasearch');
const algoliaClient = algoliasearch(
    process.env.ALGOLIA_APP_ID, 
    process.env.ALGOLIA_ADMIN_KEY
);
const algoliaApps = algoliaClient.initIndex('apps');
var browser = algoliaApps.browseAll();
var algoliaAppRecords = [];

browser.on('result', function onResult(content) {
  algoliaAppRecords = algoliaAppRecords.concat(content.hits);
});

// Connect to our database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', (err) => {
  console.error(err.message);
});
require(__dirname + '/../models/App');

const app = require('../app');
const chai = require('chai');
const supertest = require('supertest');

describe('Endpoints', function() {
    // This series of calls to our remote database can take a while
    // Mocha default timeout is too short, so we set it extra long
    // Ideally, these tests should use a test database running locally
    this.timeout(10000);

    describe('GET /api/1/apps', () => {
        it('return all apps', (done) => {
            supertest(app)
                    .get('/api/1/apps')
                    .expect(200)
                    .end((err, res) => {
                        chai.assert(res.body.apps.length = 1520);
                        done(err);
            });
        });
    });

    describe('POST /api/1/apps', () => {
        const newApp = {
            name: 'Like Kindle, but Freer',
            image: 'http://a4.mzstatic.com/us/r1000/080/Purple/v4/3f/6d/63/3f6d63e0-368d-c79d-c796-961db576d054/mza_1466682376824365277.175x175-75.jpg',
            link: 'http://itunes.apple.com/us/app/kindle-read-books-magazines/id302584613?mt=8',
            category: 'Books',
            rank: 81
        };

        it('should create a new record and return its id', (done) => {
            let newAppId;
            supertest(app)
                    .post('/api/1/apps')
                    .send(newApp)
                    .expect(200)
                    .end((err, res) => {
                        chai.assert(res.body._id);
                        newAppId = res.body._id;
                        
                        // Check to make sure the record has really been created
                        supertest(app)
                            .get('/api/1/apps')
                            .expect(200)
                            .end((err, res) => {
                                chai.assert(res.body.apps.length = 1521);
                                const appRecord = res.body.apps.filter((app) => {
                                    return app._id === newAppId;
                                });
                                chai.assert(appRecord.length === 1);
                                done(err);
                        });        
            });
        });
    });

    describe('DELETE /api/1/apps/:id', () => {
        it('should delete a app by id', (done) => {
            let appToBeDeleted;
            // Get objectID of record to be deleted
            appToBeDeleted = algoliaAppRecords.find((app) => app.name === 'iBooks');
            // Delete record
            supertest(app)
                    .delete(`/api/1/apps/${appToBeDeleted.objectID}`)
                    .expect(200)
                    .end((err, res) => {                                    
                        // Ensure record deleted
                        supertest(app)
                                .get('/api/1/apps/')
                                .expect(200)
                                .end((err, res) => {
                                    const deletedapp = res.body.apps.find((app) => app._id === appToBeDeleted._id);
                                    chai.assert(!deletedapp);
                                    done(err);
                        });
            });
        });
    });
});
