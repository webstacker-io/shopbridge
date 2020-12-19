const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shopbridge',
  password: 'admin',
  port: 5000,
});

const getProducts = (request, response) => {
  pool.query('SELECT * FROM inventory ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProductById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM inventory WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    //response.status(200).json(results.rows)
  })
}

const createProduct = (request, response) => {
  const { name, description, price } = request.body

  pool.query('INSERT INTO inventory (name, description, price) VALUES ($1, $2, $3)', [name, description, price], (error, results) => {
    if (error) {
      throw error
    }
    //response.status(201).send(`Product added successfully`)
  })
}

const deleteProduct = (request, response) => {
  const id = request.params.id;

  pool.query('DELETE FROM inventory WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    //response.status(200).send(`Product deleted with ID: ${id}`)
  })
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct
}


