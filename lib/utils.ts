export const middleEllipsis = (str: string, len: number) => {
  if (!str) {
    return '';
  }

  return `${str.substr(0, len)}...${str.substr(str.length - len, str.length)}`;
};
export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const computePrize = (videoId: number, wheelPositions: number, activeBet: number): number => {
  switch (videoId) {
    case wheelPositions * 2 + 1:
      console.log('we should award a gift - agree on a gift === x6');
      return activeBet * 6;
    case wheelPositions * 2 + 2:
    case wheelPositions * 2 + 3:
    case wheelPositions * 2 + 4:
      console.log('All is lost');
      return -activeBet;
    case wheelPositions * 2 + 5:
      console.log('We should award a ticket, 100 will be a ticket');
      return 1;
    case wheelPositions * 2 + 6:
    case wheelPositions * 2 + 7:
    case wheelPositions * 2 + 8:
    case wheelPositions * 2 + 9:
      console.log('We should provide an X1 award');
      return activeBet;
    case wheelPositions * 2 + 10:
    case wheelPositions * 2 + 11:
    case wheelPositions * 2 + 12:
      console.log('We should provide an X2 award');
      return activeBet * 2;
    case wheelPositions * 2 + 13:
    case wheelPositions * 2 + 14:
      console.log('We should provide an X5 award');
      return activeBet * 5;
    default:
      console.log('No wheel, we shouldn\'t get here');
      return 0;
  }
}
export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // Ensures two decimal places
  }).format(number);
};
export const videoSources = [
  "/videos/start/S_W_Separate_Wood_Start_Gift_Box.mp4",
  "/videos/start/S_W_Separate_Wood_Start_No_Win_A.mp4",
  "/videos/start/S_W_Separate_Wood_Start_No_Win_B.mp4",
  "/videos/start/S_W_Separate_Wood_Start_No_Win_C.mp4",
  "/videos/start/S_W_Separate_Wood_Start_Ticket.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X1A.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X1B.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X1C.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X1D.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X2A.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X2B.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X2C.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X5A.mp4",
  "/videos/start/S_W_Separate_Wood_Start_X5B.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_Gift_Box.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_No_Win_A.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_No_Win_B.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_No_Win_C.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_Ticket.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X1A.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X1B.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X1C.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X1D.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X2A.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X2B.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X2C.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X5A.mp4",
  "/videos/stop/S_W_Separate_Wood_Stop_X5B.mp4",
  "/videos/result/S_W_Separate_Wood_Result_Gift_Box.mp4",
  "/videos/result/S_W_Separate_Wood_Result_No_Win_A.mp4",
  "/videos/result/S_W_Separate_Wood_Result_No_Win_B.mp4",
  "/videos/result/S_W_Separate_Wood_Result_No_Win_C.mp4",
  "/videos/result/S_W_Separate_Wood_Result_Ticket.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X1A.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X1B.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X1C.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X1D.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X2A.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X2B.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X2C.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X5A.mp4",
  "/videos/result/S_W_Separate_Wood_Result_X5B.mp4"
];
export const wheelPositions = 14;
export const predefinedBets = [5, 25, 50, 100];
