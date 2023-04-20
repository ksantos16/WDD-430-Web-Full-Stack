// Primitives: number, string, boolean

let age: number;

age = 12.1;

let userName: string;

userName = 'Max';

let isInstructor: boolean;

isInstructor = true;

// Complex: arrays, objects

// Array Typescript needs [], could also be number[], boolean[]
let hobbies: string[];

hobbies = ['Sports', 'Cooking']

// Type Alias
type Person = {
    name: string;
    age: number;
};

let person: Person;

// Object Typescript
// let person: {
//     name: string;
//     age: number;
// };

person = {
    name: 'Max',
    age: 32
};

// this will make an object array
let people: {
    name: string;
    age: number;
}[];

// Type Inference

// let course = 'React - The Complete Guide';

// course = 12341; this will produce an error, because the type is already infered within Typscript

// Type Union

let course: string | number = 'React - The Complete Guide';

course = 12341


// Functions & types

function add( a: number, b: number) {
    return a + b;
}

function printOutput(value: any) {
    console.log(value);
}

// Generics

// function insertAtBeginning(array: any[], value: any) {
    function insertAtBeginning<T>(array: T[], value: T) {
    const newArray = [value, ...array];
    return newArray;
}

const demoArray = [1, 2, 3];

const updateArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');

// updateArray[0].split('');

// Class & interfaces

class Student {
    firstName: string;
    lastName: string;
    age: number;
    courses: string[];

    constructor(first: string, last: string, age: number, courses: string[]) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.courses = courses;
    }

    enrol(courseName: string){
        this.courses.push(courseName);
    }
}

const student = new Student('Max', 'Schwarz', 32, ['Angular']);
student.enrol('React');

// student.courses => Angular, React **this is what it would list

// Interfaces

interface Human {
    firstName: string;
    age: number;

    greet: () => void;
}

let max: Human;

max = {
    firstName: 'Max',
    age: 32,
    greet() {
        console.log('Hello!')
    }
};

class Instructor implements Human {
    firstName: string;
    age: number;
    greet() {
        console.log('Hello!!!!')
    }
};