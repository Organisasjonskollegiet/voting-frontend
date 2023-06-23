import React from 'react';
import ExternalLink, { ExternalLinkProps } from './ExternalLink';
import { Image, ImageProps} from '@chakra-ui/react';

const LogoLink = ({ href, src, alt, height="115px", ...options }: ImageProps & ExternalLinkProps) => {
    return (
      <ExternalLink href={href}>
        <Image
          src={src}
          alt={alt}
          objectFit="contain"
          w="240px"
          h={height}
          _hover={{ transform: 'scale(1.1)' }}
          {...options}
        /> 
      </ExternalLink>
    );
  };

export default LogoLink