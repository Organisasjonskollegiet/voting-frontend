import React from 'react';
import { Link } from '@chakra-ui/react';

interface ExternalLinkProps {
  href: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children }) => {
  return (
    <Link href={href} textDecoration="underline" fontStyle="italic" isExternal>
      {children}
    </Link>
  );
};

export default ExternalLink;
