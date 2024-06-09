/* 
  File: utils.js

  Author: Alec Lahey

  Description: This file contains the currencyFormatter to format the currency in the application and 
               display in Canadian dollars.
*/

export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency : "cad",
    style: "currency",
    minimumFractionDigits: 0
})