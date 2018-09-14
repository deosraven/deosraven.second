$( document ).ready(function() 
{
	// transformer les title en tooltip myULiège
	$('[title][title!=""]').not('.notooltip').not('.selected-flag').addClass('tooltip');
	 $('.tooltip').tooltipster(); 
});

// Suppression des blancs à gauche et à droite d'un string
function strip(theString)
{
	for (i = 0; i < theString.length && theString.charAt(i) == ' '; i++)
		;
	if (i == theString.length)
	{
		return ('');
	}
	theString = theString.substring(i, theString.length);
	for (i = theString.length - 1; i > 0 && theString.charAt(i) == ' '; i--)
		;
	theString = theString.substring(0, i + 1);
	return (theString);
}

// Vérifie qu'un string ne contient que certains caractères
function verifChars(theString, verifString)
{
	for (i = 0; i < theString.length; i++)
	{
		if (verifString.indexOf(theString.charAt(i)) < 0)
		{
			return (false);
		}
	}
	return (true);
}

// Mise en forme condensée d'un String pour pouvoir effectuer des recherches
// alphabétiques.
function upperTrans(theString)
{
	var strEx = " ´'-"; // caractères exclus (à supprimer)
	var strIn = "àâäéèêëîïöôùûüçñ"; // caractères à modifier
	var strOu = "AAAEEEEIIOOUUUCN";
	var i, car;
	str = '';
	for (i = 0; i < theString.length; i++)
	{
		car = theString.charAt(i);
		if (strEx.indexOf(car) == -1)
		{
			index = strIn.indexOf(car);
			if (index > -1)
				str += strOu.charAt(index);
			else
				str += car;
		}
	}
	if (str != '')
	{
		str = str.toUpperCase();
	}
	return (str);
}


// Vérifier que parmi n champs d'un <FORM>, au moins un est rempli
function validMinimum()
{
	var n = validMinimum.arguments.length;
	var i, champ, firstChamp = null, index, val;
	for (i = 0; i < n; i++)
	{
		champ = validMinimum.arguments[i];
		if (firstChamp == null)
			firstChamp = champ;
		if (champ.value == null)
		{
			index = champ.selectedIndex;
			if (index != null)
			{
				val = champ.options[index].text;
			}
			else
			{
				val = '';
			}
		}
		else
			val = champ.value;
		if (strip(val) != '')
		{
			return (true);
		}
	}
	window.alert("Spécifiez au moins un critère de recherche !");
	firstChamp.focus();
	return (false);
}

// Vérifier qu'un champ est obligatoire dans un <FORM>
function validObligatoire(theChamp, theLabel)
{
	var val;
	if (theLabel == '' || theLabel == null)
	{
		theLabel = "La zone indiquée par le curseur";
	}
	if (theChamp.value == null)
	{
		index = theChamp.selectedIndex;
		if (index != null)
		{
			val = theChamp.options[index].text;
		}
		else
		{
			val = '';
		}
	}
	else
		val = theChamp.value;
	if (strip(val) == '')
	{
		window.alert(theLabel + " est obligatoire !");
		if (theChamp.value != null)
		{
			theChamp.focus();
		}
		return (false);
	}
	return (true);
}

// Vérifier qu'un champ est obligatoire dans un <FORM>
function validObligatoireRB(theForm, theChamp, theLabel)
{
	if (theLabel == '' || theLabel == null)
	{
		theLabel = "La zone indiquée par le curseur";
	}
	var el = document.forms[theForm].elements;
	for (var i = 0; i < el.length; ++i)
	{
		if (el[i].name == theChamp)
		{
			var radiogroup = el[el[i].name]; // get the whole set of radio
												// buttons.
			var itemchecked = false;
			if (!radiogroup.length)
			{
				if (el[i].checked)
				{
					itemchecked = true;
					break;
				}
			}
			else
			{
				for (var j = 0; j < radiogroup.length; ++j)
				{
					if (radiogroup[j].checked)
					{
						itemchecked = true;
						break;
					}
				}
			}
		}
	}

	if (!itemchecked)
	{
		window.alert(theLabel + " est obligatoire !");
		return (false);
	}
	return (true);
}

// Retourne la valeur du radio button qui est cochée
function valueRBChecked(theForm, theChamp)
{
	var el = document.forms[theForm].elements;
	for (var i = 0; i < el.length; ++i)
	{
		if (el[i].name == theChamp)
		{
			var radiogroup = el[el[i].name]; // get the whole set of radio
												// buttons.
			if (!radiogroup.length)
			{
				if (el[i].checked)
				{
					return el[i].value;
				}
			}
			else
			{
				for (var j = 0; j < radiogroup.length; ++j)
				{
					if (radiogroup[j].checked)
					{
						return radiogroup[j].value;
						break;
					}
				}
			}
		}
	}
	return '';
}


// Validation du code de cours
function validCodeCours(theChamp, obligatoire, decl)
{
	var val = theChamp.value;
	if (strip(val) == '')
	{
		if (obligatoire)
		{
			window.alert("Le code de déclinaison est obligatoire !");
			theChamp.focus();
			return (false);
		}
		else
		{
			return (true);
		}
	}

	if (decl)
	{
		if (val.indexOf('-') == -1)
		{
			window.alert("Un code de déclinaison de cours doit être sous la forme de : CINE0000-0");
			theChamp.focus();
			return (false);
		}

		val = val.substr(0, val.indexOf('-'));
	}

	if (val.length == 8) // code : INFO0000
	{
		if (!verifChars(val.toUpperCase().substr(0, 4), "ABCDEFGHIJKLMNOPQRSTUVWXYZ"))
		{
			window.alert("Le code de cours doit commencer par 4 lettres (ex : CINE0000)");
			theChamp.focus();
			return (false);
		}
		if (!verifChars(val.substr(4, 7), "0123456789"))
		{
			window.alert("Le code de cours doit se terminer par 4 chiffres (ex : CINE0000)");
			theChamp.focus();
			return (false);
		}
	}
	else
	{
		window.alert("Un code de cours est composé de 4 lettres suivi de 4 chiffres (ex : CINE0000)");
		theChamp.focus();
		return (false);
	}
	return (true);
}

