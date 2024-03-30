<template>
  <div>
    <h1>STEVEN ET GAEL LPB</h1>
    <button @click="home">Home</button>
    <select v-model="selectedQuestionnaireId" @change="showQuestionnaireDetails">
      <option v-for="questionnaire in questionnaires" :key="questionnaire.id" :value="questionnaire.id">
        {{ questionnaire.name }}
      </option>
    </select>
    <Questionnaire v-if="selectedQuestionnaire" :questionnaire="selectedQuestionnaire" @update="update"/>
    <button @click="setStatut('Delete')">Supprimer un questionnaire</button>
    <button @click="setStatut('Add')">Ajouter un questionnaire</button>
  </div>
  <div v-if="status === 'Delete'">
  <h3>Supprimer un questionnaire</h3>
    <select ref="questionnaireSupId">
      <option disabled value="null">Sélectionnez un questionnaire</option>
      <option v-for="questionnaire in questionnaires" :key="questionnaire.id" :value="questionnaire.id">
        {{ questionnaire.name }}
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
import {
  get_all_questionnaires,
  delete_questionnaire,
  create_questionnaire
} from './api.js';

export default {
  components: {
    Questionnaire
  },
  data() {
    return {
      questionnaires: [],
      questions: [],
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
    setStatut(statut) {
      this.status = statut;
    },
    async getQuestionnaires() {
      this.questionnaires = await get_all_questionnaires();
      console.log("test", this.questionnaires);
    },
    async deleteQuestionnaire() {
      const questionnaireId = this.$refs.questionnaireSupId.value;
      await delete_questionnaire(questionnaireId);
      await this.update();
    },
    async addQuestionnaire() {
      const nomQuestionnaire = this.$refs.nomQuestionnaire.value;
      const questionnaire = {
        name: nomQuestionnaire
      };
      await create_questionnaire(questionnaire);
      await this.update();
    },
    async update() {
      await this.getQuestionnaires();
    }
  },
  async created() {
    await this.getQuestionnaires();
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
