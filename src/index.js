import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const root = document.getElementById('root')

class Employees extends React.Component {
    constructor(){
        super()
        this.state = {
            employees: []
        }
    this.onCreate = this.onCreate.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    }
    onCreate(employee){
        axios.post('/api/employees', employee)
            .then(result => result.data)
            .then (employee => {
                const employees = [... this.state.employees, employee]
                this.setState({ employees })
            })
    }
    onChangeName(ev){
        this.setState({ employee: ev.target.value });
    }
    onSave(ev){
        ev.prevent.default()
        this.onCreate()
    }

    componentDidMount(){
      axios.get('/api/employees')
        .then(result => result.data)
        .then( employees => this.setState({ employees }))
    }

    render(){
        return (
            <div>
                   <hr />
                   <ul> {
                        this.state.employees.map( employee => 
                            <li key={employee.name}> { employee.name } </li>
                        )
                   }
                   <form onSubmit = {this.onSave}>
                   <input value= {this.employee} onChange= {this.onChangeName}/>
                   <button> Create </button>
                   </form>
                   </ul>
            </div>
        )
    }
}

ReactDOM.render(<Employees />, root);