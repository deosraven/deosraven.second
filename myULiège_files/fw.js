/**
 * Créer une fenêtre d'alerte, sans titre.
 *
 * @param text
 *            Texte dans la fenêtre.
 */
function px_alert(text)
{
	fwModalConfirm_createAlert(text, '', '', true);
}

/**
 * Permet de créer une fenêtre d'alerte en spécifiant les paramètres sous forme
 * de tableau associatif. L'ordre des paramètres n'est pas important. Les
 * paramètres suivants sont autorisés : text, titre, look.
 *
 * Exemple : px_alert_aa({titre: "Erreur", text: "Une erreur est survenue"});
 *
 * @param aa_params
 *            Tableau associatif contenant les différents paramètres.
 */
function px_alert_aa(aa_params)
{
	if (typeof aa_params != typeof undefined && typeof aa_params == 'object')
	{
		var text = getStringValue(aa_params, 'text');
		var titre = getStringValue(aa_params, 'titre');
		var look = getStringValue(aa_params, 'look');
		var jsOk = getStringValue(aa_params, 'jsOk');
		var lb_alert;
		switch (look)
		{
		case 'A':
			lb_alert = true;
			break;
		case 'C':
			lb_alert = false;
			break;
		case '':
		default:
			lb_alert = true;
			break;
		}

		fwModalConfirm_createAlert(text, titre, jsOk, lb_alert);
	}
}

/**
 * Fenêtre de confirmation avec boutons plats. La fonction définit des
 * paramètres par défaut (text, jsOk et jsCancel). exemple :
 * px_confirm('Voulez-vous éditer?','edit()');
 *
 * @param text
 *            Texte à afficher.
 * @param jsOk
 *            Fonction JS au format String à exécuter lors du clic sur Ok.
 * @param jsCancel
 *            Fonction JS au format String à exécuter lors du clic sur Annuler.
 */
function px_confirm(text, jsOk, jsCancel)
{
	fwModalConfirm_create(text, '', '', jsOk, '', '', jsCancel, '', '', '', '', '', false, false, false, false);
}

/**
 * Permet de créer une fenêtre de confirmation en spécifiant les paramètres sous
 * forme de tableau associatif. L'ordre des paramètres n'est pas important. Les
 * paramètres suivants sont autorisés : text, textOk, iconOk, jsOk, textCancel,
 * iconCancel, jsCancel, text3, icon3, js3, iconSize, titre, escEqualCancel,
 * enterEqualOk, withCheckForm.
 *
 * Exemple : px_confirm_aa({titre: "Confirmer", text: "Veuillez répondre par OK
 * ou Annuler", jsOk: "f_ok()"});
 *
 * @param aa_params
 *            Tableau associatif contenant les différents paramètres.
 */
function px_confirm_aa(aa_params)
{
	if (typeof aa_params != typeof undefined && typeof aa_params == 'object')
	{
		var text = getStringValue(aa_params, 'text');
		var textOk = getStringValue(aa_params, 'textOk');
		var iconOk = getStringValue(aa_params, 'iconOk');
		var jsOk = aa_params['jsOk'];
		var textCancel = getStringValue(aa_params, 'textCancel');
		var iconCancel = getStringValue(aa_params, 'iconCancel');
		var jsCancel = getStringValue(aa_params, 'jsCancel');
		var text3 = getStringValue(aa_params, 'text3');
		var icon3 = getStringValue(aa_params, 'icon3');
		var js3 = getStringValue(aa_params, 'js3');
		var iconSize = getStringValue(aa_params, 'iconSize');
		var titre = getStringValue(aa_params, 'titre');
		var enterEqualOk = getBooleanValue(aa_params, 'enterEqualOk');
		var escEqualCancel = getBooleanValue(aa_params, 'escEqualCancel');
		var small = getBooleanValue(aa_params, 'small');
		var alert = getBooleanValue(aa_params, 'alert');
		var withCheckForm = getBooleanValue(aa_params, 'withCheckForm');
		
		fwModalConfirm_create(text, textOk, iconOk, jsOk, textCancel, iconCancel, jsCancel, text3, icon3, js3, iconSize, titre, small, alert, enterEqualOk,
				escEqualCancel, withCheckForm);
	}
}

