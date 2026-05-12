'use client';

import { useState, useCallback, useEffect } from 'react';
import { t } from '@/lib/i18n';
import { isValidEmail } from '@/lib/utils';
import Button from '@/components/ui/Button';

const MESSAGE_MAX = 2000;
const COOLDOWN_SECONDS = 60;
const SESSION_KEY = 'beaborneo_contact_count';
const SESSION_MAX = 3;

function fieldError(field, value, locale) {
  const en = locale === 'en';
  switch (field) {
    case 'name':
      if (!value.trim()) return en ? 'Name is required.' : 'Nama diperlukan.';
      if (value.trim().length < 2) return en ? 'Name must be at least 2 characters.' : 'Nama sekurang-kurangnya 2 aksara.';
      if (value.length > 100) return en ? 'Name is too long.' : 'Nama terlalu panjang.';
      return null;
    case 'email':
      if (!value.trim()) return en ? 'Email is required.' : 'Emel diperlukan.';
      if (!isValidEmail(value)) return en ? 'Please enter a valid email address.' : 'Sila masukkan emel yang sah.';
      return null;
    case 'phone':
      if (value && !/^[+\d\s\-().]{7,20}$/.test(value))
        return en ? 'Please enter a valid phone number.' : 'Sila masukkan nombor telefon yang sah.';
      return null;
    case 'message':
      if (!value.trim()) return en ? 'Message is required.' : 'Mesej diperlukan.';
      if (value.trim().length < 10) return en ? 'Message must be at least 10 characters.' : 'Mesej sekurang-kurangnya 10 aksara.';
      if (value.length > MESSAGE_MAX) return en ? `Message cannot exceed ${MESSAGE_MAX} characters.` : `Mesej tidak boleh melebihi ${MESSAGE_MAX} aksara.`;
      return null;
    default:
      return null;
  }
}

export default function ContactForm({ locale, contactEmail = 'contact@beaborneo.com' }) {
  const [startedAt] = useState(() => Date.now());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);

  // Read session count once on mount (sessionStorage is client-only)
  useEffect(() => {
    setSessionCount(parseInt(sessionStorage.getItem(SESSION_KEY) || '0', 10));
  }, []);

  // Tick the cooldown down every second
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => {
      setCooldown((c) => (c <= 1 ? 0 : c - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const validate = useCallback(
    (field, value) => fieldError(field, value, locale),
    [locale],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cooldown > 0 || sessionCount >= SESSION_MAX) return;

    const fields = ['name', 'email', 'phone', 'message'];
    const newErrors = {};
    fields.forEach((f) => { newErrors[f] = validate(f, formData[f]); });
    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, message: true });

    if (Object.values(newErrors).some(Boolean)) {
      setStatus({
        type: 'error',
        message:
          locale === 'en'
            ? 'Please fill in all the required fields above before submitting.'
            : 'Sila isi semua medan yang diperlukan di atas sebelum menghantar.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ ...formData, startedAt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Increment session count and start cooldown
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      sessionStorage.setItem(SESSION_KEY, String(newCount));
      setCooldown(COOLDOWN_SECONDS);

      setStatus({ type: 'success', message: t(locale, 'contact.success') });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', website: '' });
      setErrors({});
      setTouched({});
    } catch (error) {
      setStatus({ type: 'error', message: error.message || t(locale, 'contact.error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const baseInput =
    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors outline-none';

  const inputClass = (field) =>
    touched[field] && errors[field]
      ? `${baseInput} border-red-400 focus:ring-red-400`
      : `${baseInput} border-gray-300 focus:ring-primary-500`;

  const labelClasses = 'block text-sm font-medium text-gray-700 mb-2';

  const en = locale === 'en';

  // Form locked after session cap reached
  if (sessionCount >= SESSION_MAX) {
    return (
      <div className="rounded-2xl bg-gray-50 border border-gray-200 p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-11a4 4 0 00-4 4v1H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2v-1a4 4 0 00-4-4z" />
          </svg>
        </div>
        <p className="font-semibold text-gray-800">
          {en ? 'Message limit reached' : 'Had penghantaran dicapai'}
        </p>
        <p className="text-sm text-gray-500">
          {en
            ? "You've sent the maximum number of messages for this session. Please reach out to us directly."
            : 'Anda telah menghantar bilangan mesej maksimum untuk sesi ini. Sila hubungi kami secara langsung.'}
        </p>
        <a
          href={`mailto:${contactEmail}`}
          className="inline-block mt-2 text-sm font-medium text-[#E31E24] hover:underline"
        >
          {contactEmail}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form space-y-6" noValidate>
      {/* Honeypot — hidden from humans, bots fill it and get silently dropped */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

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
          onBlur={handleBlur}
          className={inputClass('name')}
          autoComplete="name"
        />
        {touched.name && errors.name && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.name}
          </p>
        )}
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
          onBlur={handleBlur}
          className={inputClass('email')}
          autoComplete="email"
        />
        {touched.email && errors.email && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone (Optional) */}
      <div>
        <label htmlFor="phone" className={labelClasses}>
          {en ? 'Phone Number' : 'Nombor Telefon'}
          <span className="text-gray-400 text-xs font-normal ml-1">
            ({en ? 'optional' : 'pilihan'})
          </span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputClass('phone')}
          autoComplete="tel"
        />
        {touched.phone && errors.phone && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.phone}
          </p>
        )}
      </div>

      {/* Subject (Optional) */}
      <div>
        <label htmlFor="subject" className={labelClasses}>
          {en ? 'Subject' : 'Subjek'}
          <span className="text-gray-400 text-xs font-normal ml-1">
            ({en ? 'optional' : 'pilihan'})
          </span>
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`${baseInput} border-gray-300 focus:ring-primary-500 bg-white`}
        >
          <option value="">{en ? 'Select a subject' : 'Pilih subjek'}</option>
          <option value="general">{en ? 'General Inquiry' : 'Pertanyaan Umum'}</option>
          <option value="booking">{en ? 'Tour Booking' : 'Tempahan Pakej'}</option>
          <option value="custom">{en ? 'Custom Tour Request' : 'Permintaan Pakej Khas'}</option>
          <option value="feedback">{en ? 'Feedback' : 'Maklum Balas'}</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            {t(locale, 'contact.message')} <span className="text-red-500">*</span>
          </label>
          <span className={`text-xs ${formData.message.length > MESSAGE_MAX * 0.9 ? 'text-red-500' : 'text-gray-400'}`}>
            {formData.message.length}/{MESSAGE_MAX}
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={5}
          className={inputClass('message')}
          maxLength={MESSAGE_MAX}
        />
        {touched.message && errors.message && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.message}
          </p>
        )}
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

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting || cooldown > 0}
      >
        {isSubmitting
          ? t(locale, 'common.loading')
          : cooldown > 0
            ? (en ? `Please wait ${cooldown}s before sending again` : `Sila tunggu ${cooldown}s sebelum hantar semula`)
            : t(locale, 'contact.send')}
      </Button>

      {/* Remaining submissions hint */}
      {sessionCount > 0 && cooldown === 0 && (
        <p className="text-center text-xs text-gray-400">
          {en
            ? `${SESSION_MAX - sessionCount} submission${SESSION_MAX - sessionCount === 1 ? '' : 's'} remaining this session`
            : `${SESSION_MAX - sessionCount} penghantaran berbaki untuk sesi ini`}
        </p>
      )}
    </form>
  );
}
