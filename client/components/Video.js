import React from 'react';
import { rem } from 'polished';
// Placeholder
const Video = React.forwardRef((props, ref) => {
  return (
    <video
      style={{
        height: rem('200px')
      }}
      ref={ref}
      playsInline
      muted
      autoPlay
    />
  );
});

Video.displayName = 'Video';

export default Video;
