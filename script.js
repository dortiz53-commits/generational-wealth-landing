// Assessment System
let currentStep = 0;
let assessmentData = {};
let assessmentType = 'general';

// Assessment Questions
const assessmentQuestions = [
    {
        id: 'income',
        question: 'What is your monthly gross income?',
        type: 'select',
        options: [
            { value: '2000', text: 'Under $2,000' },
            { value: '3000', text: '$2,000 - $3,000' },
            { value: '4000', text: '$3,000 - $4,000' },
            { value: '5000', text: '$4,000 - $5,000' },
            { value: '6000', text: '$5,000 - $6,000' },
            { value: '8000', text: '$6,000 - $8,000' },
            { value: '10000', text: '$8,000 - $10,000' },
            { value: '15000', text: '$10,000 - $15,000' },
            { value: '20000', text: 'Over $15,000' }
        ]
    },
    {
        id: 'debt_payments',
        question: 'What are your total monthly debt payments?',
        type: 'select',
        options: [
            { value: '500', text: 'Under $500' },
            { value: '1000', text: '$500 - $1,000' },
            { value: '1500', text: '$1,000 - $1,500' },
            { value: '2000', text: '$1,500 - $2,000' },
            { value: '2500', text: '$2,000 - $2,500' },
            { value: '3000', text: '$2,500 - $3,000' },
            { value: '4000', text: '$3,000 - $4,000' },
            { value: '5000', text: '$4,000 - $5,000' },
            { value: '6000', text: 'Over $5,000' }
        ]
    },
    {
        id: 'credit_score',
        question: 'What is your approximate credit score?',
        type: 'select',
        options: [
            { value: '500', text: 'Under 500' },
            { value: '550', text: '500 - 550' },
            { value: '600', text: '550 - 600' },
            { value: '650', text: '600 - 650' },
            { value: '700', text: '650 - 700' },
            { value: '750', text: '700 - 750' },
            { value: '800', text: 'Over 750' },
            { value: 'unknown', text: "I don't know" }
        ]
    },
    {
        id: 'employment',
        question: 'What is your employment status?',
        type: 'select',
        options: [
            { value: 'employed_w2', text: 'Employed (W-2)' },
            { value: 'self_employed', text: 'Self-Employed' },
            { value: 'contractor', text: '1099 Contractor' },
            { value: 'retired', text: 'Retired' },
            { value: 'unemployed', text: 'Unemployed' },
            { value: 'other', text: 'Other' }
        ]
    },
    {
        id: 'goal',
        question: 'What is your primary financial goal?',
        type: 'select',
        options: [
            { value: 'consolidate', text: 'Consolidate debt into one payment' },
            { value: 'lower_payments', text: 'Lower my monthly payments' },
            { value: 'improve_credit', text: 'Improve my credit score' },
            { value: 'pay_off_debt', text: 'Pay off debt faster' },
            { value: 'financial_education', text: 'Learn better financial management' },
            { value: 'build_wealth', text: 'Start building wealth' }
        ]
    }
];

// Contact Information Questions
const contactQuestions = [
    {
        id: 'name',
        question: 'What is your name?',
        type: 'text',
        placeholder: 'Enter your full name'
    },
    {
        id: 'email',
        question: 'What is your email address?',
        type: 'email',
        placeholder: 'Enter your email'
    },
    {
        id: 'phone',
        question: 'What is your phone number?',
        type: 'tel',
        placeholder: 'Enter your phone number'
    }
];

// Start Assessment
function startAssessment(type = 'general') {
    assessmentType = type;
    currentStep = 0;
    assessmentData = {};
    
    const modal = document.getElementById('assessmentModal');
    modal.style.display = 'block';
    
    showAssessmentStep();
}

// Close Assessment
function closeAssessment() {
    const modal = document.getElementById('assessmentModal');
    modal.style.display = 'none';
    currentStep = 0;
    assessmentData = {};
}

