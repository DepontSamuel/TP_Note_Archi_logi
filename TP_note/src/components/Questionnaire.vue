<template>
    <div>
        <h1>Questionnaire</h1>
        <div v-for="question in questions" :key="question.id">
            <h2>{{ question.text }}</h2>
            <ul>
                <li v-for="option in question.options" :key="option">{{ option }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            questions: [
                { id: 1, text: 'Question 1', options: ['Option 1', 'Option 2'] },
                { id: 2, text: 'Question 2', options: ['Option 1', 'Option 2', 'Option 3'] }
            ]
        };
    }
};
</script>

<style scoped>
h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
}

h2 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
}

ul {
    margin-left: 16px;
}
</style>
