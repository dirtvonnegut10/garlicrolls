$('document').ready(function() {

  const AUTH0_CLIENT_ID = "pkCnzvj7wWhcgiB4vArO3f8RYbisraJc";
  const AUTH0_DOMAIN = "dirtvonnegut.auth0.com";

  var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
    auth: {
      params: { scope: 'openid email' } //Details: https://auth0.com/docs/scopes
    }
  });

  // auto login
    if (localStorage.getItem('id_token')) {
      var token = localStorage.getItem('id_token');
      lock.getProfile(token, function(error, profile) {
        if (error) {
          // Handle error
          return;
        }

        // Display user information
        show_profile_info(profile);

        // global ajax Authorization setup
        $.ajaxPrefilter(function( options ) {
          if ( !options.beforeSend) {
            options.beforeSend = function (xhr) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
            }
          }
        });
      });
    }

    var show_profile_info = function(profile) {
      $('#current-user').text(profile.userid);
      $('#login').hide();
      $('#account-actions').show();
     };

    var retrieve_profile = function() {
      var id_token = localStorage.getItem('id_token');
      if (id_token) {
        lock.getProfile(id_token, function (err, profile) {
        if (err) {
          return alert('There was an error getting the profile: ' + err.message);
        }
        // Display user information
        show_profile_info(profile);
        // enable api button
        $('.btn-api').removeAttr("disabled");
        });
      }
    };

    $('#logout').click(function(e) {
       localStorage.removeItem('id_token');
       $('.btn-api').attr("disabled", "true");
       window.location.href = "/roll.html";
       e.preventDefault();
       return false;
    });

  $('#login').click(function(e) {
      e.preventDefault();
      lock.show();
      return false;
  });

  lock.on("authenticated", function(authResult) {
      lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            return;
          }
          localStorage.setItem('id_token', authResult.idToken);

          // Display user information
          show_profile_info(profile);

          // global ajax Authorization setup
          $.ajaxPrefilter(function( options ) {
            if ( !options.beforeSend) {
              options.beforeSend = function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
              }
            }
          });

      });
  });

});
