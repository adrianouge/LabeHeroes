
export class Hero {
    constructor(
        public id: string,
        public name: string,
        public alias: string | undefined,
        public age: number,
        public universe: string
    ) { }

    public getAge() {
        return this.age
    }

    public setAge(newAge: number) {
        this.age = newAge
    }
}