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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
    if (selectedCategories.length === 0) nextErrors.category = 'Select at least one category.';
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      categories: selectedCategories,
    };
    console.log('[Employee Customer Entry]', payload);
    setSubmitted(true);
  };

  return (
    <section className="mt-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-amber-100/15 bg-black/40 px-5 py-6 sm:px-6 sm:py-7 shadow-lg shadow-black/40">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-semibold tracking-tight text-neutral-50">
              Employee entry form
            </h2>
            <p className="text-xs text-neutral-300 max-w-xl">
              Internal-only. Use this form while speaking with customers to capture basic details before the
              production loyalty system is connected.
            </p>
          </div>
          {submitted && (
            <p className="mt-2 text-[0.7rem] font-medium text-emerald-300/90 sm:mt-0">
              Saved for now in console only – no data is sent to a backend.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-[0.16em] text-neutral-300">
                Customer name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-950/60 px-3 py-2 text-sm text-neutral-50 shadow-inner shadow-black/40 outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-400"
                placeholder="e.g. Alex Doe"
              />
              {errors.name && <p className="text-[0.7rem] text-red-400">{errors.name}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium uppercase tracking-[0.16em] text-neutral-300">
                Phone number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-950/60 px-3 py-2 text-sm text-neutral-50 shadow-inner shadow-black/40 outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-400"
                placeholder="e.g. +1 (555) 123-4567"
              />
              {errors.phone && <p className="text-[0.7rem] text-red-400">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-300">
              Categories
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {CATEGORIES.map((option) => (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-xs transition ${
                    selectedCategories.includes(option)
                      ? 'border-amber-300/80 bg-amber-100/10 text-amber-50'
                      : 'border-neutral-700 bg-neutral-950/60 text-neutral-200 hover:border-amber-200/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    name="categories"
                    value={option}
                    checked={selectedCategories.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories((prev) => [...prev, option]);
                      } else {
                        setSelectedCategories((prev) => prev.filter((c) => c !== option));
                      }
                    }}
                    className="h-3 w-3 rounded-full border-neutral-600 text-amber-400 focus:ring-amber-400"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {errors.category && <p className="text-[0.7rem] text-red-400">{errors.category}</p>}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="text-[0.7rem] text-neutral-400">
              This form is for internal use only. Do not show this page to customers.
            </p>
            <button
              type="submit"
              className="inline-flex items-center rounded-full bg-gradient-to-tr from-amber-300 to-amber-500 px-4 py-2 text-xs font-semibold text-neutral-950 shadow-md shadow-amber-500/30 hover:brightness-110"
            >
              Save entry (console only)
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
