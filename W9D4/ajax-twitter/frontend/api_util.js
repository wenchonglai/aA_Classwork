const APIUtil = {
  followUser: id => {
    return ajaxUser(id, 'POST');
  },

  unfollowUser: id => {
    return ajaxUser(id, 'DELETE');
  },

  searchUsers(queryVal) {
    return $.ajax({
      url: `/users/search`,
      method: 'GET',
      data: { query: queryVal },
      dataType: 'JSON'
    })
  },

  createTweet(data){
    return $.ajax({
      url: '/tweets',
      method: 'POST',
      data: data,
      dataType: 'JSON'
    })
  }
};

function ajaxUser (id, method) {
    return $.ajax({
      url: `/users/${id}/follow`,
      method,
      dataType: 'JSON'
    })
}

module.exports = APIUtil;