// SpeciesPopup.tsx
import React from 'react';
import type { Occurrence } from '../../types/GBIF';

type SpeciesPopupProps = {
  occurrence: Occurrence;
};

const SpeciesPopup: React.FC<SpeciesPopupProps> = ({ occurrence }) => {
  return (
    <div style={{ minWidth: '200px' }}>
      <h1 className='font-bold text-base'>{occurrence.species}</h1>
      {occurrence.country && <p><strong>Country:</strong> {occurrence.country}</p>}
      {occurrence.eventDate && (
        <p>
          <strong>Date:</strong> {new Date(occurrence.eventDate).toLocaleDateString()}
        </p>
      )}
      {occurrence.basisOfRecord && <p><strong>Record type:</strong> {occurrence.basisOfRecord}</p>}
    </div>
  );
};

export default SpeciesPopup;