/**
 * Permet de créer et d'afficher une modale directement dans la page sans
 * utiliser le tag du Framework qui réalise exactement la même opération. Il
 * faut passer en paramètres un tableau associatif contenant les
 * caractéristiques de la modale. Les paramètres possibles sont : width, height,
 * url, titre, description, affichButtonClose, afterHide, type, hideContextMenu.
 *
 * Exemple : px_modal_aa({titre: "Ma modale", description: "Sous-texte", url:
 * "action.do", affichButtonClose: false, width: 600, height: 800, type:
 * "IFRAME"});
 *
 * @param aa_params
 *            Tableau associatif contenant les différents paramètres.
 */
function px_modal_aa(aa_params)
{
	if (typeof aa_params != typeof undefined && typeof aa_params == 'object')
	{
		var width = getNumberValue(aa_params, 'width');
		var height = getNumberValue(aa_params, 'height');
		var url = getStringValue(aa_params, 'url');
		var titre = getStringValue(aa_params, 'titre');
		var description = getStringValue(aa_params, 'description');
		var affichButtonClose = getBooleanValue(aa_params, 'affichButtonClose');
		var afterHide = getStringValue(aa_params, 'afterHide');
		var type = getStringValue(aa_params, 'type');
		var hideContextMenu = getBooleanValue(aa_params, 'hideContextMenu');

		fwModalWindow_show(width, height, url, titre, description, affichButtonClose, afterHide, type);
		if (hideContextMenu)
		{
			px_hideContextMenu();
		}
	}
}

/**
 * Permet d'afficher à l'utilisateur un message flottant (toaster) pour indiquer
 * la fin d'une opération. Ce message s'effacera complètement après le délai
 * spécifié en paramètre, avec une animation de fade out.
 *
 * @param delai
 * @param msg
 */
function px_topFadingMsg(delai, msg)
{
	fw_showTopFadingMessageWithMessage(delai, msg);
}

/**
 * Affiche un message flottant (toaster) pour indiquer la fin d'une opération. Ce message s'effacera complètement après le délai spécifié en paramètre, avec une animation de fade out.
 * 
 * Exemple: px_topFadingMsg_aa({msg: "Texte à afficher", delai: 8000, closeable: false, fullWidth: true});
 * 
 * @param aa_params
 *        Tableau associatif contenant les différents paramètres
 */
function px_topFadingMsg_aa(aa_params)
{
	if (typeof aa_params != typeof undefined && typeof aa_params == 'object')
	{
		var msg = getStringValue(aa_params, "msg");
		var delai = getNumberValue(aa_params, "delai");
		var closeable = getBooleanValue(aa_params, "closeable", false);
		var fullWidth = getBooleanValue(aa_params, "fullWidth", false);
		var noTop = getBooleanValue(aa_params, "noTop", false);
		var top = getNumberValue(aa_params, "top");
		if (top == 0)
		{
			top = undefined;
		}
		if (delai == 0)
		{
			delai = 5000;
		}

		fw_showTopFadingMessageWithMessage(delai, msg, closeable, fullWidth, top, noTop);
	}
}

/**
 * Modifie l'image dans le Top Fading Message.
 *
 * @param as_src
 *            Source de l'image.
 * @returns
 */
function px_topFadingUpdateImg(as_src)
{
	fw_updateTopFadingImage(as_src);
}

/**
 * Lors de l'ajout de champs dynamiquement dans un formulaire permet de
 * rafraîchir les checkers --> ajout des étoiles, ...
 */
function px_refreshFormCheckers(as_formId)
{
	fw_initLiveCheckers(as_formId);
}

/**
 * Permet de checker les champs du formulaire sans faire de submit.
 *
 * @param idForm
 *            Identifiant du formulaire pour lequel on veut effectuer la
 *            vérification.
 */
function px_checkForm(idForm)
{
	return fw_checkForm($('#' + idForm));
}

/**
 * Désactiver les Checkers pour un formulaire spécifique. ( ne supprime pas les
 * étoiles )
 *
 * @param idForm
 *            Identifiant du formulaire pour lequel on veut désactiver les
 *            Checkers.
 */
function px_disableCheckForm(idForm)
{
	fw_disableFormChecker(idForm);
}

/**
 * Afficher une fenêtre d'attente avec un message personnalisé.
 *
 * @param msg
 *            Message à afficher.
 */
function px_showWaitMsg(msg)
{
	ShowWaitMsg(msg);
}

