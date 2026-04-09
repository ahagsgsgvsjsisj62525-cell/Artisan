/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Menu, 
  X,
  Lock,
  Package,
  Clock
} from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ email: '', password: '' });
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCredentials.email === '565218@qq.com' && adminCredentials.password === '565218@qq.com') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
          <div className="grid gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold mb-4">Recent Claims</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-3 font-bold text-slate-500 text-sm uppercase">Name</th>
                      <th className="pb-3 font-bold text-slate-500 text-sm uppercase">Email</th>
                      <th className="pb-3 font-bold text-slate-500 text-sm uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-50">
                      <td className="py-4">Jane Doe</td>
                      <td className="py-4">jane@example.com</td>
                      <td className="py-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Pending</span></td>
                    </tr>
                    <tr className="border-b border-slate-50">
                      <td className="py-4">John Smith</td>
                      <td className="py-4">john@example.com</td>
                      <td className="py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Shipped</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-slate-500 text-sm font-bold uppercase mb-1">Total Claims</p>
                <p className="text-3xl font-black">1,284</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-slate-500 text-sm font-bold uppercase mb-1">Conversion Rate</p>
                <p className="text-3xl font-black">12.4%</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <p className="text-slate-500 text-sm font-bold uppercase mb-1">Remaining Stock</p>
                <p className="text-3xl font-black">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-pink-100 selection:text-pink-600">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white py-2 px-4 text-center text-xs font-medium tracking-wider uppercase">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-2"
        >
          <Clock className="w-3 h-3" />
          Limited Time Offer: Only 3 Units Remaining
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
                <Star className="text-white w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">BitesHub</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-pink-600 transition-colors">Home</a>
              <a href="#" className="hover:text-pink-600 transition-colors">Winners</a>
              <a href="#" className="hover:text-pink-600 transition-colors">FAQ</a>
              <button className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-800 transition-all">
                Claim Now
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-bottom border-slate-200 px-4 py-6 space-y-4 shadow-xl"
          >
            <a href="#" className="block text-lg font-medium">Home</a>
            <a href="#" className="block text-lg font-medium">Winners</a>
            <a href="#" className="block text-lg font-medium">FAQ</a>
            <button className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold">
              Claim Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Product Info */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm font-bold"
            >
              <CheckCircle className="w-4 h-4" />
              Verified Winner Selected
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-4">
                Congratulations! <br />
                <span className="text-pink-600">You're Today's Winner.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-lg">
                You have been selected to receive a brand new <span className="font-bold text-slate-900">KitchenAid® Artisan® Series 5-Quart Tilt-Head Stand Mixer</span> as part of our 2026 Loyalty Program.
              </p>
            </motion.div>

            {/* Product Image Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                <img 
                  src="https://picsum.photos/seed/kitchenaid-mixer/800/600" 
                  alt="KitchenAid Stand Mixer" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-6 bg-white">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">KitchenAid® Artisan® Series</h3>
                      <p className="text-slate-500 text-sm">Empire Red • 5-Quart Capacity</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 line-through text-sm">$449.99</p>
                      <p className="text-2xl font-black text-pink-600">FREE</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, title: "Official Warranty", desc: "1-Year KitchenAid Support" },
                { icon: Truck, title: "Fast Shipping", desc: "Express 2-Day Delivery" },
                { icon: Lock, title: "Secure Checkout", desc: "256-Bit Encryption" },
                { icon: Package, title: "In Stock", desc: "Ready to Ship" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="shrink-0 w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100"
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Delivery Address</h2>
                    <p className="text-slate-500 text-sm">Please provide your shipping details to claim your prize.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">First Name</label>
                        <input 
                          required
                          type="text" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Jane"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Last Name</label>
                        <input 
                          required
                          type="text" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                      <input 
                        required
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="jane@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Street Address</label>
                      <input 
                        required
                        type="text" 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main St"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">City</label>
                        <input 
                          required
                          type="text" 
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="New York"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Zip Code</label>
                        <input 
                          required
                          type="text" 
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          placeholder="10001"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                    >
                      Continue to Shipping
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="pt-4 flex items-center justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" referrerPolicy="no-referrer" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" referrerPolicy="no-referrer" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" referrerPolicy="no-referrer" />
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl p-12 shadow-2xl border border-slate-100 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Address Confirmed!</h2>
                    <p className="text-slate-500">
                      Thank you, {formData.firstName}. Your KitchenAid® Stand Mixer has been reserved. 
                      Please complete the final verification step to finalize your shipment.
                    </p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-bold text-slate-500 uppercase">Order Summary</span>
                      <span className="text-xs bg-slate-200 px-2 py-1 rounded font-bold">#KA-88291</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>KitchenAid® Artisan® Mixer</span>
                        <span className="font-bold">$0.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping & Handling</span>
                        <span className="font-bold">$1.95</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-lg">
                        <span>Total</span>
                        <span className="text-pink-600">$1.95</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-pink-700 transition-all shadow-lg shadow-pink-200">
                    Finalize Shipment
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Trust Section */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Why Millions Trust BitesHub</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Secure Protection", desc: "Your data is protected by industry-leading 256-bit SSL encryption.", icon: Lock },
              { title: "Verified Winners", desc: "Over 50,000 prizes shipped to verified winners across the country.", icon: CheckCircle },
              { title: "24/7 Support", desc: "Our dedicated customer service team is here to help you every step of the way.", icon: Star }
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto text-pink-600">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
                <Star className="text-white w-4 h-4 fill-current" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">BitesHub</span>
            </div>
            <div className="flex gap-6 text-sm font-medium text-slate-500">
              <a href="#" className="hover:text-slate-900 transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Contact Us</a>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400 leading-relaxed max-w-4xl">
              © 2026 BitesHub — All rights reserved. Customer Service: 1-877-646-2263. 
              This giveaway is not affiliated with or endorsed by KitchenAid or Whirlpool Corporation. KitchenAid® is a trademark of Whirlpool Corporation. 
              Participation requires adherence to our Terms of Service. Winners are selected daily based on loyalty program participation.
              Secure 256 Bit Encrypted Connection.
            </p>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="text-[10px] text-slate-300 hover:text-slate-500 transition-colors uppercase tracking-widest font-bold"
            >
              Admin
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdminOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
            >
              <button 
                onClick={() => setIsAdminOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="mb-6 text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-600">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
                <p className="text-slate-500 text-sm">Access the backend management system</p>
              </div>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Account</label>
                  <input 
                    required
                    type="text" 
                    value={adminCredentials.email}
                    onChange={(e) => setAdminCredentials(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter account"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                  <input 
                    required
                    type="password" 
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all"
                >
                  Login
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
