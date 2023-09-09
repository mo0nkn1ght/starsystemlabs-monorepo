import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './index.module.scss';

export default function FaqSector() {
  const STARSYSTEMLABS_FAQS = [
    {
      title: 'Do I have to know how to use a DEX (decentralized exchange) to participate in the SSL economy?',
      content: `No - Not if you already have $WLUNA.
      If you have it on your Coinbase wallet, move it to your Metamask Wallet or any wallet that supports Web3 and burn it with Otto. Otto will automatically send the citizen $MNBASE & $METO in return for their $WLUNA.`,
    },
    {
      title: 'Will there be an ICO?',
      content: `No just show up with your $WLUNA!`,
    },
    {
      title: 'Will we ever run out of $WLUNA for citizens to extract?',
      content: `No. Just like the Bitcoin Halving that happens every 4 years – you can always have half-of-a-half-of-a-half.`,
    },
    {
      title: 'Why did I get less value than what I put in the AutoBOT?',
      content: `One of the core goals of SSL is to burn $WLUNA and maintain your value. The citizen will deposit and Otto will burn on the citizens behalf. The citizen will receive a bond token that will allow the citizen to gain automatic dividend payouts.`,
    },
    {
      title: 'What can the citizen do with the $WLUNA they have collected?',
      content:
        'The citizen may do what is the best economic decision that suits them – for example, the citizen can collect the $WLUNA and deposit it into Otto for more $MNBASE & $METO, sell it back on the market for $ETH, buy one of the other SSL tokens off of the market or whatever the citizens imagination can come up with.',
    },
    {
      title: 'What is the APY%?',
      content: 'We do not have a fixed APY% per citizen, but we do have a fixed % from our holdings that gets distributed among the citizens.',
    },
    {
      title: 'What can I do with $METO?',
      content:
        '$METO will mainly be used to vote, but can also be used to inject liquidity into another pair, we will also offer an LP staking option to earn passive $MNBASE.',
    },
    {
      title: 'What will be the start value of $MNBASE & $METO?',
      content: '$MNBASE will start at 1: 1,000 $WLUNA – starting at $0.01. $METO will be 1: 1,000,000 $WLUNA – starting at $1.',
    },
    {
      title: 'How does the team make money? Is there a risk of them dumping?',
      content:
        'The team does not have coins to sell, the team only collects fees from transactions in order to cover our running costs as well as the expansion of the SSL ecosystem.',
    },
    {
      title: 'What is the Moonbase Smart Contract?',
      content: `BSC - 0x11f10aA5AD642F011E97c22B0737D99a311074cD`,
    },
    {
      title: 'What is the Meteor Smart Contract?',
      content: `BSC - 0xcC8b68eF0f460976b0eec86Af0552F29D354FD50`,
    },
    {
      title: 'What is the AutoBot Smart Contract?',
      content: `BSC - 0x4aF4653E533fD0e04ce5Eae7F8bEd177c1Dce30c`,
    },
  ];
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel: any) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div className={styles.sectorWrapper} id="faq">
      <div className={styles.sector}>
        <div className={styles.inner}>
          <div className={styles.title}>
            <h2>FAQ</h2>
          </div>
          <div className={styles.content_faq}>
            <div className={styles.faqs}>
              {STARSYSTEMLABS_FAQS.map((item, index) => (
                <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} key={item.title}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon className={styles.icon} />} aria-controls="panel1a-content" id="panel1a-header">
                    {item.title}
                  </AccordionSummary>
                  <AccordionDetails>{item.content}</AccordionDetails>
                </Accordion>
              ))}
            </div>
            <div className={styles.clip}>
              <img src="/images/poster.gif" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
