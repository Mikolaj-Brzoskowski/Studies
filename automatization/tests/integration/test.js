const {test} = require('test')
const assert = require('assert')
const {promisify} = require('util')
const axios = require('axios')

test('DB Integration Test Suite', async (t) => {

    const testPort = 3000;
    const testServerAddress = `http://localhost:${testPort}`;

    const {server} = await import('../../api/index.js');

    await t.test('It should create data', async (t) => {
        const data =
            {
              "id": "4",
              "data": "ona"
            }

            const post_result = await axios.post(testServerAddress + '/testDataPost', data)
            assert.strictEqual(post_result.status, 201);
            assert.strictEqual(post_result.data, `User added with ID: ${data.id}`);
    })

    const result = await axios.get(testServerAddress + '/testdata')
    assert.strictEqual(result.status, 200);
    assert.strictEqual(result.data.success, true);
    assert.ok(result.data.toSend.id, "1")

    await promisify(server.close.bind(server))();
})

