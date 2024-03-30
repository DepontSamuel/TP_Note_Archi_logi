<template>
    <div>
      <p class="question-text">{{ question.text }}</p>
      <ul>
        <label type="text">{{ question.title }}</label>
      </ul>
      <button @click="modifQuestionForm">Modifier la question</button>
    </div>
    <div v-if="status === 'modifier'">
        <h3>Modifier la question</h3>
        <input type="text" placeholder="Question" ref="textQuestion" :value="question.text" />
        <button @click="modifTitreQuestion">Modifier</button>
    </div>
  </template>
  
  <script>
  import {
    update_question,
  } from './../api.js';

  export default {
    data() {
      return {
        status: 'default'
      };
    },
    props: {
      question: Object
    },
    methods: {
      modifQuestionForm() {
        this.status = 'modifier';
      },
      returnForm() {
        this.status = 'default';
      },
      modifTitreQuestion() {
        update_question(this.$refs.textQuestion.value, this.question.questionnaire_id, this.question.id);
        this.$emit('update');
      },
    }
  };
  </script>
  
  <style scoped>
  /* Styles CSS */
  .question-text {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .option-label {
    display: block;
    margin-bottom: 5px;
  }
  
  .option-label input {
    margin-right: 5px;
  }
  </style>
  