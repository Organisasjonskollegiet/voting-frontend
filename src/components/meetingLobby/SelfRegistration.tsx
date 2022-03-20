import { VStack } from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import React from 'react';
import useScreenWidth from '../../hooks/ScreenWidth';
import CopyRegistrationLinkButton, { getRegistrationLink } from '../common/buttons/CopyRegistrationLinkButton';
import Logo from '../../static/logo.svg';

interface SelfRegistrationProps {
  meetingId: string;
}

const SelfRegistration: React.FC<SelfRegistrationProps> = ({ meetingId }) => {
  const width = useScreenWidth();
  return (
    <VStack w="90vw" maxWidth="800px" spacing="3em" mt="10vh">
      <CopyRegistrationLinkButton meetingId={meetingId} />
      <QRCode
        size={width > 600 ? 0.9 * 600 : 0.9 * width}
        value={getRegistrationLink(meetingId)}
        imageSettings={{
          src: Logo,
          height: width > 600 ? 0.15 * 600 : 0.15 * width,
          width: width > 600 ? 0.15 * 600 : 0.15 * width,
          excavate: true,
        }}
      />
    </VStack>
  );
};

export default SelfRegistration;
