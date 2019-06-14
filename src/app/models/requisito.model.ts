export class Requisito {


    constructor(
        public requisito: string,
        // el ? significa que es obcional y que desde hay para abajo los demas tambien deven de ser obcionales
        public estadoReq?: string,
        public _id?: string
    ) {}
}