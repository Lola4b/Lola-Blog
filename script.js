console.log(musiques)
var tempo = ""
// Etape 1 (avec le data.js): 
/*var description = 0
musiques.forEach(function (chanson) {

    console.log("Musique:" + " " + chanson)
    console.log(descriptionMusiques[description])

    

    document.querySelector(".liste-musiques").innerHTML += "<section class='content content" + description + "'> <h2>" + chanson + "</h2> <p>" + descriptionMusiques[description] + "</p>"
        + ' <audio controls class="audio">'
        + '<source src="musique_test/' + sons[description] +'" type="audio/mp3"  >'
        + 'Indisponible'
        + '</audio>'
        + '<button class="play" id="play'+ description +'">⏵</button>'
        + "</section>";


    description = description + 1
})
document.querySelector(".content1").outerHTML += '<div class="image three"></div>'
var description = 0
musiques.forEach(function (chanson) {
    var player = document.querySelectorAll('.play')[description]; 
    var audio = document.querySelectorAll('.audio')[description];
    let playing = false;
    console.log(player)
    player.addEventListener("click", function () { console.log('toto')
        if (!playing) {
            player.innerHTML = ("⏸");
            //je lance mon audio
            audio.play();
            playing = true
        }
        else {
            player.innerHTML = ("⏵");
            audio.pause();
            playing = false
        }
    })
    description = description + 1
})
*/

// Etape 2 (avec le json et le fetch): 

// on charge le fichier JSON avec fetch
fetch('data.json').then(function(response) { 
    response.json().then(function(data){
  var description = 0;


  data.forEach(function (donnee) {
    document.querySelector(".liste-musiques").innerHTML += "<section class='content content" + description + "'>"
    + "<div class='music-container'>"
    + "<img src='" + donnee.cover + "' class='cover' style='max-width: 250px; height: auto; margin-right: 20px; alt='Cover du morceau' ' />"
    + "<div class='music-details'>"
    + "<h2 class='titre'>" + donnee.musique + "</h2>"
    + "<p class='paragraphe'>" + donnee.descriptionMusique + "</p>"
    + "<audio controls class='audio'>" 
    + "<source src='musiques/" + donnee.son + "' type='audio/mp3'>" 
    + "</audio>" 
    + "<div class='cadre'>"
    + "<a href='" + donnee.link_youtube + "' target='_blank' class='lien'>"
    + "<img src='img/logo_youtube.png' style='max-width: 70px; height: auto; alt='Lien vers le clip' '>"
    + "</a>"
    + "<button class='play' id='play" + description + "'>⏵</button>"
    + "<a href='" + donnee.link_spotify + "' target='_blank' class='lien'>"
    + "<img src='img/logo_spotify.png' style='max-width: 50px; height: auto; alt='Lien vers spotify''>"
    + "</a>" 
    + "</div>"
    + "</div>"
    + "</div>" 
    + "</section>";

    description = description + 1
  });

  var content1 = document.querySelector(".content1");
content1.outerHTML += '<div class="image three"></div>';
document.querySelector('#bottom').innerHTML += '<div class="image imagefour"></div>';


  // on ajoute la fonction play/pause à chaque bouton
  var playButtons = document.querySelectorAll('.play');
  var audioElements = document.querySelectorAll('.audio');
  
  playButtons.forEach(function (button, index) {
    var audio = audioElements[index];
    var playing = false;

    button.addEventListener("click", function () {
      if (!playing) {
        button.innerHTML = "⏸";  
        audio.play();
        playing = true;
      } else {
        button.innerHTML = "⏵";  
        audio.pause();
        playing = false;
      }
    });
  });
})
});

// On créer un formulaire :

