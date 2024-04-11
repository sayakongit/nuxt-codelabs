<script setup lang="ts">
const { page } = useContent();
const filteredData = ref([]);
const currentPage = ref(1);
const showTOC = ref(true);

for (let i = 0; i < page.value.body?.children.length; i++) {
  let ele = {};
  ele["title"] = page.value.body.children[i].children[0].value;
  ele["page"] = filteredData.value.length + 1;
  ele["data"] = [];
  i++;
  for (
    ;
    i < page.value.body.children.length &&
    page.value.body.children[i].tag !== "h1";
    i++
  ) {
    ele.data.push(page.value.body.children[i]);
  }
  i--;
  filteredData.value.push(ele);
}

const pageDetails = computed(() =>
  filteredData.value.find((data) => data.page === currentPage.value)
);

const onNextClick = () => {
  if (currentPage.value < filteredData.value.length) {
    currentPage.value++;
  }
};

const onPreviousClick = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const readingTime = (data) => {
  let strData = JSON.stringify(data);
  const wpm = 100;
  const words = strData.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
};
</script>

<template>
  <div
    class="mx-auto max-w-screen-xl px-4 md:my-10 my-5 flex md:flex-row flex-col md:gap-16 gap-4"
  >
    <div
      class="bg-slate-400 text-white md:hidden text-xl font-medium w-full h-max py-3 px-6 rounded-lg cursor-pointer"
      @click="showTOC = !showTOC"
    >
      Table of contents
    </div>
    <section
      class="bg-slate-100 md:w-4/12 w-full h-max p-6 rounded-lg flex flex-col gap-3"
      :class="[{ 'hidden md:flex': showTOC }]"
    >
      <div
        v-for="data in filteredData"
        class="w-full p-3 rounded-md text-lg font-medium cursor-pointer"
        :class="[{ 'bg-green-400 text-white': data.page <= currentPage }]"
        @click="currentPage = data.page"
      >
        {{ `${data.page}. ${data.title}` }}
      </div>
    </section>

    <main class="md:w-8/12 w-full">
      <div class="info border mb-8 px-6 py-4">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl">{{ pageDetails.title }}</h1>
          <h4>{{ readingTime(pageDetails.data) + " min" }}</h4>
        </div>

        <div
          v-for="(item, index) in pageDetails.data"
          :key="index"
          class="mb-4 content prose"
        >
          <ContentRenderer :value="item">
            <ContentRendererMarkdown :value="item"></ContentRendererMarkdown>
          </ContentRenderer>
        </div>
      </div>

      <div class="btn-container flex items-center justify-between">
        <button
          class="bg-slate-400 rounded text-white py-2 px-4"
          :class="[{ invisible: currentPage === 1 }]"
          @click="onPreviousClick"
        >
          Previous
        </button>
        <button
          class="bg-green-400 rounded text-white py-2 px-4"
          :class="[{ invisible: currentPage === filteredData.length }]"
          @click="onNextClick"
        >
          Next
        </button>
      </div>
    </main>
  </div>
</template>

<style>
.content {
  line-height: 1.6;
}

.content a {
  color: blue;
  text-decoration: underline;
}

/* .content code {
  background: rgb(209, 255, 234);
} */
</style>
