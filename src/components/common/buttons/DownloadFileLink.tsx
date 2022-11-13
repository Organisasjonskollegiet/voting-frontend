import React from 'react';
import { Link } from '@chakra-ui/react';

interface DownloadFileLinkProps {
  href: string;
}

const ExternalLink: React.FC<DownloadFileLinkProps> = ({ href, children }) => {
  return (
    <Link href={href} textDecoration="underline" fontStyle="italic" download>
      {children}
    </Link>
  );
};

export default ExternalLink;
