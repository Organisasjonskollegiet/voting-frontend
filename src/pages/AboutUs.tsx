import { Heading, Image, ImageProps, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import ExternalLink from '../components/common/buttons/ExternalLink';
import DownloadFileLink from '../components/common/buttons/DownloadFileLink';
import PageContainer from '../components/common/layout/PageContainer';
import WrapStack from '../components/common/layout/WrapStack';
import JrcLogo from '../static/JrC.png';

const AboutUs: React.FC = () => {
  return (
    <PageContainer>
      <VStack py="10vh" alignItems="left" w="min(90%, 800px)" mx="auto" spacing={5}>
        <Heading>Om Vedtatt.no</Heading>
        <Text>
          Vedtatt.no er et digitalt stemmesystem utviklet av Organisasjonskollegiet og Junior Consulting med støtte fra
          Velferdstinget i Gjøvik, Ålesund og Trondheim. Vedtatt.no har også fått tilskudd fra Norsk
          studentorganisasjon. Målet er at frivillige organisasjoner skal kunne gjennomføre effektive og gode
          demokratiske prosesser. Informasjon om hvordan vi håndterer brukeren din, anonymitet og selvregistrering kan
          finnes <DownloadFileLink href={process.env.PUBLIC_URL + '/privacy-and-safety.pdf'}>her</DownloadFileLink>.
        </Text>
        <Text>
          <ExternalLink href="https://organisasjonskollegiet.no/">Organisasjonskollegiet</ExternalLink> er en gjeng med
          lang erfaring fra frivilligheten og studentpolitikken ved NTNU som hjelper organisasjoner i Trondheim med
          utfordringer som ordstyring, utforming av vedtekter, sakspapirer, og lignende. Etter å ha ordstyrt en lang
          rekke årsmøter, generalforsamlinger og andre møter merket vi et stort behov for et godt, gratis digitalt
          stemmeverktøy som kunne dekke behovene til organisasjonene vi støttet.
        </Text>
        <Text>
          <ExternalLink href="https://velferdstinget.no/">Velferdstinget i Gjøvik, Ålesund og Trondheim</ExternalLink>{' '}
          er et studentpolitisk organ som har som oppgave å ivareta og bedre velferdstilbud for studentene ved deres
          studiesteder. Velferdstinget valgte å støtte prosjektet økonomisk slik at vi hadde muligheten til å utvikle et
          profesjonelt verktøy som kunne sørge for at organisasjoner tilknyttet deres studiesteder skal kunne
          gjennomføre effektive, gode valg i deres demokratiske møter.
        </Text>
        <Text>
          <ExternalLink href="https://www.jrc.no">Junior Consulting</ExternalLink> er et studentkonsulenthus bestående
          av studenter fra mange forskjellige studieprogram ved NTNU. De har stått for design og utvikling av løsningen
          og har hjulpet oss i Organisasjonskollegiet med å omforme vår organisasjonskunnskap til produktutvikling.
        </Text>
        <Text>
          <ExternalLink href="https://www.student.no/">Norsk studentorganisasjon</ExternalLink> er en nasjonal
          interesseorganisasjon for mange av studentdemokratiene ved norske universiteter og høyskoler. Norsk
          studentorganisasjon har til oppgave å ivareta og fremme studentenes interesser og rettigheter, fremme
          engasjement for nasjonale og internasjonale utdanningssaker blant studentene samt å representere sine
          medlemslag. Norsk studentorganisasjon er partipolitisk uavhengig.
        </Text>
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

export default AboutUs;
