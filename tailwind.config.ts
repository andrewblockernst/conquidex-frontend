//SE BUSCO 

import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        // Mobile-first approach: PUNTOS DE QUIEBRE PARA MEDIA QUERIES -> SABER EN QUE MOMENTO CAMBIA LA RESOLUCION DE LA PANTALLA
        sm: "640px", // Small screens 
        md: "768px", // Medium screens
        lg: "1024px", // Large screens
        xl: "1280px", // Extra-large screens
      },
      spacing: {
        // Define espaciados globales reusables -> A CHEQUEAR
        xs: "0.5rem", // 8px
        sm: "1rem", // 16px
        base: "1.5rem", // 24px
        lg: "2rem", // 32px
        xl: "3rem", // 48px
      },
      container: {
        center: true, // CONTENEDORES QUE SE CENTRAN
        padding: "1rem", 
      },
      fontSize: {
        //CONVERSIONES DE FUENTES DE PIXELES A REM
        sm: ["0.875rem", "1.25rem"], // 14px, línea 20px
        base: ["1rem", "1.5rem"], // 16px, línea 24px
        lg: ["1.125rem", "1.75rem"], // 18px, línea 28px
        xl: ["1.25rem", "1.75rem"], // 20px, línea 28px
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), //ESTILIZACION DE FORMULARIOS EN CASO DE NECESITARLO (YA QUE VAMOS A ESTAR USANDO VARIOS FORMS)
  ],
} satisfies Config;
