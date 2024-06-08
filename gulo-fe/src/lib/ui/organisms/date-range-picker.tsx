'use client';

import { DateRangePickerModalProps } from '@/interfaces/props';
import { Button } from '@/lib/ui/atoms/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/ui/atoms/popover';
import { Calendar } from '@/lib/ui/molecules/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

export function DatePickerWithRange({ className, date, onDateChange }: DateRangePickerModalProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'ghost'}
            className={cn(
              'justify-start text-left text-md w-full text-slate-100 hover:text-slate-100 hover:bg-gray-700 transition-colors dark:hover:text-slate-100 dark:hover:bg-gray-700 dark:transition-colors',
              !date && 'text-muted-foreground',
            )}>
            <CalendarIcon className='mr-2 h-4 w-4 text-sablier' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0 border-none drop-shadow' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
