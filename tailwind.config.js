module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      backgroundColor: ["active"],
      padding: {
        "ty": "42px",
        "main-t": "63px",
        "main-b": "148px",
        "main-x": "90px",
        "arrow": "27px",
        "page-y": "10px",
        "page-x": "20px",
        "btn-y": "7px",
        "btn-x": "21px",
        "15px": "15px;",
        "61": "61px",
        "57":"57px",
        "53": "53px",
        "11":"11px",
      },
      margin: {
        "arrow": "27px",
        "thumbnailImage": "6",
        "thumbnailListMax": "24px",
        "thumbnailListMin": "4px",
        "52": "52px",
        "40": "40px",
        "32": "32px",
        "30": "30px",
        "35": "35px",
        "20": "20px",
        "15": "15px"
      },
      flex: {
        "0": "0",
        "1": "1",
        "2": "2",
        "full": "0 0 100%"
      },
      gap: {
        "prodPage": "4.5rem",
        "mainMin": "20px",
        "30px": "30px",
        "10":"10px",
        "14": "14px"
      },
      width: {
        "arrow": "12px",
        "thumbWidth": "97px"
      },
      height: {
        "arrow": "12px"
      },
      zIndex: {
        "full": "999999"
      }
    },
    backgroundColor: theme => ({
      ...theme("colors")
    }),
    screens: {
      // => @media (max-width: max) { ... }
      "max-2xl": { "max": "1535px" },
      "max-xl": { "max": "1279px" },
      "max-lg": { "max": "1023px" },
      "max-md": { "max": "767px" },
      "max-sm": { "max": "639px" },
      "max-500": { "max": "500px" },
      // => @media (min-width: min) { ... }
      "min-2xl": { "min": "1535px" },
      "min-xl": { "min": "1279px" },
      "min-lg": { "min": "1023px" },
      "min-md": { "min": "767px" },
      "min-sm": { "min": "639px" }
    },
    minWidth: {
      "586": "586px",
      "169": "169px",
      "153": "153px",
    },
    maxWidth: {
      "slide": "586px",
      "thumbnail": "97px",
      "page": "1344px",
      "223": "223px",
      "141": "141px",
      "500": "500px",
      "450": "450px"
    },
    maxHeight: {
      "logo": "39px",
      "90": "90%"
    },
    fontFamily: {
      body: ["Inter"]
    },
    fontSize: {
      "xs": ".75rem",
      "sm": ".875rem",
      "tiny": ".875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem"
    },
    borderColor: theme => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.300", "currentColor"),
      "header": "#E5E5E5"
    })
  },
  variants: {
    extend: {}
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio")
  ]
};
