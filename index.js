import inquirer from 'inquirer';
class Student {
    name;
    studentID;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.studentID = this.generateStudentID();
        this.courses = [];
        this.balance = 10000;
    }
    generateStudentID() {
        const id = Math.floor(10000 + Math.random() * 90000).toString();
        return id;
    }
    enroll(course) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(`Balance for ${this.name}: Rs.${this.balance}`);
    }
    payTuition(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Rs.${amount} paid for tuition by ${this.name}`);
        }
        else {
            console.log(`Insufficient balance - Cannot pay Rs.${amount}`);
        }
        this.viewBalance();
    }
    showStatus() {
        console.log(`Name: ${this.name}`);
        console.log(`Student ID: ${this.studentID}`);
        console.log(`Courses Enrolled: ${this.courses.join(', ')}`);
        this.viewBalance();
    }
}
const studentsList = [];
async function promptForStudentName() {
    const response = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter student name:'
        }
    ]);
    return response.name;
}
async function promptForCourses() {
    const response = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'courses',
            message: 'Select courses to enroll:',
            choices: ['Math', 'Science', 'English', 'History', 'Art']
        }
    ]);
    return response.courses;
}
async function menu() {
    const choices = [
        'Create Student',
        'Enroll Student in Course',
        'View Student Balance',
        'Pay Tuition Fees',
        'Show Student Status',
        'View All Students',
        'Exit'
    ];
    while (true) {
        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Select an action:',
                choices
            }
        ]);
        switch (choice) {
            case 'Create Student':
                const name = await promptForStudentName();
                const student = new Student(name);
                studentsList.push(student);
                console.log('Student created successfully');
                break;
            case 'Enroll Student in Course':
                const studentID = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'studentID',
                        message: 'Enter student ID to enroll in course:'
                    }
                ]);
                const studentToEnroll = studentsList.find(student => student.studentID === studentID.studentID);
                if (studentToEnroll) {
                    const courses = await promptForCourses();
                    for (const course of courses) {
                        studentToEnroll.enroll(course);
                    }
                    console.log('Student enrolled in courses successfully');
                }
                else {
                    console.log('Student not found');
                }
                break;
            case 'View Student Balance':
                const studentIDBalance = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'studentID',
                        message: 'Enter student ID to view balance:'
                    }
                ]);
                const studentToViewBalance = studentsList.find(student => student.studentID === studentIDBalance.studentID);
                if (studentToViewBalance) {
                    studentToViewBalance.viewBalance();
                }
                else {
                    console.log('Student not found');
                }
                break;
            case 'Pay Tuition Fees':
                const studentIDPayment = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'studentID',
                        message: 'Enter student ID to pay tuition fees:'
                    }
                ]);
                const studentToPay = studentsList.find(student => student.studentID === studentIDPayment.studentID);
                if (studentToPay) {
                    const amount = await inquirer.prompt([
                        {
                            type: 'number',
                            name: 'amount',
                            message: 'Enter amount to pay:'
                        }
                    ]);
                    studentToPay.payTuition(amount.amount);
                }
                else {
                    console.log('Student not found');
                }
                break;
            case 'Show Student Status':
                const studentIDStatus = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'studentID',
                        message: 'Enter student ID to show status:'
                    }
                ]);
                const studentToShowStatus = studentsList.find(student => student.studentID === studentIDStatus.studentID);
                if (studentToShowStatus) {
                    studentToShowStatus.showStatus();
                }
                else {
                    console.log('Student not found');
                }
                break;
            case 'View All Students':
                if (studentsList.length === 0) {
                    console.log("No students");
                }
                else {
                    console.log('All Students:');
                    studentsList.forEach(student => {
                        console.log(`Name: ${student.name}, ID: ${student.studentID}`);
                    });
                }
                break;
            case 'Exit':
                return;
        }
    }
}
menu();
