import React from 'react';
import VotationListSection, { VotationListSectionProps } from './VotationListSection';

interface VotationListMainSectionsProps extends VotationListSectionProps {
  isMeetingLobby: boolean;
}

const UpcomingVotationLists: React.FC<VotationListMainSectionsProps> = ({
  isMeetingLobby,
  votations,
  ...votationListSectionProps
}) => {
  if (isMeetingLobby) {
    return (
      <>
        <VotationListSection
          {...votationListSectionProps}
          heading={'Neste votering'}
          droppableId={'next'}
          votations={votations.slice(0, 1)}
        />
        {votations.length > 1 && (
          <VotationListSection
            {...votationListSectionProps}
            heading={'Kommende voteringer'}
            droppableId={'upcoming'}
            votations={votations.slice(1)}
            showStartNextButton={false}
          />
        )}
      </>
    );
  } else {
    return (
      <VotationListSection
        {...{
          ...votationListSectionProps,
          droppableId: 'list',
          votations,
          showStartNextButton: false,
        }}
      />
    );
  }
};

export default UpcomingVotationLists;
