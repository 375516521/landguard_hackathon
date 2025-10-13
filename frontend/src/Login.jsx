import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login(){
  const [form,setForm]=useState({email:'',password:''});
  const nav = useNavigate();
  const submit=async e=>{
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('lg_token', res.data.token);
      toast.success('Logged in');
      nav('/map');
    }catch(err){ toast.error('Login failed'); console.error(err); }
  };
  return (
    <div className='container'>
      <div className='card' style={{maxWidth:420, margin:'0 auto'}}>
        <h2>Login</h2>
        <form onSubmit={submit}>
          <label>Email</label>
          <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
          <label>Password</label>
          <input type='password' value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
          <div style={{marginTop:12}}><button className='btn' type='submit'>Login</button></div>
        </form>
      </div>
    </div>
  );
}
