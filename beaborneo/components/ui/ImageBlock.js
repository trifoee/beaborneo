/**
 * ImageBlock Component
 * 
 * A wrapper around Next.js Image component with fallback support.
 * Handles CMS images and local placeholder images.
 */

'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Default placeholder image
 * TODO: Replace with actual placeholder image
 */
const PLACEHOLDER_IMAGE = '/images/placeholder.jpg';

/**
 * Blur placeholder data URL (tiny gray placeholder)
 */
const BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMI/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQREiExBRNBUWFx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAYEQEBAQEBAAAAAAAAAAAAAAABAAIRIf/aAAwDAQACEQMRAD8A2XJdW9jZSPNKsMESl2Zj4AzWZ+q/lS/vp7qO0lhjllZ1SNSQAT4yfpOKlXIhcb//2Q==';

export default function ImageBlock({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority = false,
  sizes,
  ...props
}) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use placeholder if no src or if there was an error
  const imageSrc = (!src || error) ? PLACEHOLDER_IMAGE : src;

  return (
    <div className={cn('relative overflow-hidden', fill && 'w-full h-full', className)}>
      <Image
        src={imageSrc}
        alt={alt || ''}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        sizes={sizes || (fill ? '100vw' : undefined)}
        className={cn(
          'duration-700 ease-in-out',
          isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0',
          fill && 'object-cover'
        )}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}
