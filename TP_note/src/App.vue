<template>
  <div>
    <h1>STEVEN LPB</h1>
    <select v-model="selectedQuestionnaireId" @change="showQuestionnaireDetails">
      <option disabled value="null">Sélectionnez un questionnaire</option>
      <option v-for="questionnaire in questionnaires" :key="questionnaire.id" :value="questionnaire.id">
        {{ questionnaire.nom }}
      </option>
    </select>
    <Questionnaire v-if="selectedQuestionnaire" :questionnaire="selectedQuestionnaire" :questions="questions" />
  </div>
</template>

<script>
import Questionnaire from './components/Questionnaire.vue';

export default {
  components: {
    Questionnaire
  },
  data() {
    return {
      questionnaires: [
        { id: 1, nom: 'Questionnaire 1', questionsId: [1, 2] },
        { id: 2, nom: 'Questionnaire 2', questionsId: [3, 4] }
      ],
      questions: [
        { id: 1, text: 'Question 1', options: ['Option 1', 'Option 2'] },
        { id: 2, text: 'Question 2', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: 3, text: 'Question 3', options: ['Option 1', 'Option 2'] },
        { id: 4, text: 'Question 4', options: ['Option 1', 'Option 2', 'Option 3'] }
      ],
      selectedQuestionnaireId: null
    };
  },
  computed: {
    selectedQuestionnaire() {
      return this.questionnaires.find(q => q.id === this.selectedQuestionnaireId);
    }
  },
};
</script>

<style scoped>
/* Styles CSS */
select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-top: 20px;
}
</style>
