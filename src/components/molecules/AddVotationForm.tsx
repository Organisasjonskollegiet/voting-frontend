import React, { useState } from 'react';
import { VStack, FormControl, FormLabel, Input, Button, Divider, Checkbox, CheckboxGroup, HStack, RadioGroup, Radio, Stack } from '@chakra-ui/react'
import { inputStyle } from './MeetingInformationForm'
import AddIcon from './addIcon.svg'
import { MajorityType } from '../../__generated__/graphql-types';

interface Alternative {
  id: number;
  text: string;
}

interface Votation {
  title: string;
  description: string;
  alternatives: Alternative[];
  blankVotes: boolean;
  hiddenVotes: boolean;
  severalVotes: boolean;
  majorityType: MajorityType;
}

const AddVotationForm: React.FC = () => {

  const [votation, setVotation] = useState()

  const [alternatives, setAlternatives] = useState<Alternative[]>([
    {
      id: 1, 
      text: ''
    },
    {
      id: 2,
      text: ''
    }])

  const [nextId, setNextId] = useState<number>(3);

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

  const checkboxStyle = {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    width: '270px',
    height: '56px',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold'
  } as React.CSSProperties;

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
        <VStack spacing='5' align='left'>
          {
            alternatives.sort((a, b) => a.id - b.id).map(alternative => 
              <Input 
                width='50%'
                key={alternative.id}
                onChange={(event: any) => 
                  setAlternatives([
                    ...alternatives.filter(a => a.id !== alternative.id), 
                    {
                      id: alternative.id, 
                      text: event.target.value
                    }
                  ])} 
                value={alternative.text} 
                sx={inputStyle} 
                placeholder='Navn på alternativ' />
            )
          }
          <Button 
            width='190px' 
            fontWeight='normal'
            leftIcon={<img src={AddIcon} />} 
            bg='white' 
            variant='link'
            onClick={() => {
              setAlternatives([...alternatives, {id: nextId, text: ''}])
              setNextId(nextId + 1)
            }}
          >
            Legg til svaralternativ
          </Button>
        </VStack>
      </FormControl>
      <Divider m="3em 0" />
      <FormControl>
        <VStack spacing='5' align='left'>
          <FormLabel sx={labelStyle} marginBottom='30px'>
            Valgalternativer
          </FormLabel>
          <HStack spacing='10%'>
            <CheckboxGroup >
            <VStack spacing='5' align='left'>
                <Checkbox sx={checkboxStyle} colorScheme='gray' spacing='16px' iconSize='150px'>
                  Stemmer kan være blanke
                </Checkbox>
                <Checkbox sx={checkboxStyle} colorScheme='gray' spacing='16px'>
                  Skjult stemmeresultat
                </Checkbox>
                <Checkbox sx={checkboxStyle} colorScheme='gray' spacing='16px'>
                  Tillat flere stemmer
                </Checkbox>
              </VStack>
            </CheckboxGroup>
            <VStack align='left' boxShadow='0px 0px 10px rgba(0, 0, 0, 0.1)' height='100%' width='100%' padding='32px'>
              <FormLabel sx={labelStyle}>
                Valg avgjøres med
              </FormLabel>
              <RadioGroup>
                <Stack direction='column' align='left' height='100%' defaultValue='1' value='1'>
                  <Radio value='1'>
                    Simpelt flertall
                  </Radio>
                  <Radio value='2'>
                    Kvalifisert flertall
                  </Radio>
                  <Radio value='3'>
                    Kvalifisert 2/3 flertall
                  </Radio>
                </Stack>
              </RadioGroup>
            </VStack>
          </HStack>
        </VStack>
      </FormControl>
    </VStack>
  )
}

export default AddVotationForm;