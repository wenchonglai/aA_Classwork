const APIUtil = {
  followUser: id => {
    return this.ajaxUser(id, 'POST');
  },

  unfollowUser: id => {
    return this.ajaxUser(id, 'DELETE');
  },

  ajaxUser: (id, method) => (
    $.ajax({
      url: `/users/${id}/follow`,
      method,
      dataType: 'JSON'
    })
  )
};

module.exports = APIUtil;