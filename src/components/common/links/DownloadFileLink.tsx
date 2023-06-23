import React from 'react';
import { Link } from '@chakra-ui/react';

interface DownloadFileLinkProps {
  href: string;
  color: string;
}

const DownloadFileLink: React.FC<DownloadFileLinkProps> = ({ href,color, children }) => {
  return (
    <Link href={href} textDecoration="underline" color={color} download>
      {children}
    </Link>
  );
};

export default DownloadFileLink;
