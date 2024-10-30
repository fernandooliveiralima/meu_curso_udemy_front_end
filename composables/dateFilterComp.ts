import dayjs from "dayjs";

import type {transactionType} from '@/types/transactions/transactionType';

export const filterListByTime = (date: string, list: Array<transactionType> )=>{
  let newListTransactions: Array<transactionType> = [];

  for(let iterator of list){
    if( dayjs(date).isSame( dayjs(iterator.transaction_date), 'year' ) ){
      newListTransactions.push(iterator);
    }
  }

  return newListTransactions;

};