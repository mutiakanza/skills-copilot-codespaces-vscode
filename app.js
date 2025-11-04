// Data Storage
let courses = [];
let assessments = [];
let grades = [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadSampleData();
    updateDashboard();
    renderCourses();
    renderAssessments();
    renderGrades();
});

// Navigation
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Load Sample Data
function loadSampleData() {
    // Sample courses
    if (courses.length === 0) {
        courses = [
            { id: 1, name: 'Pemrograman Web', code: 'IF301', instructor: 'Dr. Ahmad Santoso', credits: 3 },
            { id: 2, name: 'Basis Data', code: 'IF302', instructor: 'Dr. Siti Nurhaliza', credits: 3 },
            { id: 3, name: 'Algoritma dan Struktur Data', code: 'IF201', instructor: 'Prof. Budi Hartono', credits: 4 }
        ];
    }

    // Sample assessments
    if (assessments.length === 0) {
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        assessments = [
            { id: 1, courseId: 1, title: 'Tugas 1 - HTML & CSS', type: 'Tugas', dueDate: nextWeek.toISOString().split('T')[0], weight: 20 },
            { id: 2, courseId: 1, title: 'Quiz JavaScript', type: 'Quiz', dueDate: nextWeek.toISOString().split('T')[0], weight: 15 },
            { id: 3, courseId: 2, title: 'UTS Basis Data', type: 'UTS', dueDate: lastWeek.toISOString().split('T')[0], weight: 35 },
            { id: 4, courseId: 3, title: 'Praktikum Sorting', type: 'Praktikum', dueDate: today.toISOString().split('T')[0], weight: 25 }
        ];
    }

    // Sample grades
    if (grades.length === 0) {
        grades = [
            { studentId: 1, studentName: 'Andi Wijaya', courseId: 1, assessmentId: 1, score: 85 },
            { studentId: 1, studentName: 'Andi Wijaya', courseId: 1, assessmentId: 2, score: 90 },
            { studentId: 1, studentName: 'Andi Wijaya', courseId: 2, assessmentId: 3, score: 88 },
            { studentId: 2, studentName: 'Sari Dewi', courseId: 1, assessmentId: 1, score: 92 },
            { studentId: 2, studentName: 'Sari Dewi', courseId: 2, assessmentId: 3, score: 95 }
        ];
    }
}

// Course Management
function showAddCourseForm() {
    document.getElementById('addCourseForm').style.display = 'block';
}

function hideAddCourseForm() {
    document.getElementById('addCourseForm').style.display = 'none';
    document.querySelector('#addCourseForm form').reset();
}

function addCourse(event) {
    event.preventDefault();
    
    const course = {
        id: courses.length + 1,
        name: document.getElementById('courseName').value,
        code: document.getElementById('courseCode').value,
        instructor: document.getElementById('courseInstructor').value,
        credits: parseInt(document.getElementById('courseCredits').value)
    };
    
    courses.push(course);
    hideAddCourseForm();
    renderCourses();
    updateDashboard();
    addActivity(`Mata kuliah "${course.name}" ditambahkan`);
}

function deleteCourse(id) {
    if (confirm('Apakah Anda yakin ingin menghapus mata kuliah ini?')) {
        const course = courses.find(c => c.id === id);
        courses = courses.filter(c => c.id !== id);
        assessments = assessments.filter(a => a.courseId !== id);
        renderCourses();
        renderAssessments();
        updateDashboard();
        addActivity(`Mata kuliah "${course.name}" dihapus`);
    }
}

function renderCourses() {
    const container = document.getElementById('coursesList');
    
    if (courses.length === 0) {
        container.innerHTML = '<p style="color: #666;">Belum ada mata kuliah. Tambahkan mata kuliah baru untuk memulai.</p>';
        return;
    }
    
    container.innerHTML = courses.map(course => `
        <div class="card">
            <h3>${course.name}</h3>
            <div class="card-meta">
                <p>Kode: ${course.code}</p>
                <p>Dosen: ${course.instructor}</p>
                <p>SKS: ${course.credits}</p>
            </div>
            <div class="card-actions">
                <button class="btn-danger" onclick="deleteCourse(${course.id})">Hapus</button>
            </div>
        </div>
    `).join('');
    
    // Update assessment course dropdown
    updateAssessmentCourseDropdown();
}

// Assessment Management
function showAddAssessmentForm() {
    if (courses.length === 0) {
        alert('Tambahkan mata kuliah terlebih dahulu sebelum menambah penilaian.');
        return;
    }
    document.getElementById('addAssessmentForm').style.display = 'block';
}

function hideAddAssessmentForm() {
    document.getElementById('addAssessmentForm').style.display = 'none';
    document.querySelector('#addAssessmentForm form').reset();
}

function updateAssessmentCourseDropdown() {
    const select = document.getElementById('assessmentCourse');
    select.innerHTML = '<option value="">Pilih Mata Kuliah</option>' + 
        courses.map(course => `<option value="${course.id}">${course.name} (${course.code})</option>`).join('');
}

