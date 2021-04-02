import React from 'react';

export default function SessionForm({formType, processForm}){
  const [user, setUser] = React.useState({
    username: '',
    password: ''
  });

  function handleChange(e, key){
    setUser({...user, [key]: e.target.value});
  }

  function handleSubmit(e){
    e.preventDefault();
    const user = Object.assign({}, user);
    processForm(user);
  }

  return (
    <form onSubmit={e => handleSubmit}>
      <label>
        Username
        <input
          type="text"
          name="user[username]"
          value={user.username}
          onChange={(e)=>handleChange(e, username)
        }/>
      </label>
      <label>
        Password
        <input
          type="password"
          name="user[password]"
          value={user.password}
          onChange={(e)=>handleChange(e, password)
        }/>
      </label>
      <input type="submit" value={formType==='login' ? "Log In!" : "Sign Up!"}/>
    </form>
  )
}