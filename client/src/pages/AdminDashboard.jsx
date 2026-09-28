import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, UserCheck, Dumbbell, CreditCard, MessageSquare, Mail,
  Plus, Trash2, Edit, ShieldCheck, DollarSign, RefreshCw
} from 'lucide-react';
import API from '../services/api';
import { useToast } from '../context/ToastContext';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { showToast } = useToast();

  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Forms modal state for Adding Trainer / Program / Membership
  const [showAddTrainer, setShowAddTrainer] = useState(false);
  const [newTrainer, setNewTrainer] = useState({
    name: '', position: 'Fitness Coach', specialization: 'Strength & Conditioning', experience: '5+ Years', bio: '', image: ''
  });

  const [showAddProgram, setShowAddProgram] = useState(false);
  const [newProgram, setNewProgram] = useState({
    title: '', description: '', details: '', price: 2499, duration: '12 Weeks', image: ''
  });

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [uRes, tRes, pRes, mRes, cRes, sRes] = await Promise.allSettled([
        API.get('/users'),
        API.get('/trainers'),
        API.get('/programs'),
        API.get('/memberships'),
        API.get('/contact'),
        API.get('/newsletter')
      ]);

      if (uRes.status === 'fulfilled' && uRes.value.data.success) setUsers(uRes.value.data.data);
      if (tRes.status === 'fulfilled' && tRes.value.data.success) setTrainers(tRes.value.data.data);
      if (pRes.status === 'fulfilled' && pRes.value.data.success) setPrograms(pRes.value.data.data);
      if (mRes.status === 'fulfilled' && mRes.value.data.success) setMemberships(mRes.value.data.data);
      if (cRes.status === 'fulfilled' && cRes.value.data.success) setContacts(cRes.value.data.data);
      if (sRes.status === 'fulfilled' && sRes.value.data.success) setSubscribers(sRes.value.data.data);
    } catch (err) {
      console.error('Failed to load admin dataset:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Handlers for deleting & adding items
  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await API.delete(`/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      showToast('User removed successfully', 'success');
    } catch (err) {
      showToast('Failed to remove user', 'error');
    }
  };

  const handleDeleteTrainer = async (id) => {
    if (!window.confirm('Delete trainer?')) return;
    try {
      await API.delete(`/trainers/${id}`);
      setTrainers(trainers.filter(t => t._id !== id));
      showToast('Trainer deleted', 'success');
    } catch (err) {
      showToast('Failed to delete trainer', 'error');
    }
  };

  const handleAddTrainerSubmit = async (e) => {
    e.preventDefault();
    if (!newTrainer.name || !newTrainer.image) {
      showToast('Trainer name and image URL are required.', 'error');
      return;
    }
    try {
      const res = await API.post('/trainers', newTrainer);
      if (res.data.success) {
        setTrainers([...trainers, res.data.data]);
        showToast('Trainer added successfully!', 'success');
        setShowAddTrainer(false);
        setNewTrainer({ name: '', position: 'Fitness Coach', specialization: 'Strength & Conditioning', experience: '5+ Years', bio: '', image: '' });
      }
    } catch (err) {
      showToast('Failed to add trainer', 'error');
    }
  };

  const handleDeleteProgram = async (id) => {
    if (!window.confirm('Delete program?')) return;
    try {
      await API.delete(`/programs/${id}`);
      setPrograms(programs.filter(p => p._id !== id));
      showToast('Program deleted', 'success');
    } catch (err) {
      showToast('Failed to delete program', 'error');
    }
  };

  const handleAddProgramSubmit = async (e) => {
    e.preventDefault();
    if (!newProgram.title || !newProgram.image) {
      showToast('Title and image URL are required.', 'error');
      return;
    }
    try {
      const res = await API.post('/programs', newProgram);
      if (res.data.success) {
        setPrograms([...programs, res.data.data]);
        showToast('Program added successfully!', 'success');
        setShowAddProgram(false);
        setNewProgram({ title: '', description: '', details: '', price: 2499, duration: '12 Weeks', image: '' });
      }
    } catch (err) {
      showToast('Failed to add program', 'error');
    }
  };

  const totalRevenue = users.reduce((acc, curr) => {
    if (curr.membership?.includes('Ultimate')) return acc + 3999;
    if (curr.membership?.includes('Premium')) return acc + 2499;
    return acc + 1499;
  }, 0);

  return (
    <div className="pt-24 min-h-screen bg-brand-black pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-brand-cardBg border border-brand-cardBorder rounded-3xl p-8 mb-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-brand-red text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-red-glow">
                ADMINISTRATION PANEL
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-wider">
              FITONE <span className="text-brand-red">CONTROL CENTER</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">Manage club members, trainers, fitness programs, and message inquiries.</p>
          </div>

          <button
            onClick={loadAllData}
            className="flex items-center gap-2 bg-brand-darkCharcoal border border-brand-cardBorder hover:border-brand-red px-4 py-2.5 rounded-xl text-xs font-bold text-gray-300 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> REFRESH DATA
          </button>
        </div>

        {/* STATS OVERVIEW GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-brand-cardBg border border-brand-cardBorder p-5 rounded-2xl">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Total Members</p>
            <h3 className="font-heading text-2xl font-extrabold text-white mt-1">{users.length || 2}</h3>
          </div>
          <div className="bg-brand-cardBg border border-brand-cardBorder p-5 rounded-2xl">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Active Plans</p>
            <h3 className="font-heading text-2xl font-extrabold text-green-400 mt-1">
              {users.filter(u => u.membershipStatus === 'Active').length || users.length}
            </h3>
          </div>
          <div className="bg-brand-cardBg border border-brand-cardBorder p-5 rounded-2xl">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Coaches</p>
            <h3 className="font-heading text-2xl font-extrabold text-white mt-1">{trainers.length || 4}</h3>
          </div>
          <div className="bg-brand-cardBg border border-brand-cardBorder p-5 rounded-2xl">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Programs</p>
            <h3 className="font-heading text-2xl font-extrabold text-white mt-1">{programs.length || 4}</h3>
          </div>
          <div className="bg-brand-cardBg border border-brand-cardBorder p-5 rounded-2xl">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Messages</p>
            <h3 className="font-heading text-2xl font-extrabold text-brand-red mt-1">{contacts.length || 1}</h3>
          </div>
          <div className="bg-brand-cardBg border border-brand-cardBorder p-5 rounded-2xl">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Est. Revenue</p>
            <h3 className="font-heading text-2xl font-extrabold text-brand-red mt-1">₹{totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

        {/* TABS HEADER */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
          {[
            { id: 'users', label: `Users (${users.length})`, icon: Users },
            { id: 'trainers', label: `Trainers (${trainers.length})`, icon: UserCheck },
            { id: 'programs', label: `Programs (${programs.length})`, icon: Dumbbell },
            { id: 'memberships', label: `Plans (${memberships.length})`, icon: CreditCard },
            { id: 'contacts', label: `Messages (${contacts.length})`, icon: MessageSquare },
            { id: 'subscribers', label: `Subscribers (${subscribers.length})`, icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl transition-all uppercase ${
                  activeTab === tab.id
                    ? 'bg-brand-red text-white shadow-red-glow'
                    : 'bg-brand-cardBg text-gray-400 hover:text-white border border-brand-cardBorder'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: USERS */}
        {activeTab === 'users' && (
          <div className="bg-brand-cardBg border border-brand-cardBorder rounded-3xl p-6 shadow-2xl overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-xl font-bold text-white uppercase">MANAGE GYM MEMBERS</h3>
            </div>
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-brand-darkCharcoal text-gray-400 uppercase font-bold text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email & Phone</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Membership Plan</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-white/5">
                    <td className="p-3 font-bold text-white">{u.name}</td>
                    <td className="p-3 text-gray-400">{u.email}<br /><span className="text-[10px]">{u.phone}</span></td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-brand-red/20 text-brand-red' : 'bg-blue-500/20 text-blue-400'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-white">{u.membership}</td>
                    <td className="p-3">
                      <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                        {u.membershipStatus || 'Active'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-brand-red hover:text-white transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: TRAINERS */}
        {activeTab === 'trainers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-brand-cardBg border border-brand-cardBorder p-6 rounded-3xl">
              <h3 className="font-heading text-xl font-bold text-white uppercase">COACHING STAFF</h3>
              <button
                onClick={() => setShowAddTrainer(!showAddTrainer)}
                className="flex items-center gap-2 bg-brand-red text-white text-xs font-bold px-4 py-2 rounded-xl shadow-red-glow uppercase"
              >
                <Plus className="w-4 h-4" /> ADD NEW TRAINER
              </button>
            </div>

            {showAddTrainer && (
              <form onSubmit={handleAddTrainerSubmit} className="bg-brand-cardBg border border-brand-red/40 p-6 rounded-3xl space-y-4">
                <h4 className="font-heading text-base font-bold text-white uppercase">ADD TRAINER PROFILE</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Trainer Name *"
                    value={newTrainer.name}
                    onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                    required
                    className="bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl p-3 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Position (e.g. Strength Coach)"
                    value={newTrainer.position}
                    onChange={(e) => setNewTrainer({ ...newTrainer, position: e.target.value })}
                    className="bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl p-3 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Specialization"
                    value={newTrainer.specialization}
                    onChange={(e) => setNewTrainer({ ...newTrainer, specialization: e.target.value })}
                    className="bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl p-3 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Image URL (Unsplash/Direct link) *"
                    value={newTrainer.image}
                    onChange={(e) => setNewTrainer({ ...newTrainer, image: e.target.value })}
                    required
                    className="bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl p-3 text-xs text-white"
                  />
                </div>
                <textarea
                  placeholder="Bio description"
                  value={newTrainer.bio}
                  onChange={(e) => setNewTrainer({ ...newTrainer, bio: e.target.value })}
                  rows="2"
                  className="w-full bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl p-3 text-xs text-white"
                />
                <button type="submit" className="bg-brand-red text-white text-xs font-bold px-6 py-2.5 rounded-xl uppercase">
                  SAVE TRAINER
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trainers.map((t) => (
                <div key={t._id} className="bg-brand-cardBg border border-brand-cardBorder rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <img src={t.image} alt={t.name} className="w-full h-44 object-cover rounded-xl mb-3" />
                    <h4 className="font-heading text-lg font-bold text-white uppercase">{t.name}</h4>
                    <p className="text-xs text-brand-red font-semibold">{t.position}</p>
                    <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{t.bio}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTrainer(t._id)}
                    className="mt-4 w-full bg-red-500/10 text-red-400 hover:bg-brand-red hover:text-white py-2 rounded-xl text-xs font-bold uppercase transition-colors"
                  >
                    DELETE TRAINER
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PROGRAMS */}
        {activeTab === 'programs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-brand-cardBg border border-brand-cardBorder p-6 rounded-3xl">
              <h3 className="font-heading text-xl font-bold text-white uppercase">FITNESS PROGRAMS</h3>
              <button
                onClick={() => setShowAddProgram(!showAddProgram)}
                className="flex items-center gap-2 bg-brand-red text-white text-xs font-bold px-4 py-2 rounded-xl shadow-red-glow uppercase"
              >
                <Plus className="w-4 h-4" /> ADD NEW PROGRAM
              </button>
            </div>

            {showAddProgram && (
              <form onSubmit={handleAddProgramSubmit} className="bg-brand-cardBg border border-brand-red/40 p-6 rounded-3xl space-y-4">
                <h4 className="font-heading text-base font-bold text-white uppercase">ADD PROGRAM</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Program Title *"
                    value={newProgram.title}
                    onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                    required
                    className="bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl p-3 text-xs text-white"
                  />
                  <input
                    type="number"
                    placeholder="Price (₹)"
                    value={newProgram.price}
                    onChange={(e) => setNewProgram({ ...newProgram, price: Number(e.target.value) })}
                    className="bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl p-3 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g. 12 Weeks)"
                    value={newProgram.duration}
                    onChange={(e) => setNewProgram({ ...newProgram, duration: e.target.value })}
                    className="bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl p-3 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Image URL *"
                    value={newProgram.image}
                    onChange={(e) => setNewProgram({ ...newProgram, image: e.target.value })}
                    required
                    className="bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl p-3 text-xs text-white"
                  />
                </div>
                <textarea
                  placeholder="Short Description"
                  value={newProgram.description}
                  onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                  rows="2"
                  className="w-full bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl p-3 text-xs text-white"
                />
                <button type="submit" className="bg-brand-red text-white text-xs font-bold px-6 py-2.5 rounded-xl uppercase">
                  SAVE PROGRAM
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {programs.map((p) => (
                <div key={p._id} className="bg-brand-cardBg border border-brand-cardBorder rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded-xl mb-3" />
                    <h4 className="font-heading text-lg font-bold text-white uppercase">{p.title}</h4>
                    <p className="text-xs text-brand-red font-bold mt-1">₹{p.price?.toLocaleString()} • {p.duration}</p>
                    <p className="text-[11px] text-gray-400 mt-2 line-clamp-2">{p.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteProgram(p._id)}
                    className="mt-4 w-full bg-red-500/10 text-red-400 hover:bg-brand-red hover:text-white py-2 rounded-xl text-xs font-bold uppercase transition-colors"
                  >
                    DELETE PROGRAM
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MEMBERSHIPS */}
        {activeTab === 'memberships' && (
          <div className="bg-brand-cardBg border border-brand-cardBorder rounded-3xl p-6 shadow-2xl">
            <h3 className="font-heading text-xl font-bold text-white uppercase mb-4">MEMBERSHIP TIERS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {memberships.map((m) => (
                <div key={m._id} className="bg-brand-darkCharcoal border border-brand-cardBorder p-6 rounded-2xl">
                  <h4 className="font-heading text-xl font-bold text-white uppercase">{m.name}</h4>
                  <p className="font-heading text-3xl font-extrabold text-brand-red my-3">₹{m.price?.toLocaleString()}/mo</p>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {m.features?.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">✓ {f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CONTACT SUBMISSIONS */}
        {activeTab === 'contacts' && (
          <div className="bg-brand-cardBg border border-brand-cardBorder rounded-3xl p-6 shadow-2xl overflow-x-auto">
            <h3 className="font-heading text-xl font-bold text-white uppercase mb-4">CONTACT FORM SUBMISSIONS</h3>
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-brand-darkCharcoal text-gray-400 uppercase font-bold text-[10px] border-b border-white/10">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email & Phone</th>
                  <th className="p-3">Program Inquiry</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {contacts.map((c) => (
                  <tr key={c._id} className="hover:bg-white/5">
                    <td className="p-3 font-bold text-white">{c.name}</td>
                    <td className="p-3 text-gray-400">{c.email}<br />{c.phone}</td>
                    <td className="p-3 font-semibold text-brand-red">{c.program}</td>
                    <td className="p-3 max-w-xs">{c.message}</td>
                    <td className="p-3 text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 6: SUBSCRIBERS */}
        {activeTab === 'subscribers' && (
          <div className="bg-brand-cardBg border border-brand-cardBorder rounded-3xl p-6 shadow-2xl max-w-2xl">
            <h3 className="font-heading text-xl font-bold text-white uppercase mb-4">NEWSLETTER SUBSCRIBERS</h3>
            <div className="space-y-2">
              {subscribers.map((s, i) => (
                <div key={s._id || i} className="flex justify-between items-center bg-brand-darkCharcoal p-3 rounded-xl border border-white/5">
                  <span className="text-xs font-bold text-white">{s.email}</span>
                  <span className="text-[10px] text-gray-400">{new Date(s.subscribedAt || Date.now()).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
