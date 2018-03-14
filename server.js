const express = require('express')
const app = express();
const path = require('path')


app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')))
app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use(require('body-parser').json());

app.get('/api/employees', (req, res, next) => {
    Employee.findAll()
        .then(employees => res.send(employees))
        .catch(next)
})

app.post('/api/employees', (req, res, next)=>{
    Employee.create(req.body)
        .then(employee => res.send(employees))
        .catch(next)
})

const port = process.env.PORT || 3000
app.listen(port, console.log(`listening on port ${port}`))

const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.database_url || 'postgres://localhost/acme_fika')

const Employee = conn.define('employee', {
    name: {
        type: Sequelize.STRING
    }
})

const Manager = conn.define('manager', {
    name: {
        type: Sequelize.STRING
    }
})
 

// Employee.belongsTo(Employee, 

const sync = ()=>{
    return conn.sync({force:true})
}

const seed = ()=>{
    return Promise.all([
        Employee.create({name: 'anna'}), 
        Employee.create({name: 'ken'}),
        Employee.create({name: 'gavin'})
    ])
}

sync()
    .then(()=>seed())