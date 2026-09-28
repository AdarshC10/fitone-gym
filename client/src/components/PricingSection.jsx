import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import PaymentModal from './PaymentModal';
import API from '../services/api';

const defaultPlans = [
  {
    _id: 'm1',
    name: 'BASIC PLAN',
    price: 1499,
    duration: 'month',
    popular: false,
    features: ['Gym Access', 'Free Wi-Fi', 'Locker Facility', 'Basic Cardio Access', 'Standard Equipment Access']
  },
  {
    _id: 'm2',
    name: 'PREMIUM PLAN',
    price: 2499,
    duration: 'month',
    popular: true,
    badge: 'MOST POPULAR',
    features: ['Gym Access', 'Personal Training (2 Sessions)', 'Diet Plan', 'Locker Facility', 'Free Sauna & Steam Bath', 'Group Classes Included']
  },
  {
    _id: 'm3',
    name: 'ULTIMATE PLAN',
    price: 3999,
    duration: 'month',
    popular: false,
    features: ['Gym Access', 'Personal Training (4 Sessions)', 'Diet Plan', 'Body Composition Analysis', 'Locker Facility', 'Unlimited Sauna & Spa', 'All Group Classes & Boxing']
  }
];

const PricingSection = () => {
  const [plans, setPlans] = useState(defaultPlans);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState(null);
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await API.get('/memberships');
        if (res.data.success && res.data.data.length > 0) {
          setPlans(res.data.data);
        }
      } catch (err) {
        console.log('Using default pricing plans');
      }
    };
    fetchPlans();
  }, []);

  const handleChoosePlan = (plan) => {
    if (!user) {
      showToast(`Please sign in or register to select ${plan.name}`, 'info');
      navigate('/register');
      return;
    }
    // Open interactive payment gateway modal!
    setSelectedPlanForPayment(plan);
  };

  return (
    <section id="pricing" className="py-24 bg-brand-darkCharcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-brand-red uppercase bg-brand-red/10 px-3.5 py-1.5 rounded-full border border-brand-red/30 inline-block">
            TRANSPARENT PRICING
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            MEMBERSHIP <span className="text-brand-red text-glow-red">PLANS</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Choose the perfect membership plan that fits your goals and fitness level. No hidden fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const isHighlighted = plan.popular;
            return (
              <motion.div
                key={plan._id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 ${
                  isHighlighted
                    ? 'bg-brand-cardBg border-2 border-brand-red shadow-red-glow-lg -md:translate-y-2'
                    : 'bg-brand-black/80 border border-brand-cardBorder hover:border-brand-red/50 hover:shadow-red-glow'
                }`}
              >
                {/* Badge if popular */}
                {isHighlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-red text-white text-[11px] font-extrabold px-4 py-1 rounded-full uppercase tracking-widest shadow-red-glow flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-current" /> {plan.badge || 'MOST POPULAR'}
                  </div>
                )}

                <div>
                  <h3 className="font-heading text-2xl font-extrabold uppercase text-white tracking-wider mb-2">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 my-6">
                    <span className="text-sm font-bold text-gray-400">₹</span>
                    <span className="font-heading text-5xl font-extrabold text-white tracking-tight">
                      {plan.price?.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">/{plan.duration || 'month'}</span>
                  </div>

                  <div className="w-full h-[1px] bg-white/10 my-6" />

                  {/* Features List */}
                  <ul className="space-y-4 mb-8 text-xs text-gray-300">
                    {plan.features?.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-red shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Choose Plan Button */}
                <button
                  onClick={() => handleChoosePlan(plan)}
                  className={`w-full py-4 rounded-xl font-heading text-sm font-extrabold tracking-widest uppercase transition-all duration-300 ${
                    isHighlighted
                      ? 'bg-brand-red hover:bg-brand-brightRed text-white shadow-red-glow hover:shadow-red-glow-lg'
                      : 'bg-brand-darkCharcoal hover:bg-brand-red text-white border border-brand-cardBorder hover:border-brand-red'
                  }`}
                >
                  CHOOSE PLAN
                </button>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Interactive Payment Gateway Modal */}
      <PaymentModal
        plan={selectedPlanForPayment}
        isOpen={!!selectedPlanForPayment}
        onClose={() => setSelectedPlanForPayment(null)}
      />
    </section>
  );
};

export default PricingSection;
