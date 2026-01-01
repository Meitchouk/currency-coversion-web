/**
 * Translation mappings for HomePage components
 * Maps component props to translation keys from messages files
 */

type Messages = {
  form: {
    from: string;
    to: string;
    amount: string;
    swap: string;
    selectCurrency: string;
    enterAmount: string;
  };
  tooltips: {
    swap: string;
    refresh: string;
  };
  actions: {
    refresh: string;
    refreshing: string;
  };
  history: {
    range: string;
    '7days': string;
    '30days': string;
    '90days': string;
    '6months': string;
    '1year': string;
  };
};

export const getConversionFormTranslations = (t: Messages) => ({
  from: t.form.from,
  to: t.form.to,
  amount: t.form.amount,
  swap: t.form.swap,
  selectCurrency: t.form.selectCurrency,
  enterAmount: t.form.enterAmount,
  swapTooltip: t.tooltips.swap,
});

export const getRefreshButtonTranslations = (t: Messages) => ({
  refresh: t.actions.refresh,
  refreshing: t.actions.refreshing,
  tooltip: t.tooltips.refresh,
});

export const getHistoryRangeSelectorTranslations = (t: Messages) => ({
  label: t.history.range,
  '7days': t.history['7days'],
  '30days': t.history['30days'],
  '90days': t.history['90days'],
  '6months': t.history['6months'],
  '1year': t.history['1year'],
});
