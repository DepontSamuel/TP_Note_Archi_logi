<template>
  <div>
    <h1>STEVEN ET GAEL LPB</h1>
    <button @click="home">Home</button>
    <select v-model="selectedQuestionnaireId" @change="showQuestionnaireDetails">
      <option disabled value="null">Sélectionnez un questionnaire</option>
      <option v-for="questionnaire in questionnaires" :key="questionnaire.id" :value="questionnaire.id">
        {{ questionnaire.nom }}
      </option>
    </select>
    <Questionnaire v-if="selectedQuestionnaire" :questionnaire="selectedQuestionnaire" :questions="questions" />
    <button @click="setStatut('Delete')">Supprimer un questionnaire</button>
    <button @click="setStatut('Add')">Ajouter un questionnaire</button>
  </div>
  <div v-if="status === 'Delete'">
  <h3>Supprimer un questionnaire</h3>
    <select ref="questionnaireSupId">
      <option disabled value="null">Sélectionnez un questionnaire</option>
      <option v-for="questionnaire in questionnaires" :key="questionnaire.id" :value="questionnaire.id">
        {{ questionnaire.nom }}
      </option>
    </select>
    <button @click="deleteQuestionnaire">Supprimer</button>
  </div>
  <div v-if="status === 'Add'">
    <h3>Ajouter un questionnaire</h3>
    <input type="text" placeholder="Nom du questionnaire" ref="nomQuestionnaire" />
    <button @click="addQuestionnaire">Ajouter</button>
  </div>
</template>

<script>
import Questionnaire from './components/Questionnaire.vue';
import * as api from './api.js'

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
      selectedQuestionnaireId: null,
      status : 'Default',
    };
  },
  computed: {
    selectedQuestionnaire() {
      return this.questionnaires.find(q => q.id === this.selectedQuestionnaireId);
    }
  },
  methods: {
    home () {
      this.selectedQuestionnaireId = null;
      this.status = 'default';
    },
    addQuestionnaire() {
      const ids = this.questionnaires.map(questionnaire => questionnaire.id);
      const new_id = Math.max.apply(null, ids) + 1;
      const nom = this.$refs.nomQuestionnaire.value;
      this.questionnaires.push({ new_id, nom, questionsId: [] });
      this.selectedQuestionnaireId = new_id;
    },
    deleteQuestionnaire() {
      const selectedQuestionnaireId = this.$refs.questionnaireSupId.value;
      this.questionnaires = this.questionnaires.filter(q => q.id != selectedQuestionnaireId);
      this.selectedQuestionnaireId = null;
    },
    setStatut(statut) {
      this.status = statut;
    },
  }
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
