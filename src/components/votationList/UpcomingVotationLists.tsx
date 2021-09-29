import React from 'react';
import VotationListSection, { VotationListSectionProps } from './VotationListSection';

interface VotationListMainSectionsProps extends VotationListSectionProps {
  isMeetingLobby: boolean;
}

const UpcomingVotationLists: React.FC<VotationListMainSectionsProps> = ({
  isMeetingLobby,
  votations,
  setActiveVotationId,
  activeVotationId,
  updateVotation,
  handleDeleteVotation,
  handleDeleteAlternative,
  duplicateVotation,
  handleStartVotation,
  checkIfAnyChanges,
  handleSaveChanges,
  showStartNextButton,
  isAdmin,
}) => {
  if (isMeetingLobby) {
    return (
      <>
        <VotationListSection
          droppableId={'top-list'}
          votations={votations.slice(0, 1)}
          setActiveVotationId={setActiveVotationId}
          activeVotationId={activeVotationId}
          updateVotation={updateVotation}
          handleDeleteVotation={handleDeleteVotation}
          handleDeleteAlternative={handleDeleteAlternative}
          duplicateVotation={duplicateVotation}
          handleStartVotation={handleStartVotation}
          checkIfAnyChanges={checkIfAnyChanges}
          handleSaveChanges={handleSaveChanges}
          showStartNextButton={showStartNextButton}
          heading={'Neste votering'}
          isAdmin={isAdmin}
        />
        {votations.length > 1 && (
          <VotationListSection
            droppableId={'bottom-list'}
            votations={votations}
            setActiveVotationId={setActiveVotationId}
            activeVotationId={activeVotationId}
            updateVotation={updateVotation}
            handleDeleteVotation={handleDeleteVotation}
            handleDeleteAlternative={handleDeleteAlternative}
            duplicateVotation={duplicateVotation}
            handleStartVotation={handleStartVotation}
            checkIfAnyChanges={checkIfAnyChanges}
            handleSaveChanges={handleSaveChanges}
            showStartNextButton={false}
            heading={'Kommende voteringer'}
            isAdmin={isAdmin}
          />
        )}
      </>
    );
  } else {
    return (
      <VotationListSection
        droppableId={'list'}
        votations={votations}
        setActiveVotationId={setActiveVotationId}
        activeVotationId={activeVotationId}
        updateVotation={updateVotation}
        handleDeleteVotation={handleDeleteVotation}
        handleDeleteAlternative={handleDeleteAlternative}
        duplicateVotation={duplicateVotation}
        handleStartVotation={handleStartVotation}
        checkIfAnyChanges={checkIfAnyChanges}
        handleSaveChanges={handleSaveChanges}
        showStartNextButton={false}
        heading={'Kommende voteringer'}
        isAdmin={isAdmin}
      />
    );
  }
};

export default UpcomingVotationLists;
