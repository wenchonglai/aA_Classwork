const APIUtil = require("./api_util");

class UsersSearch {
    constructor($el) {
        this.$el = $el;
        this.$ul = $el.find('ul');
        this.$input = $el.find('input');
        console.log(this.$input);
        
        this.handleInput()
    }

    handleInput() {
        this.$input.on('change', (e) => {
            APIUtil.searchUsers(this.$input.val())
            .then( (res) => {
                this.renderResults(res);
            })
        })
    }

    renderResults(res) {
        this.$ul.empty();
        res.each( user => {
            let $li = $(`<li><a> @${user.username} </a></li>`);
            this.$ul.append($li);
        })
    }
}

module.exports = UsersSearch