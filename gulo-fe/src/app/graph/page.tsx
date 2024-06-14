'use client';

import React, { useEffect, useState } from 'react';

import getAllStreams from '@/api/services/stream-service';
import { GraphStream } from '@/interfaces/stream';
import { toast } from 'sonner';

// Adjust the import path as necessary

const GraphPage: React.FC = () => {
  const [allStreams, setAllStreams] = useState<GraphStream[]>([]);

  useEffect(() => {
    getAllStreams(count => {
      toast.success(`Loaded ${count} streams so far`);
    }).then(streams => {
      setAllStreams(streams);
      toast.success('Streams loaded successfully');
    });
  }, []);

  return (
    <div className='min-h-[90vh]'>
      <h1>Stream Count: {allStreams.length}</h1>
    </div>
  );
};

export default GraphPage;
