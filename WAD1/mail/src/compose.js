import {MessageStore} from './message_store';

export default class Compose{
  render(){
    let div = document.createElement('div');

    div.classList.add('new-message');
    div.innerHTML = this.renderForm();

    div.addEventListener('submit', this.handleSubmit.bind(this));
    div.addEventListener('change', this.handleChange.bind(this))
    return div;
  }

  handleChange(e){
    // * Add an event listener to the container `<div>` on a `change` event.
    // * This event listener will be called any time one of the fields in the form
    //   fires a `change` event because the event will propagate up.
    // * The handler function should receive one `event` argument.
    // * You can retrieve the element that fired the event by accessing the
    //   `target` property of the `event`.
    // * Get the name of the field that changed through the `name` property of the `target` element.
    // * Get the value of the field that changed through the `value` property of the `target` element.
    // * Tell the `MessageStore` to update the contents of the `messageDraft` to
    //   match the form by calling `MessageStore.updateDraftField`.
    //   * Pass in the name of the field to change as the first argument and the value of the field to change as the second argument.
    // * Test that if you fill out the form and click `Inbox` or `Sent` before
    //   submitting and then navigate back to compose form, the form is still filled
    //   out.
    console.log(e);
  }

  handleSubmit(e){
    e.preventDefault()
    MessageStore.sendDraft();
  }

  renderForm(){
    let currentDraft = MessageStore.getMessageDraft();

    let p = document.createElement('p');

    p.classList.add('new-message-header');
    p.innerHTML = 'New Message';

    let form = document.createElement('form');
    form.classList.add('compose-form');
    form.innerHTML = (
      `<input placeholder="Recipient" name="to" type="text" value="${currentDraft.to}">` +
      `<input placeholder="Subject" name="subject" type="text" value=${currentDraft.subject}></input>` +
      `<textarea name="body" row="20">Here's some text</textarea>` +
      `<button type="submit" class="btn btn-primary submit-message">Send</button>`);
    
    return p.outerHTML + form.outerHTML;
  }
}