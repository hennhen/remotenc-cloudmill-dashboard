import React from 'react';

const Video = React.forwardRef<HTMLVideoElement, {}>((props, ref) => {
  return (
    <video
      style={{
        height: 200
      }}
      ref={ref}
      playsInline
      muted
      autoPlay
    />
  );
});

Video.displayName = 'Video';

export { Video };
