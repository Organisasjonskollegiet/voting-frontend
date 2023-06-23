import { Heading, Text, VStack, Link, HStack, Image, Box } from '@chakra-ui/react';
import React from 'react';
import LogoGrid from '../components/common/LogoGrid';
import DownloadFileLink from '../components/common/links/DownloadFileLink';
import PageContainer from '../components/common/layout/PageContainer';
import blue_hand from '../static/blue_hand.png';
import orange_hand from '../static/orange_hand.png';
import { textBlue, textOrange } from '../components/styles/colors';
import useScreenWidth from '../hooks/ScreenWidth';

const FrontPage: React.FC = () => {
  const mobileWidth = 600;
  const screenWidth = useScreenWidth();
  return (
    <PageContainer>
      <HStack spacing={5} mb="-10">
        { screenWidth > mobileWidth ? 
        <VStack mr="4">
          <Image
            src={blue_hand}
            alt="Image"
            w="200px"
            h= "500px"
            objectFit="contain"
          />
          <Box
            w="200px"
            h= "100px"
          />
        </VStack> : <div/>}
        <VStack py="10vh" alignItems="left" w="90%" mx="auto" spacing={5}>
          <Heading variant={screenWidth > mobileWidth ? "h1" : "mobile"}>
            Gjennomfør effektive og gode demokratiske prosesser med vårt digitale stemmesystem
          </Heading>
          <Text variant='bodyHeader'>
            Vedtatt.no er et digitalt stemmesystem utviklet av Organisasjonskollegiet og Junior Consulting 
            med støtte fra Velferdstinget i Gjøvik, Ålesund og Trondheim. 
            Målet er at frivillige organisasjoner skal kunne gjennomføre effektive og
            gode demokratiske prosesser. 
          </Text>
          <Text fontSize={"22px"} color={textBlue} fontWeight="normal">
            Vil du hjelpe oss med å bli bedre? Klikk <Link
            href="https://forms.gle/NPECocCur5vddrve7"
            isExternal
            style={{ fontWeight: 'bold', color: textOrange, textDecoration : 'underline' }}
            width="-moz-max-content"
          > her.</Link>
          </Text>
          <DownloadFileLink color={textBlue} href={process.env.PUBLIC_URL + "/privacy-and-safety.pdf" }>Informasjon om hvordan vi håndterer informasjon, anonymitet og selvregistrering.</DownloadFileLink>
        </VStack>
        { screenWidth > mobileWidth ? 
        <VStack alignItems="right">
          <Box
            w="200px"
            h= "100px"
          />
          <Image
            src={orange_hand}
            alt="Image"
            w="200px"
            h= "500px"
            objectFit="contain"
          />
        </VStack> : <div/>}
      </HStack>
      <Box mx="100" pb="50">
        <LogoGrid/>
      </Box>
    </PageContainer>
  );
};

export default FrontPage;
