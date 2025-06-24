import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

const Beneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
  const [form, setForm] = useState({ id: null, name: '', relationship: '', contact: '', share_percentage: 0, type: 'primary' });
  const [editing, setEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDelete, setToDelete] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [payments, setPayments] = useState<any[]>([]);
  const [showPayments, setShowPayments] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'relationship'>('name');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => { fetchBeneficiaries(); }, []);

  const fetchBeneficiaries = async () => {
    const res = await axios.get('/api/beneficiaries', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setBeneficiaries(res.data);
  };

  const fetchPayments = async (beneficiaryId: number) => {
    const res = await axios.get(`/api/beneficiaries/${beneficiaryId}/payments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setPayments(res.data);
    setShowPayments(beneficiaryId);
  };

  // Calculate total allocated percentage (excluding the one being edited)
  const totalAllocated = beneficiaries
    .filter(b => !editing || b.id !== form.id)
    .reduce((sum, b) => sum + (b.share_percentage || 0), 0);

  const remaining = 100 - totalAllocated;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const newTotal = totalAllocated + Number(form.share_percentage);
    if (newTotal > 100) {
      setError('Total allocation cannot exceed 100%.');
      return;
    }
    if (editing && form.id) {
      await axios.put(`/api/beneficiaries/${form.id}`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    } else {
      await axios.post('/api/beneficiaries', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    }
    setForm({ id: null, name: '', relationship: '', contact: '', share_percentage: 0, type: 'primary' });
    setEditing(false);
    fetchBeneficiaries();
  };

  const handleEdit = (b: any) => {
    setForm(b);
    setEditing(true);
  };

  const handleDelete = (id: number) => {
    setToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (toDelete !== null) {
      await axios.delete(`/api/beneficiaries/${toDelete}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setShowConfirm(false);
      setToDelete(null);
      fetchBeneficiaries();
    }
  };

  const sortedBeneficiaries = [...beneficiaries]
    .filter(b => filterType === 'all' || b.type === filterType)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      return a.relationship.localeCompare(b.relationship);
    });

  const chartData = {
    labels: beneficiaries.map(b => b.name),
    datasets: [
      {
        data: beneficiaries.map(b => b.share_percentage),
        backgroundColor: [
          '#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1', '#17a2b8', '#fd7e14', '#20c997'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>My Beneficiaries</h1>
      <div style={{ width: 350, margin: '20px auto' }}>
        <Doughnut data={chartData} />
      </div>
      <div style={{ margin: '10px 0' }}>
        <label>Allocation Progress:</label>
        <div style={{ background: '#eee', borderRadius: 8, height: 24, width: 300, position: 'relative' }}>
          <div
            style={{
              background: totalAllocated === 100 ? 'green' : '#007bff',
              width: `${totalAllocated}%`,
              height: '100%',
              borderRadius: 8,
              transition: 'width 0.3s'
            }}
          />
          <span style={{
            position: 'absolute', left: '50%', top: 0, width: '100%', textAlign: 'center', lineHeight: '24px'
          }}>
            {totalAllocated}% allocated
          </span>
        </div>
        <div>Remaining: {remaining}%</div>
        {totalAllocated === 100 && (
          <div style={{
            display: 'inline-block',
            background: 'green',
            color: 'white',
            borderRadius: 12,
            padding: '4px 12px',
            margin: '10px 0',
            fontWeight: 'bold'
          }}>
            🎉 All shares allocated!
          </div>
        )}
      </div>
      <div style={{ margin: '10px 0' }}>
        <label>Sort by: </label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="relationship">Relationship</option>
        </select>
        <label style={{ marginLeft: 10 }}>Filter by type: </label>
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="primary">Primary</option>
          <option value="contingent">Contingent</option>
        </select>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Relationship" value={form.relationship} onChange={e => setForm({ ...form, relationship: e.target.value })} />
        <input type="text" placeholder="Contact" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
        <input
          type="number"
          placeholder="Share %"
          value={form.share_percentage}
          min={0}
          max={remaining}
          onChange={e => setForm({ ...form, share_percentage: Number(e.target.value) })}
          required
        />
        <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
          <option value="primary">Primary Beneficiary</option>
          <option value="contingent">Contingent Beneficiary</option>
        </select>
        <button type="submit">{editing ? 'Update' : 'Add'} Beneficiary</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Relationship</th><th>Contact</th><th>Share %</th><th>Type</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedBeneficiaries.map(b => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.relationship}</td>
              <td>{b.contact}</td>
              <td>{b.share_percentage}</td>
              <td>{b.type}</td>
              <td>
                <button onClick={() => handleEdit(b)}>Edit</button>
                <button onClick={() => handleDelete(b.id)}>Delete</button>
                <button onClick={() => fetchPayments(b.id)}>View Payments</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showConfirm && (
        <div className="modal">
          <p>Are you sure you want to delete this beneficiary?</p>
          <button onClick={confirmDelete}>Yes, Delete</button>
          <button onClick={() => setShowConfirm(false)}>Cancel</button>
        </div>
      )}
      {showPayments && (
  <div>
          <h3>Payment History</h3>
          <ul>
            {payments.map(p => (
              <li key={p.id}>
                Amount: {p.amount} | Date: {new Date(p.paid_at).toLocaleString()}
              </li>
            ))}
          </ul>
          <button onClick={() => setShowPayments(null)}>Close</button>
        </div>
      )}
  </div>
);
};

export default Beneficiaries;