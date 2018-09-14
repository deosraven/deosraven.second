var searching = false;
var searchAction;
var prevSearch = null;
var currentPos = -1;
var idChoiceResult;
var idListResult;
var minCharacter;
var choiceMade = false;
var idForm;
var inputKey = undefined;
var inputLibelle;
var divHelp;
var additionalParams =
{};
var additionalFormInputs = [];
var lastIndexOfChoice;
var minPosToGo = 0;
var maxPosToGo = -1;
var nextSearch = undefined;
var ac_isScrollTop = true;
var ac_isScrollBottom = false;
var ac_nextElementToFocus = undefined;
var ac_inputClassOk = '';
var ac_inputClassKo = '';
var ac_afterHide = '';
var ac_inputClassWait = '';
var ac_enterPressed;

$('html').on('click', function(e)
{
	e = e || window.event;
	var obj = e.target || e.srcElement;

	// Permet d'avoir un container type div avec la class donthideonclick et tous les éléments du div ne masqueront pas au click.
	if ($(obj).closest(".donthideonclick").length == 0)
	{
		ac_hideresult(!choiceMade);
	}
});

function ac_getSelected(a_idInput)
{
	return $("#" + a_idInput).val();
}

function ac_init(a_idInput, a_idForm, a_searchAction, a_minCharacter, a_nextElementToFocus, a_inputClassOk, a_inputClassKo, a_afterHide, a_inputClassWait, a_additionalFormInputs)
{
	if (a_nextElementToFocus == '' || a_nextElementToFocus == 'null')
		ac_nextElementToFocus = undefined;
	if (a_nextElementToFocus != undefined)
		ac_nextElementToFocus = "#" + a_nextElementToFocus;
	inputLibelle = "#" + a_idInput + "Lib";
	inputKey = "#" + a_idInput;
	divHelp = "#" + a_idInput + "Help";
	additionalFormInputs = [];

	if (a_additionalFormInputs != '')
	{
		additionalFormInputs = a_additionalFormInputs.split(",");
		additionalParams =
		{};
		additionalFormInputs.forEach(function(entry)
		{
			additionalParams[entry] = $('#' + entry).val();
		});
	}

	idForm = "#" + a_idForm;
	searchAction = a_searchAction;
	idChoiceResult = inputKey + "ChoiceResult";
	idListResult = inputKey + "ListResult";
	minCharacter = a_minCharacter;
	ac_inputClassKo = a_inputClassKo;
	ac_inputClassOk = a_inputClassOk;
	ac_afterHide = a_afterHide;
	ac_inputClassWait = a_inputClassWait;
	// pour si on a plusieurs champ dans la page et éviter que l'input de lib soit remis à 0
	choiceMade = $(inputKey).val() != '' && $(inputKey).val() != undefined && $(inputKey).val() != 'null';
	ac_updateClassInput();

	searching = false;
}

function ac_fillOther(id, key, value)
{
	choiceMade = true;
	$("#" + id).val(key);
	$("#" + id + "Lib").val(value);
	$("#" + id + "Lib").focus();
}

function ac_fillAndGo(key, libelle, go)
{
	$(inputKey).val(key).trigger('change');
	$(inputLibelle).val(libelle);
	if (go)
		$(idForm).submit();
	currentPos = -1;
	choiceMade = true;
	ac_hideresult(false);
}

function ac_onblur()
{
	if (!choiceMade)
	{
		if ($(idChoiceResult).css("display") != "none")
		{
			// if (lastIndexOfChoice == -1)
			// {
			// ac_hideresult(true);
			// } else
			if (lastIndexOfChoice == 0)
			{
				$("#search_0").click();
			}
		}
		else
		{
			ac_hideresult(true);
			// $(inputKey).val('');
			// $(inputLibelle).val('');
		}
	}

	$(divHelp).hide();
}

