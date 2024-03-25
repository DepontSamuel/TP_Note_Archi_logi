<script>
import Questionnaire from './components/Questionnaire.vue';
import Question from './components/Question.vue';

export default {
  data() {
    return {
      components: {
        Questionnaire,
        Question
      },
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
    editQuestionText(id, text) {
      const question = this.questions.find(q => q.id === id);
      if (question) {
        question.text = text;
      }
      
    },
    addQuestion(id, text, options) {
      this.questions.push({ id, text, options });
    },
    addQuestionnaire(id, nom, questions) {
      this.questionnaire.push({ id, nom, questions });
    },
    addQuestionQuestionnaire(id, idQuestion) {
      const questionnaire = this.questionnaire.find(q => q.id === id);
      if (questionnaire) {
        questionnaire.questions.push(idQuestion);
      }
    },
    deleteQuestionQuestionnaire(id, idQuestion) {
      const questionnaire = this.questionnaire.find(q => q.id === id);
      if (questionnaire) {
        questionnaire.questions.splice(idQuestion, 1);
      }
    },
    deleteQuestion(id) {
      this.questions.splice(id, 1);
    },
    deleteQuestionnaire(id) {
      this.questionnaire.splice(id, 1);
    },
    getQuestionText(id) {
      const question = this.questions.find(q => q.id === id);
      return question ? question.text : '';
    }
  }
};

</script>

<template>
  <main>
    <div v-for="questionnaire in questionnaire" :key="questionnaire.id">
      <h2>{{ questionnaire.nom }}</h2>
      <ul>
        <li v-for="questionId in questionnaire.questions" :key="questionId">
          {{ getQuestionText(questionId) }}
        </li>
      </ul>
    </div>
  </main>

  <!-- <main>
    <TheWelcome />
  </main> -->
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
