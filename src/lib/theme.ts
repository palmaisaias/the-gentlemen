// Simple OOP theme tokens to keep visuals centralized.
export type Palette = {
  bg: string
  text: string
  gold: string
  green: string
  oxblood: string
  cream: string
}

export class Theme {
  readonly palette: Palette = {
    bg: '#0B0B0B',
    text: '#F3E9D2',
    gold: '#C4A44F',
    green: '#0E2F20',
    oxblood: '#4A1F1A',
    cream: '#F3E9D2',
  }
  titleFont = 'Cormorant Garamond, serif'
  bodyFont = 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"'
}
export const theme = new Theme()