// Validation de l'annee dans une <FORM>
// Celle-ci doit être numérique (en 4 positions) OU
// égale à *
function validAnnee(theChamp, theLabel, obligatoire, minValue, maxValue)
{
	var val = theChamp.value;
	if (theLabel == '' || theLabel == null)
	{
		theLabel = "La zone indiquée par le curseur";
	}
	if (strip(val) == '')
	{
		if (obligatoire)
		{
			window.alert(theLabel + " est obligatoire !");
			theChamp.focus();
			return (false);
		}
		else
		{
			return (true);
		}
	}
	if (!verifChars(val, "0123456789*"))
	{
		window.alert(theLabel + " doit être numérique ou égal à * !");
		theChamp.focus();
		return (false);
	}
	val = parseInt(strip(val), 10);
	if (minValue != null)
	{
		if (val < minValue)
		{
			window.alert(theLabel + " doit être supérieur ou égal à " + minValue + " !");
			theChamp.focus();
			return (false);
		}
	}
	if (maxValue != null)
	{
		if (val > maxValue)
		{
			window.alert(theLabel + " doit être inférieur ou égal à " + maxValue + " !");
			theChamp.focus();
			return (false);
		}
	}
	return (true);
}



// Valider une date et la renvoyer dans le format JJ/MM/AAAA
function verifDate(theDate)
{
	var maxJours = 31;
	var dateArray = (theDate.indexOf('/') > -1) ? theDate.split('/') : theDate.split('.');
	if (dateArray.length != 3)
	{
		return (false);
	}
	var jour = dateArray[0];
	var mois = dateArray[1];
	var an_str = dateArray[2];
	if (isNaN(jour) || isNaN(mois) || isNaN(an_str) || jour.trim() == '' || mois.trim() == '' || an_str.trim().length < 4)
	{
		return (false);
	}
	jour = parseInt(jour, 10);
	mois = parseInt(mois, 10);
	var an = parseInt(an_str, 10);
	if (an < 1 || an > 9999)
	{
		return (false);
	}
	if (an_str.length == 4)
	{
		an = an_str;
	}
	else
	{
		if (an < 50)
		{
			an = 2000 + an;
		}
		else if (an < 100)
		{
			an = 1900 + an;
		}
	}
	if (mois < 1 || mois > 12)
	{
		return (false);
	}
	if (mois == 4 || mois == 6 || mois == 9 || mois == 11)
	{
		maxJours = 30;
	}
	else if (mois == 2)
	{
		maxJours = (an % 4 == 0) ? 29 : 28;
	}
	if (jour < 1 || jour > maxJours)
	{
		return (false);
	}
	jour = ((jour < 10) ? "0" : "") + jour;
	mois = ((mois < 10) ? "0" : "") + mois;
	theDate = jour + "/" + mois + "/" + an;
	return (theDate);
}

// Validation d'une date dans un <FORM>
function validDate(theChamp, theLabel, obligatoire)
{
	if (theLabel == '' || theLabel == null)
	{
		theLabel = "La date indiquée par le curseur";
	}
	if (strip(theChamp.value) == '')
	{
		if (obligatoire)
		{
			window.alert(theLabel + " est obligatoire !");
			theChamp.focus();
			return (false);
		}
		else
		{
			return (true);
		}
	}
	var theDate = verifDate(theChamp.value);
	if (theDate == false)
	{
		window.alert(theLabel + " est invalide !");
		theChamp.focus();
		return (false);
	}
	theChamp.value = theDate;
	return (true);
}


// Validation d'un identifiant ULG dans un <FORM>
// Le champ doit commencé par u ou s suivi de 6 chiffres
function validIdentifiantUlg(theChamp, obligatoire)
{
	var val = strip(theChamp.value);
	if (val.length == 0)
	{
		if (obligatoire)
		{
			window.alert("L'identifiant est obligatoire !");
			theChamp.focus();
			return (false);
		}
		else
		{
			return (true);
		}
	}
	if (val.length != 7)
	{
		window.alert("L'identifiant doit être entièrement encodé");
		theChamp.focus();
		return (false);
	}
	if (val.substr(0, 1) != 'u' && val.substr(0, 1) != 'U' && val.substr(0, 1) != 's' && val.substr(0, 1) != 'S' && val.substr(0, 1) != 'h' && val.substr(0, 1) != 'H'
			&& val.substr(0, 1) != 'e' && val.substr(0, 1) != 'E' && val.substr(0, 1) != 'c' && val.substr(0, 1) != 'C' && val.substr(0, 1) != 'f' && val.substr(0, 1) != 'F'
			&& val.substr(0, 1) != 'a' && val.substr(0, 1) != 'A')
	{
		window.alert("L'identifiant doit commencer par 'U', 'H', 'S', 'E', 'C', 'F' ou 'A'");
		theChamp.focus();
		return (false);
	}
	if (!verifChars(val.substr(1, 6), "0123456789"))
	{
		if ((val.substr(0, 3) == 'uca' || val.substr(0, 3) == 'UCA') && verifChars(val.substr(3, 6), "0123456789"))
		{
			return (true);
		}
		window.alert("L'identifiant doit être soit sous la forme : U000000 soit UCA0000");
		theChamp.focus();
		return (false);
	}
	return (true);
}

