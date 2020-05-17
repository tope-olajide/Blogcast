const verifyInteger = (character: any) => {
  const integer = character.toString();
  const code = integer.charCodeAt(0);
  if (code > 47 && code < 58) {
    // numeric 0-9
    return true;
  }
  return false;
};
const verifyString = (character: any) => {
  const integer = character.toString();
  const code = integer.charCodeAt(0);
  if ((code > 96 && code < 123) || (code > 64 && code < 91)) {
    // lowercase alphabet
    return true;
  }
  return false;
};
const verifyMailCharacter = (character: any) => {
  character = character.toString();
  const code = character.charCodeAt(0);
  if (
    code !== 45 &&
    code !== 46 &&
    code !== 64 &&
    code !== 95 &&
    !verifyString(character) &&
    !verifyInteger(character)
  ) {
    return false;
  }
  return true;
};
export const validateIntegers = (
  integer:any,
  fieldName = "numbers",
  minLength = 1,
  maxLength = 300
) => {
  if (!integer) {
    return [
      false,
      `The length of ${fieldName} character provided must be between ${minLength} and ${maxLength}`
    ];
  }
  const int = integer.toString();
  const intArray = int.split("");
  if (intArray.length < minLength || intArray.length > maxLength) {
    return [
      false,
      `The length of ${fieldName} character provided must be between ${minLength} and ${maxLength}`
    ];
  }
  for (let i = 0, len = intArray.length; i < len; i += 1) {
    if (!verifyInteger(intArray[i])) {
      return [false, `Invalid ${fieldName}`];
    }
  }
  return true;
};

export const validateOnlyStringChars = (
  strings: any,
  fieldName: any = "string",
  minLength: any = 1,
  maxLength: any = 300
) : any=> {
  if (!strings) {
    return [
      false,
      `The length of ${fieldName} character must be between ${minLength} and ${maxLength}`
    ];
  }
  strings = strings.toString();
  const stringArray = strings.split("");
  if (stringArray.length < minLength || stringArray.length > maxLength) {
    return [
      false,
      `The length of ${fieldName} must be between ${minLength} and ${maxLength}`
    ];
  }
  for (let i = 0, len = stringArray.length; i < len; i += 1) {
    if (!verifyString(stringArray[i])) {
      return [false, `Invalid ${fieldName}`];
    }
  }
  return true;
};
export const validateInputCharLength = (
  string: any,
  fieldName:any = "string",
  minLength:any = 1,
  maxLength:any = 300
): any => {
  if (!string) {
    return [
      false,
      `The length of ${fieldName} character must be between ${minLength} and ${maxLength}`
    ];
  }
  const stringArray = string.toString();
  if (stringArray.length < minLength || stringArray.length > maxLength) {
    return [
      false,
      `The length of ${fieldName} character must be between ${minLength} and ${maxLength}`
    ];
  }
  return true;
};

export const validateEmailAddress = (email: any, minLength = 1, maxLength = 300): any => {
  if (!email) {
    return [false, "Invalid email address"];
  }
  email = email.toString();
  const emailArray = email.split("");
  // email address must contain @ and dot sign e.i .com or .com.ng
  if (emailArray.indexOf("@") === -1 || email.indexOf(".") === -1) {
    return [false, "Invalid email address"];
  }
  // email address must not contain 2 or more @ signs
  const newMailArray = email.split("@");
  if (newMailArray.length > 2) {
    return [false, "Invalid email address"];
  }
  if (emailArray.length < minLength || emailArray.length > maxLength) {
    return [
      false,
      `The length of email address provided must be between ${minLength} and ${maxLength}`
    ];
  }
  for (let i = 0, len = emailArray.length; i < len; i += 1) {
    if (!verifyMailCharacter(emailArray[i])) {
      return [false, "Invalid email address"];
    }
  }
  /* the only special characters allowed
(@ _ - . ) must not follow each other consecutively e.g, -- or __ or .. */
  if (
    emailArray[emailArray.indexOf(".") + 1] === "." ||
    emailArray[emailArray.indexOf("_") + 1] === "_" ||
    emailArray[emailArray.indexOf("-") + 1] === "-"
  ) {
    return [false, "Invalid email address"];
  }
  /* no special character must immediately follow the @ sign */
  if (
    emailArray[emailArray.indexOf("@") + 1] === "." ||
    emailArray[emailArray.indexOf("@") + 1] === "_" ||
    emailArray[emailArray.indexOf("@") + 1] === "-"
  ) {
    return [false, "Invalid email address"];
  }
  const code = emailArray[0].charCodeAt(0);
  if (code === 45 || code === 46 || code === 64 || code === 95) {
    return [false, "Invalid email address"];
  }
  return true;
};
