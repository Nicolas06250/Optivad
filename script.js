$(document).ready(function(){
	// Faire une pause dans le programme
	function sleep(milliSeconds){
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + milliSeconds);
	}
	// Fin
	
	// Fonction qui permet de redimentionner avec une annimation chaque onglet ( case qui pour afficher les mails, les appels, ...etc )
	function resize_onglet(onglet) {
		if($("#" + onglet).css("height") == "150px") {
			//$("#" + onglet).css("height", "auto");
			$("#" + onglet).animate({
				height: '+=550px'
			}, 1000);
			$("#" + onglet + " #contenu").attr("class", "bare_scroll_1");
			$("#" + onglet + " #contenu").animate({
				height: '+=550px'
			}, 1000);
			$("#" + onglet + " #bare #signe").html("-");
		}
		else {
			//$("#" + onglet).css("height", "100px");
			$("#" + onglet).animate({
				height: '150px'
			}, 1000);
			$("#" + onglet + " #contenu").attr("class", "bare_scroll_2");
			$("#" + onglet + " #contenu").animate({
				height: '130px'
			}, 1000);
			$("#" + onglet + " #bare #signe").html("+");
		}
	}
	
	// Définitions des styles pour les éléments dont la taille s'adapte en fonctions de la taille d'autres éléments
	$("#mails #contenu, #appels #contenu, #chat #contenu, #memos #contenu, #actions #contenu").height($("#mails").height()-20 + "px");
	
	$("section#gauche table").width($("#gauche").width()-40 + "px");
	$("section#droite").width($("#gauche").width() + "px");
	$("section#droite table").width($("#droite").width()-60 + "px");
	$("section#droite #tab_cmds").css("top", $("#later_cmd").height()+$("#recherches").height()-70 + "px");
	
	
	$("#connexion").width($("#login").width()+$("#connect").width() + "px");
	$("#connect").height($("#login").height()*2+2 + "px");
	// Fin des définitions de style
	
	// Les instructions et fonctions qui s'executent à chaque redimentionnement de la fenêtre de navigateur
	$(window).resize(function(){
		$("section#gauche table").width($("#gauche").width()-40 + "px");
		$("section#droite").width($("#gauche").width() + "px");
		$("section#droite table").width($("#droite").width()-60 + "px");
		$("section#droite #tab_cmds").css("top", $("#later_cmd").height()+$("#recherches").height()-70 + "px");
	});
	// Fin
	
	// au clic sur le plus ou le moins de la bare grise de chaque onglet on redimentionne l'onglet.
	$("#mails #bare #signe").click(function(){
		resize_onglet("mails");
	});
	
	$("#appels #bare #signe").click(function(){
		resize_onglet("appels");
	});
				
	$("#chat #bare #signe").click(function(){
		resize_onglet("chat");
	});
	
	$("#memos #bare #signe").click(function(){
		resize_onglet("memos");
	});
				
	$("#actions #bare #signe").click(function(){
		resize_onglet("actions");
	});
	// Fin
	
	// Fonction AJAX qui permet de récupérer le fichier quickstart.php qui est au format Json et qui à pour fonction de récupérer tous les mail dans la boite mail contact@piscine-clic.fr qui proviennent ou à destination de "l'adresse qui est contenue dans la variable email"
	$.ajax({
		  method: "GET",
		  url: "http://localhost/piscine-clic/tests/quickstart.php",
		  data: { email: "probidou1@yahoo.fr" }
		})
		  .done(function( data ) {
			//alert( "Data Saved: " + data );
			//console.log(data);
			$("#mails #contenu").html( parseMails( data ) );
		});
	// Fin
	
	// Fonction qui permet de parser les données récupérées dans la fonction AJAX ci-dessus pour les afficher proprement et de façon ordonnée
	function parseMails( jsonData ) {
		var str = "";
		var str_contenu_msg = "";
		for (var i=0, Max=jsonData.length; i<Max; i++) {
			//Definition de chaque élément de l'objet
			var Mail = jsonData[i];
			var MessageId = Mail.MessageId;
			var Delivered_To = Mail.Delivered-To;
			//var For = Mail.Received[2].replace("for <", "").replace(">", "");
			var Date_Received = Mail.Received[4];
			var From_Email = Mail.FROM;
			var From_Name  = Mail.From_Name;
			var To = Mail.To;
			var Subject = Mail.Subject;
			var Date_Email = Mail.Date;
			var Hour_Email = Mail.Hour;
			var Parts = Mail.Parts;
			str += "<div>";
			str += "Pour : " + To + "<br>";
			str += "Date : " + Date_Email + " à " + Hour_Email + "<br>";
			if(From_Name != "undefined") {
				str += "De : <span class=\"nom_email gray\" id=\"" + MessageId + "\"><span id=\"click\" onclick=' if( $(this).html() == \"+\") { $(this).html(\"-\"); $(\"#" + MessageId + "\").css(\"width\", \"auto\"); $(\"#" + MessageId + "\").css(\"padding-right\", \"2px\"); } else { $(this).html(\"+\"); $(\"#" + MessageId + "\").css(\"width\", \"20px\"); $(\"#" + MessageId + "\").css(\"padding-right\", \"0px\"); }                                                                                                                               console.log( $(this).html() ); '>+</span> " + From_Email + ",</span> " + From_Name + "<br>";
			}
			else {
				str += "De : " + From_Email + "<br>";
			}
			str += "Sujet : " + Subject;
			str += "</div>";
			str += "<div>";
			for (var j=0, Max2=Parts.length; j<Max2; j++) {
				str += Parts[j] + "<br>";
			}
			str += "</div>";
			str += "<hr>";
		}
		return str;
	}
	// Fin
	
	// intégration du logo de chargement quand un appel est en cours
	function loader() {
		$("#loader").html("<img src=\"loader-larger.gif\" alt=\"loader\" style=\"width: 20px; margin-bottom: -3px;\">");
		$("#loader_date").html("<img src=\"loader-larger.gif\" alt=\"loader\" style=\"width: 20px; margin-bottom: -3px;\">");
	}
	// Fin
	
	//chrono quand un appel est en cours
	var centi = 0;
	var secon = 0;
	var minu = 0;

	function chrono(){
		centi++; //incrémentation des dixièmes de 1
		if (centi > 9) {
			centi = 0;
			secon++;
		}
		//si les dixièmes > 9, on les réinitialise à 0 et on incrémente les secondes de 1
		if (secon > 59) {
			secon = 0;
			minu++;
		}
		//si les secondes > 59, on les réinitialise à 0 et on incrémente les minutes de 1
		if(minu < 10) {
			if(secon < 10 ) {
				$("#temps").html("0" + minu + ":" + "0" + secon);
			}
			else {
				$("#temps").html("0" + minu + ":" + secon);
			}
		}
		else {
			if(secon < 10 ) {
				$("#temps").html(minu + ":" + "0" + secon);
			}
			else {
				$("#temps").html(minu + ":" + secon);
			}
		}
		compte = setTimeout(chrono,100); //la fonction est relancée tous les 10° de secondes
	}
	// Fin
	//fonction qui remet les compteurs à 0
	function rasee(){
		clearTimeout(compte); //arrête la fonction chrono()
		centi=0;
		secon=0;
		minu=0;
		document.forsec.secc.value=" "+centi;
		document.forsec.seca.value=" "+secon;
		document.forsec.secb.value=" "+minu;
	}
	// Fin
	
															// Page de connexion //
															
	// Au focus, on change l'inclinéson du text en fonction de si il es vide ou pas
	$("#pw").focus(function(){
		if($(this).val() != '') {
			$(this).css("font-style", "italic");
		}
		else {
			$(this).css("font-style", "normal");
		}
	});
	// Fin
	
	// Lorsqu'il n'y a plus le focus, on rechange l'inclinéson du text en fonction de si il es vide ou pas
	$("#pw").blur(function(){
		if($(this).val() != '') {
			$(this).css("font-style", "italic");
		}
		else {
			$(this).css("font-style", "normal");
		}
	});
	// Fin
	
	// À chaque caractère entré, on vérifie si le format de l'email est correct
	$("#login").keyup(function() {
		if($(this).val() != '') {
			$(this).css("font-style", "italic");
		}
		else {
			$(this).css("font-style", "normal");
			$("#login").css("background", "white");
		}
		$.ajax({
			  method: "GET",
			  url: "http://localhost/piscine-clic/verif_email.php",
			  data: { email: $("#login").val() }
			})
			  .done(function( data ) {
				//alert( "Data Saved: " + data );
				$("#login").css("background", data.color);
				$("#login").css("color", "white");
			});
	});
	// Fin
		
	// À chaque caractère entré, on change l'inclinéson du text en fonction de si il es vide ou pas
	$("#pw").keyup(function() {
		if($(this).val() != '') {
			$("#pw").css("font-style", "italic");
		}
		else {
			$("#pw").css("font-style", "normal");
			$("#pw").css("background", "white");
		}
	});
	// Fin
	
	loader();
	chrono();
});
