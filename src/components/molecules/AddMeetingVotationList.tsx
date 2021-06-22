import React, { useState } from 'react';
import AddVotationForm from './AddVotationForm'
import { MajorityType } from '../../__generated__/graphql-types';
import {v4 as uuid} from 'uuid'
import { Votation } from '../../types/types'

interface VotationListProps {
  votations: Votation[];
  updateVotations: (votations: Votation[]) => void;
}


const AddMeetingVotationList: React.FC<VotationListProps> = ({ votations, updateVotations }) => {

  const [activeVotationId, setActiveVotationId] = useState<string>(votations[0].id);

  
  const updateVotation = (votation: Votation) => {
    const indexOfUpdatedVotation = votations.findIndex(v => v.id === votation.id);
    votations[indexOfUpdatedVotation] = votation
    updateVotations(votations)
  }

  const deleteVotaton = (id: string) => {
    updateVotations(votations.filter(votation => votation.id !== id))
  }

  const duplicateVotation = (votation: Votation) => {
    const newId = uuid();
    updateVotations([...votations, {...votation, id: newId, existsInDb: false}])
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
        deleteVotation={deleteVotaton}
        duplicateVotation={duplicateVotation}
      />
    ))}
  </>);
}

export default AddMeetingVotationList;