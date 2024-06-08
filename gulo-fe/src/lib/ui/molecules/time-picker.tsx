'use client';

import { useRef } from 'react';

import { Label } from '@/lib/ui/atoms/label';
import { TimePickerInput } from '@/lib/ui/molecules/time-picker-input';
import { Clock } from 'lucide-react';

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);

  return (
    <div className='flex items-end gap-2'>
      <div className='grid gap-1 text-center'>
        <Label htmlFor='hours' className='text-xs'>
          Hours
        </Label>
        <TimePickerInput
          className='text-slate-100 bg-gray-800 border-gray-700 focus:ring-0 focus:border-none focus:ring-transparent dark:text-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-0 dark:focus:border-none dark:focus:ring-transparent'
          picker='hours'
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className='grid gap-1 text-center'>
        <Label htmlFor='minutes' className='text-xs'>
          Minutes
        </Label>
        <TimePickerInput
          className='text-slate-100 bg-gray-800 border-gray-700 focus:ring-0 focus:border-none focus:ring-transparent dark:text-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-0 dark:focus:border-none dark:focus:ring-transparent'
          picker='minutes'
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      <div className='grid gap-1 text-center'>
        <Label htmlFor='seconds' className='text-xs'>
          Seconds
        </Label>
        <TimePickerInput
          className='text-slate-100 bg-gray-800 border-gray-700 focus:ring-0 focus:border-none focus:ring-transparent dark:text-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-0 dark:focus:border-none dark:focus:ring-transparent'
          picker='seconds'
          date={date}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className='flex h-10 items-center text-sablier '>
        <Clock className='ml-2 h-4 w-4' />
      </div>
    </div>
  );
}
