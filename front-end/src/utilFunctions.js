
export const priceFormatter = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'});

export const ellipsis = (text, maxLen) => text.length>maxLen?text.substr(0,maxLen-3)+"...":text;