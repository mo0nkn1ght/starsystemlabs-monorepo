import { useContractCall, useContractFunction } from '@usedapp/core';
import { BIG_ZERO, NFT_ADDR } from 'global/constants';
import { Interface } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import AutoBotABI from '../global/ABI/NFTABI.json';

export function useWhitelistMint() {
  const abi = new Interface(AutoBotABI);
  const contract = new Contract(NFT_ADDR, abi);
  const { send, resetState, state } = useContractFunction(contract, 'whitelistMint');

  useEffect(() => {
    if (state.status === 'Success') {
      toast.success('Successfully run!');
      resetState();
    } else if (state.status === 'Exception' || state.status === 'Fail') {
      toast.error(state.errorMessage || 'Undefined error comes up!');
      resetState();
    }
  }, [state, resetState]);

  return {
    state,
    whitelistMint: send,
  };
}

export function useTotalSupply() {
  const abi = new Interface(AutoBotABI);
  const [totalSupply] = useContractCall({
    abi,
    address: NFT_ADDR,
    method: 'totalSupply',
    args: [],
  }) ?? [BIG_ZERO];

  return Number(totalSupply.toString());
}

export function useWhitelistMintEnabled() {
  const abi = new Interface(AutoBotABI);
  const [whitelistMintEnabled] = useContractCall({
    abi,
    address: NFT_ADDR,
    method: 'whitelistMintEnabled',
    args: [],
  }) ?? [false];

  return whitelistMintEnabled;
}

export function usePublicMint() {
  const abi = new Interface(AutoBotABI);
  const contract = new Contract(NFT_ADDR, abi);
  const { send, resetState, state } = useContractFunction(contract, 'mint');

  useEffect(() => {
    if (state.status === 'Success') {
      toast.success('Successfully run!');
      resetState();
    } else if (state.status === 'Exception' || state.status === 'Fail') {
      resetState();
      toast.error(state.errorMessage || 'Undefined error comes up!');
    }
  }, [state, resetState]);

  return {
    state,
    mint: send,
  };
}