function addAssessment(event) {
    event.preventDefault();
    
    const assessment = {
        id: assessments.length + 1,
        courseId: parseInt(document.getElementById('assessmentCourse').value),
        title: document.getElementById('assessmentTitle').value,
        type: document.getElementById('assessmentType').value,
        dueDate: document.getElementById('assessmentDueDate').value,
        weight: parseInt(document.getElementById('assessmentWeight').value)
    };
    
    assessments.push(assessment);
    hideAddAssessmentForm();
    renderAssessments();
    updateDashboard();
    
    const course = courses.find(c => c.id === assessment.courseId);
    addActivity(`Penilaian "${assessment.title}" ditambahkan untuk ${course.name}`);
}

function deleteAssessment(id) {
    if (confirm('Apakah Anda yakin ingin menghapus penilaian ini?')) {
        const assessment = assessments.find(a => a.id === id);
        assessments = assessments.filter(a => a.id !== id);
        grades = grades.filter(g => g.assessmentId !== id);
        renderAssessments();
        renderGrades();
        updateDashboard();
        addActivity(`Penilaian "${assessment.title}" dihapus`);
    }
}

function getAssessmentStatus(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    
    if (due < today) {
        return { class: 'status-completed', text: 'Selesai' };
    } else if (due.getTime() === today.getTime()) {
        return { class: 'status-active', text: 'Hari Ini' };
    } else {
        return { class: 'status-upcoming', text: 'Akan Datang' };
    }
}

function renderAssessments() {
    const container = document.getElementById('assessmentsList');
    
    if (assessments.length === 0) {
        container.innerHTML = '<p style="color: #666;">Belum ada penilaian. Tambahkan penilaian baru.</p>';
        return;
    }
    
    container.innerHTML = assessments.map(assessment => {
        const course = courses.find(c => c.id === assessment.courseId);
        const status = getAssessmentStatus(assessment.dueDate);
        
        return `
            <div class="assessment-item">
                <h4>${assessment.title}</h4>
                <p><strong>Mata Kuliah:</strong> ${course ? course.name : 'Unknown'}</p>
                <div class="assessment-meta">
                    <span>Jenis: ${assessment.type}</span>
                    <span>Tenggat: ${new Date(assessment.dueDate).toLocaleDateString('id-ID')}</span>
                    <span>Bobot: ${assessment.weight}%</span>
                </div>
                <span class="assessment-status ${status.class}">${status.text}</span>
                <div class="card-actions" style="margin-top: 1rem;">
                    <button class="btn-danger" onclick="deleteAssessment(${assessment.id})">Hapus</button>
                </div>
            </div>
        `;
    }).join('');
}

// Grades Management
function renderGrades() {
    const container = document.getElementById('gradesTable');
    
    if (grades.length === 0) {
        container.innerHTML = '<p style="color: #666;">Belum ada nilai yang diinput.</p>';
        return;
    }
    
    // Group grades by student
    const studentGrades = {};
    grades.forEach(grade => {
        if (!studentGrades[grade.studentName]) {
            studentGrades[grade.studentName] = [];
        }
        studentGrades[grade.studentName].push(grade);
    });
    
    let html = '<table><thead><tr><th>Mahasiswa</th><th>Mata Kuliah</th><th>Penilaian</th><th>Nilai</th></tr></thead><tbody>';
    
    Object.keys(studentGrades).forEach(studentName => {
        studentGrades[studentName].forEach(grade => {
            const course = courses.find(c => c.id === grade.courseId);
            const assessment = assessments.find(a => a.id === grade.assessmentId);
            
            html += `
                <tr>
                    <td>${studentName}</td>
                    <td>${course ? course.name : 'Unknown'}</td>
                    <td>${assessment ? assessment.title : 'Unknown'}</td>
                    <td><strong>${grade.score}</strong></td>
                </tr>
            `;
        });
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Dashboard Updates
function updateDashboard() {
    // Total courses
    document.getElementById('totalCourses').textContent = courses.length;
    
    // Active assignments (due today or in the future)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeCount = assessments.filter(a => new Date(a.dueDate) >= today).length;
    document.getElementById('activeAssignments').textContent = activeCount;
    
    // Average grade
    if (grades.length > 0) {
        const avgGrade = grades.reduce((sum, g) => sum + g.score, 0) / grades.length;
        document.getElementById('averageGrade').textContent = avgGrade.toFixed(1);
    } else {
        document.getElementById('averageGrade').textContent = '0';
    }
    
    // Learning progress (based on completed assessments)
    if (assessments.length > 0) {
        const completedCount = assessments.filter(a => new Date(a.dueDate) < today).length;
        const progress = ((completedCount / assessments.length) * 100).toFixed(0);
        document.getElementById('learningProgress').textContent = progress + '%';
    } else {
        document.getElementById('learningProgress').textContent = '0%';
    }
}

// Activity Log
function addActivity(message) {
    const activityList = document.getElementById('activityList');
    const now = new Date().toLocaleString('id-ID');
    const li = document.createElement('li');
    li.textContent = `${now} - ${message}`;
    activityList.insertBefore(li, activityList.firstChild);
    
    // Keep only last 5 activities
    while (activityList.children.length > 5) {
        activityList.removeChild(activityList.lastChild);
    }
}