function px_showWaitMsgWithFullMsg(msg)
{
	ShowWaitMsgWithFullMsg(msg);
}

/**
 * Cacher la fenêtre d'attente.
 */
function px_hideWaitMsg()
{
	HideWaitMsg();
}

/**
 * Permet d'obtenir le document à télécharger.
 *
 * @param as_urlDoc
 *            le résultat de cette URL doit être :
 *            UtilsFile.sendFileDownload(response, "", FileType.PDF, byte[]);
 *            return null; ou : UtilsFile.sendErrorFileDownload(response,
 *            "error"); return null;
 * @param as_libDoc
 *            Nom du document
 */
function px_getDocument(as_urlDoc, as_libDoc, as_fctJsRefresh)
{
	var ls_libDoc = ' : <span class="fwGras" style="color: green;">' + as_libDoc + '</span>';
	if (typeof as_libDoc == 'undefined')
	{
		ls_libDoc = ' demandé';
	}

	px_showWaitMsg();
	$.fileDownload(as_urlDoc).done(
			function(url)
			{
				fwContextMenu_hide();
				fw_showTopFadingMessageWithMessage(10000, "Le document" + ls_libDoc + " est disponible dans la liste de vos fichier téléchargés de votre navigateur",
						false, true, 120);
				if (typeof as_fctJsRefresh != 'undefined')
				{
					eval(as_fctJsRefresh);
				}
				else
				{
					px_hideWaitMsg();
				}
			}).fail(function(responseHtml, url)
	{
		px_hideWaitMsg();
		var ls_text = responseHtml;
		if (ls_text.match(/<div[^>]*class="fwMain"[^>]*>/gi) !== null)
		{
			ls_text = 'Une erreur interne est survenue.';
		}
		px_alert("Impossible d'obtenir le document" + ls_libDoc + " - cause : " + ls_text);
	});
}

function px_emptyInputsCheckFormOnFocus(idFocus, idAVider)
{
	$('#' + idFocus).focus(function()
	{
		px_emptyInputsCheckForm(idAVider);
	});
}

function px_emptyInputsCheckForm(idAVider)
{
	for (i in idAVider)
	{
		fw_changeVal(idAVider[i], '');
	}
}

function px_hideContextMenu()
{
	fwContextMenu_hide();
}

function px_hideModal(as_msg)
{
	window.top.fwModalWindow_hide(as_msg);
}

/**
 * Les options possibles dans le data sont décrites ici :
 * https://github.com/ehynds/jquery-ui-multiselect-widget/wiki/Options
 */
function px_multiSelect(elem, data)
{
	$(elem).multiselect(data || {});
}

function px_multiSelectFilter(elem, data)
{
	$(elem).multiselect(data || {}).multiselectfilter({label:"Filtre:", placeholder: "",autoReset: false});
}

function px_initCheckers(idRoot)
{
	fw_initLiveCheckers(idRoot);
}

function px_refreshTooltips()
{
	$('[title][title!=""]:not(.notooltip):not(.selected-flag):not(.tooltip)').addClass("tooltip").tooltipster();
}

/**
 * Permet de rafraîchir les tooltips. element peut être un élément de la DOM, un id ou ne pas être défini pour tout réinitialiser sur la page
 */
function px_refreshTooltip(element)
{
	var domElement = null;
	if (typeof element === "object")
		domElement = $(element);
	else if (typeof element === "string")
		domElement = $("#" + element.replace(/^#/, ""));
	else
		domElement = $("*");
	if ($(domElement).length)
	{
		$(domElement).each(function() {
			$(this).tooltipster("content", $(this).attr("title"));
			$(this).removeAttr("title");
		});
	}
}

function px_ajaxDoneJson(data, fnctOnSuccess, fnctOnFail, fnctOnHtmlError)
{
	fnctOnFail = fnctOnFail || function(data)
	{
		px_alert(data.result);
	};
	fnctOnHtmlError = fnctOnHtmlError || function(data)
	{
		$('#fw16Content').html(data);
	};
	if (typeof data === 'string')
	{
		fnctOnHtmlError(data);
	}
	else if (data.success)
	{
		if (fnctOnSuccess)
		{
			fnctOnSuccess(data);
		}
	}
	else
	{
		fnctOnFail(data);
	}
}

function px_wss()
{
	px_alert_aa({
		titre: "Fonction désactivée",
		text: "Fonction désactivée dans ce mode."
	});
}