// Validation d'un identifiant ULG dans un <FORM>
// Le champ doit commencé par u ou s suivi de 6 chiffres
function validIdentifiantUlgPenelope(theChamp, obligatoire)
{
	var val = strip(theChamp.value);
	if (val.length == 0)
	{
		if (obligatoire)
		{
			window.alert("L'identifiant est obligatoire !");
			theChamp.focus();
			return (false);
		}
		else
		{
			return (true);
		}
	}
	if (val.length != 8)
	{
		window.alert("L'identifiant doit être entièrement encodé");
		theChamp.focus();
		return (false);
	}
	if (!verifChars(val, "0123456789"))
	{
		window.alert("L'identifiant doit être soit sous la forme : 00000000");
		theChamp.focus();
		return (false);
	}
	return (true);
}

function popup(Cible, Largeur, Hauteur)
{
	return popup(Cible, Largeur, Hauteur, "Divers", 80, 80);
}

function popup(Cible, Largeur, Hauteur, NamePopup)
{
	return popup(Cible, Largeur, Hauteur, NamePopup, 80, 80);
}

function popup(Cible, Largeur, Hauteur, Haut, Droit)
{
	return popup(Cible, Largeur, Hauteur, "Divers", Haut, Droit);
}

function popup(Cible, Largeur, Hauteur, NamePopup, Haut, Droit)
{
	return window.open(Cible, NamePopup, 'width=' + Largeur + ',height=' + Hauteur + ',left=' + Haut + ',top=' + Droit
	      + ',toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=0,scrollbars=1');
}

function popupFullScreen(Cible, NamePopup)
{
	return window.open(Cible, NamePopup, 'fullscreen=1,toolbar=0,location=0,directories=0,status=0,menubar=0,resizable=0,scrollbars=1');
}

function affichDiv(as_text, as_divName)
{
	if (document.getElementById)
	{
		document.getElementById(as_divName).innerHTML = as_text;
	}
	else if (document.all)
	{
		document.all[as_divName].innerHTML = as_text;
	}
}

function affichDivOpener(as_text, as_divName)
{
	if (window.opener.document.getElementById)
	{
		window.opener.document.getElementById(as_divName).innerHTML = as_text;
	}
	else if (window.opener.document.all)
	{
		window.opener.document.all[as_divName].innerHTML = as_text;
	}
}

function affichDivParent(as_text, as_divName)
{
	if (window.parent.document.getElementById)
	{
		window.parent.document.getElementById(as_divName).innerHTML = as_text;
	}
	else if (window.parent.document.all)
	{
		window.parent.document.all[as_divName].innerHTML = as_text;
	}
}

function checkNombre(nb)
{
	// retourne vrai si c'est un nombre et false sinon
	return !(isNaN(nb));
}

function saisieTelephone(obj)
{
	var validationStr = "1234567890/. +";
	var str = obj.value;
	var thisChar;
	var retStr = "";

	for (var i = 0; i < str.length; i++)
	{
		thisChar = str.substring(i, i + 1);
		if (validationStr.indexOf(thisChar) != -1)
		{
			retStr = retStr + thisChar;
		}
	}
	obj.value = retStr;
}

// n'accepte pas les négatif
function saisieNombre(obj, withDelChar, absoluteTest, ai_nbDecimals)
{
	var ls_nb = obj.value;
	if (absoluteTest)
	{
		ls_nb = Math.abs(ls_nb);
	}
	if (!checkNombre(ls_nb))
	{
		var ls_res = ls_nb.substring(0, (ls_nb.length) - 1);
		if (ls_nb.substring((ls_nb.length) - 1) == ',')
		{
			if (checkNombre(ls_res + '.'))
			{
				ls_res += '.';
				obj.value = ls_res;
			}
		}	
		if (withDelChar)
		{
			obj.value = ls_res;
		}
	}

	if (ai_nbDecimals != undefined && withDelChar)
	{
		ls_nb = obj.value;
		var ls_res;
		if (checkNombre(ls_nb) && ls_nb.indexOf(".") > 0)
		{
			if (ai_nbDecimals > 0)
			{
				var ls_nbDec = ls_nb.substr(ls_nb.indexOf(".") + 1);
				if (ls_nbDec.length > ai_nbDecimals)
				{
					ls_nbDec = ls_nb.substr(ls_nb.indexOf(".") + 1, ai_nbDecimals);
				}
				
				ls_res = ls_nb.substr(0, ls_nb.indexOf(".")) + "." + ls_nbDec;
			}
			else
			{
				ls_res = ls_nb.substr(0, ls_nb.indexOf("."));			
			}
			
			obj.value = ls_res;
		}
	}
}

function saisieNote(obj, autoriseAutreChoseThanNote)
{
	if (autoriseAutreChoseThanNote)
	{
		saisieNombre(obj, false, false);
		if (!checkNombre(obj.value))
		{
			if (obj.value == 'A' || obj.value == 'a' || obj.value == 'E' || obj.value == 'e' || obj.value == '?' || obj.value == 'M' || obj.value == 'm' || obj.value == 'V'
					|| obj.value == 'v')
			{
				// ok c'est bon
			}
			else
			{
				obj.value = obj.value.substring(0, (obj.value.length) - 1);
			}
		}
	}
	else
	{
		saisieNombre(obj, true, false);
	}
}

function checkEctsDoct(nbEcts)
{
	if (checkNombre(nbEcts))
	{
		if (nbEcts == 0.5)
		{
			return true;
		}
	}
	// si pas 0.5 on vérifie normalement
	return checkEcts(nbEcts);
}

