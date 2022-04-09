
export const sleep = ms => new Promise(r => setTimeout(r, ms));

export const genNameFromPlaceHolder = field => field.placeholder.toLocaleLowerCase().replace(/ /g, '_')