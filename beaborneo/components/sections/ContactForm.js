/**
 * Contact Form Component
 * 
 * A form for users to send messages/inquiries.
 */

'use client';

import { useState } from 'react';
import { t } from '@/lib/i18n';
import { isValidEmail } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function ContactForm({ locale }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: locale === 'en' 
          ? 'Please fill in all required fields.' 
          : locale === 'ms'
          ? 'Sila isi semua medan yang diperlukan.'
          : 'Harap isi semua kolom yang diperlukan.',
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      setStatus({
        type: 'error',
        message: locale === 'en'
          ? 'Please enter a valid email address.'
          : locale === 'ms'
          ? 'Sila masukkan alamat emel yang sah.'
          : 'Harap masukkan alamat email yang valid.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus({
        type: 'success',
        message: t(locale, 'contact.success'),
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: t(locale, 'contact.error'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors';
  const labelClasses = 'block text-sm font-medium text-gray-700 mb-2';

  return (
    <form onSubmit={handleSubmit} className="contact-form space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClasses}>
          {t(locale, 'contact.name')} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClasses}>
          {t(locale, 'contact.email')} <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={inputClasses}
          required
        />
      </div>

      {/* Phone (Optional) */}
      <div>
        <label htmlFor="phone" className={labelClasses}>
          {locale === 'en' ? 'Phone Number' : locale === 'ms' ? 'Nombor Telefon' : 'Nomor Telepon'}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={inputClasses}
        />
      </div>

      {/* Subject (Optional) */}
      <div>
        <label htmlFor="subject" className={labelClasses}>
          {locale === 'en' ? 'Subject' : locale === 'ms' ? 'Subjek' : 'Subjek'}
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="">
            {locale === 'en' ? 'Select a subject' : locale === 'ms' ? 'Pilih subjek' : 'Pilih subjek'}
          </option>
          <option value="general">
            {locale === 'en' ? 'General Inquiry' : locale === 'ms' ? 'Pertanyaan Umum' : 'Pertanyaan Umum'}
          </option>
          <option value="booking">
            {locale === 'en' ? 'Tour Booking' : locale === 'ms' ? 'Tempahan Pakej' : 'Pemesanan Paket'}
          </option>
          <option value="custom">
            {locale === 'en' ? 'Custom Tour Request' : locale === 'ms' ? 'Permintaan Pakej Khas' : 'Permintaan Paket Khusus'}
          </option>
          <option value="feedback">
            {locale === 'en' ? 'Feedback' : locale === 'ms' ? 'Maklum Balas' : 'Umpan Balik'}
          </option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClasses}>
          {t(locale, 'contact.message')} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={inputClasses}
          required
        />
      </div>

      {/* Status Message */}
      {status.message && (
        <div
          className={`p-4 rounded-lg ${
            status.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {status.message}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? t(locale, 'common.loading') : t(locale, 'contact.send')}
      </Button>
    </form>
  );
}