// Show Assessment Step
function showAssessmentStep() {
    const content = document.getElementById('assessmentContent');
    const totalSteps = assessmentQuestions.length + contactQuestions.length;
    
    if (currentStep < assessmentQuestions.length) {
        // Financial questions
        const question = assessmentQuestions[currentStep];
        content.innerHTML = createQuestionHTML(question, currentStep + 1, totalSteps);
    } else if (currentStep < totalSteps) {
        // Contact questions
        const contactIndex = currentStep - assessmentQuestions.length;
        const question = contactQuestions[contactIndex];
        content.innerHTML = createQuestionHTML(question, currentStep + 1, totalSteps);
    } else {
        // Show results
        showAssessmentResults();
    }
}

// Create Question HTML
function createQuestionHTML(question, stepNumber, totalSteps) {
    let inputHTML = '';
    
    if (question.type === 'select') {
        inputHTML = `
            <select id="answer" class="assessment-input" required>
                <option value="">Select an option...</option>
                ${question.options.map(option => 
                    `<option value="${option.value}">${option.text}</option>`
                ).join('')}
            </select>
        `;
    } else {
        inputHTML = `
            <input type="${question.type}" id="answer" class="assessment-input" 
                   placeholder="${question.placeholder}" required>
        `;
    }
    
    return `
        <div class="assessment-step">
            <div class="assessment-progress">
                <div class="progress-bar">
                    <div class="progress" style="width: ${(stepNumber / totalSteps) * 100}%"></div>
                </div>
                <p>Step ${stepNumber} of ${totalSteps}</p>
            </div>
            
            <h3 class="assessment-question">${question.question}</h3>
            
            <div class="assessment-input-container">
                ${inputHTML}
            </div>
            
            <div class="assessment-buttons">
                ${stepNumber > 1 ? '<button type="button" onclick="previousStep()" class="btn-secondary">Previous</button>' : ''}
                <button type="button" onclick="nextStep()" class="btn-primary">
                    ${stepNumber === totalSteps ? 'Get My Results' : 'Next'}
                </button>
            </div>
        </div>
        
        <style>
            .assessment-step {
                max-width: 500px;
                margin: 0 auto;
            }
            
            .assessment-progress {
                margin-bottom: 2rem;
                text-align: center;
            }
            
            .assessment-progress .progress-bar {
                background: #e5e7eb;
                height: 8px;
                border-radius: 4px;
                margin-bottom: 0.5rem;
                overflow: hidden;
            }
            
            .assessment-progress .progress {
                background: linear-gradient(90deg, #2563eb, #3b82f6);
                height: 100%;
                border-radius: 4px;
                transition: width 0.3s ease;
            }
            
            .assessment-progress p {
                color: #6b7280;
                font-size: 0.9rem;
            }
            
            .assessment-question {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 2rem;
                color: #1f2937;
                text-align: center;
            }
            
            .assessment-input-container {
                margin-bottom: 2rem;
            }
            
            .assessment-input {
                width: 100%;
                padding: 1rem;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s;
            }
            
            .assessment-input:focus {
                outline: none;
                border-color: #2563eb;
            }
            
            .assessment-buttons {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            
            .btn-primary, .btn-secondary {
                padding: 1rem 2rem;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.3s;
            }
            
            .btn-primary {
                background: #2563eb;
                color: white;
            }
            
            .btn-primary:hover {
                background: #1d4ed8;
            }
            
            .btn-secondary {
                background: #6b7280;
                color: white;
            }
            
            .btn-secondary:hover {
                background: #4b5563;
            }
        </style>
    `;
}

// Next Step
function nextStep() {
    const answer = document.getElementById('answer').value;
    
    if (!answer) {
        alert('Please provide an answer before continuing.');
        return;
    }
    
    // Store the answer
    if (currentStep < assessmentQuestions.length) {
        const questionId = assessmentQuestions[currentStep].id;
        assessmentData[questionId] = answer;
    } else {
        const contactIndex = currentStep - assessmentQuestions.length;
        const questionId = contactQuestions[contactIndex].id;
        assessmentData[questionId] = answer;
    }
    
    currentStep++;
    showAssessmentStep();
}

// Previous Step
function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        showAssessmentStep();
    }
}

