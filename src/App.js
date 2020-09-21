import React, {useState} from 'react';
import axios from 'axios'
import './App.css'

const App = () => {
  const [name, setName] = useState('')
  const [users, setUsers] = useState()

  const onSubmitForm = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.get(`http://localhost:5000/users/?name=${name}`)
      setUsers(response.data)
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className="container text-center"> 
      <h1 className="my-5">Party List </h1>
      <form onSubmit={onSubmitForm} className="d-flex">
        <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
        />

        <button className="btn btn-success">Submit</button>
      </form>

      <table className="table my-5">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              const { id, first_name, last_name } = user;
              return (
                <tr key={id}>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {users != null && users.length === 0 && <p>No Results Found</p>}
    </div>
  );
}

export default App;
