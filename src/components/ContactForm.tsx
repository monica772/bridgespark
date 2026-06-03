'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = {
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      phone:   (form.elements.namedItem('phone')   as HTMLInputElement).value,
      budget:  (form.elements.namedItem('budget')  as HTMLSelectElement).value,
      interest:(form.elements.namedItem('interest') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setStatus(result.success ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-[18px] font-black text-green-800 mb-2">Enquiry Received!</h3>
        <p className="text-[13px] text-green-700">
          Thank you for reaching out. Our team will get back to you within 24 hours at the email you provided.
        </p>
      </div>
    );
  }

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-[12px] font-semibold text-gray-700 mb-1">Company / Brand Name *</label>
        <input name="company" type="text" required className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#c0392b]" />
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-gray-700 mb-1">Contact Name *</label>
        <input name="name" type="text" required className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#c0392b]" />
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-gray-700 mb-1">Business Email *</label>
        <input name="email" type="email" required className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#c0392b]" />
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-gray-700 mb-1">Phone Number</label>
        <input name="phone" type="tel" className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#c0392b]" />
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-gray-700 mb-1">Monthly Budget (INR)</label>
        <select name="budget" className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#c0392b] bg-white">
          <option>Below ₹50,000</option>
          <option>₹50,000 – ₹2,00,000</option>
          <option>₹2,00,000 – ₹10,00,000</option>
          <option>Above ₹10,00,000</option>
        </select>
      </div>
      <div>
        <label className="block text-[12px] font-semibold text-gray-700 mb-1">Interest</label>
        <select name="interest" className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#c0392b] bg-white">
          <option>Display Advertising</option>
          <option>Sponsored Content / Native Ads</option>
          <option>Reseller Partnership</option>
          <option>Programmatic Access</option>
          <option>Investing.com India Ads</option>
          <option>Other</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-[12px] font-semibold text-gray-700 mb-1">Message</label>
        <textarea
          name="message"
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#c0392b] resize-none"
          placeholder="Tell us about your campaign goals..."
        />
      </div>

      {status === 'error' && (
        <div className="md:col-span-2 bg-red-50 border border-red-200 rounded p-3 text-[12px] text-red-700">
          Something went wrong. Please email us directly at{' '}
          <a href="mailto:monica@bridgespark.in" className="font-bold underline">monica@bridgespark.in</a>
        </div>
      )}

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-[#c0392b] text-white px-8 py-3 rounded font-bold text-[14px] hover:bg-[#922b21] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Sending...' : 'Submit Enquiry →'}
        </button>
        <p className="text-[11px] text-gray-400 mt-2">
          Or email us directly:{' '}
          <a href="mailto:monica@bridgespark.in" className="text-[#c0392b] font-medium">
            monica@bridgespark.in
          </a>
        </p>
      </div>
    </form>
  );
}