// Show Assessment Results
function showAssessmentResults() {
    const results // Assessment System
let currentStep = 0;
let assessmentData = {};
let assessmentType = 'general';

// Assessment Questions
const assessmentQuestions = [
    {
        id: 'income',
        question: 'What is your monthly gross income?',
        type: 'select',
        options: [
            { value: '2000', text: 'Under $2,000' },
            { value: '3000', text: '$2,000 - $3,000' },
            { value: '4000', text: '$3,000 - $4,000' },
            { value: '5000', text: '$4,000 - $5,000' },
            { value: '6000', text: '$5,000 - $6,000' },
            { value: '8000', text: '$6,000 - $8,000' },
            { value: '10000', text: '$8,000 - $10,000' },
            { value: '15000', text: '$10,000 - $15,000' },
            { value: '20000', text: 'Over $15,000' }
        ]
    },
    {
        id: 'debt_payments',
        question: 'What are your total monthly debt payments?',
        type: 'select',
        options: [
            { value: '500', text: 'Under $500' },
            { value: '1000', text: '$500 - $1,000' },
            { value: '1500', text: '$1,000 - $1,500' },
            { value: '2000', text: '$1,500 - $2,000' },
            { value: '2500', text: '$2,000 - $2,500' },
            { value: '3000', text: '$2,500 - $3,000' },
            { value: '4000', text: '$3,000 - $4,000' },
            { value: '5000', text: '$4,000 - $5,000' },
            { value: '6000', text: 'Over $5,000' }
        ]
    },
    {
        id: 'credit_score',
        question: 'What is your approximate credit score?',
        type: 'select',
        options: [
            { value: '500', text: 'Under 500' },
            { value: '550', text: '500 - 550' },
            { value: '600', text: '550 - 600' },
            { value: '650', text: '600 - 650' },
            { value: '700', text: '650 - 700' },
            { value: '750', text: '700 - 750' },
            { value: '800', text: 'Over 750' },
            { value: 'unknown', text: "I don't know" }
        ]
    },
    {
        id: 'employment',
        question: 'What is your employment status?',
        type: 'select',
        options: [
            { value: 'employed_w2', text: 'Employed (W-2)' },
            { value: 'self_employed', text: 'Self-Employed' },
            { value: 'contractor', text: '1099 Contractor' },
            { value: 'retired', text: 'Retired' },
            { value: 'unemployed', text: 'Unemployed' },
            { value: 'other', text: 'Other' }
        ]
    },
    {
        id: 'goal',
        question: 'What is your primary financial goal?',
        type: 'select',
        options: [
            { value: 'consolidate', text: 'Consolidate debt into one payment' },
            { value: 'lower_payments', text: 'Lower my monthly payments' },
            { value: 'improve_credit', text: 'Improve my credit score' },
            { value: 'pay_off_debt', text: 'Pay off debt faster' },
            { value: 'financial_education', text: 'Learn better financial management' },
            { value: 'build_wealth', text: 'Start building wealth' }
        ]
    }
];

// Contact Information Questions
const contactQuestions = [
    {
        id: 'name',
        question: 'What is your name?',
        type: 'text',
        placeholder: 'Enter your full name'
    },
    {
        id: 'email',
        question: 'What is your email address?',
        type: 'email',
        placeholder: 'Enter your email'
    },
    {
        id: 'phone',
        question: 'What is your phone number?',
        type: 'tel',
        placeholder: 'Enter your phone number'
    }
];

// Start Assessment
function startAssessment(type = 'general') {
    assessmentType = type;
    currentStep = 0;
    assessmentData = {};
    
    const modal = document.getElementById('assessmentModal');
    modal.style.display = 'block';
    
    showAssessmentStep();
}

// Close Assessment
function closeAssessment() {
    const modal = document.getElementById('assessmentModal');
    modal.style.display = 'none';
    currentStep = 0;
    assessmentData = {};
}

// Show Assessment Step
function showAssessmentStep() {
    const content = document.getElementById('assessmentContent');
    const totalSteps = assessmentQuestions.length + contactQuestions.length;
    
    if (currentStep < assessmentQuestions.length) {
        // Financial questions
        const question = assessmentQuestions[currentStep];
        content.innerHTML = createQuestionHTML(question, currentStep + 1, totalSteps);
    } else if (currentStep < totalSteps) {
        // Contact questions
        const contactIndex = currentStep - assessmentQuestions.length;
        const question = contactQuestions[contactIndex];
        content.innerHTML = createQuestionHTML(question, currentStep + 1, totalSteps);
    } else {
        // Show results
        showAssessmentResults();
    }
}

// Create Question HTML
function createQuestionHTML(question, stepNumber, totalSteps) {
    let inputHTML = '';
    
    if (question.type === 'select') {
        inputHTML = `
            <select id="answer" class="assessment-input" required>
                <option value="">Select an option...</option>
                ${question.options.map(option => 
                    `<option value="${option.value}">${option.text}</option>`
                ).join('')}
            </select>
        `;
    } else {
        inputHTML = `
            <input type="${question.type}" id="answer" class="assessment-input" 
                   placeholder="${question.placeholder}" required>
        `;
    }
    
    return `
        <div class="assessment-step">
            <div class="assessment-progress">
                <div class="progress-bar">
                    <div class="progress" style="width: ${(stepNumber / totalSteps) * 100}%"></div>
                </div>
                <p>Step ${stepNumber} of ${totalSteps}</p>
            </div>
            
            <h3 class="assessment-question">${question.question}</h3>
            
            <div class="assessment-input-container">
                ${inputHTML}
            </div>
            
            <div class="assessment-buttons">
                ${stepNumber > 1 ? '<button type="button" onclick="previousStep()" class="btn-secondary">Previous</button>' : ''}
                <button type="button" onclick="nextStep()" class="btn-primary">
                    ${stepNumber === totalSteps ? 'Get My Results' : 'Next'}
                </button>
            </div>
        </div>
        
        <style>
            .assessment-step {
                max-width: 500px;
                margin: 0 auto;
            }
            
            .assessment-progress {
                margin-bottom: 2rem;
                text-align: center;
            }
            
            .assessment-progress .progress-bar {
                background: #e5e7eb;
                height: 8px;
                border-radius: 4px;
                margin-bottom: 0.5rem;
                overflow: hidden;
            }
            
            .assessment-progress .progress {
                background: linear-gradient(90deg, #2563eb, #3b82f6);
                height: 100%;
                border-radius: 4px;
                transition: width 0.3s ease;
            }
            
            .assessment-progress p {
                color: #6b7280;
                font-size: 0.9rem;
            }
            
            .assessment-question {
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 2rem;
                color: #1f2937;
                text-align: center;
            }
            
            .assessment-input-container {
                margin-bottom: 2rem;
            }
            
            .assessment-input {
                width: 100%;
                padding: 1rem;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s;
            }
            
            .assessment-input:focus {
                outline: none;
                border-color: #2563eb;
            }
            
            .assessment-buttons {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            
            .btn-primary, .btn-secondary {
                padding: 1rem 2rem;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.3s;
            }
            
            .btn-primary {
                background: #2563eb;
                color: white;
            }
            
            .btn-primary:hover {
                background: #1d4ed8;
            }
            
            .btn-secondary {
                background: #6b7280;
                color: white;
            }
            
            .btn-secondary:hover {
                background: #4b5563;
            }
        </style>
    `;
}

// Next Step
function nextStep() {
    const answer = document.getElementById('answer').value;
    
    if (!answer) {
        alert('Please provide an answer before continuing.');
        return;
    }
    
    // Store the answer
    if (currentStep < assessmentQuestions.length) {
        const questionId = assessmentQuestions[currentStep].id;
        assessmentData[questionId] = answer;
    } else {
        const contactIndex = currentStep - assessmentQuestions.length;
        const questionId = contactQuestions[contactIndex].id;
        assessmentData[questionId] = answer;
    }
    
    currentStep++;
    showAssessmentStep();
}

// Previous Step
function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        showAssessmentStep();
    }
}

// Show Assessment Results
function showAssessmentResults() {
    const results // Assessment System
let currentStep = 0;
let assessmentData = {};
let assessmentType = 'general';

// Assessment Questions
const assessmentQuestions = [
    {
        id: 'income',
        question: 'What is your monthly gross income?',
        type: 'select',
        options: [
            { value: '2000', text: 'Under $2,000' },
            { value: '3000', text: '$2,000 - $3,000' },
            { value: '4000', text: '$3,000 - $4,000' },
            { value: '5000', text: '$4,000 - $5,000' },
            { value: '6000', text: '$5,000 - $6,000' },
            { value: '8000', text: '$6,000 - $8,000' },
            { value: '10000', text: '$8,000 - $10,000' },
       
