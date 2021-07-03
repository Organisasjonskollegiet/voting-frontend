import React, { useState } from 'react';
import AddVotationForm from './AddVotationForm'
import {v4 as uuid} from 'uuid'
import { Votation } from '../../types/types'

interface VotationListProps {
  votations: Votation[];
  updateVotations: (votations: Votation[]) => void;
  deleteVotation: (votation: Votation) => void;
  deleteAlternative: (id: string) => void;
}


const AddMeetingVotationList: React.FC<VotationListProps> = ({ votations, updateVotations, deleteVotation, deleteAlternative }) => {

  const [activeVotationId, setActiveVotationId] = useState<string>(votations[0].id);
  const [nextIndex, setNextIndex] = useState<number>(Math.max(...votations.map(votation => votation.index)) + 1)

  
  const updateVotation = (votation: Votation) => {
    const indexOfUpdatedVotation = votations.findIndex(v => v.id === votation.id);
    votations[indexOfUpdatedVotation] = votation
    updateVotations(votations)
  }

  const duplicateVotation = (votation: Votation) => {
    const newId = uuid();
    updateVotations([...votations, {...votation, id: newId, existsInDb: false, index: nextIndex}])
    setNextIndex(nextIndex + 1)
    setActiveVotationId(newId)
  }

  return (
  <>
    {votations.map((votation: Votation, index: number) => (
      <AddVotationForm 
        toggleCollapsedVotation={() => setActiveVotationId(votation.id)} 
        isActive={votation.id === activeVotationId} 
        votation={votation} 
        index={index} 
        key={votation.id} 
        updateVotation={updateVotation}
        deleteVotation={deleteVotation}
        deleteAlternative={deleteAlternative}
        duplicateVotation={duplicateVotation}
      />
    ))}
  </>);
}

export default AddMeetingVotationList;