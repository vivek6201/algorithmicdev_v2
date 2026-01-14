import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

/**
 * Default loading component for consistent UX across lazy-loaded components
 */
const DefaultLoading = () => (
    <div className="animate-pulse bg-muted rounded-md h-full w-full min-h-[100px]" />
);

/**
 * Lazy load a component with Next.js dynamic import
 * @param importFn - Dynamic import function returning the component
 * @param options - Optional configuration for loading state and SSR
 * @returns Dynamically loaded component
 * 
 * @example
 * const MyComponent = lazyLoad(() => import("./MyComponent"));
 * 
 * // With custom loading
 * const MyComponent = lazyLoad(
 *   () => import("./MyComponent"),
 *   { loading: () => <CustomSpinner /> }
 * );
 */
export function lazyLoad<P = object>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    importFn: () => Promise<{ default: ComponentType<any> }>,
    options?: {
        loading?: () => React.ReactNode;
        ssr?: boolean;
    }
) {
    return dynamic(importFn, {
        loading: options?.loading ?? (() => <DefaultLoading />),
        ssr: options?.ssr ?? true,
    }) as ComponentType<P>;
}

/**
 * Lazy load a client-only component (SSR disabled)
 * Use this for components that use browser-only APIs or have hydration issues
 * 
 * @param importFn - Dynamic import function returning the component
 * @param loading - Optional custom loading function
 * @returns Dynamically loaded component with SSR disabled
 * 
 * @example
 * const ClientOnlyChart = lazyLoadClient(() => import("./Chart"));
 */
export function lazyLoadClient<P = object>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    importFn: () => Promise<{ default: ComponentType<any> }>,
    loading?: () => React.ReactNode
) {
    return lazyLoad<P>(importFn, { loading, ssr: false });
}
