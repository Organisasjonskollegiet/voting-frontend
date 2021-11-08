import React from 'react';
import { getRoundedPercentage } from '../activeVotation/utils';
import DownloadCSVButton from '../common/DownloadCSVButton';
import { GetStvResultQuery, GetVotationResultsQuery } from '../../__generated__/graphql-types';

interface DownloadResultButtonProps {
  stvResult: GetStvResultQuery | null | undefined;
  result: GetVotationResultsQuery | null | undefined;
  isStv: boolean;
}

const DownloadResultButton: React.FC<DownloadResultButtonProps> = ({ isStv, result, stvResult }) => {
  const getStvOverview = () => {
    if (!stvResult?.getStvResult) throw new Error('Fant ikke resultat.');
    return (
      `Antall stemmer som krevdes for å vinne: ${stvResult.getStvResult.quota}` +
      '\n' +
      `Antall stemmeberettigede deltakere: ${stvResult.getStvResult.votingEligibleCount}` +
      '\n' +
      `Antall avgitte stemmer: ${stvResult.getStvResult.voteCount} \n`
    );
  };

  const formatEliminatedText = (eliminated: string[], eliminatedAs: 'Vinner' | 'Taper') => {
    if (eliminated.length === 0) return '';
    switch (eliminated.length) {
      case 0:
        return '';
      case 1:
        return `${eliminatedAs}: ${eliminated[0]}`;
      case 2:
        return `${eliminatedAs}e: ${eliminated[0]} og ${eliminated[1]}`;
      default:
        return `${eliminatedAs}e: ${
          eliminated.slice(eliminated.length - 2).reduce((a, b) => a + ', ' + b) +
          ' og ' +
          eliminated[eliminated.length - 1]
        }`;
    }
  };

  const getRoundEliminatedFileContent = (winners: string[], losers: string[]) => {
    if (winners.length > 0) {
      return formatEliminatedText(winners, 'Vinner');
    } else if (losers.length > 0) {
      return formatEliminatedText(losers, 'Taper');
    } else {
      return '';
    }
  };

  const getStvRoundResultFileContent = (
    index: number,
    winners: string[],
    losers: string[],
    alternatives: { text: string; votes: number }[]
  ) => {
    const header = `Runde ${index + 1} \n`;
    const eliminated = getRoundEliminatedFileContent(winners, losers) + '\n';
    const alternativesHeader = 'Alternativ, Antall stemmer \n';
    const alternativesContent = alternatives.map((a) => `${a.text}, ${a.votes} \n`);
    return header + eliminated + alternativesHeader + alternativesContent.reduce((a, b) => a + b);
  };

  const getStvResultFileContent = () => {
    const overview = getStvOverview() + '\n';
    const rounds = stvResult?.getStvResult?.stvRoundResults.map(
      (round) =>
        getStvRoundResultFileContent(
          round.index,
          round.winners.map((w) => w.text),
          round.losers.map((l) => l.text),
          round.alternativesWithRoundVoteCount.map((a) => {
            return { text: a.alternative.text, votes: a.voteCount };
          })
        ) + '\n'
    );
    return overview + rounds?.reduce((a, b) => a + b);
  };

  const getAlternativeResultString = (text: string, votes: number) => {
    if (!result?.getVotationResults) return '';
    return `${text}, ${votes}, ${
      result.getVotationResults.voteCount > 0
        ? getRoundedPercentage(votes / result.getVotationResults.voteCount).toString()
        : '0'
    }, ${
      result.getVotationResults.votingEligibleCount > 0
        ? getRoundedPercentage(votes / result.getVotationResults.votingEligibleCount).toString()
        : '0'
    } \n`;
  };

  const getResultFileContent = () => {
    if (isStv) {
      return getStvResultFileContent();
    }
    if (!result?.getVotationResults) throw new Error('Fant ikke resultatene fra voteringen.');
    const header = 'Alternativ, Antall stemmer, % av stemmene, % av stemmeberettigede \n';
    const alternativesContent = [...result.getVotationResults.alternatives]
      .sort((a, b) => (b?.votes ?? 0) - (a?.votes ?? 0))
      .map((a) => (a ? getAlternativeResultString(a.text, a.votes) : ''))
      .reduce((p, c) => p + c);
    const blankVotes = result.getVotationResults.blankVotes
      ? getAlternativeResultString('Blanke stemmer', result.getVotationResults.blankVoteCount)
      : '';
    return header + alternativesContent + blankVotes;
  };

  return <DownloadCSVButton getContent={getResultFileContent} />;
};

export default DownloadResultButton;
