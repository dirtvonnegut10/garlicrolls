$(document).ready(function(){
    var $x = 100;
    $("#max-bet-error").hide();

    var loginBtn = $('#btn-login');

    loginBtn.click(function(e) {
      var webAuth = new auth0.WebAuth({
        domain: dirtvonnegut.auth0.com,
        clientID: pkCnzvj7wWhcgiB4vArO3f8RYbisraJc,
        redirectUri: location.href,
        audience: 'https://' + dirtvonnegut.auth0.com + '/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
      });

      e.preventDefault();
      webAuth.authorize();
    });

    $("#roll-high").click(function() {
      $("#max-bet-error").hide();
      //TODO: roll the dice
      $("#roll-number").html($x=$x+1);

      //TODO: call web service here to get the hashed server Seed
      $("#serverseed").html($x=$x+1);
    });

    $("#roll-low").click(function() {
      $("#max-bet-error").hide();
      //TODO: roll the dice
      $("#roll-number").html($x=$x+1);

      //TODO: call web service here to get the hashed server Seed
      $("#serverseed").html($x=$x+1);
    });

    $("#half-bet").click(function() {
      $("#max-bet-error").hide();
      var betValue = parseFloat($("#bet-amount").val());
      var halfed = betValue / 2;
      if(halfed > 0.0000000001){
        $("#bet-amount").val(halfed.toFixed(9));
      }else{
        $("#bet-amount").val(0.0000000001);
      }
    });

    $("#double-bet").click(function() {
      var betValue = parseFloat($("#bet-amount").val());
      var doubled = betValue * 2;
      if(doubled < 4){
        $("#bet-amount").val(doubled.toFixed(9));
      }else{
        var max = 4;
        $("#bet-amount").val(max.toFixed(9));
        $("#max-bet-error").show();
      }
    });
});
