import React from 'react';
import AddVotationForm from './AddVotationForm';
import { v4 as uuid } from 'uuid';
import { Votation } from '../../types/types';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

interface VotationListProps {
  votations: Votation[];
  updateVotations: (votations: Votation[]) => void;
  deleteVotation: (votation: Votation) => void;
  deleteAlternative: (id: string) => void;
  nextIndex: number;
  setNextIndex: (index: number) => void;
  activeVotationId: string;
  setActiveVotationId: (id: string) => void;
  onDragEnd: (result: DropResult) => void;
}

const AddMeetingVotationList: React.FC<VotationListProps> = ({
  votations,
  updateVotations,
  deleteVotation,
  deleteAlternative,
  nextIndex,
  setNextIndex,
  activeVotationId,
  setActiveVotationId,
  onDragEnd,
}) => {
  // const [activeVotationId, setActiveVotationId] = useState<string>(votations[0].id);
  // const [nextIndex, setNextIndex] = useState<number>(Math.max(...votations.map((votation) => votation.index)) + 1);

  const updateVotation = (votation: Votation) => {
    const indexOfUpdatedVotation = votations.findIndex((v) => v.id === votation.id);
    votations[indexOfUpdatedVotation] = votation;
    updateVotations(votations);
  };

  const duplicateVotation = (votation: Votation) => {
    const newId = uuid();
    updateVotations([...votations, { ...votation, id: newId, existsInDb: false, index: nextIndex }]);
    setNextIndex(nextIndex + 1);
    setActiveVotationId(newId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
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
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default AddMeetingVotationList;
