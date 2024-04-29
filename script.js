let courses = [];
let grades = [];
let credits = [];

function addCourse() {
    const grade = parseFloat(document.getElementById('grade').value);
    const credit = parseFloat(document.getElementById('credit').value);
    const courseName = document.getElementById('courseN').value;
    if (grade == null || !credit) {
      alert('Please enter grade, and credit.');
      return;
    }
    grades.push(grade);
    credits.push(credit);
    const courseListElement = document.getElementById('courses');
    courseListElement.innerHTML += `<p>Course Name: ${courseName}, Grade: ${grade}, Credit: ${credit}</p>`;
    document.getElementById('grade').value = '';
    document.getElementById('credit').value = '';
}

function calculateGPA() {
    fetch('/calculate_gpa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({grades: grades, credits: credits})
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = 'Your GPA is: ' + data.gpa.toFixed(2);
        if (data.gpa >= 3.8) {
            triggerFireworks();
        } else if (data.gpa < 2.0) {
            displayAcademicAlert(data.gpa);
        }
    })
    .catch(error => console.error('Error:', error));
}

function displayAcademicAlert(gpa) {
    const message = `Your GPA is ${gpa.toFixed(2)}. We strongly recommend contacting your academic advisor at engineering@bu.edu to explore ways to improve your academic performance.`;
    document.getElementById('result').textContent = message;
}



function resetGPA() {
    // Clear the arrays storing grades and credits
    grades = [];
    credits = [];

    // Clear the courses displayed on the UI
    document.getElementById('courses').innerHTML = '';

    // Clear any displayed GPA result
    document.getElementById('result').textContent = '';
}
function triggerFireworks() {
    const fireworksElement = document.getElementById('fireworks');
    fireworksElement.style.display = 'block';
    for (let i = 0; i < 50; i++) {
        const firework = document.createElement('div');
        firework.classList.add('firework-piece');
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;
        fireworksElement.appendChild(firework);
    }
    setTimeout(() => {
        fireworksElement.style.display = 'none';
        fireworksElement.innerHTML = ''; // Clear the fireworks pieces
    }, 1500); // Match the duration of the firework animation
}
/*
window.onload = function() {
    displayGoalGPA();
};
*/
