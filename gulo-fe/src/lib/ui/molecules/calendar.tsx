'use client';

import { ComponentProps } from 'react';

import { BUTTON_VARIANTS } from '@/lib/ui/atoms/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

export type CalendarProps = ComponentProps<typeof DayPicker>;

export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 bg-gray-800 text-slate-100 shadow', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-bold',
        nav: 'space-x-1 flex items-center',
        nav_button: cn('h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-sablier '),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-slate-400 rounded-md w-9 font-normal text-[0.8rem] dark:text-slate-400',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-800/50 [&:has([aria-selected])]:bg-gray-700 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-gray-700/50 dark:[&:has([aria-selected])]:bg-gray-700',
        day: cn(
          BUTTON_VARIANTS({ variant: 'ghost' }),
          'h-9 w-9 p-0 aria-selected:opacity-100 text-slate-100 hover:bg-gray-700 hover:text-slate-100 transition-colors dark:text-slate-100 dark:hover:bg-gray-700 dark:hover:text-slate-100 dark:transition-colors',
        ),
        day_range_end: 'day-range-end',
        day_selected: 'text-[#f77725] font-bold dark:text-[#f77725] dark:font-bold',
        day_today: 'text-[#f77725] underline font-normal dark:text-[#f77725] dark:underline dark:font-normal',
        day_outside:
          'font-normal day-outside text-slate-400 opacity-50 aria-selected:bg-gray-700/50 aria-selected:text-slate-400 aria-selected:opacity-30 dark:text-slate-400 dark:aria-selected:bg-gray-700/50 dark:aria-selected:text-slate-400',
        day_disabled: 'text-slate-400 opacity-50 dark:text-slate-400',
        day_range_middle:
          'aria-selected:bg-gray-700 aria-selected:text-slate-100 dark:aria-selected:bg-gray-700 dark:aria-selected:text-slate-100',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className='h-6 w-6 font-bold text-sablier ' />,
        IconRight: () => <ChevronRight className='h-6 w-6 font-bold text-sablier ' />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';
