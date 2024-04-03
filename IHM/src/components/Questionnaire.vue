<template>
  <div>
    <h2>{{ questionnaire.nom }}</h2>
    <ul>
      <li v-for="question in questionnaire.questions" :key="questionId">
        <Question :question="question" @update="update"/>
      </li>
    </ul>
    <button @click="ajouterQuestionForm">Ajouter une question</button>
    <button @click="supprimerQuestionForm">Supprimer une question</button> <!-- Correction ici -->
  </div>
  <div v-if="status === 'ajouter'">
    <h3>Ajouter une question</h3>
    <input type="text" placeholder="Question" ref="textQuestion"/>
    <button @click="ajouterQuestion">Ajouter</button>
  </div>
  <div v-if="status === 'supprimer'">
    <h3>Supprimer une question</h3>
    <select id="questionSupId">
      <option disabled value="null">Sélectionnez une question</option>
      <option v-for="question in questionnaire.questions" :key="question.id" :value="question.id">
        {{ question.title }}
      </option>
    </select>
    <button @click="supprimerQuestion">Supprimer</button>
  </div>
</template>

<script>
import Question from './Question.vue';
import {
    create_question,
    delete_question,
  } from './../api.js';

export default {
  emits: ['update'],
  data() {
    return {
      status: 'default',
      questionId: null
    };
  },
  props: {
    questionnaire: Object,
    questions: Array
  },
  components: {
    Question
  },
  methods: {
    ajouterQuestionForm() {
      this.status = 'ajouter';
    },
    async ajouterQuestion() {
      const textQuestion = this.$refs.textQuestion.value;
      const question = {
        title: textQuestion,
        questionnaire_id: this.questionnaire.id
      };

      await create_question(question);
      this.$emit('update');
    },
    supprimerQuestionForm() {
      this.status = 'supprimer';
    },
    async supprimerQuestion() {
      const questionId = document.getElementById('questionSupId').value;
      await delete_question(questionId)
      this.$emit('update');
    },
    async update() {
      this.$emit('update');
    }
  }
};
</script>

<style scoped>
/* Styles CSS */
</style>
