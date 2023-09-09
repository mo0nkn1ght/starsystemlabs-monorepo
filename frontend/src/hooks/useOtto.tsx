import { useCall, useContractCall, useContractFunction } from '@usedapp/core';
import { BIG_ZERO, AUTOBOT_ADDR } from 'global/constants';
import { Interface } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

import OttoABI from '../global/ABI/OttoTheAutoBot.json';

export function useWhitelistMint() {
  const abi = new Interface(OttoABI);
  const contract = new Contract(AUTOBOT_ADDR, abi);
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
  const abi = new Interface(OttoABI);
  const [totalSupply] = useContractCall({
    abi,
    address: AUTOBOT_ADDR,
    method: 'totalSupply',
    args: [],
  }) ?? [BIG_ZERO];

  return Number(totalSupply.toString());
}

export function useTotalSupplyAddress(address: string) {
  const abi = new Interface(OttoABI);
  const contract = new Contract(address, abi);
  const callRespnse = useCall({
    contract: contract,
    method: 'totalSupply',
    args: [],
  });

  return Number(callRespnse?.value?.[0] || 0);
}

export function useWhitelistMintEnabled() {
  const abi = new Interface(OttoABI);
  const [whitelistMintEnabled] = useContractCall({
    abi,
    address: AUTOBOT_ADDR,
    method: 'whitelistMintEnabled',
    args: [],
  }) ?? [false];

  return whitelistMintEnabled;
}

export function usePublicMint() {
  const abi = new Interface(OttoABI);
  const contract = new Contract(AUTOBOT_ADDR, abi);
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

export function useApproveFn(address: string) {
  const abi = new Interface(OttoABI);
  const contract = new Contract(address, abi);
  const { send, resetState, state } = useContractFunction(contract, 'approve', {});

  useEffect(() => {
    if (state.status === 'Success') {
      toast.success('Approved Successfully!');
      resetState();
    } else if (state.status === 'Exception' || state.status === 'Fail') {
      resetState();
      console.log(state.errorMessage);
      toast.error(state.errorMessage || 'Undefined error comes up!');
    }
  }, [state, resetState]);

  return {
    state,
    approve: send,
  };
}

export function useContractMethod(address: string, method: string) {
  const abi = new Interface(OttoABI);
  const contract = new Contract(address, abi);
  const { send, resetState, state } = useContractFunction(contract, method, {});

  useEffect(() => {
    if (state.status === 'Success') {
      toast.success('Transaction Success');
      resetState();
    } else if (state.status === 'Exception' || state.status === 'Fail') {
      resetState();
      console.log(state.errorMessage);
      toast.error(state.errorMessage || 'Undefined error comes up!');
    }
  }, [state, resetState]);

  return {
    state,
    send,
  };
}

export function useContractCallMethod(address: string | null, method: string) {
  const abi = new Interface(OttoABI);
  const contract = new Contract(AUTOBOT_ADDR, abi);
  const callRespnse = useCall({
    contract: contract,
    method: method,
    args: [address],
  });

  return callRespnse;
}

export function useCallMethod(address: string, method: string, args: any) {
  const abi = new Interface(OttoABI);
  const { value } =
    useCall({
      contract: new Contract(address, abi),
      method: method,
      args: args,
    }) ?? {};

  return Number(value?.[0] || 0);
}

export function useApprovedForAll(addresses: any, token: string, account: string | null) {
  const abi = new Interface(OttoABI);
  const [totalSupply] = useContractCall({
    abi,
    address: addresses[token],
    method: 'isApprovedForAll',
    args: account ? [{ owner: account }, { operator: AUTOBOT_ADDR }] : [],
  }) ?? [BIG_ZERO];
  if (account) {
    return totalSupply;
  } else {
    return false;
  }
}
