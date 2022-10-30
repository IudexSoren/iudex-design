/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "be-vietnam": ["Be Vietnam", "sans-serif"],
        "ibm-plex-sans": ["IBM Plex Sans", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: [
      "lofi",
      "forest",
      "winter",
      {
        "ix-light-primary": {
          primary: "#0f62fe",
          secondary: "#393939",
          accent: "#a5f3fc",
          neutral: "#f3f4f6",
          "base-100": "#ffffff",
          "base-200": "#f4f4f4",
          "base-300": "#bcc2cd",
          "base-400": "#161616",
          info: "#0ea5e9",
          success: "#16a34a",
          warning: "#eab308",
          error: "#da1e28",
          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "0rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
