import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [userList, setUserList] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: ""
  })

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = () => {
    axios.get("http://localhost:3001/getUsers")
      .then((res) => {
        console.log("res:", res);

        setUserList(res.data);

      })
  }

  const inputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const submitFormData = (e) => {
    e.preventDefault();

    console.log(formData);

    axios.post("http://localhost:3001/createUser", {
      name: formData.name,
      email: formData.email
    })
      .then((res) => {
        console.log("data added", res);

        setFormData({
          name: "",
          email: ""
        });
        setUserList([...userList, { name: formData.name, email: formData.email }])

      })

  }
  return (
    <div className="App">

      <div>
        <form action='' onSubmit={submitFormData}>
          <input onChange={inputChange} value={formData.name} type={"text"} name="name" placeholder='Enter Name' /><br />
          <input onChange={inputChange} value={formData.email} type={"text"} name="email" placeholder='Enter Email' /><br />
          <button>Create User</button>
        </form>
      </div>

      <div>
        {userList.map((item, index) => {
          return <div>
            <h1>Name:{item.name}</h1>
            <h1>Email:{item.email}</h1>
          </div>
        })}
      </div>

    </div>
  );
}

export default App;
