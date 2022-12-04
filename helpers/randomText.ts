const characters = "abcdefghijklmnopqrstuvwxyz";

export const randomText = (maxLength = 15) => {
  let str = "";
  const length = Math.floor(Math.random() * maxLength);

  for (let i = 0; i < length; i++) {
    if (Math.random() < 0.2) {
      str += " ";
    } else {
      str += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  }

  return str;
};
