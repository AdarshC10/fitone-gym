import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  User, CreditCard, Calendar, Clock, Activity, Dumbbell,
  Scale, Flame, TrendingUp, Edit3, Save, PhoneCall, ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user, updateUserProfile } = useAuth();
  const { showToast } = useToast();

  const [editing, setEditing] = useState(false);
  const [stats, setStats] = useState({
    height: user?.stats?.height || 178,
    weight: user?.stats?.weight || 76,
    targetWeight: user?.stats?.targetWeight || 72,
  });

  const calculateBMI = (h, w) => {
    if (!h || !w) return 24.0;
    const heightInMeters = h / 100;
    return (w / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const currentBMI = calculateBMI(stats.height, stats.weight);

  const handleSaveStats = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(user._id, {
        stats: {
          height: Number(stats.height),
          weight: Number(stats.weight),
          targetWeight: Number(stats.targetWeight),
          bmi: Number(currentBMI)
        }
      });
      showToast('Body metrics updated successfully!', 'success');
      setEditing(false);
    } catch (err) {
      showToast('Failed to update stats.', 'error');
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-brand-black pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header Banner */}
        <div className="bg-gradient-to-r from-brand-cardBg via-brand-darkCharcoal to-brand-black border border-brand-cardBorder rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-brand-red/20 text-brand-red text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-brand-red/30">
                  MEMBER DASHBOARD
                </span>
                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full uppercase border border-green-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> STATUS: {user?.membershipStatus || 'ACTIVE'}
                </span>
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-wide">
                WELCOME, <span className="text-brand-red">{user?.name}</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Track your fitness progression, upcoming sessions, and membership details.
              </p>
            </div>

            <Link
              to="/pricing"
              className="bg-brand-red hover:bg-brand-brightRed text-white text-xs font-heading font-extrabold px-6 py-3 rounded-xl shadow-red-glow transition-all uppercase tracking-widest"
            >
              UPGRADE PLAN
            </Link>
          </div>
        </div>

        {/* TOP METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-brand-cardBg border border-brand-cardBorder p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Membership</p>
              <h3 className="font-heading text-xl font-extrabold text-white mt-1 uppercase">
                {user?.membership || 'Premium Plan'}
              </h3>
              <p className="text-[11px] text-brand-red font-semibold mt-1">
                Exp: {new Date(user?.membershipExpiry || Date.now() + 30*86400000).toLocaleDateString()}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-brand-cardBg border border-brand-cardBorder p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Assigned Coach</p>
              <h3 className="font-heading text-xl font-extrabold text-white mt-1">
                {user?.trainer || 'Alex Johnson'}
              </h3>
              <p className="text-[11px] text-gray-400 mt-1">Head Strength Coach</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
              <User className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-brand-cardBg border border-brand-cardBorder p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Next Training Session</p>
              <h3 className="font-heading text-xl font-extrabold text-white mt-1">
                {user?.nextSession || 'Tomorrow, 10:00 AM'}
              </h3>
              <p className="text-[11px] text-gray-400 mt-1">Powerlifting & Hypertrophy</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-brand-cardBg border border-brand-cardBorder p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Body Mass Index (BMI)</p>
              <h3 className="font-heading text-3xl font-extrabold text-brand-red mt-1">
                {currentBMI}
              </h3>
              <p className="text-[11px] text-gray-400 mt-1">Normal Weight Range</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
              <Activity className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* MAIN BODY: WORKOUT PROGRESS & BODY METRICS FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: WORKOUT PROGRESS & SCHEDULE */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Workout Progress Card */}
            <div className="bg-brand-cardBg border border-brand-cardBorder rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-heading text-xl font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-brand-red" /> WORKOUT PROGRESS
                  </h3>
                  <p className="text-xs text-gray-400">Weekly training compliance & weight tracking</p>
                </div>
                <span className="text-xs font-bold text-brand-red bg-brand-red/10 px-3 py-1 rounded-full border border-brand-red/30">
                  85% COMPLETED
                </span>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-300 mb-1.5">
                    <span>Strength Routine (Bench & Squat)</span>
                    <span className="text-brand-red">4 of 4 Sessions Done</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-brand-darkCharcoal overflow-hidden p-0.5 border border-white/5">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-darkRed to-brand-red w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-300 mb-1.5">
                    <span>Cardio & Metabolic HIIT</span>
                    <span className="text-brand-red">2 of 3 Sessions Done</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-brand-darkCharcoal overflow-hidden p-0.5 border border-white/5">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-darkRed to-brand-red w-2/3" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-300 mb-1.5">
                    <span>Mobility & Core Recovery</span>
                    <span className="text-brand-red">1 of 2 Sessions Done</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-brand-darkCharcoal overflow-hidden p-0.5 border border-white/5">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-darkRed to-brand-red w-1/2" />
                  </div>
                </div>
              </div>

            </div>

            {/* Upcoming Training Sessions List */}
            <div className="bg-brand-cardBg border border-brand-cardBorder rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="font-heading text-xl font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-red" /> UPCOMING TRAINER SESSIONS
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between bg-brand-darkCharcoal p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red font-bold text-xs">
                      TOM
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Powerlifting & Deadlift Form</h4>
                      <p className="text-xs text-gray-400">Coach: Alex Johnson • 10:00 AM - 11:30 AM</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded border border-green-500/20 uppercase">
                    CONFIRMED
                  </span>
                </div>

                <div className="flex items-center justify-between bg-brand-darkCharcoal p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red font-bold text-xs">
                      FRI
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">High Intensity Metabolic HIIT</h4>
                      <p className="text-xs text-gray-400">Coach: Sarah Jenkins • 06:00 PM - 07:00 PM</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded border border-green-500/20 uppercase">
                    CONFIRMED
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: EDIT BODY METRICS & TRAINER CONSULT */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Body Metrics Update Box */}
            <div className="bg-brand-cardBg border border-brand-cardBorder rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-heading text-xl font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <Scale className="w-5 h-5 text-brand-red" /> BODY METRICS
                </h3>
                <button
                  onClick={() => setEditing(!editing)}
                  className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1 uppercase"
                >
                  {editing ? 'CANCEL' : <><Edit3 className="w-3.5 h-3.5" /> EDIT STATS</>}
                </button>
              </div>

              {editing ? (
                <form onSubmit={handleSaveStats} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Height (cm)</label>
                    <input
                      type="number"
                      value={stats.height}
                      onChange={(e) => setStats({ ...stats, height: e.target.value })}
                      className="w-full bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Current Weight (kg)</label>
                    <input
                      type="number"
                      value={stats.weight}
                      onChange={(e) => setStats({ ...stats, weight: e.target.value })}
                      className="w-full bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Target Weight (kg)</label>
                    <input
                      type="number"
                      value={stats.targetWeight}
                      onChange={(e) => setStats({ ...stats, targetWeight: e.target.value })}
                      className="w-full bg-brand-darkCharcoal border border-brand-cardBorder rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-red text-white text-xs font-bold py-3 rounded-xl uppercase flex items-center justify-center gap-2 shadow-red-glow"
                  >
                    <Save className="w-4 h-4" /> SAVE METRICS
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-brand-darkCharcoal p-3.5 rounded-xl border border-white/5">
                    <span className="text-xs font-bold text-gray-400 uppercase">Height</span>
                    <span className="text-sm font-extrabold text-white">{stats.height} cm</span>
                  </div>
                  <div className="flex justify-between items-center bg-brand-darkCharcoal p-3.5 rounded-xl border border-white/5">
                    <span className="text-xs font-bold text-gray-400 uppercase">Current Weight</span>
                    <span className="text-sm font-extrabold text-white">{stats.weight} kg</span>
                  </div>
                  <div className="flex justify-between items-center bg-brand-darkCharcoal p-3.5 rounded-xl border border-white/5">
                    <span className="text-xs font-bold text-gray-400 uppercase">Target Weight</span>
                    <span className="text-sm font-extrabold text-brand-red">{stats.targetWeight} kg</span>
                  </div>
                  <div className="flex justify-between items-center bg-brand-darkCharcoal p-3.5 rounded-xl border border-brand-red/30">
                    <span className="text-xs font-bold text-gray-400 uppercase">Calculated BMI</span>
                    <span className="text-base font-extrabold text-brand-red">{currentBMI}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Assigned Trainer Box */}
            <div className="bg-brand-cardBg border border-brand-cardBorder rounded-3xl p-6 sm:p-8 space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red mx-auto">
                <PhoneCall className="w-7 h-7" />
              </div>
              <h4 className="font-heading text-lg font-bold text-white uppercase">NEED NUTRITION OR SCHEDULE HELP?</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Connect directly with your assigned coach <span className="text-white font-bold">{user?.trainer || 'Alex Johnson'}</span> for dietary advice or routine modifications.
              </p>
              <a
                href="https://wa.me/919636296119"
                target="_blank"
                rel="noreferrer"
                className="inline-block w-full bg-brand-darkCharcoal hover:bg-brand-red text-white text-xs font-bold py-3 rounded-xl border border-brand-cardBorder transition-colors uppercase tracking-wider"
              >
                CONTACT COACH ON WHATSAPP
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
