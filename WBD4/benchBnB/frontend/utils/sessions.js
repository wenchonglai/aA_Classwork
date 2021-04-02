export const postSession = (user) =>
  $.ajax({
    url: '/api/session',
    method: 'POST',
    data: {user} //params: {user: {username, password}}
  });


export const deleteSession = () =>
  $.ajax({
    url: '/api/session',
    method: 'DELETE'
  });

export const postUser = (user) =>
  $.ajax({
    url: '/api/users',
    method: 'POST',
    data: {user}
  });