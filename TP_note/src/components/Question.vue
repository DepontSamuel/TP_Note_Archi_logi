<template>
    <div>
      <p class="question-text">{{ question.text }}</p>
      <ul>
        <li v-for="(option, index) in question.options" :key="index">
          <label class="option-label">
            <input type="radio" :value="option" :name="'question_' + question.id" @change="selectOption(option)" />
            {{ option }}
          </label>
        </li>
      </ul>
      <button @click="modifQuestionForm">Modifier la question</button>
    </div>
    <div v-if="status === 'modifier'">
      <div>
        <h3>Modifier la question</h3>
        <input type="text" placeholder="Question" ref="textQuestion" :value="question.text" />
        <button @click="modifTitreQuestion">Modifier</button>
      </div>
      <div>
        <h3>Ajouter</h3>
        <input type="text" placeholder="Option" ref="textChoice" />
        <button @click="addChoice">Ajouter</button>
      </div>
      <div>
        <h3>Supprimer</h3>
        <select ref="choiceSup">
          <option disabled value="null">Sélectionnez un choix</option>
          <option v-for="option in question.options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <button @click="deleteChoice">Supprimer</button>
      </div>
    </div>
  </template>
  
  <script>
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
      selectOption(option) {
        this.$emit('optionSelected', option);
      },
      modifQuestionForm() {
        this.status = 'modifier';
      },
      returnForm() {
        this.status = 'default';
      },
      modifTitreQuestion() {
        this.question.text = this.$refs.textQuestion.value;
      },
      deleteChoice() {
        const selectedOption = this.$refs.choiceSup.value;
        if (selectedOption === "null") {
          alert("Veuillez sélectionner une option à supprimer");
        } else {
          this.question.options = this.question.options.filter(option => option !== selectedOption);
        }
      },
      addChoice() {
        this.question.options.push(this.$refs.textChoice.value);
      }
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
  