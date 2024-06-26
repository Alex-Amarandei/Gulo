'use client';

import { DateTimePickerProps } from '@/interfaces/props';
import { Button } from '@/lib/ui/atoms/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/ui/atoms/popover';
import { Calendar } from '@/lib/ui/molecules/calendar';
import { TimePicker } from '@/lib/ui/molecules/time-picker';
import { cn } from '@/lib/utils';
import { Maybe } from '@/utils/data';
import { add, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function DateTimePicker({ date, onDateChange }: DateTimePickerProps) {
  const handleSelect = (newDay: Maybe<Date>) => {
    if (!newDay) return;
    if (!date) {
      onDateChange(newDay);
      return;
    }
    const diff = newDay.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    onDateChange(newDateFull);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'ghost'}
          className={cn(
            'justify-start text-left text-md w-full text-slate-100 hover:text-slate-100 hover:bg-gray-700 transition-colors dark:hover:text-slate-100 dark:hover:bg-gray-700 dark:transition-colors',
            !date && 'text-muted-foreground',
          )}>
          <CalendarIcon className='mr-2 h-4 w-4 text-sablier' />
          {date ? format(date, 'LLL dd, y HH:mm:ss') : <span>Select Date and Time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 border-none drop-shadow'>
        <Calendar
          defaultMonth={date}
          weekStartsOn={1}
          mode='single'
          selected={date}
          onSelect={d => handleSelect(d)}
          initialFocus
        />
        <div className='p-3 bg-gray-800 text-slate-100'>
          <TimePicker setDate={onDateChange} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
