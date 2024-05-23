export class Person {

    // constructor() {
    //     this.name = "Tony";
    //     this.address = "New York";
    // }

    //Forma 1
    // public name: string;
    // private address?: string;
    // constructor(name: string, address?: string) {
    //     this.name = name;
    //     this.address = address;
    // }

    //Forma2 (Forma1 y Forma2 son totalmente iguales)
    constructor(
        public firstName: string, 
        public lastName: string, 
        private address: string = "No address"
    ){}

}

//CON EXTENDS

// export class Hero extends Person {

//     constructor(
//         public alterEgo: string,
//         public age: number,
//         public realName: string,
//     ){
//         super( realName, 'New York' );
//     }

// }

export class Hero{

    // public person: Person;

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person,
    ){
        // this.person = new Person(realName);
    }
}

const tony = new Person('Tony', 'Stark', 'New York')
const ironman = new Hero('Ironman', 45, 'Tony', tony);

console.log(ironman);
