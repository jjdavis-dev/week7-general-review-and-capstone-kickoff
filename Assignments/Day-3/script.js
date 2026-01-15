const students = [
  { id: 1, name: "Alice", age: 22, courses: ["HTML", "CSS"], active: true, grade: 85 },
  { id: 2, name: "Bob", age: 28, courses: ["JS", "React"], active: false, grade: 92 },
  { id: 3, name: "Charlie", age: 24, courses: ["HTML", "JS"], active: true, grade: 78 },
  { id: 4, name: "Diana", age: 30, courses: ["Node", "Supabase"], active: true, grade: 95 },
  { id: 5, name: "Ethan", age: 19, courses: ["CSS", "Bootstrap"], active: false, grade: 60 },
  { id: 6, name: "Fiona", age: 26, courses: ["JS", "Git"], active: true, grade: 88 }
];

/* =========================
   Part 1: forEach()
   ========================= */

let totalCourses = 0;

students.forEach(student => {
  // Log Names
  console.log(student.name);

  // Greetings
  console.log(`Hello ${student.name}, welcome to review week!`);

  // Grade Alert
  console.log(`Student ${student.name} has a grade of ${student.grade}`);

  // Count Courses
  totalCourses += student.courses.length;
});

console.log("Total courses taken by all students:", totalCourses);

/* =========================
   Part 2: map()
   ========================= */

// Uppercase Names
const uppercaseNames = students.map(student => student.name.toUpperCase());
console.log("Uppercase Names:", uppercaseNames);

// Summary Strings
const summaries = students.map(student => `${student.name} is ${student.age} years old`);
console.log("Summaries:", summaries);

// Grade Boost (+5)
const boostedGrades = students.map(student => ({
  ...student,
  grade: student.grade + 5
}));
console.log("Boosted Grades:", boostedGrades);

// HTML List Items
const htmlListItems = students.map(student => `<li>${student.name}</li>`);
console.log("HTML List Items:", htmlListItems);

/* =========================
   Part 3: filter()
   ========================= */

// Active Only
const activeStudents = students.filter(student => student.active);
console.log("Active Students:", activeStudents);

// High Achievers (grade > 90)
const highAchievers = students.filter(student => student.grade > 90);
console.log("High Achievers:", highAchievers);

// Adults (age >= 25)
const adultStudents = students.filter(student => student.age >= 25);
console.log("Adults:", adultStudents);

// JS Fans
const jsFans = students.filter(student => student.courses.includes("JS"));
console.log("JS Fans:", jsFans);