function checkEcts(nbEcts, ab_paysage)
{
	if (checkNombre(nbEcts))
	{
		// c'est un nombre on vérifie qu'il est bien entre 1 et 60
		if (nbEcts > 60 || nbEcts < 1)
		{
			alert("Veuillez entrer un nombre correct de crédits soit entre 1 et 60");
			return false;
		}

		if (ab_paysage && Math.floor(nbEcts) != nbEcts)
		{ // pas de demi-crédits en paysage
			alert("Veuillez entrer un nombre correct de crédits, le décret paysage permet uniquement l'encodage de crédits entiers");
			return false;
		}

		// test si décimal seulement de .5
		if (!IsInteger('' + (nbEcts * 2)))
		{
			alert("Veuillez entrer un nombre correct de crédits, seul sont permis les demis crédits et les nombres entiers");
			return false;
		}
		return true;
	}
	else
	{
		if (nbEcts != '')
		{
			alert("Veuillez entrer un nombre correct de crédits soit entre 1 et 60");
			return false;
		}
		else
		{
			return true;
		}
	}
}

function checkEctsInForm(formName, input)
{
	return checkEcts(document.forms[formName].elements[input].value);
}

function IsInteger(s)
{
	IsInteger(s, false);
}

function IsInteger(s, withNegatif)
{
	for (var i = 0; i < s.length; i++)
	{
		var c = s.charAt(i);
		if (!((c >= "0") && (c <= "9")))
		{
			if (!withNegatif || c != '-')
			{
				return false;
			}
		}
	}
	return true;
}

// AutoriseAutreChoseThanNote si = true on peut mettre autre chose qu'une notye
// c'est à dire un A pour absent, ...
function checkResult(obj, withDec, AutoriseAutreChoseThanNote)
{
	var ls_message = 'sans décimale';
	if (withDec)
	{
		ls_message = 'avec maximum deux décimales';
	}

	if (obj.value != '' && checkNombre(obj.value))
	{
		// c'est un nombre on vérifie qu'il est bien entre 0 et 20
		if (obj.value > 20 || obj.value < 0)
		{
			alert('Veuillez entrer un résultat correct, soit entre 0 et 20 ' + ls_message + ' --> ' + obj.value + ' (1)');
			obj.focus;
			return false;
		}
		// test si pas de décimal
		if (!IsInteger(obj.value) && !withDec)
		{
			alert('Veuillez entrer un résultat correct, soit entre 0 et 20 ' + ls_message + ' --> ' + obj.value + ' (2)');
			obj.focus;
			return false;
		}
		else if (withDec)
		{
			// max 2 décimal
			if (RoundToNdp(obj.value, 2) != obj.value)
			{
				alert('Veuillez entrer un résultat correct, soit entre 0 et 20 ' + ls_message + ' --> ' + RoundToNdp(obj.value, 2) + ' (3)');
				obj.focus;
				return false;
			}
		}
		return true;
	}
	else if (obj.value != '' && AutoriseAutreChoseThanNote)
	{
		if (obj.value == 'A' || obj.value == 'a' || obj.value == 'E' || obj.value == 'e' || obj.value == '?' || obj.value == 'M' || obj.value == 'm' || obj.value == 'V'
				|| obj.value == 'v')
		{
			return true;
		}
		else
		{
			alert('Veuillez entrer un résultat correct, soit un A pour absent, un E pour excusé ou un ? pour à déterminer. --> ' + obj.value);
			obj.focus;
			return false;
		}
	}
	else if (obj.value != '' && !AutoriseAutreChoseThanNote)
	{
		alert('Veuillez entrer un résultat correct, soit entre 0 et 20 ' + ls_message + ' --> ' + obj.value + ' (4)');
		obj.focus;
		return false;
	}
	else
	{
		return true;
	}
}

// un nombre entre -20 et 20
function checkAjustement(obj, withDec)
{
	var ls_message = 'sans décimale';
	if (withDec)
	{
		ls_message = 'avec maximum deux décimales';
	}

	if (obj.value != '' && checkNombre(obj.value))
	{
		// c'est un nombre on vérifie qu'il est bien entre 0 et 20
		if (obj.value > 20.00 || obj.value < -20.00)
		{
			alert('Veuillez entrer un ajustement correct, soit entre -20 et 20 ' + ls_message + ' --> ' + obj.value + ' (1)');
			obj.focus;
			return false;
		}
		// test si pas de décimal
		if (!IsInteger(obj.value, true) && !withDec)
		{
			alert('Veuillez entrer un ajustement correct, soit entre -20 et 20 ' + ls_message + ' --> ' + obj.value + ' (2)');
			obj.focus;
			return false;
		}
		else if (withDec)
		{
			// max 2 décimal
			if (RoundToNdp(obj.value, 2) != obj.value)
			{
				alert('Veuillez entrer un ajustement correct, soit entre -20 et 20 ' + ls_message + ' --> ' + RoundToNdp(obj.value, 2) + ' (3)');
				obj.focus;
				return false;
			}
		}
		return true;
	}
	else
	{
		return true;
	}
}

function RoundToNdp(X, N)
{
	var T = Number("1e" + N);
	return Math.round(X * T) / T;
}

function nextFocus(obj)
{
	var val = obj.value;
	var maxl = obj.maxLength;
	if (val != "" && maxl > 0)
	{
		var found = false;
		with (obj.form)
		{
			for (i = 0; i < elements.length; i++)
			{
				var elem = elements[i];
				if (!isHidden(elem))
				{
					if (found)
					{
						try
						{
							elem.focus();
							elem.select();
						}
						catch (e)
						{
						}
						return;
					}
					if (obj.name == elem.name)
					{
						found = true;
					}
				}
			}
		}
	}
}

function isHidden(obj)
{
	if (obj == null)
		return true;
	if (obj.style == null)
		return false;
	if (obj.style.display == 'none')
		return true;
	if (obj.style.visibility == 'hidden')
		return true;
	if (obj.type == 'hidden')
		return true;
	return false;
}

function ShowWaitMsgWithFullMsg(msg)
{
	$("#loadingText", window.top.document).html(msg);
	$("#fwLoading-div-background", window.top.document).show();
}

