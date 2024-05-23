function classDecorator<T extends { new (...args:any[]): {} } >(
    constructor: T
) {
    return class extends constructor {
        newProperty = "New Property";
        hello = "override"
    }
}

//La mayoría de decoradores son usados y no creados
@classDecorator
export class SuperClass {

    public myProperty: string = "Abc123";

    print(){
        console.log("Hola mundo");
    }

}

console.log(SuperClass);

const myClass = new SuperClass();
console.log(myClass);

