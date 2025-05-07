'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Heading from './Heading';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const OpenHoursForm = () => {
  const { setValue } = useFormContext();

  const [applyToAll, setApplyToAll] = useState(false);
  const [globalOpen, setGlobalOpen] = useState('');
  const [globalClose, setGlobalClose] = useState('');

  const [hours, setHours] = useState(
    weekdays.reduce((acc, day) => {
      acc[day.toLowerCase()] = { open: '', close: '' };
      return acc;
    }, {} as Record<string, { open: string; close: string }>)
  );

  const applyGlobalTimes = (open: string, close: string) => {
    const updated = weekdays.reduce((acc, day) => {
      acc[day.toLowerCase()] = { open, close };
      return acc;
    }, {} as Record<string, { open: string; close: string }>);

    setHours(updated);
    setValue('workingHours', updated, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const handleTimeChange = (day: string, type: 'open' | 'close', value: string) => {
    setHours(prev => {
      const updated = {
        ...prev,
        [day]: {
          ...prev[day],
          [type]: value,
        },
      };
      setValue('workingHours', updated, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
      return updated;
    });
  };

  useEffect(() => {
    setValue('workingHours', hours, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  }, []);

  useEffect(() => {
    if (applyToAll && globalOpen && globalClose) {
      applyGlobalTimes(globalOpen, globalClose);
    }
  }, [applyToAll, globalOpen, globalClose]);

  return (
    <div className="flex flex-col gap-6">
      <Heading
        title="Set Open Hours"
        subtitle="Provide the working hours for each day"
      />

      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={applyToAll}
          onChange={() => setApplyToAll(prev => !prev)}
        />
        <label className="font-medium text-gray-700">Apply same hours to all days</label>
        <input
          type="time"
          value={globalOpen}
          onChange={(e) => setGlobalOpen(e.target.value)}
          disabled={!applyToAll}
          className="border border-gray-300 px-2 py-1 rounded"
        />
        <span className="text-gray-500">to</span>
        <input
          type="time"
          value={globalClose}
          onChange={(e) => setGlobalClose(e.target.value)}
          disabled={!applyToAll}
          className="border border-gray-300 px-2 py-1 rounded"
        />
      </div>

      {weekdays.map(day => (
        <div key={day} className="flex items-center gap-4">
          <label className="w-12 font-medium text-gray-700">{day}</label>
          <input
            type="time"
            value={hours[day.toLowerCase()].open}
            onChange={(e) => handleTimeChange(day.toLowerCase(), 'open', e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded"
            disabled={applyToAll}
          />
          <span className="text-gray-500">to</span>
          <input
            type="time"
            value={hours[day.toLowerCase()].close}
            onChange={(e) => handleTimeChange(day.toLowerCase(), 'close', e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded"
            disabled={applyToAll}
          />
        </div>
      ))}
    </div>
  );
};

export default OpenHoursForm;
