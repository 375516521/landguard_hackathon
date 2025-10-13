import React, {useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'farmer' });
  const nav = useNavigate();
  const submit = async e => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      localStorage.setItem('lg_token', res.data.token);
      toast.success('Registered');
      nav('/map');
    }catch(err){ toast.error(err.response?.data?.message || 'Error'); console.error(err); }
  };
  return (
    <div className='container'>
      <div className='card' style={{maxWidth:640, margin:'0 auto'}}>
        <h2>Register</h2>
        <form onSubmit={submit}>
          <label>Name</label>
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <label>Email</label>
          <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required type='email' />
          <label>Password</label>
          <input value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required type='password' />
          <label>Role</label>
          <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
            <option value='farmer'>Farmer</option>
            <option value='ngo'>NGO</option>
            <option value='investor'>Investor</option>
            <option value='provider'>Provider</option>
          </select>
          <div style={{marginTop:12}}><button className='btn' type='submit'>Create account</button></div>
        </form>
      </div>
    </div>
  );
}