document.addEventListener('DOMContentLoaded', function () {
  var titreInput = document.getElementById('titre');
  var descriptionInput = document.getElementById('description');
  var emailInput = document.getElementById('email');
  var urlInput = document.getElementById('url');
  var resultSection = document.getElementById('result');
  var submitBtn = document.getElementById('button');
  var color = ['#FFC1CC', '#FFE4C4', '#F48699', '#CF1D9D', '#FF44F3'];
  var numbercolor = 0; 

  var fenetre = document.getElementById('fenetre');
  var closeBtn = document.querySelector('.fenetre .close');
 

  //Fonction pour afficher la fenêtre
  function showFenetre() {
    fenetre.style.display = 'block';
  // On crée une fonction qui va modifier le style de la var 'fenetre' en lui appliquant la propriété css 'display: block;', ce qui rend l'élément visible à l'écran
  }

  //Fonction pour fermer la fenêtre
  closeBtn.addEventListener('click', function () {
    fenetre.style.display = 'none';
   // On ajoute un écouteur d'événement qui va écouter les clics sur l'élément 'closeBtn'. Lorsque l'utilisateur clique sur le bouton 'closeBtn', l'écouteur déclenche cette fonction, et on applique 'display: none' à la var 'fenetre', ce qui cache la fenêtre 
  });

  // Fonction pour gérer l'envoi du formulaire
  submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    // La méthode preventDefault(), rattachée à l'interface Event, indique à l'agent utilisateur (le navigateur) que si l'événement n'est pas explicitement géré, l'action par défaut (soumettre le formulaire) ne doit pas être exécutée. En gros, cela empêche la soumission immédiate du formulaire pour pouvoir gérer l'action autrement (Source: https://developer.mozilla.org/fr/docs/Web/API/Event/preventDefault)

    var titreValue = titreInput.value;
    var descriptionValue = descriptionInput.value;
    var emailValue = emailInput.value;
    var urlValue = urlInput.value;
    
resultSection.innerHTML +=
  "<div class='resultat' style='background-color: " + color[numbercolor] + ";'>" +
  "<h2 class='resultat_texte'>Titre de la musique : " + titreValue + "</h2>" +
  "<p class='resultat_texte'>Description de la musique : " + descriptionValue + "</p>" +
  "<p class='resultat_texte'>Email : " + emailValue + "</p>" +
  "<p class='resultat_texte'>Url pour écouter le morceau : " + urlValue + "</p>" +
  "</div>";

  numbercolor = numbercolor + 1

    // On envoit les résultats du formulaire vers un serveur web
    var url =
      'https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=beneteau&' +
      'courriel=' + encodeURIComponent(emailValue) + '&' +
      'message=' + encodeURIComponent(descriptionValue);
    console.log(url);

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("Réponse reçue : ");
        console.log(data);
        showFenetre();
      })
      .catch(function (error) {
        console.error("Erreur lors de l'appel API : ", error);
        resultSection.innerHTML += `
          <p>Erreur</p>
        `;
      });
  });
});



// On crée une flèche qui apparaîtra à côté des crédits pour faire apparaître son contenu
document.addEventListener("DOMContentLoaded", function() {
  var toggleButton = document.querySelector('.toggle-button');
  var credits = document.querySelector('.credits');

  credits.style.maxHeight = '0';

  toggleButton.addEventListener('click', function() {
    var isOpen = toggleButton.classList.contains('open');

    if (isOpen) {
      credits.style.maxHeight = '0';
    } else {
      credits.style.maxHeight = credits.scrollHeight + 'px';
    }
    
    // Basculer l'état "open" pour la classe
    toggleButton.classList.toggle('open');
  });
  // On crée une deuxième flèche qui apparaîtra à côté des CGU, pour faire apparaître son contenu
  var toggleButtonCgu = document.querySelector('.toggle-button-cgu');
  var cgu = document.querySelector('.cgu');
  cgu.style.maxHeight = '0';
  toggleButtonCgu.addEventListener('click', function () {
    var isOpen = toggleButtonCgu.classList.contains('open');
    cgu.style.maxHeight = isOpen ? '0' : cgu.scrollHeight + 'px';
    toggleButtonCgu.classList.toggle('open');
  });
});


