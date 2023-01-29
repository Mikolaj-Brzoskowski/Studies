const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'host.docker.internal',
  database: 'postgres',
  password: 'password',
  port: 5432,
})

const test_data = [{
    "id": 1,
    "data": "ja"
}]

const testData = (req, res) => {
  const toSend = test_data[0]
  res.status(200).json({toSend, success: true});
}

const testDataPost = (req, res) => {
  const data = req.body
  test_data.push(data);
  res.status(201).send(`User added with ID: ${data.id}`)
}

const getData = (request, response) => {
  pool.query(`SELECT * FROM public."table" ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getDataById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query(`SELECT * FROM public."table" WHERE id = $1`, [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createData = (request, response) => {
const { data } = request.body
pool.query('INSERT INTO public."table" (data) VALUES ($1) RETURNING *', [data], (error, results) => {
  if (error) {
    throw error
  }
  response.status(201).send(`User added with ID: ${results.rows[0].id}`)
})
}

const updateData = (request, response) => {
const id = parseInt(request.params.id)
const { text } = request.body

pool.query(
  'UPDATE public."table" SET data = $1 WHERE id = $2',
  [data, id],
  (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User modified with ID: ${id}`)
  }
)
}

const deleteData = (request, response) => {
const id = parseInt(request.params.id)

pool.query('DELETE FROM public."table" WHERE id = $1', [id], (error, results) => {
  if (error) {
    throw error
  }
  response.status(200).send(`User deleted with ID: ${id}`)
})
}

exports.GETDATA = getData
exports.GETDATABYID = getDataById
exports.CREATEDATA = createData
exports.UPDATEDATA = updateData
exports.DELETEDATA = deleteData
exports.TESTDATA = testData
exports.TESTDATAPOST = testDataPost