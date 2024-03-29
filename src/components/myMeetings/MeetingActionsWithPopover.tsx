import React, { useState } from 'react';
import { Button, HStack, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import MoreIcon from '../../static/more.svg';
import { lightGray } from '../styles/colors';

interface MeetingActionsWithPopoverProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
  meetingStatus: 'open' | 'upcoming' | 'ended';
}

const MeetingActionsWithPopover: React.FC<MeetingActionsWithPopoverProps> = ({
  onEditClick,
  onDeleteClick,
  meetingStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <HStack justifyContent="end" w="100%">
      <Popover placement="top-end" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <PopoverTrigger>
          <Button
            variant="standard"
            h="1em"
            fontSize="0.75em"
            marginRight="-10px"
            color={lightGray}
            rightIcon={<img src={MoreIcon} alt="more" />}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            Alternativer
          </Button>
        </PopoverTrigger>
        <PopoverContent w="fit-content">
          {meetingStatus !== 'ended' && (
            <Button
              variant="standard"
              onClick={(e) => {
                e.stopPropagation();
                onEditClick();
              }}
              w="100%"
              fontSize="0.75rem"
            >
              Rediger møte
            </Button>
          )}
          <Button
            variant="standard"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick();
            }}
            w="100%"
            // bgColor="transparent"
            fontSize="0.75rem"
          >
            Slett møte
          </Button>
        </PopoverContent>
      </Popover>
    </HStack>
  );
};

export default MeetingActionsWithPopover;
