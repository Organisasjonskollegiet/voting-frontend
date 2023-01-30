import React from 'react';
import ExternalLink, { ExternalLinkProps } from './ExternalLink';
import { Image, ImageProps} from '@chakra-ui/react';

const LogoLink = ({ href, src, alt, ...options }: ImageProps & ExternalLinkProps) => {
    return (
      <ExternalLink href={href}>
        <Image
          src={src}
          alt={alt}
          w="200px"
          h="115px"
          objectFit="contain"
          _hover={{ transform: 'scale(1.1)' }}
          {...options}
        />
      </ExternalLink>
    );
  };

export default LogoLink