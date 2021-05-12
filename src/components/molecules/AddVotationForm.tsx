import React, { useState } from 'react';
import { VStack, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { inputStyle } from './MeetingInformationForm'

const AddVotationForm: React.FC = () => {

  const [alternatives, setAlternative] = useState<string[]>(['', ''])

  const labelStyle = {
    fontStyle: 'normal',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '150%',
    marginBottom: '10px',
  } as React.CSSProperties;

  const containerStyle = {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '4px'
  } as React.CSSProperties

  return (
    <VStack spacing='7' sx={containerStyle}>
      <FormControl>
        <FormLabel sx={labelStyle}>
          Sakstittel
        </FormLabel>
        <Input sx={inputStyle} placeholder='Eg. Valg av neste styreleder' />
      </FormControl>
      <FormControl>
        <FormLabel sx={labelStyle}>
          Beskrivelse
        </FormLabel>
        <Input sx={inputStyle} placeholder='Eg. Valg av neste styreleder' />
      </FormControl>
      <FormControl>
        <FormLabel sx={labelStyle}>
          Svaralternativer
        </FormLabel>
        <VStack spacing='5'>
          {
            alternatives.map(alternative => 
              <Input value={alternative} sx={inputStyle} placeholder='Navn på alternativ' />
            )
          }
        </VStack>
      </FormControl>
    </VStack>
  )
}

export default AddVotationForm;