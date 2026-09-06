import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  sizes?: string;
  customSrcSet?: string;
}

const RESPONSIVE_WIDTHS = [400, 640, 800, 1024, 1280, 1600];

/**
 * Transforms an image URL to serve compressed, modern WebP format
 * with dimension constraints.
 * Supports Google lh3/aida-public, Unsplash, and local assets.
 */
export function getWebpImageUrl(url: string, targetWidth: number): string {
  if (!url) return '';

  // Google CDN (aida-public / lh3.googleusercontent.com)
  if (url.includes('lh3.googleusercontent.com')) {
    const cleanUrl = url.split('=')[0];
    return `${cleanUrl}=w${targetWidth}-rw`;
  }

  // Unsplash CDN
  if (url.includes('images.unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&fm=webp&w=${targetWidth}&q=80`;
  }

  // Local mascot image
  if (url.includes('neuron_bee_mascot')) {
    if (targetWidth <= 400) return '/src/assets/images/neuron_bee_mascot-400w.webp';
    if (targetWidth <= 800) return '/src/assets/images/neuron_bee_mascot-800w.webp';
    return '/src/assets/images/neuron_bee_mascot.webp';
  }

  return url;
}

/**
 * Generates fallback URLs (JPEG/PNG) for browsers that might not support WebP source
 */
export function getFallbackImageUrl(url: string, targetWidth: number): string {
  if (!url) return '';

  if (url.includes('lh3.googleusercontent.com')) {
    const cleanUrl = url.split('=')[0];
    return `${cleanUrl}=w${targetWidth}`;
  }

  if (url.includes('images.unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&w=${targetWidth}&q=80`;
  }

  return url;
}

/**
 * Builds responsive srcset string from an array of widths
 */
export function buildResponsiveSrcSet(
  url: string,
  isWebp: boolean,
  widths: number[] = RESPONSIVE_WIDTHS
): string {
  if (!url) return '';
  return widths
    .map((w) => {
      const transformed = isWebp ? getWebpImageUrl(url, w) : getFallbackImageUrl(url, w);
      return `${transformed} ${w}w`;
    })
    .join(', ');
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  containerClassName = '',
  aspectRatio,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px',
  customSrcSet,
  loading,
  style,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Derive target standard width
  const standardWidth = width || 800;
  const webpDefaultUrl = getWebpImageUrl(src, standardWidth);
  const fallbackDefaultUrl = getFallbackImageUrl(src, standardWidth);

  // Responsive srcset sets for WebP and Fallback
  const webpSrcSet = customSrcSet || buildResponsiveSrcSet(src, true);
  const fallbackSrcSet = buildResponsiveSrcSet(src, false);

  // Determine explicit loading attribute (priority images load 'eager', rest 'lazy')
  const resolvedLoading: 'lazy' | 'eager' = loading || (priority ? 'eager' : 'lazy');

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      style={{
        aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : undefined),
      }}
    >
      {/* Skeleton / Low-CLS loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#0c0a17] animate-pulse flex items-center justify-center pointer-events-none z-0">
          <div className="w-8 h-8 rounded-full border-2 border-[#7C3AED]/30 border-t-[#7C3AED] animate-spin" />
        </div>
      )}

      {hasError ? (
        <div className="absolute inset-0 bg-[#110e20] border border-white/10 flex flex-col items-center justify-center p-4 text-center">
          <ImageIcon className="w-8 h-8 text-white/30 mb-2" />
          <span className="text-xs text-white/50 font-mono">{alt || 'Imagem do Projeto NEURON'}</span>
        </div>
      ) : (
        <picture>
          {/* Primary Source: Modern Compressed WebP with responsive srcset and sizes */}
          <source
            type="image/webp"
            srcSet={webpSrcSet}
            sizes={sizes}
          />

          {/* Fallback Image with native lazy loading, async decoding, and responsive srcset */}
          <img
            src={webpDefaultUrl || fallbackDefaultUrl}
            srcSet={fallbackSrcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={resolvedLoading}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`transition-all duration-500 relative z-[1] ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
            } ${className}`}
            style={style}
            {...rest}
          />
        </picture>
      )}
    </div>
  );
};
