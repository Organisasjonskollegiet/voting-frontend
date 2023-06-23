import React from 'react';
import { Link } from '@chakra-ui/react';

export interface ExternalLinkProps {
  href: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children }) => {
  return (
    <Link href={href} textDecoration="underline" fontWeight="bold" isExternal>
      {children}
    </Link>
  );
};

export default ExternalLink;