function ShowWaitMsg(msg)
{
	var ls_msg = msg;
	if (typeof msg == 'undefined')
	{
		ls_msg = 'pendant le rafraîchissement de la page';
	}
	$("#loadingText", window.top.document).html('Veuillez patienter ' + ls_msg + '...<br/><br/>Cette action peut prendre un certain temps.');
	$("#fwLoading-div-background", window.top.document).show();
}

function HideWaitMsg()
{
	$("#fwLoading-div-background", window.top.document).hide();
}

function submitAndWait(thisform, msg)
{
	ShowWaitMsg(msg);
	for (i = 0; i < thisform.elements.length; i++)
	{
		if (thisform.elements[i].type == "submit")
		{
			thisform.elements[i].disabled = true;
		}
	}
}

function getElementsByClass(searchClass, node, tag)
{
	var classElements = new Array();
	if (node == null)
		node = document;
	if (tag == null)
		tag = '*';

	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");

	for (i = 0, j = 0; i < elsLen; i++)
	{
		if (pattern.test(els[i].className))
		{
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function hiddenByClass(searchClass, node, tag)
{
	var elm = getElementsByClass(searchClass, node, tag);
	for (var i = 0; i < elm.length; i++)
	{
		elm[i].style.display = "none";
	}
}

function displayByClass(searchClass, node, tag)
{
	var elm = getElementsByClass(searchClass, node, tag);
	for (var i = 0; i < elm.length; i++)
	{
		elm[i].style.display = "block";
	}
}

function hiddenById(searchId)
{
	$('#' + searchId).hide();
}

function displayById(searchId)
{
	$('#' + searchId).show();
}

function getValueRadioOrCheckbox(form, id)
{
	/**
	 * Fonction renvoyant la valeur la valeur d'un radio-groupe
	 * 
	 * @param str/objet
	 *            DOM form Le formulaire, son id, ou même simplement l'élément
	 *            quelconque contenant le groupe radio
	 * @param str
	 *            id Identifiant du nom du groupe radio (attribut 'name')
	 * 
	 * @returns null si aucun bouton radio n'est utilisé / sinon la valeur
	 *          choisie
	 */
	return $('input[type=radio][name="' + id + '"]:checked, input[type="checkbox"][name="' + id + '"]:checked').attr('value');
}

function moveOption(oSourceOpt, oTargetOpt, i)
{
	var o = oSourceOpt.options[i];
	var theOpt = new Option(o.text, o.value, false, false);
	theOpt.className = o.className;

	oTargetOpt.options[oTargetOpt.options.length] = theOpt;
	oSourceOpt.options[i] = null;

	sortSelect(oTargetOpt);
}

function sortSelect(selElem)
{
	var tmpAry = new Array();
	for (var i = 0; i < selElem.options.length; i++)
	{
		tmpAry[i] = new Array();
		tmpAry[i][0] = selElem.options[i].className;
		tmpAry[i][1] = selElem.options[i].value;
		tmpAry[i][2] = selElem.options[i].text;
	}
	tmpAry.sort();
	while (selElem.options.length > 0)
	{
		selElem.options[0] = null;
	}
	for (var i = 0; i < tmpAry.length; i++)
	{
		var op = new Option(tmpAry[i][2], tmpAry[i][1]);
		op.className = tmpAry[i][0];
		selElem.options[i] = op;
	}
	return;
}

function moveOptions(sourceOpt, targetOpt)
{
	var oSourceOpt = document.getElementById(sourceOpt);
	var oTargetOpt = document.getElementById(targetOpt);

	for (var i = oSourceOpt.options.length - 1; i >= 0; i--)
	{
		if (oSourceOpt.options[i].selected)
		{
			moveOption(oSourceOpt, oTargetOpt, i);
		}
	}
}

function optionsChange(sourceOpt, hiddenInput)
{
	var oSourceOpt = document.getElementById(sourceOpt);
	var hidden = document.getElementById(hiddenInput);
	var ls_param = '';

	for (var i = oSourceOpt.options.length - 1; i >= 0; i--)
	{
		ls_param += "--" + oSourceOpt.options[i].value + "--";
	}
	hidden.value = ls_param;
}

function moveAllOptions(sourceOpt, targetOpt)
{
	var oSourceOpt = document.getElementById(sourceOpt);
	var oTargetOpt = document.getElementById(targetOpt);

	for (var i = oSourceOpt.options.length - 1; i >= 0; i--)
	{
		moveOption(oSourceOpt, oTargetOpt, i);
	}
}

function selectAllArrowedList()
{
	var arr = new Array();
	arr = document.getElementsByTagName("select");
	for (i = 0; i < arr.length; i++)
	{
		if (arr[i].getAttribute("rel") != null)
		{
			if (arr[i].getAttribute("rel") == "arrowedListOption")
			{
				for (var j = 0; j < arr[i].options.length; j++)
				{
					arr[i].options[j].selected = true;
				}
			}
		}
	}
}

/*
 * PDO : affiche le nombre de caractères disponibles dans un champ texte (input,
 * textarea) et empêche d'encoder plus de caractères Params : - aTextField :
 * champ contenant le texte - aCounterField : champ dans lequel afficher le
 * compteur - aMaxLength : nb de caractères max
 */
function f_textCounter(aTextField, aCounterField, aMaxLength)
{
	if (eval(aMaxLength + " - aTextField.value.length") <= 0)
	{
		eval("aTextField.value = aTextField.value.substr(0, " + aMaxLength + ")");
	}
	eval("aCounterField.value = " + aMaxLength + " - aTextField.value.length");
}

function lengthWithCR(as_text)
{
	var ls_text = as_text.replace(/\n/g, '\r\n');
	return ls_text.length;
}

function sliceWithCR(as_text, ai_max)
{
	if (lengthWithCR(as_text) > ai_max)
	{
		var ls_text = as_text.replace(/\n/g, '\r\n');
		ls_text = ls_text.slice(0, ai_max);

		if (makeSuffixRegExp("\r").test(ls_text))
		{
			ls_text = ls_text.slice(0, ai_max - 1);
		}

		return ls_text.replace(/\r\n/g, '\n');
	}
	else
	{
		return as_text;
	}
}

function makeSuffixRegExp(suffix, caseInsensitive)
{
	return new RegExp(String(suffix).replace(/[$%()*+.?\[\\\]{|}]/g, "\\$&") + "$", caseInsensitive ? "i" : "");
}

function countDecimals(num)
{
	var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
	if (!match)
	{
		return 0;
	}
	return Math.max(0,
	// Number of digits right of decimal point.
	(match[1] ? match[1].length : 0)
	// Adjust for scientific notation.
	- (match[2] ? +match[2] : 0));
}

// formate un chiffre 'valeur' avec max 'decimal' chiffres après la virgule et
// un separateur de milliers
// ATTENTION !!!!!!!!!!!!!!!!!!!!!!!!!!!! bug 9.07 est formaté en 9.7
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function formatNumber(valeur, decimal, separateur)
{
	if (typeof separateur == 'undefined')
	{
		separateur = '';
	}
	var absVal = Math.abs(valeur);
	var deci = Math.round(Math.pow(10, decimal) * (absVal - Math.floor(absVal)));
	var val = Math.floor(absVal);
	if ((decimal == 0) || (deci == Math.pow(10, decimal)))
	{
		val = Math.floor(absVal);
		deci = 0;
	}
	var val_format = val + "";
	var nb = val_format.length;
	for (var i = 1; i < 4; i++)
	{
		if (val >= Math.pow(10, (3 * i)))
		{
			val_format = val_format.substring(0, nb - (3 * i)) + separateur + val_format.substring(nb - (3 * i));
		}
	}
	if (deci > 0)
	{
		while (deci % 10 == 0)
		{
			deci = deci / 10;
		}
	}
	if (decimal > 0 && deci > 0)
	{
		var decim = "";
		deci = decim + deci.toString();
		val_format = val_format + "." + deci;
	}
	if (parseFloat(valeur) < 0)
	{
		val_format = "-" + val_format;
	}
	return val_format;
}

// classe permettant d'obtenir les dimensions de la fenêtre client
function WindowSize()
{
	this.width = function()
	{
		var myWidth = 0;
		if (typeof (window.innerWidth) == 'number')
		{
			// Non-IE
			myWidth = window.innerWidth;
		}
		else if (document.documentElement && document.documentElement.clientWidth)
		{
			// IE 6+ in 'standards compliant mode'
			myWidth = document.documentElement.clientWidth;
		}
		else if (document.body && document.body.clientWidth)
		{
			// IE 4 compatible
			myWidth = document.body.clientWidth;
		}
		return myWidth;
	};

	this.height = function()
	{
		var myHeight = 0;
		if (typeof (window.innerHeight) == 'number')
		{
			// Non-IE
			myHeight = window.innerHeight;
		}
		else if (document.documentElement && document.documentElement.clientHeight)
		{
			// IE 6+ in 'standards compliant mode'
			myHeight = document.documentElement.clientHeight;
		}
		else if (document.body && document.body.clientHeight)
		{
			// IE 4 compatible
			myHeight = document.body.clientHeight;
		}
		return myHeight;
	};
};

function insertAtCursor(myField, myValue)
{

	// IE support
	if (document.selection)
	{
		myField.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
	}

	// MOZILLA/NETSCAPE support
	else if (myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;

		myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
	}
	else
	{
		myField.value += myValue;
	}
}

function jInsertAtCursor(areaId, text)
{
	var txtarea = document.getElementById(areaId);
	var scrollPos = txtarea.scrollTop;
	var strPos = 0;
	var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? "ff" : (document.selection ? "ie" : false));
	if (br == "ie")
	{
		txtarea.focus();
		var range = document.selection.createRange();
		range.moveStart('character', -txtarea.value.length);
		strPos = range.text.length;
	}
	else if (br == "ff")
		strPos = txtarea.selectionStart;

	var front = (txtarea.value).substring(0, strPos);
	var back = (txtarea.value).substring(strPos, txtarea.value.length);
	txtarea.value = front + text + back;
	strPos = strPos + text.length;
	if (br == "ie")
	{
		txtarea.focus();
		var range = document.selection.createRange();
		range.moveStart('character', -txtarea.value.length);
		range.moveStart('character', strPos);
		range.moveEnd('character', 0);
		range.select();
	}
	else if (br == "ff")
	{
		txtarea.selectionStart = strPos;
		txtarea.selectionEnd = strPos;
		txtarea.focus();
	}
	txtarea.scrollTop = scrollPos;
}

function insertAroundSelection(myField, myValueBefore, myValueAfter)
{
	if (document.selection)
	{
		myField.focus();
		var sel = document.selection.createRange();
		if (!sel.text)
		{
			sel.text = myValueBefore + myValueAfter;
		}
		else
		{
			sel.text = myValueBefore + sel.text + myValueAfter;
		}
	}

	// MOZILLA/NETSCAPE support
	else if (myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;

		myField.value = myField.value.substring(0, startPos) + myValueBefore + myField.value.substring(startPos, endPos) + myValueAfter
		      + myField.value.substring(endPos, myField.value.length);
	}
	else
	{
		myField.value += myValue;
	}
}

function f_sendForm(aFormName, aAction, aActionId, aFormAction, aConfirmMsg)
{
	if (aFormAction != null)
	{
		document.forms[aFormName].action = aFormAction;
	}
	document.forms[aFormName].elements['as_action'].value = aAction;
	if (aActionId != null)
	{
		document.forms[aFormName].elements['as_actionId'].value = aActionId;
	}

	if (aConfirmMsg != null)
	{
		if (confirm(aConfirmMsg))
		{
			document.forms[aFormName].submit();
		}
	}
	else
	{
		document.forms[aFormName].submit();
	}
}

function f_sendFormWithDivWait(aFormName, aAction, aActionId, aFormAction, aConfirmMsg)
{
	ShowWaitMsgWithFullMsg('Chargement');
	f_sendForm(aFormName, aAction, aActionId, aFormAction, aConfirmMsg);
}

function sleep(milliseconds)
{
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++)
	{
		if ((new Date().getTime() - start) > milliseconds)
		{
			break;
		}
	}
}

checkMail = function(myField, ab_alert)
{
	var emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (!$('#' + myField).val())
	{
		if (ab_alert != false)
			alert('Veuillez encoder une adresse de courriel.');
		return false;
	}

	str = $('#' + myField).val();

	if (str.match(emailRegEx))
	{
		return true;
	}
	else
	{
		if (ab_alert != false)
			alert('Veuillez encoder une adresse de courriel valide.');
		return false;
	}
};

var lb_traitementEnCours = false;

function testActionEnCours(confirmText)
{
	if (lb_traitementEnCours)
	{
		return false;
	}
	else
	{
		var continueTraitement = false;
		if (confirmText == '' || confirmText == null)
		{
			continueTraitement = true;
		}
		else
		{
			continueTraitement = confirm(confirmText);
		}
		if (continueTraitement)
		{
			lb_traitementEnCours = true;
			ShowWaitMsg('pendant la réalisation de l\'action en cours');
			return true;
		}
	}
}
function diffdate(d1, d2)
{
	var WNbJours = d2.getTime() - d1.getTime();
	return Math.ceil(WNbJours / (1000 * 60 * 60 * 24));
}

function isNotActionEnCours()
{
	return !lb_traitementEnCours;
}

function mySerialize(Form) // à utiliser si serialize de prototype ne
							// fonctionne (cas sur explorer dans les
							// sélectionneur : bug ie9 avec
// Serialize d élements
// dans un tableau)
{
	var data = "";
	var key = 0;
	for (key = 0; key < Form.elements.length; key++)
	{
		var currentValue = "";
		var lb_selected = false;
		var ls_typeTag = Form.elements[key].tagName.toLowerCase();

		var ls_typeInput = "";
		if (ls_typeTag.toLowerCase() == "input")
		{
			ls_typeInput = Form.elements[key].type;
		}
		if (ls_typeTag == "select")
		{
			currentValue = getHtmlSelectValue(Form.elements[key]);
			lb_selected = true;
		}
		else if (ls_typeInput == "radio" || ls_typeInput == "checkbox")
		{
			if (Form.elements[key].checked)
			{
				lb_selected = true;
				currentValue = Form.elements[key].value;
			}
		}
		else
		{
			currentValue = Form.elements[key].value;
			lb_selected = true;
		}
		if (lb_selected)
			data += (Form.elements[key].name) + "=" + (currentValue) + "&";
	}
	return data.substr(0, data.length - 1);
}

function getHtmlSelectValue(select)
{
	var value = "";
	for (var i = 0; true; i++)
	{
		if (select.options[i])
		{
			if (select.options[i].selected)
			{
				value += select.options[i].value + ",";
			}
		}
		else
		{
			return value.substr(0, value.length - 1);
		}
	}
}

function pulsate(id)
{
	$('#' + id || this).animate({
		opacity : 0
	}, 600, function()
	{
		$(this).animate({
			opacity : 1
		}, 600, pulsate(id));
	});
}

function setInputValidationVide(ao_input)
{
	ao_input.removeClass('inputPassKO inputPassOK');
	ao_input.addClass('inputPass');
}

function setInputValidationOK(ao_input)
{
	ao_input.removeClass('inputPassKO inputPass');
	ao_input.addClass('inputPassOK');
}

function setInputValidationKO(ao_input)
{
	ao_input.removeClass('inputPass inputPassOK');
	ao_input.addClass('inputPassKO');
}

function initTooltips()
{
	$('.tooltip').tooltipster({
	   animation : 'fade',
	   theme : '.tooltipster-myulg',
	   arrow : true,
	   position : 'bottom-right',
	   interactive : true
	});
}

function f_printContent(el)
{
	var restorepage = document.body.innerHTML;
	var printcontent = document.getElementById(el).innerHTML;
	document.body.innerHTML = printcontent;
	window.print();
	document.body.innerHTML = restorepage;
}

function f_modal(aTitle, aUrl, aWidth, aHeight)
{
	fwModalWindow_show(aWidth, aHeight, aUrl, aTitle, '', true, '');	
}

function f_affichCard(aUrl, aTypeElement, aIdElement, aWidth, aHeight)
{
	var idCard = aTypeElement + aIdElement;
	if ($('#' + idCard).length > 0)
	{
		// L'élément est déjà affiché -> le repositionner
		var lCountAjxPop = $('.ajxPop').length + 1;
		var lLeft = 500 + (lCountAjxPop * 20);
		var lTop = 300 + (lCountAjxPop * 20);
		$("#" + idCard).css('left', lLeft + 'px');
		$("#" + idCard).css('top', lTop + 'px');
		$("#" + idCard).css("zIndex", f_getMaxZIndex('ajxPop') + 1);
	}
	else
	{
		$.post(aUrl, {
			as_idElement : aIdElement
		}).done(function(response)
		{
			$("<div/>", {
			   "id" : idCard,
			   "class" : "ajxPop ajxCard "
			}).appendTo("body");

			$("#" + idCard).html(response);
			$("#" + idCard).draggable({
				start : function()
				{
					$("#" + idCard).css("zIndex", f_getMaxZIndex('ajxPop') + 1);
				}
			});

			// Set card to top when clicking
			$("#" + idCard).click(function()
			{
				$("#" + idCard).css("zIndex", f_getMaxZIndex('ajxPop') + 1);
			});

			// Count existing ajxPop and positioning
			var lCountAjxPop = $('.ajxPop').length;
			var lLeft = 500 + (lCountAjxPop * 20);
			var lTop = 160 + (lCountAjxPop * 20);
			$("#" + idCard).css('left', lLeft + 'px');
			$("#" + idCard).css('top', lTop + 'px');
			if (aWidth != null)
			{
				$("#" + idCard).css('width', aWidth + 'px');
			}
			if (aHeight != null)
			{
				$("#" + idCard).css('height', aHeight + 'px');
			}

		});
	}
}

function f_closeAjxPop(aElement)
{
	aElement.closest('.ajxPop').remove();
}

function f_getMaxZIndex(aClass)
{
	var index_highest = 0;
	$("." + aClass).each(function()
	{
		// always use a radix when using parseInt
		var index_current = parseInt($(this).css("zIndex"), 10);
		if (index_current > index_highest)
		{
			index_highest = index_current;
		}
	});

	return index_highest;
}

function cancelPropagation(e)
{
	if (!e)
		e = window.event;

	// IE9 & Other Browsers
	if (e.stopPropagation)
	{
		e.stopPropagation();
	}
	// IE8 and Lower
	else
	{
		e.cancelBubble = true;
	}
}

// Valider une date et la renvoyer dans le format JJ/MM/AAAA
function verifDate(theDate, alertMsg)
{
	var maxJours = 31;
	var dateArray = (theDate.indexOf('/') > -1) ? theDate.split('/') : theDate.split('.');
	if (dateArray.length != 3)
	{
		if (alertMsg != null && alertMsg != '')
		{
			alert(alertMsg + ' doit être au format jj/mm/yyyy');
		}
		return (false);
	}
	var jour = dateArray[0];
	var mois = dateArray[1];
	var an_str = dateArray[2];
	if (jour == null || jour == '' || jour.length != 2 || isNaN(jour) || mois == null || mois == '' || mois.length != 2 || isNaN(mois) || an_str == null || an_str == ''
			|| an_str.length != 4 || isNaN(an_str))
	{
		if (alertMsg != null && alertMsg != '')
		{
			alert(alertMsg + ' doit être au format jj/mm/yyyy');
		}
		return (false);
	}
	jour = parseInt(jour, 10);
	mois = parseInt(mois, 10);
	var an = parseInt(an_str, 10);
	if (an < 1 || an > 9999)
	{
		if (alertMsg != null && alertMsg != '')
		{
			alert(alertMsg + ' doit être au format jj/mm/yyyy');
		}
		return (false);
	}
	if (an_str.length == 4)
	{
		an = an_str;
	}
	else
	{
		if (an < 50)
		{
			an = 2000 + an;
		}
		else if (an < 100)
		{
			an = 1900 + an;
		}
	}
	if (mois < 1 || mois > 12)
	{
		if (alertMsg != null && alertMsg != '')
		{
			alert(alertMsg + ' doit être au format jj/mm/yyyy');
		}
		return (false);
	}
	if (mois == 4 || mois == 6 || mois == 9 || mois == 11)
	{
		maxJours = 30;
	}
	else if (mois == 2)
	{
		maxJours = (an % 4 == 0) ? 29 : 28;
	}
	if (jour < 1 || jour > maxJours)
	{
		if (alertMsg != null && alertMsg != '')
		{
			alert(alertMsg + ' doit être au format jj/mm/yyyy');
		}
		return (false);
	}
	jour = ((jour < 10) ? "0" : "") + jour;
	mois = ((mois < 10) ? "0" : "") + mois;
	theDate = jour + "/" + mois + "/" + an;
	return (theDate);
}


function fw_switchLanguageInterface(as_codLang)
{
	var sep = "?";
	var url = window.location.href;
	if(url.split("?").length>1)
	{
		sep = "&";
	}
	if(url.indexOf('as_codLang')!=-1)
	{
		url = url.substring(0, url.indexOf('as_codLang')+11);
		url += as_codLang;
		window.location = url;
	}
	else
	{
		window.location = window.location.href + sep+"as_codLang=" + as_codLang;
	}
}

function fw_getTempsEcoule(nbMilliSec)
{
	var ls_affich ='';
	var tempsEcoule=new Date();
	tempsEcoule.setTime(nbMilliSec);
	if((tempsEcoule.getHours()-1)>0)
	{
		ls_affich += (tempsEcoule.getHours()-1)+"h ";
	}
	if(tempsEcoule.getMinutes()>0)
	{
		ls_affich += tempsEcoule.getMinutes()+"min ";
	}
	if(tempsEcoule.getSeconds()>0)
	{
		ls_affich += tempsEcoule.getSeconds()+"s ";
	}
	return ls_affich;
}

function sleep(milliseconds) 
{
	var start = new Date().getTime();
	while((new Date().getTime() - start) < milliseconds)
	{	  
	}
}

function getCurrentRefreshTokenId()
{
	var request = $.get({
        url: "/portail/SS_xt/getCurrentRefreshTokenId.do",
        method: "GET" ,
        async: false     
});
	var retour = '';
	request.done(function(data) {
        px_hideWaitMsg();
        retour = data.result;
});

	request.fail(function( jqXHR, textStatus ) {
        px_alert(textStatus);
        px_hideWaitMsg();
});
	return retour;

}

if (!String.prototype.padStart) 
{
    String.prototype.padStart = function padStart(targetLength,padString) 
    {
        targetLength = targetLength>>0; // truncate if number or convert
										// non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) 
        {
            return String(this);
        }
        else 
        {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) 
            {
                padString += padString.repeat(targetLength/padString.length); // append
																				// to
																				// original
																				// to
																				// ensure
																				// we
																				// are
																				// longer
																				// than
																				// needed
            }
            
            return padString.slice(0,targetLength) + String(this);
        }
    };
}