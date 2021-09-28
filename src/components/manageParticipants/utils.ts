import { ParticipantOrInvite, Role } from '../../__generated__/graphql-types';

export const checkIfEmailIsValid: (email: string) => boolean = (email: string) => {
  const emailRegExp = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return emailRegExp.test(email);
};

const getRole = (role: string) => {
  if (!role) return Role.Participant;
  switch (role.toLowerCase().trim()) {
    case 'teller':
      return Role.Counter;
    case 'administrator' || 'admin':
      return Role.Admin;
    default:
      return Role.Participant;
  }
};

export const onFileUpload: (
  event: React.ChangeEvent<HTMLInputElement>,
  setReadingFiles: (isReadingFiles: boolean) => void,
  meetingId: string,
  participants: ParticipantOrInvite[]
) => Promise<{ newParticipants: ParticipantOrInvite[]; invalidEmailsLineNumbers: string[] } | undefined> = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setReadingFiles: (isReadingFiles: boolean) => void,
  meetingId: string,
  participants: ParticipantOrInvite[]
) => {
  setReadingFiles(true);
  const input = event.target as HTMLInputElement;
  if (!(input.files && input.files.length > 0)) return;
  if (!meetingId) throw new Error('Meeting id not defined');

  const invalidEmailsLineNumbers: Array<string> = [];

  const file = input.files[0];
  const response = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async (evt: ProgressEvent<FileReader>) => {
      const newParticipants: ParticipantOrInvite[] = [];
      if (!evt.target) return;
      const content = evt.target.result as string;
      if (!content) return;
      const lines = content.split('\n').filter((line: string) => line.length > 0);

      for (let i = 0; i < lines.length; i++) {
        const lineList = lines[i].split(',').filter((email: string) => email.trim().length > 0);
        const email = lineList[0].toLowerCase().trim();
        const role = lineList.length === 1 ? Role.Participant : getRole(lineList[1]);
        const emailExists = [...participants, ...newParticipants].map((p) => p.email).indexOf(email) >= 0;

        const isEmailValid = checkIfEmailIsValid(email);

        if (!isEmailValid) {
          invalidEmailsLineNumbers.push(String(i + 1));
        } else if (!emailExists) {
          newParticipants.push({
            email,
            role,
            isVotingEligible: true,
            // existsInDb: false,
          });
        }
      }
      setReadingFiles(false);
      resolve({ newParticipants, invalidEmailsLineNumbers });
    };
    reader.readAsText(file, 'UTF-8');
  });
  return response as { newParticipants: ParticipantOrInvite[]; invalidEmailsLineNumbers: string[] };
};
