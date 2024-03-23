import React from 'react';

const InfoWindow = ({ content }) => {
  return (
    <div className="info-window">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default InfoWindow;
