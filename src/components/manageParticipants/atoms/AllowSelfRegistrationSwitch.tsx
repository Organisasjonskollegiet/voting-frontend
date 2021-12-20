import { FormControl, FormLabel, HStack, Switch, Tooltip, Box } from '@chakra-ui/react';
import React, { VoidFunctionComponent } from 'react';
import { labelStyle } from '../../styles/formStyles';
import AllowSelfRegistrationInformationModal from './AllowSelfRegistrationInformationModal';

interface AllowSelfRegistrationSwitchProps {
  toggleSelfRegistration: () => void;
  allowSelfRegistration: boolean | undefined;
}

const AllowSelfRegistrationSwitch: React.FC<AllowSelfRegistrationSwitchProps> = ({
  toggleSelfRegistration,
  allowSelfRegistration,
}) => {
  return (
    <FormControl width="fit-content" alignSelf="start">
      <HStack alignItems="center" spacing="0">
        <FormLabel sx={{ ...labelStyle, marginBottom: 0 }} htmlFor="self-registration">
          Tillat selvregistrering
        </FormLabel>
        <Box>
          <AllowSelfRegistrationInformationModal />
        </Box>
      </HStack>
      <Switch id="self-registration" onChange={toggleSelfRegistration} isChecked={allowSelfRegistration} />
    </FormControl>
  );
};

export default AllowSelfRegistrationSwitch;