function ac_onfocus(event, a_idInput, a_idForm, a_searchAction, a_minCharacter, a_nextElementToFocus, a_inputClassOk, a_inputClassKo, a_afterHide, a_inputClassWait, a_additionalFormInputs, a_showAllOnEmptyField)
{
	// pour clear lorsqu'on a + d'une autocompletion sur la même page
	// tout en ne cachant rien si ce qui est init est ce que l'on va reinit
	if (inputKey != "#" + a_idInput)
	{
		ac_hideresult(!choiceMade);
		ac_init(a_idInput, a_idForm, a_searchAction, a_minCharacter, a_nextElementToFocus, a_inputClassOk, a_inputClassKo, a_afterHide, a_inputClassWait, a_additionalFormInputs);
	}
	$(inputLibelle).select();

	if (a_showAllOnEmptyField)
	{
		if ($(inputLibelle).val() == '')
		{
			$(inputLibelle).val('*');
			ac_keyUp(event, a_idInput, a_idForm, a_searchAction, a_minCharacter, a_nextElementToFocus, a_inputClassOk, a_inputClassKo, a_afterHide, a_inputClassWait, a_additionalFormInputs);
		}
	}

	$(divHelp).show();
}

function ac_resetLastUsed()
{
	currentPos = -1;
	prevSearch = null;
	choiceMade = false;
	var isTrigger = false;
	if ($(inputKey).val() != undefined && $(inputKey).val().length)
	{
		isTrigger = true;
	}
	$(inputKey).val('');
	if (isTrigger)
	{
		$(inputKey).trigger("change");
	}
	$(inputLibelle).val('');
	if ($(idChoiceResult) != undefined)
		$(idChoiceResult).css("display", "none");
	$(idListResult).html("");
	ac_updateClassInput();
}

function ac_hideresult(clearFields)
{
	if ($(idChoiceResult).css("display") != "none")
		if (ac_afterHide != '' && ac_afterHide != undefined && ac_afterHide != "null")
			eval(ac_afterHide);
	if ($(idChoiceResult) != undefined)
	{
		currentPos = -1;
		$(idChoiceResult).css("display", "none");
		prevSearch = null;
		nextSearch = undefined;
		$(idListResult).html("");

		// if (!choiceMade || clearFields)
		// {
		// $(inputKey).val('');
		// $(inputLibelle).val('');
		// }
	}
	if (clearFields)
	{
		var isTrigger = false;
		if ($(inputKey).val() != undefined && $(inputKey).val().length)
		{
			isTrigger = true;
		}
		$(inputKey).val('');
		if (isTrigger)
		{
			$(inputKey).trigger("change");
		}
		$(inputLibelle).val('');
	}
	ac_updateClassInput();
}

function ac_keyPress(event)
{
	var keyCode = event.keyCode;
	if (keyCode == 9)
	{
		// TAB
		// si on a qu'un élément de réponse, on l'envoie

		if (lastIndexOfChoice == 0)
		{
			$("#search_0").click();
		}
		else if (currentPos != -1)
		{
			$("#search_" + currentPos).click();
			currentPos = -1;
		}
		else
		{
			ac_hideresult(false);
		}
	}
	else if (keyCode == 27)
	{
		// ESC
		ac_hideresult(false);
	}
	return keyCode != 16 && keyCode != 17 && keyCode != 18 && keyCode != 13 && keyCode != 38 && keyCode != 40 && keyCode != 37 && keyCode != 39;
}

function ac_highlightFirstVisible()
{
	var pos = 0;
	while (true)
	{
		if ($("#search_" + pos).css("display") != "none")
		{
			ac_highlight(pos);
			return;
		}
		pos++;
	}
}

function ac_highlight(a_pos)
{
	if (currentPos != -1)
		if ($("#search_" + currentPos).css("display") != "none")
			$("#search_" + currentPos).attr("style", "");
	// $("#search_" + currentPos).css("backgroundColor", "inherit");
	// $("#search_" + currentPos).css("color", "inherit");
	currentPos = a_pos;
	if ($("#search_" + currentPos).css("display") != "none")
	{
		$("#search_" + currentPos).css("backgroundColor", ac_selectedColor);
		$("#search_" + currentPos).css("color", ac_selectedFontColor);
	}
}

function ac_setMinPosToGo(a_minPosToGo)
{
	minPosToGo = a_minPosToGo;
}

function ac_setMaxPosToGo(a_maxPosToGo)
{
	maxPosToGo = a_maxPosToGo;
}

function ac_setLastIndexOfChoice(a_index)
{
	lastIndexOfChoice = a_index;
}

function ac_searchNextChoiceVisibleUp()
{
	var pos = currentPos;
	for (var i = 0; i < 2; i++)
	{
		while (pos > minPosToGo)
		{
			pos--;
			if ($("#search_" + pos).css("display") != "none")
				return pos;
		}
		pos = maxPosToGo + 1;
		if ($("#result_scroll") != undefined)
		{
			ac_isScrollBottom = true;
			ac_isScrollTop = false;
			$("#result_scroll").scrollTop(0);
		}
	}
}

