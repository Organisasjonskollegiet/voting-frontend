import { VStack, Input, Button } from '@chakra-ui/react';
import React, { useState } from 'react';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

  const submit = () => {
    //TODO: Implement
    //https://auth0.com/docs/authenticate/database-connections/password-change?_ga=2.72026587.938715514.1646240878-648632765.1646240878&_gl=1*78mwf5*rollup_ga*NjQ4NjMyNzY1LjE2NDYyNDA4Nzg.*rollup_ga_F1G3E656YZ*MTY0NjI0MDg3OC4xLjAuMTY0NjI0MDg3OC42MA..#directly-set-the-new-password
  };

  return (
    <>
      <VStack>
        <Input
          placeholder="Nåværende passord"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <Input placeholder="Nytt passord" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

        <Input
          placeholder="Bekreft nytt passord"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />

        <Button onClick={() => submit()}>Bytt passord</Button>
      </VStack>
    </>
  );
};

export default ChangePassword;
