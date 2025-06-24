import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', relationship: '', contact: '', share_percentage: 0 });

  // Fetch beneficiaries on mount
  useEffect(() => {
    axios.get('/api/beneficiaries', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setBeneficiaries(res.data))
      .catch(() => setBeneficiaries([]));
  }, []);

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('/api/beneficiaries', form, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        setBeneficiaries([...beneficiaries, res.data]);
        setForm({ name: '', relationship: '', contact: '', share_percentage: 0 });
      });
  };

  return (
    <div>
      <h1>My Beneficiaries</h1>
      <ul>
        {beneficiaries.map((b, idx) => (
          <li key={idx}>
            <strong>{b.name}</strong> ({b.relationship}) - {b.contact} - {b.share_percentage}%
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Relationship"
          value={form.relationship}
          onChange={e => setForm({ ...form, relationship: e.target.value })}
        />
        <input
          placeholder="Contact"
          value={form.contact}
          onChange={e => setForm({ ...form, contact: e.target.value })}
        />
        <input
          type="number"
          placeholder="Share (%)"
          value={form.share_percentage}
          onChange={e => setForm({ ...form, share_percentage: Number(e.target.value) })}
        />
        <button type="submit">Add Beneficiary</button>
      </form>
    </div>
  );
};

export default Beneficiaries;