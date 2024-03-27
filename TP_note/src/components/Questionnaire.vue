<template>
  <div>
    <h2>{{ questionnaire.nom }}</h2>
    <ul>
      <li v-for="questionId in questionnaire.questionsId" :key="questionId">
        <Question :question="getQuestionById(questionId)" @optionSelected="optionSelected" />
      </li>
    </ul>
    <button @click="ajouterQuestionForm">Ajouter une question</button>
    <button @click="supprimerQuestionForm">Supprimer une question</button> <!-- Correction ici -->
  </div>
  <div v-if="status === 'ajouter'">
    <h3>Ajouter une question</h3>
    <input type="text" placeholder="Question" ref="textQuestion"/>
    <input type="text" placeholder="Option 1" ref="textChoice1"/>
    <input type="text" placeholder="Option 2" ref="textChoice2"/>
    <button @click="ajouterQuestion">Ajouter</button>
  </div>
  <div v-if="status === 'supprimer'">
    <h3>Supprimer une question</h3>
    <select id="questionSupId">
      <option disabled value="null">Sélectionnez une question</option>
      <option v-for="questionId in questionnaire.questionsId" :key="questionId" :value="questionId">
        {{ getQuestionById(questionId).text }}
      </option>
    </select>
    <button @click="supprimerQuestion">Supprimer</button> <!-- Correction ici -->
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
    nextId() {
      const ids = this.questions.map(question => question.id);
      return Math.max.apply(null, ids) + 1;
    },
    getQuestionById(id) {
      return this.questions.find(question => question.id === id);
    },
    optionSelected(option) {
      console.log("Option sélectionnée :", option);
    },
    ajouterQuestionForm() {
      this.status = 'ajouter';
    },
    ajouterQuestion() {
      const id = this.nextId();
      const textQuestion = this.$refs.textQuestion.value;
      const textChoice1 = this.$refs.textChoice1.value;
      const textChoice2 = this.$refs.textChoice2.value;

      this.questions.push({
        id: id,
        text: textQuestion || "Question sans texte",
        options: [textChoice1, textChoice2]
      });
      this.questionnaire.questionsId.push(id);
    },
    supprimerQuestionForm() {
      this.status = 'supprimer';
    },
    supprimerQuestion() {
      if(questionSupId.value === "null") {
        alert("Veuillez sélectionner une question à supprimer");
      } else {
        this.questionnaire.questionsId = this.questionnaire.questionsId.filter(id => id != questionSupId.value);
      }
    },
  }
};
</script>

<style scoped>
/* Styles CSS */
</style>
