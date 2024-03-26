<template>
    <div>
      <h2>{{ questionnaire.nom }}</h2>
      <ul>
        <li v-for="questionId in questionnaire.questionsId" :key="questionId">
          <Question :question="getQuestionById(questionId)" @optionSelected="optionSelected" />
        </li>
      </ul>
      <button @click="ajouterQuestion">Ajouter une question</button>
      <button @click="supprimerQuestion">Supprimer une question</button>
    </div>
    <div v-if="status === 'ajouter'">
        <h3>Ajouter une question</h3>
        <input type="text" placeholder="Question" />
        <input type="text" placeholder="Option 1" />
        <input type="text" placeholder="Option 2" />
        <button>Ajouter</button>
    </div>
    <div v-if="status === 'supprimer'">
        <h3>Supprimer une question</h3>
        <select>
            <option disabled value="null">Sélectionnez une question</option>
            <option v-for="question in questions" :key="question.id" :value="question.id">
                {{ question.text }}
            </option>
        </select>
        <button>Supprimer</button>
    </div>
  </template>
  
  <script>
  import Question from './Question.vue';
  
  export default {
    data() {
        return {
            status: 'default'
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
        getQuestionById(id) {
            return this.questions.find(question => question.id === id);
        },
        optionSelected(option) {
            console.log("Option sélectionnée :", option);
        },
        ajouterQuestion() {
            this.status = 'ajouter';
        },
        supprimerQuestion() {
            this.status = 'supprimer';
        }
    }
  };
  </script>
  
  <style scoped>
  /* Styles CSS */
  </style>
  