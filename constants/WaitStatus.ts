type WaitStatus = {
  message: string;
  color: string;
};

type WaitStatuses = {
  [key: string]: WaitStatus;
};

const waitStatuses: WaitStatuses = {
  "0": { message: "空いています", color: "blue" },
  "1-15": { message: "それほど混んでいません", color: "green" },
  "16-30": { message: "少し混んでいます", color: "yellow" },
  "31-": { message: "大変混んでいます", color: "red" },
};
export const getWaitStatus = (waitTime: number): WaitStatus => {
  for (const range in waitStatuses) {
    const [min, max] = range.split("-").map(Number);
    if (
      (min === 0 || waitTime >= min) &&
      (max === undefined || waitTime <= max)
    ) {
      return waitStatuses[range];
    }
  }
  return { message: "Status unknown", color: "gray" };
};
