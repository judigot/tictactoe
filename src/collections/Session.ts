export interface ScoreBoard {
  winner: number;
  board: Array<(boolean | string)[]>;
}

export interface GameData {
  player1: string;
  player2: string;
  scoreBoard: ScoreBoard[];
  date?: Date;
}

export const getSessions = async () => {
  let data: GameData[] = [];

  try {
    const response = await fetch(`http://judigot.com:5000/getSessions`, {
      // *GET, POST, PATCH, PUT, DELETE
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*", // Same as axios
        "Content-Type": "application/json",
      },
      // For POST/PUT requests
      // body: JSON.stringify({ key: "value" }),
    });
    if (response?.ok) {
      data = response.json() as unknown as GameData[];
    } else {
      throw new Error(`HTTP error: ${response}`);
    }
  } catch (error: unknown) {
    if (typeof error === `string`) {
      throw new Error(`There was an error: ${error}`);
    }
    if (error instanceof Error) {
      throw new Error(`There was an error: ${error.message}`);
    }
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      throw new Error(`Syntax Error: ${error}`);
    }
  }

  // Success
  if (data) {
    return data;
  }
};

export const insertSession = async (session: GameData) => {
  let data: object | object[] | undefined = undefined;

  try {
    const response = await fetch(`http://judigot.com:5000/insertSession`, {
      // *GET, POST, PATCH, PUT, DELETE
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*", // Same as axios
        "Content-Type": "application/json",
      },
      // For POST/PUT requests
      body: JSON.stringify(session),
    });
    if (response?.ok) {
      data = response.json();
    } else {
      throw new Error(`HTTP error: ${response}`);
    }
  } catch (error: unknown) {
    if (typeof error === `string`) {
      throw new Error(`There was an error: ${error}`);
    }
    if (error instanceof Error) {
      throw new Error(`There was an error: ${error.message}`);
    }
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      throw new Error(`Syntax Error: ${error}`);
    }
  }

  // Success
  if (data) {
    return data;
  }
};
