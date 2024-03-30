// Faire l'api reprendre ce qu'on a fait en flask (pour l'api) et voir ce qu'on a fait en js aussi pour les requetes/fetch

// "Access-Control-Allow-Origin" : "*"
export { 
    get_all_questionnaires, 
    get_all_questions, 
    create_questionnaire, 
    create_question, 
    update_questionnaire, 
    update_question, 
    delete_questionnaire, 
    delete_question, 
};

const API_ROUTE = "http://localhost:5000"

async function get_all_questionnaires() {
    const rep = await fetch(API_ROUTE + "/questionnaire/api/v1.0/questionnaires");
    console.log(rep);
    const json = await rep.json();
    console.log(json);

    return json;
}

async function get_all_questions() {
    const rep = await fetch(API_ROUTE + "/questionnaire/api/v1.0/questions");
    const json = await rep.json();
    console.log(json);

    return json;
}

async function get_questionnaire(questionnaire_id) {
    const rep = await fetch(API_ROUTE + `/questionnaire/api/v1.0/questionnaires/${questionnaire_id}`);
    const json = await rep.json();
    console.log(json);
    return json;
}

async function get_question(question_id) {
    const rep = await fetch(API_ROUTE + `/questionnaire/api/v1.0/question/${question_id}`);
    const json = await rep.json();
    console.log(json);
    return json;
}

// ================== POST ==================

async function create_questionnaire(jsonDatas) {
    const rep = await fetch(API_ROUTE + "/questionnaire/api/v1.0/questionnaire",
        {
            "method" : "POST",
            "headers" : {
                "Access-Control-Allow-Origin" : "*",
                'Content-Type': 'application/json'
            },
            "body" : JSON.stringify(jsonDatas)
        }
    );
    const json = await rep.json();
    console.log(json);
}

async function create_question(jsonDatas) {
    const rep = await fetch(API_ROUTE + "/questionnaire/api/v1.0/question",
        {
            "method" : "POST",
            "headers" : {
                "Access-Control-Allow-Origin" : "*",
                'Content-Type': 'application/json'
            },
            "body" : JSON.stringify(jsonDatas)
        }
    );
    const json = await rep.json();
    console.log(json);
}

async function click_create_questionnaire(name){
    await create_questionnaire(
        {
            "name":name
        }
    );
}

async function click_create_question(title, id){
    await create_question(
        {
            "title":title,
            "questionnaire_id":id
        }
    );
}

// ================== PUT ==================

async function update_questionnaire() {
    const rep = await fetch(API_ROUTE + `/questionnaire/api/v1.0/questionnaires/${questionnaireId}`, {
        method: 'PUT',
        headers: {
            "Access-Control-Allow-Origin" : "*",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName })
    });
    const json = await rep.json();
    console.log(json);
}

async function update_question(newTitle, newQuestionnaireId, questionId) {
    const rep = await fetch(API_ROUTE + `/questionnaire/api/v1.0/questions/${questionId}`, {
        method: 'PUT',
        headers: {
            "Access-Control-Allow-Origin" : "*",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: newTitle,
            questionnaire_id: newQuestionnaireId
        })
    });
    const json = await rep.json();
    console.log(json);
}

// ================== DELETE ==================

async function delete_questionnaire(questionnaireId) {
    const questionnaire = await get_questionnaire(questionnaireId)
    for (const q of questionnaire["questions"]) {
        await delete_question(q["id"]);
    }
    const rep = await fetch(API_ROUTE + `/questionnaire/api/v1.0/questionnaires/${questionnaireId}`, {
        method: 'DELETE'
    });
    const json = await rep.json();
    console.log(json);
}

async function delete_question(questionId) {
    const rep = await fetch(API_ROUTE + `/questionnaire/api/v1.0/questions/${questionId}`, {
        method: 'DELETE'
    });
    const json = await rep.json();
    console.log(json);
}