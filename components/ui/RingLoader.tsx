import { forwardRef } from 'react';
import { MantineLoaderComponent } from '@mantine/core';

export const RingLoader: MantineLoaderComponent = forwardRef(({ style, ...others }, ref) => (
  <div
    {...others}
    ref={ref as React.ForwardedRef<HTMLDivElement>}
    style={{
      width: 'var(--loader-size)',
      height: 'var(--loader-size)',
      position: 'relative',
      ...style,
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '20%',
        height: '20%',
        marginLeft: '-10%',
        marginTop: '-10%',
        borderRadius: '50%',
        border: '3px solid var(--loader-color)',
        animation: 'ripple 1.5s ease-out infinite',
        opacity: 0,
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '20%',
        height: '20%',
        marginLeft: '-10%',
        marginTop: '-10%',
        borderRadius: '50%',
        border: '3px solid var(--loader-color)',
        animation: 'ripple 1.5s ease-out 0.5s infinite',
        opacity: 0,
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '20%',
        height: '20%',
        marginLeft: '-10%',
        marginTop: '-10%',
        borderRadius: '50%',
        border: '3px solid var(--loader-color)',
        animation: 'ripple 1.5s ease-out 1s infinite',
        opacity: 0,
      }}
    />
    <style>{`
      @keyframes ripple {
        0% {
          width: 20%;
          height: 20%;
          margin-left: -10%;
          margin-top: -10%;
          opacity: 0.8;
          border-width: 3px;
        }
        100% {
          width: 100%;
          height: 100%;
          margin-left: -50%;
          margin-top: -50%;
          opacity: 0;
          border-width: 1px;
        }
      }
    `}</style>
  </div>
));

RingLoader.displayName = 'RingLoader';
