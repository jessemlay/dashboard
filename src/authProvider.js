import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

export default (type, params) => {
   if (type === AUTH_LOGIN) {
      // const { username, password } = params;
      // const request = new Request('users/authenticate', {
      //    method: 'POST',
      //    body: JSON.stringify({ username, password }),
      //    headers: new Headers({ 'Content-Type': 'application/json' })
      // });
      // return fetch(request)
      //    .then(response => {
      //       if (response.status < 200 || response.status >= 300) {
      //          throw new Error(response.statusText);
      //       }
      //       return response.json();
      //    })
      //    .then(({ token }) => {
      //       localStorage.setItem('token', token);
      //    });

      localStorage.setItem('token', '');
      return Promise.resolve();
   }
   if (type === AUTH_LOGOUT) {
      localStorage.removeItem('token');
      return Promise.resolve();
   }
   if (type === AUTH_ERROR) {
      const status = params.status;
      if (status === 401 || status === 403) {
         localStorage.removeItem('token');
         return Promise.reject();
      }
      return Promise.resolve();
   }
   if (type === AUTH_CHECK) {
      // params contains the resource name
      const { resource } = params;
      if (resource === 'employee') {
         // check credentials for the employee resource
      }
      return localStorage.getItem('token')
         ? Promise.resolve()
         : Promise.reject({ redirectTo: '/lock' });
   }

   return Promise.reject('Unkown method');
};
