import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, CreditCard, QrCode, Building2, ShieldCheck, CheckCircle2,
  Lock, ArrowRight, Loader2, IndianRupee, Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const PaymentModal = ({ plan, isOpen, onClose }) => {
  const { user, updateUserProfile } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'netbanking'
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // Card form state
  const [cardData, setCardData] = useState({
    cardNumber: '4532 •••• •••• 8912',
    cardName: user?.name || 'Rohit Sharma',
    expiry: '12/28',
    cvv: '891'
  });

  // UPI state
  const [upiId, setUpiId] = useState('rohit@upi');

  if (!isOpen || !plan) return null;

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate realistic payment gateway processing
    setTimeout(async () => {
      try {
        const generatedTxnId = 'FITONE-TXN-' + Math.floor(10000000 + Math.random() * 90000000);
        setTransactionId(generatedTxnId);

        // Update user membership on backend
        await updateUserProfile(user._id, {
          membership: plan.name,
          membershipStatus: 'Active',
          membershipStart: new Date(),
          membershipExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        });

        setLoading(false);
        setPaymentSuccess(true);
        showToast(`Payment Successful! Transaction ID: ${generatedTxnId}`, 'success');
      } catch (err) {
        setLoading(false);
        showToast('Payment processing failed. Please try again.', 'error');
      }
    }, 2000);
  };

  const handleFinish = () => {
    setPaymentSuccess(false);
    onClose();
    navigate('/dashboard');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl bg-brand-cardBg border border-brand-cardBorder rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-brand-darkCharcoal border-b border-white/10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-red" />
              <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wider">
                SECURE CHECKOUT
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {paymentSuccess ? (
            /* SUCCESS SCREEN */
            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-green-400 mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div>
                <span className="bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/20 uppercase tracking-widest">
                  PAYMENT VERIFIED & CONFIRMED
                </span>
                <h2 className="font-heading text-3xl font-extrabold text-white uppercase tracking-wide mt-3">
                  WELCOME TO {plan.name}!
                </h2>
                <p className="text-xs text-gray-400 mt-1">Your membership has been activated successfully.</p>
              </div>

              {/* Invoice Summary Box */}
              <div className="bg-brand-darkCharcoal p-4 rounded-2xl border border-white/10 text-left space-y-2.5 text-xs text-gray-300">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Transaction ID:</span>
                  <span className="font-mono font-bold text-brand-red">{transactionId}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Plan Activated:</span>
                  <span className="font-bold text-white">{plan.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Amount Paid:</span>
                  <span className="font-bold text-white">₹{plan.price?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="font-bold text-green-400">Active (Valid for 30 Days)</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-brand-red hover:bg-brand-brightRed text-white font-heading text-sm font-extrabold py-3.5 rounded-xl shadow-red-glow uppercase tracking-widest flex items-center justify-center gap-2"
              >
                GO TO MEMBER DASHBOARD <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* CHECKOUT FORM */
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[85vh]">
              
              {/* Order Summary Header */}
              <div className="bg-brand-darkCharcoal p-4 rounded-2xl border border-brand-red/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-brand-red uppercase tracking-widest">SELECTED PLAN</span>
                  <h4 className="font-heading text-xl font-extrabold text-white uppercase">{plan.name}</h4>
                  <p className="text-xs text-gray-400">Includes full facility access & coach consultation</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">TOTAL AMOUNT</p>
                  <p className="font-heading text-2xl font-extrabold text-brand-red">
                    ₹{plan.price?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  SELECT PAYMENT METHOD
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-brand-red/10 border-brand-red text-brand-red shadow-red-glow'
                        : 'bg-brand-darkCharcoal border-brand-cardBorder text-gray-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'upi'
                        ? 'bg-brand-red/10 border-brand-red text-brand-red shadow-red-glow'
                        : 'bg-brand-darkCharcoal border-brand-cardBorder text-gray-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase">UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'bg-brand-red/10 border-brand-red text-brand-red shadow-red-glow'
                        : 'bg-brand-darkCharcoal border-brand-cardBorder text-gray-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase">Net Banking</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                
                {/* METHOD 1: CARD */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3.5 bg-brand-darkCharcoal p-4 rounded-2xl border border-white/5">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardData.cardName}
                        onChange={(e) => setCardData({ ...cardData, cardName: e.target.value })}
                        required
                        className="w-full bg-brand-black border border-brand-cardBorder rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-red"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        required
                        className="w-full bg-brand-black border border-brand-cardBorder rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          required
                          className="w-full bg-brand-black border border-brand-cardBorder rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">CVV Security Code</label>
                        <input
                          type="password"
                          value={cardData.cvv}
                          maxLength="4"
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          required
                          className="w-full bg-brand-black border border-brand-cardBorder rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-brand-red font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* METHOD 2: UPI / QR */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4 bg-brand-darkCharcoal p-4 rounded-2xl border border-white/5 text-center">
                    <div className="p-3 bg-white rounded-xl inline-block border-2 border-brand-red">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=fitone@upi&pn=Fitone%20Fitness%20Club&am=2499"
                        alt="Fitone Payment QR"
                        className="w-36 h-36 mx-auto"
                      />
                    </div>
                    <p className="text-[11px] text-gray-400">Scan QR using GPay, PhonePe, Paytm, or BHIM UPI</p>

                    <div className="pt-2">
                      <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Or enter VPA / UPI ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="username@upi"
                        required
                        className="w-full bg-brand-black border border-brand-cardBorder rounded-xl px-3.5 py-2 text-xs text-white text-center focus:outline-none focus:border-brand-red"
                      />
                    </div>
                  </div>
                )}

                {/* METHOD 3: NET BANKING */}
                {paymentMethod === 'netbanking' && (
                  <div className="space-y-3 bg-brand-darkCharcoal p-4 rounded-2xl border border-white/5">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase">Select Bank</label>
                    <select className="w-full bg-brand-black border border-brand-cardBorder rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-red">
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>State Bank of India (SBI)</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {/* Submit Pay Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-red hover:bg-brand-brightRed text-white font-heading text-sm font-extrabold py-4 rounded-xl shadow-red-glow hover:shadow-red-glow-lg transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> PROCESSING PAYMENT...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" /> PAY NOW ₹{plan.price?.toLocaleString()}
                    </>
                  )}
                </button>

                <p className="text-[10px] text-gray-500 text-center flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3 text-brand-red" /> 256-bit SSL Encrypted Secure Checkout
                </p>
              </form>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
