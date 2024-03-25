<script>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

export default {
  data() {
    return {
      questions: [
        { id: 1, text: 'Question 1', options: ['Option 1', 'Option 2'] },
        { id: 2, text: 'Question 2', options: ['Option 1', 'Option 2', 'Option 3'] }
      ],
      questionnaire: [
        { id: 1, nom: 'Questionnaire 1', questions : [1, 2]}
      ]
    };
  },
  methods: {
    editQuestion(index) {
      // Logique pour modifier la question
    },
    deleteQuestion(index) {
      this.questions.splice(index, 1);
    },
    addQuestion() {
      if (this.newQuestionText.trim() !== '') {
        this.questions.push({ text: this.newQuestionText, options: [] });
        this.newQuestionText = '';
      }
    }
  }
};

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
