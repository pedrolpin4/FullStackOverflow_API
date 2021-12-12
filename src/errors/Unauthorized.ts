class Unauthorized extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Unauthorized';
    }
}

export default Unauthorized;
