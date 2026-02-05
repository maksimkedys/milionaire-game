export const formatMoney = (amount: number): string =>
    `$${amount.toLocaleString('en-US')}`;