function ac_searchNextChoiceVisibleDown()
{
	var pos = currentPos;
	for (var i = 0; i < 2; i++)
	{
		while (pos < maxPosToGo)
		{
			pos++;
			if ($("#search_" + pos).css("display") != "none")
				return pos;
		}
		pos = minPosToGo - 1;
		if ($("#result_scroll") != undefined)
		{
			ac_isScrollBottom = false;
			ac_isScrollTop = true;
			$("#result_scroll").scrollTop(0);
		}
	}
}

function ac_canGoUp()
{
	if (currentPos <= minPosToGo)
	{
		ac_highlight(maxPosToGo + 1);
		if ($("#result_scroll") != undefined)
		{
			ac_isScrollBottom = true;
			ac_isScrollTop = false;
			$("#result_scroll").scrollTop(5000);
		}
	}
	return currentPos > minPosToGo;
}

function ac_canGoDown()
{
	if (currentPos >= maxPosToGo)
	{
		ac_highlight(minPosToGo - 1);
		if ($("#result_scroll") != undefined)
		{
			ac_isScrollBottom = false;
			ac_isScrollTop = true;
			$("#result_scroll").scrollTop(0);
		}
	}
	return currentPos < maxPosToGo;
}

function ac_keyUp(event, a_idInput, a_idForm, a_searchAction, a_minCharacter, a_nextElementToFocus, a_inputClassOk, a_inputClassKo, a_afterHide, a_inputClassWait, a_additionalFormInputs)
{
	var value = $(inputLibelle).val();

	if (searching)
	{
		// si en train de chercher, on mémorise la dernière valeur pour faire la recherche après la recherche en cours
		if ((value.length >= minCharacter && prevSearch != value && nextSearch != value) || (value == '*'))
		{
			nextSearch = value;
		}
		else if (value.length < minCharacter)
		{
			// reset pour être sur que l'on fasse la recherche si on retape les mêmes caractères
			prevSearch = "";
			nextSearch = undefined;
		}
		if (event.keyCode == 13)
		{
			ac_enterPressed = true;
		}
		return;
	}

	if (event.keyCode != 9)
	{
		ac_init(a_idInput, a_idForm, a_searchAction, a_minCharacter, a_nextElementToFocus, a_inputClassOk, a_inputClassKo, a_afterHide, a_inputClassWait, a_additionalFormInputs);
	}
	else
	{
		return;
	}

	value = $(inputLibelle).val();

	var keyCode = event.keyCode;

	if (keyCode == 16 || keyCode == 17 || keyCode == 18)
		return;
	else if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 27 || event.keyCode == 39 || event.keyCode == 37)
	{
		if (event.keyCode == 38)
		{
			// UP
			if (currentPos == -1)
				currentPos = 1;
			if (ac_canGoUp())
			{
				// ac_highlight(currentPos - 1);
				ac_highlight(ac_searchNextChoiceVisibleUp());
				if ($("#result_scroll") != undefined)
				{
					var adjust = $("#search_" + currentPos).height() + parseInt($("#search_" + currentPos).css("padding-top")) + parseInt($("#search_" + currentPos).css("padding-bottom"));
					if (ac_isScrollBottom)
					{
						ac_isScrollBottom = false;
						adjust = 0;
					}
					$("#result_scroll").scrollTop($("#result_scroll").scrollTop() - adjust);
				}
			}
		}
		else if (event.keyCode == 40)
		{
			// DOWN
			if (ac_canGoDown())
			{
				// ac_highlight(currentPos + 1);
				ac_highlight(ac_searchNextChoiceVisibleDown());
				if ($("#result_scroll") != undefined)
				{
					var adjust = $("#search_" + currentPos).height() + parseInt($("#search_" + currentPos).css("padding-top")) + parseInt($("#search_" + currentPos).css("padding-bottom"));
					if (ac_isScrollTop)
					{
						ac_isScrollTop = false;
						adjust = 0;
					}
					$("#result_scroll").scrollTop($("#result_scroll").scrollTop() + adjust);
				}
			}
		}
		else if (event.keyCode == 37)
		{
			// LEFT
			if (typeof viewtab_prevTab == 'function')
			{
				viewtab_prevTab();
			}
		}
		else if (event.keyCode == 39)
		{
			// RIGHT
			if (typeof viewtab_nextTab == 'function')
			{
				viewtab_nextTab();
			}
		}
	}
	else if (event.keyCode == 13)
	{
		// Enter
		ac_pressEnter();
	}
	else if ((value.length >= minCharacter && prevSearch != value) || (value == '*'))
	{
		ac_searchValueInDb(value);
	}
	else if (value.length < minCharacter)
	{
		// reset pour être sur que l'on fasse la recherche si on retape les mêmes caractères
		choiceMade = false;
		ac_hideresult(false);
	}
	ac_updateClassInput();
}

