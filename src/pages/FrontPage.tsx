import { Heading, Image, ImageProps, Text, VStack, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import React from 'react';
import ExternalLink from '../components/common/buttons/ExternalLink';
import PageContainer from '../components/common/layout/PageContainer';
import WrapStack from '../components/common/layout/WrapStack';
import JrcLogo from '../static/JrC.png';
import { orgBlue, darkblue } from '../components/styles/colors';


const FrontPage: React.FC = () => {
  return (
    <PageContainer>
      <VStack py="10vh" alignItems="left" w="min(90%, 800px)" mx="auto" spacing={5} fontSize='2xl'>
        <Heading as='h1' size='3xl' noOfLines={1} alignSelf="center" color={orgBlue}>Velkommen til</Heading>
        <Heading as='h1' size='3xl' noOfLines={1} alignSelf="center" color={orgBlue}>Vedtatt.no!</Heading>
        <Text>
          Vedtatt.no er et digitalt stemmesystem utviklet av Organisasjonskollegiet og Junior Consulting med støtte fra
          Velferdstinget i Gjøvik, Ålesund og Trondheim. Målet er at frivillige organisasjoner skal kunne gjennomføre
          effektive og gode demokratiske prosesser.
        </Text>
        <Link href='https://forms.gle/KjtsgttvHqPdzEvX8' isExternal style={{ fontWeight: 'bold', color: darkblue }} width="-moz-max-content">
            Gi oss tilbakemelding<ExternalLinkIcon mx='2px' />
        </Link>
        <WrapStack breakpoint={800} spacing="0" justifyContent="space-between">
          <ExternalLink href="https://organisasjonskollegiet.no/">
            <Logo
              src="https://images.squarespace-cdn.com/content/v1/5c38b52f2487fdae852bdc70/1584098071586-CFU6NPF6HTRJEOLQMHC4/logoLarge.png"
              alt="Organisasjonskollegiet"
            />
          </ExternalLink>
          <ExternalLink href="https://velferdstinget.no/">
            <Logo src="https://velferdstinget.no/static/VTlogo.svg" alt="Velferdstinget" />
          </ExternalLink>
          <ExternalLink href="https://www.jrc.no">
            <Logo src={JrcLogo} alt="Junior Consulting" />
          </ExternalLink>
        </WrapStack>
        
      </VStack>
    </PageContainer>
  );
};

const Logo = ({ src, alt, ...options }: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      w="200px"
      h="115px"
      objectFit="contain"
      _hover={{ transform: 'scale(1.1)' }}
      {...options}
    />
  );
};

export default FrontPage;
