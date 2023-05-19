import React from 'react'
import classes from './Connected.module.css';
import { utils } from 'ethers';
import { addressShortner } from '../../utils';
const Connected = ({celo_balance, address}) => {
  console.log(celo_balance, address)
  return (
    <div className= {classes.root}>
        <div className= {classes.token_bal}>{celo_balance && Number(utils.formatUnits(celo_balance, 18)).toFixed(4)} CELO</div>
        <div className= {classes.address}>{address && addressShortner(address, true)}</div>
    </div>
  )
}

export default Connected