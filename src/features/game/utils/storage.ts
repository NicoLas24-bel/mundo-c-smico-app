let sessionState: any = null;

export const saveProgress = (state: any) => {
  try {
    sessionState = JSON.parse(JSON.stringify(state));
  } catch (error) {
    console.error("Error saving to sessionState:", error);
  }
};

export const loadProgress = () => {
  return sessionState;
};

export const clearProgress = () => {
  sessionState = null;
};
