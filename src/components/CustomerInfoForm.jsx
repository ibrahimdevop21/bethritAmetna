import React, { useState } from 'react';

const CATEGORIES = [
  'Rostary Nuts',
  'Sugar Free',
  'Fat Lose',
  'Gluten Free & Allergies',
  'Regular Item',
  'Bethrit Ametna Items',
];

export default function CustomerInfoForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [satisfaction, setSatisfaction] = useState(null);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const isValidJordanianPhone = (raw) => {
    const cleaned = raw.replace(/[\s-]/g, '');
    // Accept formats like +9627XXXXXXXX or 07XXXXXXXX
    if (cleaned.startsWith('+962')) {
      return /^\+9627\d{8}$/.test(cleaned);
    }
    if (cleaned.startsWith('07')) {
      return /^07\d{8}$/.test(cleaned);
    }
    return false;
  };

  const validate = () => {
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = 'Customer name is required.';
    if (!phone.trim()) {
      nextErrors.phone = 'Phone number is required.';
    } else if (!isValidJordanianPhone(phone)) {
      nextErrors.phone = 'Enter a valid Jordanian mobile number (e.g. 07XXXXXXXX or +9627XXXXXXXX).';
    }
    if (!employeeName.trim()) nextErrors.employeeName = 'Employee name is required.';
    if (!invoiceNumber.trim()) nextErrors.invoiceNumber = 'Invoice number is required.';
    if (selectedCategories.length === 0) nextErrors.category = 'Select at least one category.';
    if (!satisfaction) nextErrors.satisfaction = 'Select a satisfaction level.';
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      customer_name: name.trim(),
      phone: phone.trim(),
      employee_name: employeeName.trim(),
      invoice_number: invoiceNumber.trim(),
      categories: selectedCategories,
      satisfaction,
      notes: notes.trim() || '',
    };

    setLoading(true);
    try {
      const res = await fetch('/api/add-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        console.error(data);
        setStatus('❌ Failed to save entry.');
        return;
      }
      setStatus('✅ Entry saved successfully.');
      setName('');
      setPhone('');
      setEmployeeName('');
      setInvoiceNumber('');
      setSelectedCategories([]);
      setSatisfaction(null);
      setNotes('');
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to save entry.');
    } finally {
      setLoading(false);
    }
  };

  const emojis = {
    1: '😡',
    2: '☹️',
    3: '😐',
    4: '🙂',
    5: '🤩',
  };

  return (
    <>
      <div className="w-full max-w-lg mx-auto px-4 py-6 pb-40 sm:pb-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-white">New Entry</h1>
          <p className="text-[0.7rem] text-neutral-500 mt-1">Staff use only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Customer Name */}
          <div>
            <label className="text-[0.65rem] uppercase tracking-wide text-neutral-400 mb-1 block">
              Customer Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-neutral-700 bg-black px-3 py-3 text-sm text-white focus:border-amber-400 focus:ring-amber-300 focus:outline-none"
              placeholder="e.g. Adnan Ali عدنان علي"
            />
            {errors.name && <p className="text-[0.65rem] text-red-400 mt-1">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="text-[0.65rem] uppercase tracking-wide text-neutral-400 mb-1 block">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-md border border-neutral-700 bg-black px-3 py-3 text-sm text-white focus:border-amber-400 focus:ring-amber-300 focus:outline-none"
              placeholder="e.g. 0798765432"
            />
            {errors.phone && <p className="text-[0.65rem] text-red-400 mt-1">{errors.phone}</p>}
          </div>

          {/* Employee Name */}
          <div>
            <label className="text-[0.65rem] uppercase tracking-wide text-neutral-400 mb-1 block">
              Employee Name
            </label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="w-full rounded-md border border-neutral-700 bg-black px-3 py-3 text-sm text-white focus:border-amber-400 focus:ring-amber-300 focus:outline-none"
              placeholder="e.g. Ahmad"
            />
            {errors.employeeName && <p className="text-[0.65rem] text-red-400 mt-1">{errors.employeeName}</p>}
          </div>

          {/* Invoice Number */}
          <div>
            <label className="text-[0.65rem] uppercase tracking-wide text-neutral-400 mb-1 block">
              Invoice Number
            </label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-full rounded-md border border-neutral-700 bg-black px-3 py-3 text-sm text-white focus:border-amber-400 focus:ring-amber-300 focus:outline-none"
              placeholder="e.g. INV-00123"
            />
            {errors.invoiceNumber && <p className="text-[0.65rem] text-red-400 mt-1">{errors.invoiceNumber}</p>}
          </div>

          {/* Categories */}
          <div>
            <label className="text-[0.65rem] uppercase tracking-wide text-neutral-400 mb-2 block">
              Categories
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((option) => {
                const isSelected = selectedCategories.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setSelectedCategories((prev) => prev.filter((c) => c !== option));
                      } else {
                        setSelectedCategories((prev) => [...prev, option]);
                      }
                    }}
                    className={`rounded-lg border px-3 py-3 text-xs font-medium text-left transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                        : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {errors.category && <p className="text-[0.65rem] text-red-400 mt-1">{errors.category}</p>}
          </div>

          {/* Satisfaction */}
          <div>
            <label className="text-[0.65rem] uppercase tracking-wide text-neutral-400 mb-2 block">
              Customer Satisfaction
            </label>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map((value) => {
                const isActive = satisfaction === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSatisfaction(value)}
                    className={`flex-1 flex flex-col items-center justify-center rounded-lg border py-3 transition-all ${
                      isActive
                        ? 'bg-amber-500/20 border-amber-400'
                        : 'bg-neutral-900 border-neutral-700'
                    }`}
                  >
                    <span className="text-2xl">{emojis[value]}</span>
                    <span className={`text-[0.6rem] mt-1 ${isActive ? 'text-amber-200' : 'text-neutral-500'}`}>
                      {value}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.satisfaction && <p className="text-[0.65rem] text-red-400 mt-1">{errors.satisfaction}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className="text-[0.65rem] uppercase tracking-wide text-neutral-400 mb-1 block">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-md border border-neutral-700 bg-black px-3 py-3 text-sm text-white focus:border-amber-400 focus:ring-amber-300 focus:outline-none h-24 resize-none"
              placeholder="Add any notes, observations, or special customer requests..."
            />
          </div>

          {/* Status Message */}
          {status && (
            <div className={`rounded-md px-3 py-2 text-sm ${
              status.includes('✅') ? 'bg-emerald-900/30 text-emerald-300' : 'bg-red-900/30 text-red-300'
            }`}>
              {status}
            </div>
          )}

          {submitted && (
            <p className="text-[0.65rem] text-emerald-400 text-center">
              Entry saved to Google Sheets
            </p>
          )}

          {/* Desktop Save Button */}
          <div className="hidden sm:block pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-xs mx-auto block rounded-xl bg-amber-400 py-3 font-semibold text-black disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
            >
              {loading ? 'Saving...' : 'Save Entry'}
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm px-4 py-3 border-t border-neutral-800">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-xl bg-amber-400 py-3 font-semibold text-black disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
        >
          {loading ? 'Saving...' : 'Save Entry'}
        </button>
      </div>
    </>
  );
}
