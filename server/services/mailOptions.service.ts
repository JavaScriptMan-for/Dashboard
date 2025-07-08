class MailOptions { 
    constructor(
        public from: string,
        public to: string,
        public subject: string,
        public html: string
    ) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.html = html
    }
    public date = new Date().toUTCString();
    public messageId = `<${new Date().getTime()}@mail.ru>`;
    public mimeVersion = '1.0';
    public contentType = 'text/html; charset=utf-8';
}


export default MailOptions;