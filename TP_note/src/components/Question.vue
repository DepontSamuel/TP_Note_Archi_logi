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
    </div>
  </template>
  
  <script>
  export default {
    props: {
      question: Object
    },
    methods: {
      selectOption(option) {
        this.$emit('optionSelected', option);
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
  