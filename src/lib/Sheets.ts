export type Sheet = { id: string; title: string; notes: string }

export const noteDictionary: Record<string, string> = {
  // C4 - B4
  "1": "C4",
  "2": "D4",
  "3": "E4",
  "4": "F4",
  "5": "G4",
  "6": "A4",
  "7": "B4",

  // C5 - B5
  "1'": "C5",
  "2'": "D5",
  "3'": "E5",
  "4'": "F5",
  "5'": "G5",
  "6'": "A5",
  "7'": "B5",

  // C6
  "1''": "C6",
}


export const sheets: Sheet[] = [
  {
    id: "twinkle",
    title: "Twinkle Twinkle",
    notes:
      "1 1 5 5 6 6 5 . 4 4 3 3 2 2 1 . 5 5 4 4 3 3 2 . 5 5 4 4 3 3 2 . 1 1 5 5 6 6 5 . 4 4 3 3 2 2 1",
  },
  {
    id: "birthday",
    title: "Happy Birthday",
    notes:
      "5 5 6 5 1' 7 . 5 5 6 5 2' 1' . 5 5 5' 3' 1' 7 6 . 4' 4' 3' 1' 2' 1'",
  },
  {
    id: "ode",
    title: "Ode to Joy",
    notes: "3 3 4 5 5 4 3 2 1 1 2 3 3 . 2 2 . 3 3 4 5 5 4 3 2 1 1 2 3 2 . 1 1",
  },
  {
    id: "lord_in_the_morning",
    title: "Lord, in the Morning",
    notes:"1 5 . 5 3 . 3 1 . 3 2 . 2 3 . 1 . 5 4 5 . 5 6 . 5 5 . 1 4 . 3 2 . 1 5 . 3 4 . 2 1 ."
  }
]