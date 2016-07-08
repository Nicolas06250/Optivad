<?php
	header('Content-Type: application/json');
	/*if(filter_var($_GET['email'], FILTER_VALIDATE_EMAIL)){
    	echo "{\"statut\": \"succes\", \"message\": \"&#10004;\"}";
	}
	else {
		echo "{\"statut\": \"erreur\", \"message\": \"&#10008;\"}";
	}*/
	
  //Adresse mail trop longue (254 octets max)
  if(strlen($_GET['email'])>254)
  {
    echo "{\"statut\": \"erreur\", \"color\": \"red\", \"pressisions\": \"adresse trop longue\"}";
  }
  elseif(strlen($_GET['email']) == 0) {
  	echo "{\"statut\": \"erreur\", \"color\": \"white\", \"pressisions\": \"adresse vide\"}";
  }


  //Caractères non-ASCII autorisés dans un nom de domaine .eu :

  $nonASCII='ďđēĕėęěĝğġģĥħĩīĭįıĵķĺļľŀłńņňŉŋōŏőoeŕŗřśŝsťŧ';
  $nonASCII.='ďđēĕėęěĝğġģĥħĩīĭįıĵķĺļľŀłńņňŉŋōŏőoeŕŗřśŝsťŧ';
  $nonASCII.='ũūŭůűųŵŷźżztșțΐάέήίΰαβγδεζηθικλμνξοπρςστυφ';
  $nonASCII.='χψωϊϋόύώабвгдежзийклмнопрстуфхцчшщъыьэюяt';
  $nonASCII.='ἀἁἂἃἄἅἆἇἐἑἒἓἔἕἠἡἢἣἤἥἦἧἰἱἲἳἴἵἶἷὀὁὂὃὄὅὐὑὒὓὔ';
  $nonASCII.='ὕὖὗὠὡὢὣὤὥὦὧὰάὲέὴήὶίὸόὺύὼώᾀᾁᾂᾃᾄᾅᾆᾇᾐᾑᾒᾓᾔᾕᾖᾗ';
  $nonASCII.='ᾠᾡᾢᾣᾤᾥᾦᾧᾰᾱᾲᾳᾴᾶᾷῂῃῄῆῇῐῑῒΐῖῗῠῡῢΰῤῥῦῧῲῳῴῶῷ';
  // note : 1 caractète non-ASCII vos 2 octets en UTF-8


  $syntaxe="#^[[:alnum:][:punct:]]{1,64}@[[:alnum:]-.$nonASCII]{2,253}\.[[:alpha:].]{2,6}$#";

  if(preg_match($syntaxe,$_GET['email']))
  {
    echo "{\"statut\": \"succes\", \"color\": \"green\", \"pressisions\": \"adresse valide\"}";
  }
  else
  {
    echo "{\"statut\": \"erreur\", \"color\": \"red\", \"pressisions\": \"adresse non valide\"}";
  }
?>
