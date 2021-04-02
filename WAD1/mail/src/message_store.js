const messages = {
  sent: [
    {
      to: "friend@mail.com",
      subject: "Check this out",
      body: "It's so cool"
    },
    { to: "person@mail.com", subject: "zzz", body: "so booring" }
  ],
  inbox: [
    {
      from: "grandma@mail.com",
      subject: "Fwd: Fwd: Fwd: Check this out",
      body:
        "Stay at home mom discovers cure for leg cramps. Doctors hate her"
    },
    {
      from: "person@mail.com",
      subject: "Questionnaire",
      body: "Take this free quiz win $1000 dollars"
    }
  ]
};
let messageDraft;

class MessageStore{
  static getInboxMessages(){
    return messages.inbox;
  }
  static getSentMessages(){
    return messages.sent;
  }
  static getMessageDraft(){
    messageDraft ||= new Message();
    return messageDraft;
  }
  static updateDraftField(field, value){
    messageDraft[field] = value;
  }
  static sendDraft(){
    messages.sent.push(messageDraft);
    messageDraft = new Message();
  }
}

class Message{
  constructor({from = '', to = '', subject = '', body = ''} = {}){
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.body = body;
    messageDraft ||= this;
  }
}

export {MessageStore, Message}