function ac_pressEnter()
{
	var clicked = false;
	// si on a qu'un élément de réponse, on l'envoie
	if (lastIndexOfChoice != undefined && lastIndexOfChoice == 0)
	{
		$("#search_0").click();
		clicked = true;
	}
	if (currentPos != -1)
	{
		$("#search_" + currentPos).click();
		currentPos = -1;
		clicked = true;
	}

	if (!clicked)
	{
		setTimeout(function()
		{
			$("#search_0").click();
		}, 1000);
	}

	if (choiceMade && ac_nextElementToFocus != undefined && ac_nextElementToFocus !== '#' && $(ac_nextElementToFocus) != undefined)
	{
		$(ac_nextElementToFocus).focus();
	}
	ac_enterPressed = false;
}

function ac_executeEnterIfNeeded()
{
	if (ac_enterPressed)
	{
		setTimeout(function()
		{
			if ($('.choice:last').attr('id') != undefined)
			{
				ac_setMaxPosToGo(parseInt($('.choice:last').attr('id').substr("search_".length)));
				ac_setLastIndexOfChoice(parseInt($('.choice:last').attr('id').substr("search_".length)));
			}
			ac_pressEnter();
		}, 100);
	}
}

function ac_updateClassInput()
{
	if (searching)
	{
		$(inputLibelle).removeClass(ac_inputClassKo);
		$(inputLibelle).removeClass(ac_inputClassOk);
		$(inputLibelle).addClass(ac_inputClassWait);
	}
	else
	{
		if (choiceMade && ac_inputClassOk != undefined)
		{
			$(inputLibelle).removeClass(ac_inputClassWait);
			$(inputLibelle).removeClass(ac_inputClassKo);
			$(inputLibelle).addClass(ac_inputClassOk);
		}
		else if (ac_inputClassKo != undefined)
		{
			$(inputLibelle).removeClass(ac_inputClassWait);
			$(inputLibelle).removeClass(ac_inputClassOk);
			$(inputLibelle).addClass(ac_inputClassKo);
		}
	}
	if (typeof viewtab_updateImgLienAnnuaire == 'function')
	{
		viewtab_updateImgLienAnnuaire(inputLibelle + "Img", choiceMade);
	}
}

function ac_searchValueInDb(value)
{
	choiceMade = false;
	var isTrigger = false;
	if ($(inputKey).val() != undefined && $(inputKey).val().length)
	{
		isTrigger = true;
	}
	$(inputKey).val('');
	if (isTrigger)
	{
		$(inputKey).trigger("change");
	}
	currentPos = -1;
	prevSearch = value;
	searching = true;
	ac_updateClassInput();
	console.log('avant post');
	$.post(searchAction,
	{
		as_search : value,
		as_params : $.param(additionalParams)
	}).done(function(response)
	{
		console.log(nextSearch);
		if (nextSearch != undefined && nextSearch != value)
		{
			// on a continué à taper pendant la recherche -> nouvelle recherche
			var toSearch = nextSearch;
			nextSearch = undefined;
			ac_searchValueInDb(toSearch);
		}
		else
		{
			searching = false;
			ac_updateClassInput();
			$(idChoiceResult).css("display", "inline-block");
			$(idChoiceResult).css("position", "absolute");
			$(idChoiceResult).css("left", $(inputLibelle).position().left + "px");
			var top = $(inputLibelle).position().top + $(inputLibelle).height() + 5;
			$(idChoiceResult).css("top", top + "px");
			$(idListResult).html(response);

			ac_setMinPosToGo(0);
			if ($('.choice:last').attr('id') != undefined)
			{
				ac_setMaxPosToGo(parseInt($('.choice:last').attr('id').substr("search_".length)));
				ac_setLastIndexOfChoice(parseInt($('.choice:last').attr('id').substr("search_".length)));
				ac_executeEnterIfNeeded();
			}
		}
	});
}