export function separateNum(num: number) {
  var number = typeof num === "number" ? num.toString() : num;
  return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + ",");
}

export function delay(ms: number): Promise<number> {
  return new Promise((resolve) => setTimeout(() => resolve(2), ms));
}

export function convertMinsToHrsMins(minutes: number) {
  var h = Math.floor(minutes / 60);
  var m = minutes % 60;
  //@ts-ignore
  h = h < 10 ? "0" + h : h;
  //@ts-ignore
  m = m < 10 ? "0" + m : m;
  return h + "h" + " " + m + "min";
}
