/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: [
        "Sao Chingcha",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
        "sans-serif",
      ],
      serif: [
        "Sarabun",
        "ui-serif",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Apple Color Emoji",
        "Noto Color Emoji",
        "sans-serif",
      ],
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Apple Color Emoji",
        "Noto Color Emoji",
      ],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      gray: {
        DEFAULT: "#ebecf0",
        50: "#f6f7f8",
        100: "#ebecf0",
        200: "#dadce3",
        300: "#c0c4d0",
        400: "#a1a7b9",
        500: "#8a8ea7",
        600: "#797b97",
        700: "#6c6d89",
        800: "#5c5c71",
        900: "#4c4c5c",
        950: "#31313a",
      },
      white: "#fff",
      yellow: {
        DEFAULT: "#ffd700",
        50: "#ffffe7",
        100: "#feffc1",
        200: "#fffd86",
        300: "#fff441",
        400: "#ffe60d",
        500: "#ffd700",
        600: "#d19e00",
        700: "#a67102",
        800: "#89580a",
        900: "#74480f",
        950: "#442604",
      },
      blue: {
        DEFAULT: "#292d74",
        50: "#eef4ff",
        100: "#e0eaff",
        200: "#c7d7fe",
        300: "#a5bcfc",
        400: "#8197f8",
        500: "#6273f2",
        600: "#454ae6",
        700: "#3738cb",
        800: "#3033a3",
        900: "#292d74",
        950: "#1b1c4b",
      },
    },
    lineHeight: {
      DEFAULT: "1.5",
      1: "1",
      1.5: "1.5",
      1.6: "1.6",
    },
    spacing: {
      0: "0",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
      5: "5px",
      10: "10px",
      20: "20px",
      50: "50px",
      list: "2ch",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
      5: "5px",
    },
    borderRadius: {
      0: "0",
      1: "1px",
      2: "2px",
      3: "3px",
      4: "4px",
      5: "5px",
      10: "10px",
      full: "9999px",
    },
    extend: {
      screens: {
        "2xs": "375px",
        xs: "500px",
      },
      flex: {
        2: "2 2 0%",
      },
      backgroundSize: {
        stretch: "100% 100%",
      },
    },
  },
  plugins: [],
};