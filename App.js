import React, { useState, useEffect } from 'react'
import List from './Components/List'
import './App.css'



const getData = () => {
  const data = localStorage.getItem('datas')
  if (data) {
    return JSON.parse(data);
  }
  else {
    return [];
  }
}

const App = () => {
  // datas array of object
  const [datas, setdatas] = useState(getData());

  // input field states
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [editId, seteditId] = useState('');
  


  const submitHandler = (e) => {
    e.preventDefault();

    if (editId) {
      const listData = datas.find((i) => i.id === editId)
      const updateData = datas.map((d) => d.id === listData.id ? (d = { id: d.id, title, password }) : { id: d.id, title: d.title, password: d.password })
      setdatas(updateData)
      seteditId(0);
      setTitle('');
      setPassword('');
    }


    let val = {
      id: Math.random().toString(),
      title,
      password
    }
    setdatas([...datas, val])
    setTitle('');
    setPassword('');
  }

  function handleDelete(id){
    const filteredDatas = datas.filter((Element) => {
      return Element.id !== id;
    })
    setdatas(filteredDatas);
  }

  const handleEdit = (id) => {
    const editDatas = datas.find((i) => i.id === id);
    setTitle(editDatas.title)
    setPassword(editDatas.password)
    seteditId(id);
    
  }

  useEffect(() => {
    localStorage.setItem('datas', JSON.stringify(datas));
  }, [datas])



  return (
    <div className='container'>
      <h1 className='title'>Password Keeper</h1>
      <form className='search'>
        <input type="text" placeholder="Search.." name="search"></input>
      </form>
      <div>
        <form className='container' onSubmit={submitHandler}>
          <label htmlFor="name">Title:-</label>
          <input type="text" id="name" onChange={(e) => setTitle(e.target.value)} value={title} />

          <label htmlFor="password">Password:-</label>
          <input type="text" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />&ensp;

          <button type="submit">{editId ? "Edit" : "Submit"}</button>
        </form>
      </div>
      <List datas={datas} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}

export default App;
