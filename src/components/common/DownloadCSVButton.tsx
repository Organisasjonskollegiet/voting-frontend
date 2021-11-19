import { DownloadIcon } from '@chakra-ui/icons';
import { Button, useToast } from '@chakra-ui/react';
import FileSaver from 'file-saver';
import React from 'react';

interface DownloadCSVButtonProps {
  getContent: () => string;
}

const DownloadCSVButton: React.FC<DownloadCSVButtonProps> = ({ getContent }) => {
  const toast = useToast();

  const saveResult = () => {
    try {
      const content = getContent();
      const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      FileSaver.saveAs(blob, 'resultat.csv');
    } catch (error) {
      toast({
        title: 'Kunne ikke laste ned resultater.',
        description: 'Vi fant ikke resultatene fra voteringen.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Button bg="transparent" onClick={saveResult} aria-label="Last ned" leftIcon={<DownloadIcon />}>
      Last ned resultat
    </Button>
  );
};

export default DownloadCSVButton;
