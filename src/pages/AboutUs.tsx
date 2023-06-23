import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Heading, Text, VStack,Box } from '@chakra-ui/react';
import React from 'react';
import PageContainer from '../components/common/layout/PageContainer';
import DownloadFileLink from '../components/common/links/DownloadFileLink';
import ExternalLink from '../components/common/links/ExternalLink';
import LogoGrid from '../components/common/LogoGrid';
import ModalLink from '../components/common/links/ModalLink';
import { textOrange } from '../components/styles/colors';

const AboutUs: React.FC = () => {
  return (
    <PageContainer>
      <VStack py="10vh" alignItems="left" w="min(90%, 800px)" mx="auto" spacing={5}>
        <Heading variant="h1">
          Om vedtatt.no
        </Heading>
        <Text>
          Vedtatt.no er et digitalt stemmesystem utviklet av Organisasjonskollegiet og Junior Consulting med støtte fra
          Velferdstinget i Gjøvik, Ålesund og Trondheim. Målet er at frivillige organisasjoner skal kunne gjennomføre
          effektive og gode demokratiske prosesser. Informasjon om hvordan vi håndterer brukeren din, anonymitet og selvregistrering kan 
          finnes <DownloadFileLink color={textOrange} href={process.env.PUBLIC_URL + "/privacy-and-safety.pdf" }>her</DownloadFileLink>.
        </Text>
        <Text>
          Vi bruker <VotationInformation label={"følgende"}/> flertallsformer.
        </Text>
        
        <Text>
          <Text variant='bodyHeader'>
            <ExternalLink href="https://organisasjonskollegiet.no/">Organisasjonskollegiet</ExternalLink>
          </Text>
          Organisasjonskollegiet er en gjeng med lang erfaring fra frivilligheten og studentpolitikken ved NTNU som hjelper organisasjoner i Trondheim med
          utfordringer som ordstyring, utforming av vedtekter, sakspapirer, og lignende. Etter å ha ordstyrt en lang
          rekke årsmøter, generalforsamlinger og andre møter merket vi et stort behov for et godt, gratis digitalt
          stemmeverktøy som kunne dekke behovene til organisasjonene vi støttet.
        </Text>
        
        <Text>
          <Text variant='bodyHeader'>
            <ExternalLink href="https://velferdstinget.no/">Velferdstinget i Gjøvik, Ålesund og Trondheim</ExternalLink>
          </Text>
          Velferdstinget i Gjøvik, Ålesund og Trondheim er et studentpolitisk organ som har som oppgave å ivareta og bedre velferdstilbud for studentene ved deres
          studiesteder. Velferdstinget valgte å støtte prosjektet økonomisk slik at vi hadde muligheten til å utvikle et
          profesjonelt verktøy som kunne sørge for at organisasjoner tilknyttet deres studiesteder skal kunne
          gjennomføre effektive, gode valg i deres demokratiske møter.
        </Text>
        
        <Text>
          <Text variant='bodyHeader'>
            <ExternalLink href="https://www.jrc.no">Junior Consulting</ExternalLink>
          </Text>
          Junior Consulting er et studentkonsulenthus bestående
          av studenter fra mange forskjellige studieprogram ved NTNU. De har stått for design og utvikling av løsningen
          og har hjulpet oss i Organisasjonskollegiet med å omforme vår organisasjonskunnskap til produktutvikling.
        </Text>
        <Text>
          <Text variant="bodyHeader">
            <ExternalLink href="https://www.student.no">Norsk Studentorganisasjon</ExternalLink>
          </Text>
          Norsk studentorganisasjon er en nasjonal interesseorganisasjon 
          for mange av studentdemokratiene ved norske universiteter og høyskoler. 
          Norsk studentorganisasjon har til oppgave å ivareta og fremme studentenes interesser og rettigheter, 
          fremme engasjement for nasjonale og internasjonale utdanningssaker blant studentene samt å representere sine medlemslag. 
          Norsk studentorganisasjon er partipolitisk uavhengig.
        </Text>
      </VStack>
      <Box mx="100" pb="50">
        <LogoGrid/>
      </Box>
    </PageContainer>
  );
};

const VotationInformation=({
  label
}: {
  label : string
}) => {
  return (
    <ModalLink title="Flertallsformer" label={label}>
      <Heading size="sm">Simpelt flertall</Heading>
      <Text mb="1rem">
        Alternativet med flest stemmer vinner. <br />
        Blanke stemmer telles ikke.
      </Text>
      <Heading size="sm">Kvalifisert flertall</Heading>
      <Text mb="1rem">
        Et alternativ trenger stemmene fra mer enn halvparten av de stemmeberettigede tilstede for å vinne.
      </Text>

      <Heading size="sm">Kvalifisert 2/3 flertall</Heading>
      <Text mb="1rem">
        Et alternativ trenger stemmene fra mer enn to tredjedeler av de stemmeberettigede tilstede for å vinne.
      </Text>
      <Heading size="sm">Preferansevalg</Heading>
      <Text mb="1rem">
        Velgerne rangerer de alternativene de ønsker i den rekkefølgen de foretrekker dem. Her har man mulighet til å
        velge flere vinnere. <br />
        Man kan stemme blankt ved å ikke rangerer noen alternativer.
      </Text>
      <Text>
        Hvordan resultatet ved preferansevalg blir utregnet kan du se her:{' '}
        <ExternalLink href="https://www.youtube.com/watch?v=bLH_w5kHJpA">
          Single transferable vote <ExternalLinkIcon mx="2px" />
        </ExternalLink>
      </Text>
    </ModalLink>
  );
};

export default AboutUs;
