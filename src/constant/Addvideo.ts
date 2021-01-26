const maxTagCount = 5;
const maxTagLength = 10;
const titleMaxLength = 100;
const titleMinLength = 2;
const descriptionMaxLength = 250;
const tagAllowedPattern = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-zA-Z|0-9]*$/;

export {
  maxTagCount,
  maxTagLength,
  titleMaxLength,
  titleMinLength,
  descriptionMaxLength,
  tagAllowedPattern,
};