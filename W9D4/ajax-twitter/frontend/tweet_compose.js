const APIUtil = require('./api_util');

class TweetCompose{
  constructor($el){
    this.$el = $el;
    this.$el.data('tweetsUl', '#feed');
    this.$el.on('submit', e => {
      e.preventDefault();
      
      this
        .submit()
        .then(res => {
          console.log(res)
          this.handleSuccess();
          console.log($(this.$el.data('tweetsUl')));
          $(this.$el.data('tweetsUl'))
            .prepend($(`<li>${res.content} -- <a href="/users/${res.user_id}">${res.user.username}</a> -- ${res.created_at}</li>`))
        });
    });

    let $textArea = this.$el.find('textarea');
    $textArea.on('input', e => {
      let val = $textArea.val()

      if (val.length > 140){
        $textArea.val(val.substr(0, 140));
      }

      let newLength = 140 - $textArea.val().length;

      $('.chars-left').text( newLength );
      
    });

  }

  submit(){
    let data = this.$el.serialize();

    this.$el.find(':input').prop('disabled', true);

    return APIUtil.createTweet(data);
  }

  clearInput(){
    this.$el.find(':input[type="text"]').val('');
  }

  handleSuccess(){
    this.clearInput();
    this.$el.find(':input').prop('disabled', false);
  }
}

module.exports = TweetCompose;