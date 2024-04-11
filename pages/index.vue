<template>
  <div
    class="my-10 px-4 max-w-screen-xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-10"
  >
    <ContentList path="/" v-slot="{ list }">
      <div
        v-for="article in list"
        :key="article._path"
        class="border border-green-400 p-4 rounded-lg"
      >
        <h2
          class="text-3xl font-medium mb-3 hover:text-green-400 transition-colors"
        >
          <NuxtLink :to="article.slug">{{ article.title }}</NuxtLink>
        </h2>
        <h4 class="mb-3 text-slate-400">{{ article.date }}</h4>
        <p class="text-lg text-slate-700">{{ article.description }}</p>
      </div>
    </ContentList>
  </div>
</template>

<script setup></script>
