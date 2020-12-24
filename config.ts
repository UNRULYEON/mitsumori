import { Config } from "./types"

const config: Config = {
  name: 'mitsumori',
  default_deck: 'Fibonacci',
  decks: [
    {
      name: 'Fibonacci',
      cards: [
        { value: '0', numeric_value: 0 },
        { value: '1/2', numeric_value: 0.5 },
        { value: '1', numeric_value: 1 },
        { value: '2', numeric_value: 2 },
        { value: '3', numeric_value: 3 },
        { value: '5', numeric_value: 5 },
        { value: '8', numeric_value: 8 },
        { value: '13', numeric_value: 13 },
        { value: '20', numeric_value: 20 },
        { value: '40', numeric_value: 40 },
        { value: '100', numeric_value: 100 },
        { value: '∞' },
        { value: '?' },
        { value: '☕' },
      ]
    },
    {
      name: 'Original Fibonacci',
      cards: [
        { value: '0', numeric_value: 0 },
        { value: '1/2', numeric_value: 0.5 },
        { value: '1', numeric_value: 1 },
        { value: '2', numeric_value: 2 },
        { value: '3', numeric_value: 3 },
        { value: '5', numeric_value: 5 },
        { value: '8', numeric_value: 8 },
        { value: '13', numeric_value: 13 },
        { value: '21', numeric_value: 21 },
        { value: '34', numeric_value: 34 },
        { value: '55', numeric_value: 55 },
        { value: '89', numeric_value: 89 },
      ]
    }
  ]
}

export default config