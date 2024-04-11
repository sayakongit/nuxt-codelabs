import tailwindTypography from "@tailwindcss/typography";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],
  devtools: { enabled: true },
  content: {
    documentDriven: true,
  },
  tailwindcss: {
    config: {
      plugins: [tailwindTypography],
    },
  },
});
