import React from 'react';
import LogoLink from './links/LogoLink';
import WrapStack from './layout/WrapStack';
import JrcLogo from '../../static/JrC_logo.png';
import NSOLogo from '../../static/NSO_logo.png';
import VTLogo from '../../static/VTlogo.png';

const LogoGrid = ()  => {
    return (
        <WrapStack breakpoint={950} spacing="0" justifyContent="space-between">
          <LogoLink
            href="https://organisasjonskollegiet.no/"
            src="https://images.squarespace-cdn.com/content/v1/5c38b52f2487fdae852bdc70/1584098071586-CFU6NPF6HTRJEOLQMHC4/logoLarge.png"
            alt="Organisasjonskollegiet"
          />
          <LogoLink href="https://velferdstinget.no/" src={VTLogo} alt="Velferdstinget" />
          <LogoLink href="https://www.jrc.no" src={JrcLogo} alt="Junior Consulting" />
          <LogoLink href="https://www.student.no" src={NSOLogo} alt="NSO" height="55px"/>
        </WrapStack>
    );
  };

export default LogoGrid