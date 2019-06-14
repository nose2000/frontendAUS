export class Persona {


    constructor(
        public DNIPer: string,
        public nombrePer: string,
        public apPaternoPer: string,
        public apMaternoPer: string,
        public telefonoPer: string,
        public password: string,
        public email: string,
        public rol: string,
        // el ? significa que es obcional y que desde hay para abajo los demas tambien deven de ser obcionales
        public estado?: string,
        public img?: string,
        public _id?: string
    ) {}
}