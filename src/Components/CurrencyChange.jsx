import React from "react";

const CurrencyChange = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default CurrencyChange;
