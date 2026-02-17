'use client';

import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { useState } from 'react';

interface AvatarWithSkeletonProps {
  src?: string;
  alt: string;
  size?: number;
}

export default function AvatarWithSkeleton({ src, alt, size = 36 }: AvatarWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box sx={{ width: size, height: size, position: 'relative' }}>
      {!loaded && <Skeleton variant="circular" width={size} height={size} />}

      {src ? (
        <Box
          sx={{
            width: size,
            height: size,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 200ms ease',
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={`${size}px`}
            style={{ objectFit: 'cover', borderRadius: '50%' }}
            onLoadingComplete={() => setLoaded(true)}
            onError={() => setLoaded(true)}
          />
        </Box>
      ) : (
        <Avatar alt={alt} sx={{ width: size, height: size }} />
      )}
    </Box>
  );
}
