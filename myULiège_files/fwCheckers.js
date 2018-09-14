function fw_checkForm(vThis)
{
	// en attendant, permet de sésactiver les alert dans un confirm car le contenu de l'alert remplace le contenu du confirm ;)
	return fw_checkForm2(vThis, true);
}

function fw_addNotEmpty(id, message)
{
	var elem = $("#" + id);
	if (elem.length)
	{
		if (fw_isAutocompletion(elem))
		{
			$("#" + id + "Lib").addClass("fwNotEmpty");
			$("#" + id + "Lib").attr("fwMessage", message);
		}
		else if (fw_isPhoneInput(elem))
		{
			$("#" + id + "fake").addClass("fwNotEmpty");
			$("#" + id + "fake").attr("fwMessage", message);
		}
		else if (fw_isRegNatInput(elem))
		{
			$("#" + id + "Lib1").addClass("fwNotEmpty");
			$("#" + id + "Lib1").attr("fwMessage", message);
			$("#" + id + "Lib2").addClass("fwNotEmpty");
			$("#" + id + "Lib2").attr("fwMessage", message);
		}
		elem.addClass("fwNotEmpty");
		elem.attr("fwMessage", message);
		fw_initFormCheckers();
	}
}

function fw_addRegex(id, regex, message)
{

	var elem = $("#" + id);
	if (elem.length)
	{
		elem.addClass("fwNotEmpty");
		elem.attr("fwMessage", message);
		elem.attr("fwRegex", regex);
		fw_initFormCheckers();
	}
}

function fw_removeNotEmpty(id)
{
	var elem = $("#" + id);
	if (elem.length)
	{
		if (fw_isAutocompletion(elem))
		{
			$("#" + id + "Lib").removeClass("fwNotEmpty");
			$("#" + id + "Lib").removeAttr("fwMessage");
			$("#" + id + "Lib").removeClass("fwNotValid");
		}
		else if (fw_isPhoneInput(elem))
		{
			$("#" + id + "fake").removeClass("fwNotEmpty");
			$("#" + id + "fake").removeAttr("fwMessage");
			$("#" + id + "fake").removeClass("fwNotValid");
		}
		else if (fw_isRegNatInput(elem))
		{
			$("#" + id + "Lib1").removeClass("fwNotEmpty");
			$("#" + id + "Lib1").removeAttr("fwMessage");
			$("#" + id + "Lib1").removeClass("fwNotValid");
			$("#" + id + "Lib2").removeClass("fwNotEmpty");
			$("#" + id + "Lib2").removeAttr("fwMessage");
			$("#" + id + "Lib2").removeClass("fwNotValid");
		}
		elem.removeClass("fwNotEmpty");
		elem.removeClass("fwNotValid");
		elem.removeAttr("fwMessage");
		if ($("#star-" + id).length)
		{
			$("#star-" + id).remove();
		}
		fw_unbindAllLive(id);
		fw_initFormCheckers();
	}
}

function fw_addNotEmptyGroupe(id, message, groupe)
{
	var elem = $("#" + id);
	if (elem.length)
	{
		if (fw_isAutocompletion(elem))
		{
			$("#" + id + "Lib").addClass("fwNotEmptyGroupe");
			$("#" + id + "Lib").attr("fwMessage", message);
			$("#" + id + "Lib").attr("fwGroupe", groupe);
		}
		else if (fw_isPhoneInput(elem))
		{
			$("#" + id + "fake").addClass("fwNotEmptyGroupe");
			$("#" + id + "fake").attr("fwMessage", message);
			$("#" + id + "fake").attr("fwGroupe", groupe);
		}
		else if (fw_isRegNatInput(elem))
		{
			$("#" + id + "Lib1").addClass("fwNotEmptyGroupe");
			$("#" + id + "Lib1").attr("fwMessage", message);
			$("#" + id + "Lib1").attr("fwGroupe", groupe);
			$("#" + id + "Lib2").addClass("fwNotEmptyGroupe");
			$("#" + id + "Lib2").attr("fwMessage", message);
			$("#" + id + "Lib2").attr("fwGroupe", groupe);
		}
		elem.addClass("fwNotEmptyGroupe");
		elem.attr("fwMessage", message);
		elem.attr("fwGroupe", groupe);
		fw_initFormCheckers();
	}
}

function fw_removeNotEmptyGroupe(id)
{
	var elem = $("#" + id);
	if (elem.length)
	{
		if (fw_isAutocompletion(elem))
		{
			$("#" + id + "Lib").removeClass("fwNotEmptyGroupe");
			$("#" + id + "Lib").removeAttr("fwMessage");
			$("#" + id + "Lib").removeAttr("fwGroupe");
			$("#" + id + "Lib").removeClass("fwNotValid");
		}
		else if (fw_isPhoneInput(elem))
		{
			$("#" + id + "fake").removeClass("fwNotEmptyGroupe");
			$("#" + id + "fake").removeAttr("fwMessage");
			$("#" + id + "fake").removeAttr("fwGroupe");
			$("#" + id + "fake").removeClass("fwNotValid");
		}
		else if (fw_isRegNatInput(elem))
		{
			$("#" + id + "Lib1").removeClass("fwNotEmptyGroupe");
			$("#" + id + "Lib1").removeAttr("fwMessage");
			$("#" + id + "Lib1").removeAttr("fwGroupe");
			$("#" + id + "Lib2").removeClass("fwNotEmptyGroupe");
			$("#" + id + "Lib2").removeAttr("fwMessage");
			$("#" + id + "Lib2").removeAttr("fwGroupe");
			$("#" + id + "Lib1").removeClass("fwNotValid");
			$("#" + id + "Lib2").removeClass("fwNotValid");
		}
		elem.removeClass("fwNotEmptyGroupe");
		elem.removeAttr("fwMessage");
		elem.removeClass("fwNotValid");
		elem.removeAttr("fwGroupe");
		if ($("#star-" + id).length)
		{
			$("#star-" + id).remove();
		}
		fw_unbindAllLive(id);
		fw_initFormCheckers();
	}
}

function fw_addNotEmptyGroupeUnique(id, message, groupe)
{
	var elem = $("#" + id);
	if (elem.length)
	{
		if (fw_isAutocompletion(elem))
		{
			$("#" + id + "Lib").addClass("fwNotEmptyGroupeUnique");
			$("#" + id + "Lib").attr("fwMessage", message);
			$("#" + id + "Lib").attr("fwGroupeUnique", groupe);
		}
		else if (fw_isPhoneInput(elem))
		{
			$("#" + id + "fake").addClass("fwNotEmptyGroupeUnique");
			$("#" + id + "fake").attr("fwMessage", message);
			$("#" + id + "fake").attr("fwGroupeUnique", groupe);
		}
		else if (fw_isRegNatInput(elem))
		{
			$("#" + id + "Lib1").addClass("fwNotEmptyGroupeUnique");
			$("#" + id + "Lib1").attr("fwMessage", message);
			$("#" + id + "Lib1").attr("fwGroupeUnique", groupe);
			$("#" + id + "Lib2").addClass("fwNotEmptyGroupeUnique");
			$("#" + id + "Lib2").attr("fwMessage", message);
			$("#" + id + "Lib2").attr("fwGroupeUnique", groupe);
		}
		elem.addClass("fwNotEmptyGroupeUnique");
		elem.attr("fwMessage", message);
		elem.attr("fwGroupeUnique", groupe);
		fw_initFormCheckers();
	}
}

function fw_removeNotEmptyGroupeUnique(id)
{
	var elem = $("#" + id);
	if (elem.length)
	{
		if (fw_isAutocompletion(elem))
		{
			$("#" + id + "Lib").removeClass("fwNotEmptyGroupeUnique");
			$("#" + id + "Lib").removeAttr("fwMessage");
			$("#" + id + "Lib").removeAttr("fwGroupeUnique");
			$("#" + id + "Lib").removeClass("fwNotValid");
		}
		else if (fw_isPhoneInput(elem))
		{
			$("#" + id + "fake").removeClass("fwNotEmptyGroupeUnique");
			$("#" + id + "fake").removeAttr("fwMessage");
			$("#" + id + "fake").removeAttr("fwGroupeUnique");
			$("#" + id + "fake").removeClass("fwNotValid");
		}
		else if (fw_isRegNatInput(elem))
		{
			$("#" + id + "Lib1").removeClass("fwNotEmptyGroupeUnique");
			$("#" + id + "Lib1").removeAttr("fwMessage");
			$("#" + id + "Lib1").removeAttr("fwGroupeUnique");
			$("#" + id + "Lib2").removeClass("fwNotEmptyGroupeUnique");
			$("#" + id + "Lib2").removeAttr("fwMessage");
			$("#" + id + "Lib2").removeAttr("fwGroupeUnique");
			$("#" + id + "Lib1").removeClass("fwNotValid");
			$("#" + id + "Lib2").removeClass("fwNotValid");
		}
		elem.removeClass("fwNotEmptyGroupeUnique");
		elem.removeAttr("fwMessage");
		elem.removeClass("fwNotValid");
		elem.removeAttr("fwGroupeUnique");
		if ($("#star-" + id).length)
		{
			$("#star-" + id).remove();
		}
		fw_unbindAllLive(id);
		fw_initFormCheckers();
	}
}

function fw_unbindAllLive(id)
{
	var elem = $("#" + id);
	if (elem.length)
	{
		elem.unbind("keyup", fw_liveCheck_text);
		elem.unbind("change", fw_liveCheck_text);
		elem.unbind("click", fw_liveCheck_checkbox);
		elem.unbind("change", fw_liveCheck_autocompletion);
		elem.unbind("change", fw_liveCheck_phone);
		elem.unbind("change", fw_liveCheck_regnat);
		elem.unbind("keyup change", fw_liveCheck_datePicker);
		elem.unbind("click", fw_liveCheck_radio);
		elem.unbind("change", fw_liveCheck_select);
		elem.unbind("keyup", fw_liveCheck_group);
		elem.unbind("change", fw_liveCheck_group);
		elem.unbind("click", fw_liveCheck_group);
		elem.unbind("keyup", fw_liveCheck_groupUnique);
		elem.unbind("change", fw_liveCheck_groupUnique);
		elem.unbind("keyup change", fw_liveCheck_groupUnique);
		elem.unbind("click", fw_liveCheck_groupUnique);
		elem.unbind("keyup", fw_liveCheck_text_regex);
	}
}

function fw_initLiveCheckers(idIn)
{
	var cplSelect = "";
	if (idIn != undefined && idIn != "")
	{
		// console.log('idIn = '+idIn);
		cplSelect = "#" + idIn + "  ";
	}
	// Cas des champs Input Text classiques.
	$(cplSelect + "input[type=text].fwNotEmpty:not(.jscolor):not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)," + cplSelect + " textarea.fwNotEmpty," + cplSelect + " input[type=password].fwNotEmpty").unbind("keyup", fw_liveCheck_text);
	$(cplSelect + "input[type=text].fwNotEmpty:not(.jscolor):not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)," + cplSelect + " textarea.fwNotEmpty," + cplSelect + " input[type=password].fwNotEmpty").bind("keyup", fw_liveCheck_text);
	$(cplSelect + "input[type=text].fwNotEmpty:not(.jscolor):not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)," + cplSelect + " textarea.fwNotEmpty," + cplSelect + " input[type=password].fwNotEmpty").each(fw_starFormCheckers);

	// Cas des Input Text pour l'extension JSColor.
	$(cplSelect + "input[type=text].jscolor.fwNotEmpty").unbind("change keyup", fw_liveCheck_text);
	$(cplSelect + "input[type=text].jscolor.fwNotEmpty").bind("change keyup", fw_liveCheck_text);
	$(cplSelect + "input[type=text].jscolor.fwNotEmpty").each(fw_starFormCheckers);

	// Cas des Checkbox.
	$(cplSelect + "input[type=checkbox].fwNotEmpty").unbind("change", fw_liveCheck_checkbox);
	$(cplSelect + "input[type=checkbox].fwNotEmpty").bind("change", fw_liveCheck_checkbox);
	$(cplSelect + "input[type=checkbox].fwNotEmpty").each(fw_starFormCheckers);

	// cas de l'autocomplétion
	$(cplSelect + "input[type=hidden].fwNotEmpty.fwAutoCompletionId").unbind("change", fw_liveCheck_autocompletion);
	$(cplSelect + "input[type=hidden].fwNotEmpty.fwAutoCompletionId").bind("change", fw_liveCheck_autocompletion);
	$(cplSelect + "input[type=hidden].fwNotEmpty.fwAutoCompletionId").each(fw_starFormCheckers);

	// cas du phoneInput
	$(cplSelect + "input[type=hidden].fwNotEmpty.fwPhoneInputId").unbind("change", fw_liveCheck_phone);
	$(cplSelect + "input[type=hidden].fwNotEmpty.fwPhoneInputId").bind("change", fw_liveCheck_phone);
	$(cplSelect + "input[type=hidden].fwNotEmpty.fwPhoneInputId").each(fw_starFormCheckers);

	// cas du reg nat
	$(cplSelect + "input[type=hidden].fwNotEmpty.fwRegNatInputId ").unbind("change", fw_liveCheck_regnat);
	$(cplSelect + "input[type=hidden].fwNotEmpty.fwRegNatInputId ").bind("change", fw_liveCheck_regnat);
	$(cplSelect + "input[type=hidden].fwNotEmpty.fwRegNatInputId ").each(fw_starFormCheckers);

	// cas du date picker
	$(cplSelect + "input[type=text].fwNotEmpty.inputDatePicker").unbind("keyup change", fw_liveCheck_datePicker);
	$(cplSelect + "input[type=text].fwNotEmpty.inputDatePicker").bind("keyup change", fw_liveCheck_datePicker);
	$(cplSelect + "input[type=text].fwNotEmpty.inputDatePicker").each(fw_starFormCheckers);

	// cas du time picker
	$(cplSelect + "input[type=text].fwNotEmpty.inputTime").unbind("change", fw_liveCheck_text);
	$(cplSelect + "input[type=text].fwNotEmpty.inputTime").bind("change", fw_liveCheck_text);

	$(cplSelect + "input[type=radio].fwNotEmpty").unbind("click", fw_liveCheck_radio);
	$(cplSelect + "input[type=radio].fwNotEmpty").bind("click", fw_liveCheck_radio);
	$(cplSelect + "input[type=radio].fwNotEmpty").each(fw_starFormCheckers);

	$(cplSelect + "select.fwNotEmpty").unbind("change", fw_liveCheck_select);
	$(cplSelect + "select.fwNotEmpty").bind("change", fw_liveCheck_select);
	$(cplSelect + "select.fwNotEmpty").each(fw_starFormCheckers);

	$(cplSelect + "input[type=text].fwNotEmptyGroupe:not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)," + cplSelect + " input[type=password].fwNotEmptyGroupe").unbind("keyup", fw_liveCheck_group);
	$(cplSelect + "input[type=text].fwNotEmptyGroupe:not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)," + cplSelect + " input[type=password].fwNotEmptyGroupe").bind("keyup", fw_liveCheck_group);
	$(cplSelect + "input[type=text].fwNotEmptyGroupe:not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)," + cplSelect + " input[type=password].fwNotEmptyGroupe").each(fw_starFormCheckers);

	// cas de l'autocomplétion
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupe.fwAutoCompletionId").unbind("change", fw_liveCheck_group);
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupe.fwAutoCompletionId").bind("change", fw_liveCheck_group);
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupe.fwAutoCompletionId").each(fw_starFormCheckers);

	// cas du phoneInput
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupe.fwPhoneInputId").unbind("change", fw_liveCheck_group);
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupe.fwPhoneInputId").bind("change", fw_liveCheck_group);
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupe.fwPhoneInputId").each(fw_starFormCheckers);

	// cas du reg nat
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupe.fwRegNatInputId ").unbind("change", fw_liveCheck_group);
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupe.fwRegNatInputId ").bind("change", fw_liveCheck_group);
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupe.fwRegNatInputId ").each(fw_starFormCheckers);

	// cas du datepicker
	$(cplSelect + "input[type=text].fwNotEmptyGroupe.inputDatePicker").unbind("keyup change", fw_liveCheck_group);
	$(cplSelect + "input[type=text].fwNotEmptyGroupe.inputDatePicker").bind("keyup change", fw_liveCheck_group);
	$(cplSelect + "input[type=text].fwNotEmptyGroupe.inputDatePicker").each(fw_starFormCheckers);

	// cas du time picker
	$(cplSelect + "input[type=text].fwNotEmptyGroupe.inputTime").unbind("change", fw_liveCheck_text);
	$(cplSelect + "input[type=text].fwNotEmptyGroupe.inputTime").bind("change", fw_liveCheck_text);

	$(cplSelect + "select.fwNotEmptyGroupe").unbind("change", fw_liveCheck_group);
	$(cplSelect + "select.fwNotEmptyGroupe").bind("change", fw_liveCheck_group);
	$(cplSelect + "select.fwNotEmptyGroupe").each(fw_starFormCheckers);

	$(cplSelect + "input[type=checkbox].fwNotEmptyGroupe").unbind("change", fw_liveCheck_group);
	$(cplSelect + "input[type=checkbox].fwNotEmptyGroupe").bind("change", fw_liveCheck_group);
	$(cplSelect + "input[type=checkbox].fwNotEmptyGroupe").each(fw_starFormCheckers);

	$(cplSelect + "input[type=text].fwNotEmptyGroupeUnique:not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)," + cplSelect + " input[type=password].fwNotEmptyGroupeUnique").unbind("keyup", fw_liveCheck_groupUnique);
	$(cplSelect + "input[type=text].fwNotEmptyGroupeUnique:not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)," + cplSelect + " input[type=password].fwNotEmptyGroupeUnique").bind("keyup", fw_liveCheck_groupUnique);
	$(cplSelect + "input[type=text].fwNotEmptyGroupeUnique:not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)," + cplSelect + " input[type=password].fwNotEmptyGroupeUnique").each(fw_starFormCheckers);

	// cas de l'autocomplétion
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupeUnique.fwAutoCompletionId").unbind("change", fw_liveCheck_groupUnique);
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupeUnique.fwAutoCompletionId").bind("change", fw_liveCheck_groupUnique);
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupeUnique.fwAutoCompletionId").each(fw_starFormCheckers);

	// cas du phoneInput
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupeUnique.fwPhoneInputId").unbind("change", fw_liveCheck_groupUnique);
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupeUnique.fwPhoneInputId").bind("change", fw_liveCheck_groupUnique);
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupeUnique.fwPhoneInputId").each(fw_starFormCheckers);

	// cas du reg nat
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupeUnique.fwRegNatInputId ").unbind("change", fw_liveCheck_groupUnique);
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupeUnique.fwRegNatInputId ").bind("change", fw_liveCheck_groupUnique);
	$(cplSelect + "input[type=hidden].fwNotEmptyGroupeUnique.fwRegNatInputId ").each(fw_starFormCheckers);

	// cas du datepicker
	$(cplSelect + "input[type=text].fwNotEmptyGroupeUnique.inputDatePicker").unbind("keyup change", fw_liveCheck_groupUnique);
	$(cplSelect + "input[type=text].fwNotEmptyGroupeUnique.inputDatePicker").bind("keyup change", fw_liveCheck_groupUnique);
	$(cplSelect + "input[type=text].fwNotEmptyGroupeUnique.inputDatePicker").each(fw_starFormCheckers);

	// cas du time picker
	$(cplSelect + "input[type=text].fwNotEmptyGroupeUnique.inputTime").unbind("change", fw_liveCheck_groupUnique);
	$(cplSelect + "input[type=text].fwNotEmptyGroupeUnique.inputTime").bind("change", fw_liveCheck_groupUnique);

	$(cplSelect + "select.fwNotEmptyGroupeUnique").unbind("change", fw_liveCheck_groupUnique);
	$(cplSelect + "select.fwNotEmptyGroupeUnique").bind("change", fw_liveCheck_groupUnique);
	$(cplSelect + "select.fwNotEmptyGroupeUnique").each(fw_starFormCheckers);

	$(cplSelect + "input[type=checkbox].fwNotEmptyGroupeUnique").unbind("change", fw_liveCheck_groupUnique);
	$(cplSelect + "input[type=checkbox].fwNotEmptyGroupeUnique").bind("change", fw_liveCheck_groupUnique);
	$(cplSelect + "input[type=checkbox].fwNotEmptyGroupeUnique").each(fw_starFormCheckers);

	$(cplSelect + "input[type=text].fwEmptyOrRegex:not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)").unbind("keyup", fw_liveCheck_text_regex);
	$(cplSelect + "input[type=text].fwEmptyOrRegex:not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)").bind("keyup", fw_liveCheck_text_regex);
	$(cplSelect + "input[type=text].fwEmptyOrRegex:not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)").each(fw_starFormCheckers);

	//
	$(cplSelect + "input[type=text].fwEmptyOrNotEmptyGroupe:not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)," + cplSelect + " textarea.fwEmptyOrNotEmptyGroupe," + cplSelect + " input[type=password].fwEmptyOrNotEmptyGroupe")
			.unbind("keyup", fw_liveCheck_emptyOrNot);
	$(cplSelect + "input[type=text].fwEmptyOrNotEmptyGroupe:not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)," + cplSelect + " textarea.fwEmptyOrNotEmptyGroupe," + cplSelect + " input[type=password].fwEmptyOrNotEmptyGroupe").bind("keyup", fw_liveCheck_emptyOrNot);
	$(cplSelect + "input[type=text].fwEmptyOrNotEmptyGroupe:not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)," + cplSelect + " textarea.fwEmptyOrNotEmptyGroupe," + cplSelect + " input[type=password].fwEmptyOrNotEmptyGroupe").each(fw_starFormCheckers);

	// cas de l'autocomplétion
	$(cplSelect + "input[type=hidden].fwEmptyOrNotEmptyGroupe.fwAutoCompletionId").unbind("change", fw_liveCheck_emptyOrNot);
	$(cplSelect + "input[type=hidden].fwEmptyOrNotEmptyGroupe.fwAutoCompletionId").bind("change", fw_liveCheck_emptyOrNot);
	$(cplSelect + "input[type=hidden].fwEmptyOrNotEmptyGroupe.fwAutoCompletionId").each(fw_starFormCheckers);

	// cas du phoneInput
	$(cplSelect + "input[type=hidden].fwEmptyOrNotEmptyGroupe.fwPhoneInputId").unbind("change", fw_liveCheck_emptyOrNot);
	$(cplSelect + "input[type=hidden].fwEmptyOrNotEmptyGroupe.fwPhoneInputId").bind("change", fw_liveCheck_emptyOrNot);
	$(cplSelect + "input[type=hidden].fwEmptyOrNotEmptyGroupe.fwPhoneInputId").each(fw_starFormCheckers);

	// cas du reg nat
	$(cplSelect + "input[type=hidden].fwEmptyOrNotEmptyGroupe.fwRegNatInputId ").unbind("change", fw_liveCheck_emptyOrNot);
	$(cplSelect + "input[type=hidden].fwEmptyOrNotEmptyGroupe.fwRegNatInputId ").bind("change", fw_liveCheck_emptyOrNot);
	$(cplSelect + "input[type=hidden].fwEmptyOrNotEmptyGroupe.fwRegNatInputId ").each(fw_starFormCheckers);

	// cas du datepicker
	$(cplSelect + "input[type=text].fwEmptyOrNotEmptyGroupe.inputDatePicker").unbind("keyup change", fw_liveCheck_emptyOrNot);
	$(cplSelect + "input[type=text].fwEmptyOrNotEmptyGroupe.inputDatePicker").bind("keyup change", fw_liveCheck_emptyOrNot);
	$(cplSelect + "input[type=text].fwEmptyOrNotEmptyGroupe.inputDatePicker").each(fw_starFormCheckers);

	// cas du time picker
	$(cplSelect + "input[type=text].fwEmptyOrNotEmptyGroupe.inputTime").unbind("change", fw_liveCheck_emptyOrNot);
	$(cplSelect + "input[type=text].fwEmptyOrNotEmptyGroupe.inputTime").bind("change", fw_liveCheck_emptyOrNot);

	$(cplSelect + "select.fwEmptyOrNotEmptyGroupe").unbind("change", fw_liveCheck_emptyOrNot);
	$(cplSelect + "select.fwEmptyOrNotEmptyGroupe").bind("change", fw_liveCheck_emptyOrNot);
	$(cplSelect + "select.fwEmptyOrNotEmptyGroupe").each(fw_starFormCheckers);

	// check pour si les forms sont déjà pré-remplis
	fw_checkForm();
}

function fw_changeVal(id, val)
{
	var elem = $("#" + id);
	elem.val(val);
	if (elem.is('input[type=text].fwNotEmpty:not(.jscolor):not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput), textarea.fwNotEmpty, input[type=password].fwNotEmpty'))
	{
		elem.trigger('keyup');
	}
	else if (elem.is('input[type=radio].fwNotEmpty'))
	{
		elem.trigger('click');
	}
	else if (elem.is('input[type=text].fwNotEmptyGroupe:not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput), input[type=password].fwNotEmptyGroupe'))
	{
		elem.trigger('keyup');
	}
	else if (elem.is('input[type=text].fwNotEmptyGroupeUnique:not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput), input[type=password].fwNotEmptyGroupeUnique'))
	{
		elem.trigger('keyup');
	}
	else if (elem.is('input[type=text].fwEmptyOrRegex:not(.fwAutoCompletion):not(.inputDatePicker):not(.fwPhoneInput):not(.fwRegNatInput)'))
	{
		elem.trigger('keyup');
	}
	else
	{
		elem.change();
	}
}

function fw_initFormCheckers()
{
	$("form.fwFormChecker").unbind("submit", fw_submitFormChecker);
	$("form.fwFormChecker").bind("submit", fw_submitFormChecker);

	fw_initLiveCheckers();
}

function fw_submitFormChecker()
{
	var formOk = fw_checkForm($(this));
	if (formOk)
	{
		if ($(this).attr("fwShowWait") != undefined)
		{
			ShowWaitMsgWithFullMsg($(this).attr("fwShowWait"));
		}
		else if ($(this).attr("fwFonctionOnSubmit") != undefined)
		{
			return eval($(this).attr("fwFonctionOnSubmit"));
		}
		return true;
	}
	else
	{
		/*
		 * if ($(this).attr("fwFonctionOnSubmitValidationFailed") != undefined) { eval($(this).attr("fwFonctionOnSubmitValidationFailed")); }
		 */
		return false;
	}
}

$(document).ready(function()
{
	fw_initFormCheckers();
});

function fw_checkForm2(vThis, newAlert)
{
	var isWarningVisu = true;
	var isAlert = true;
	if (!vThis)
	{
		isWarningVisu = false;
		isAlert = false;
		vThis = $(document);
	}
	else
	{
		if (vThis.attr("fwDisabledCheck") == "true")
		{
			return true;
		}
	}
	var ret = true;
	var message = "";
	var addedGeneric = false;
	vThis.find(".fwPhoneInputId:not(.fwNotEmpty):not(.fwNotEmptyGroupe):not(.fwNotEmptyGroupeUnique)").each(function()
	{
		var fake = $("#" + $(this).attr("id") + "fake");
		fake.removeClass("fwNotValid");
		if (fake.val() != "" && $(this).val() == "")
		{
			if (isWarningVisu)
			{
				fake.addClass("fwNotValid");
			}
			if (!addedGeneric)
			{
				addedGeneric = true;
				if (!ret)
					message += "\n";
				message += fw_message_phoneNotValid + ".";
			}
			ret = false;
		}
	});
	addedGeneric = false;
	vThis.find(".inputDatePicker:not(.fwNotEmpty):not(.fwNotEmptyGroupe):not(.fwNotEmptyGroupeUnique)").each(function()
	{
		$(this).removeClass("fwNotValid");
		if (!fw_check_datePicker($(this), false) && $(this).val() != "")
		{
			if (isWarningVisu)
			{
				$(this).addClass("fwNotValid");
			}
			if (!addedGeneric)
			{
				addedGeneric = true;
				if (!ret)
					message += "\n";
				message += fw_message_dateNotValid + ".";
			}
			ret = false;
		}
	});

	var groupeRegNat = "";
	vThis.find("input[type=text].fwNotEmpty:visible:not(:disabled), textarea.fwNotEmpty:visible:not(:disabled), input[type=password].fwNotEmpty:visible:not(:disabled), input[type=checkbox].fwNotEmpty:visible:not(:disabled)").each(function()
	{
		var isOk = true;
		var thisForStar = this;
		if ($(this).is("input[type=checkbox]"))
		{
			isOk = fw_check_checkbox($(this), isWarningVisu);
		}
		else if (fw_isAutocompletion($(this)))
		{
			var id = $(this).attr("id");
			id = id.substring(0, id.length - 3);
			thisForStar = $("#" + id);
			isOk = fw_check_autocompletion($("#" + id), isWarningVisu);
		}
		else if (fw_isPhoneInput($(this)))
		{
			var id = $(this).attr("id");
			id = id.substring(0, id.length - 4);
			thisForStar = $("#" + id);
			isOk = fw_check_phone($("#" + id), isWarningVisu);
		}
		else if (fw_isDatePicker($(this)))
		{
			isOk = fw_check_datePicker($(this), isWarningVisu);
		}
		else if (fw_isRegNatInput($(this)))
		{
			var id = $(this).attr("id");
			id = id.substring(0, id.length - 4);
			if (groupeRegNat.indexOf(id) == -1)
			{
				groupeRegNat += id + "#";
				isOk = fw_check_regnat($("#" + id), isWarningVisu);
			}
			else
			{
				return;
			}
			thisForStar = $("#" + id);
		}
		else if ($(this).attr("class").indexOf("fwPasswordInput") != -1)
		{
			var id = $(this).attr("id");
			if (id.indexOf("Confirm") == -1)
			{
				isOk = $(this).val().length > 0 && fw_pwd_validate(id) && fw_pwd_checkSame(id, id + "Confirm");
				if (!isOk && isWarningVisu)
				{
					$("#" + id + ", #" + id + "Confirm").addClass("fwNotValid");
				}
			}
			else
			{
				return;
			}
		}
		else
		{
			isOk = fw_check_text($(this), isWarningVisu);
		}
		fw_getStarFormChecker($(thisForStar)).removeClass("fwFormCheckerInputOK");
		if (!isOk)
		{
			if (!ret)
				message += "\n";
			message += fw_getFwMessage($(this));
			ret = false;
		}
		else
		{
			fw_getStarFormChecker($(thisForStar)).addClass("fwFormCheckerInputOK");
		}
	});
	vThis.find("input[type=text].fwEmptyOrRegex:visible:not(:disabled)").each(function()
	{
		var isOk = true;
		var thisForStar = this;
		isOk = fw_check_text_regex($(this), isWarningVisu);
		if (!isOk)
		{
			if ($(this).val().length != 0)
			{
				fw_getStarFormChecker($(thisForStar)).show();
			}
			isOk = $(this).val().length == 0;
		}
		fw_getStarFormChecker($(thisForStar)).removeClass("fwFormCheckerInputOK");
		if (!isOk)
		{
			if (!ret)
				message += "\n";
			message += fw_getFwMessage($(this));
			ret = false;
		}
		else if ($(this).val().length)
		{
			fw_getStarFormChecker($(thisForStar)).addClass("fwFormCheckerInputOK");
			fw_getStarFormChecker($(thisForStar)).show();
		}
	});

	vThis.find("select.fwNotEmpty:visible:not(:disabled), select.fwNotEmpty.fwCheckIfDisabled:visible:disabled, div.fwInputSelectMultipleDiv:visible > select.fwNotEmpty.fwEnableCheckMultiple").each(function()
	{
		if (fw_check_select($(this), isWarningVisu))
		{
			fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
		}
		else
		{
			if (!ret)
				message += "\n";
			message += fw_getFwMessage($(this));
			ret = false;
			fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
		}
	});

	var groupes = "";
	vThis.find("input[type=text].fwNotEmptyGroupe:visible:not(:disabled), input[type=password].fwNotEmptyGroupe:visible:not(:disabled), select.fwNotEmptyGroupe:visible:not(:disabled), input[type=checkbox].fwNotEmptyGroupe:visible:not(:disabled)").each(function()
	{
		var groupe = $(this).attr("fwGroupe");
		if (groupes.indexOf(groupe) == -1)
		{
			groupes += "#" + groupe;
			if (fw_check_group($(this), isWarningVisu))
			{
				fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
				if (isWarningVisu)
				{
					$("input[fwGroupe='" + groupe + "'], select[fwGroupe='" + groupe + "']").removeClass("fwNotValid");
				}
			}
			else
			{
				fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
				if (!ret)
					message += "\n";
				ret = false;
				message += fw_getFwMessage($(this));
			}
		}
	});

	groupes = "";
	vThis.find("input[type=text].fwEmptyOrNotEmptyGroupe:visible:not(:disabled), input[type=password].fwEmptyOrNotEmptyGroupe:visible:not(:disabled), textarea.fwEmptyOrNotEmptyGroupe:visible:not(:disabled), select.fwEmptyOrNotEmptyGroupe:visible:not(:disabled)").each(function()
	{
		var groupe = $(this).attr("fwGroupe");
		if (groupes.indexOf(groupe) == -1)
		{
			groupes += "#" + groupe;
			if (fw_check_emptyOrNot($(this), isWarningVisu))
			{
				fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
				if (isWarningVisu)
				{
					$("input[fwGroupe='" + groupe + "'], select[fwGroupe='" + groupe + "'], textarea[fwGroupe='" + groupe + "']").removeClass("fwNotValid");
				}
			}
			else
			{
				fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
				if (!ret)
					message += "\n";
				ret = false;
				message += fw_getFwMessage($(this));
			}
		}
	});

	groupes = "";
	vThis.find("input[type=text].fwNotEmptyGroupeUnique:visible:not(:disabled), input[type=password].fwNotEmptyGroupeUnique:visible:not(:disabled), select.fwNotEmptyGroupeUnique:visible:not(:disabled), input[type=checkbox].fwNotEmptyGroupeUnique:visible:not(:disabled)").each(function()
	{
		var groupe = $(this).attr("fwGroupeUnique");
		if (groupes.indexOf(groupe) == -1)
		{
			groupes += "#" + groupe;
			if (fw_check_groupUnique($(this), isWarningVisu))
			{
				fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
				if (isWarningVisu)
				{
					$("input[fwGroupeUnique='" + groupe + "'], select[fwGroupeUnique='" + groupe + "']").removeClass("fwNotValid");
				}
			}
			else
			{
				fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
				if (!ret)
					message += "\n";
				ret = false;
				message += fw_getFwMessage($(this));
			}
		}
	});

	var names = "";
	vThis.find("input[type=radio].fwNotEmpty:visible:not(:disabled)").each(function()
	{
		var name = $(this).attr("name");
		if (names.indexOf(name) == -1)
		{
			names += "#" + name;
			if (fw_check_radio($(this), isWarningVisu))
			{
				fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
			}
			else
			{
				fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
				if (!ret)
					message += "\n";
				message += fw_getFwMessage($(this));
				ret = false;
			}
		}
	});

	if (!ret && isAlert)
	{
		HideWaitMsg();
		if (newAlert)
		{
			fwModalConfirm_createAlert(message);
		}
		else
		{
			alert(message);
		}
	}
	if (!ret)
	{
		vThis.find("button[type=submit]").each(function()
		{
			if ($(this).attr("fwProtect") != undefined)
			{
				fw_buttonSaveWaitDisable($(this).attr("id"));
			}
		});
	}
	return ret;
}

function fw_check_text_regex(vThis)
{
	var fwRegex = $(vThis).attr("fwRegex");
	var ret = false;
	if (fwRegex != undefined && fwRegex.length)
	{
		var patt = new RegExp(fwRegex, $(vThis).attr("fwRegexFlag"));
		var ret = patt.test($(vThis).val());
		if (!ret && $(vThis).val().length)
		{
			$(vThis).addClass("fwNotValid");
		}
		else
		{
			$(vThis).removeClass("fwNotValid");
			if ($(vThis).val().length == 0)
			{
				ret = false;
			}
		}
	}
	return ret;
}

function fw_check_text(vThis, isWarningVisu)
{
	var ret = true;
	var fwRegex = $(vThis).attr("fwRegex");
	var fwFonction = $(vThis).attr("fwFonction");
	var checkNext = true;
	if (fwRegex != undefined && fwRegex.length)
	{
		checkNext = false;
		ret = fw_check_text_regex(vThis);
		if (!ret && $(vThis).val().length)
		{
			isWarningVisu = true;
		}
	}
	if (ret && fwFonction != undefined && fwFonction.length)
	{
		checkNext = false;
		ret = eval(fwFonction);
	}

	if (checkNext && $(vThis).val().length == 0)
	{
		ret = false;
	}
	else if (checkNext)
	{
		ret = true;
	}
	$(vThis).removeClass("fwNotValid");
	if (!ret && isWarningVisu)
	{
		$(vThis).addClass("fwNotValid");
	}
	return ret;
}

function fw_liveCheck_text_regex()
{
	if (fw_check_text_regex($(this)))
	{
		fw_getStarFormChecker($(this)).show();
		fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
	}
	else
	{
		fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
		if ($(this).val().length != 0)
		{
			fw_getStarFormChecker($(this)).show();
		}
		else
		{
			fw_getStarFormChecker($(this)).hide();
		}
	}
}

function fw_liveCheck_text()
{
	var isOk = fw_check_text($(this));
	if (isOk)
	{
		fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
	}
	else
	{
		fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
	}
	if ($(this).attr("class").indexOf("fwPasswordInput") != -1)
	{
		var id = $(this).attr("id");
		if (id.indexOf("Confirm") != -1)
		{
			id = id.substring(0, id.length - "Confirm".length);
		}
		else
		{
			id += "Confirm";
		}
		if (isOk)
		{
			fw_getStarFormChecker($("#" + id)).addClass("fwFormCheckerInputOK");
		}
		else
		{
			fw_getStarFormChecker($("#" + id)).removeClass("fwFormCheckerInputOK");
		}
	}
}

function fw_check_autocompletion(vThis, isWarningVisu)
{
	var ret;
	if ($(vThis).val().length == 0)
	{
		ret = false;
	}
	else
	{
		ret = true;
	}
	var id = $(vThis).attr("id") + "Lib";
	$("#" + id).removeClass("fwNotValid");
	if (!ret && isWarningVisu)
	{
		$("#" + id).addClass("fwNotValid");
	}
	return ret;
}

function fw_check_phone(vThis, isWarningVisu)
{
	var ret;
	if ($(vThis).val().length == 0)
	{
		ret = false;
	}
	else
	{
		ret = true;
	}
	var id = $(vThis).attr("id") + "fake";
	$("#" + id).removeClass("fwNotValid");
	if (!ret && isWarningVisu)
	{
		$("#" + id).addClass("fwNotValid");
	}
	return ret;
}

function fw_check_regnat(vThis, isWarningVisu)
{
	var ret;
	if ($(vThis).val().length == 0)
	{
		ret = false;
	}
	else
	{
		ret = true;
	}
	var selection = $(vThis).attr("id") + "Lib";
	selection = "#" + selection + "1, #" + selection + "2";
	$(selection).removeClass("fwNotValid");
	if (!ret && isWarningVisu)
	{
		$(selection).addClass("fwNotValid");
	}
	return ret;
}

function fw_liveCheck_autocompletion()
{
	if (!fw_check_autocompletion($(this)))
	{
		fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
	}
	else
	{
		fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
	}
}

function fw_liveCheck_phone()
{
	if (!fw_check_phone($(this)))
	{
		fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
	}
	else
	{
		fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
	}
}

function fw_liveCheck_regnat()
{
	if (!fw_check_regnat($(this)))
	{
		fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
	}
	else
	{
		fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
	}
}

function fw_check_datePicker(vThis, isWarningVisu)
{
	var ret = false;
	var value = $(vThis).val();
	var sdate = value.split("/");
	if (sdate.length == 3 && sdate[0] != "" && sdate[1] != "" && sdate[2] != "" && sdate[2].length == 4)
	{
		var date = new Date(parseInt(sdate[2]), parseInt(sdate[1]) - 1, parseInt(sdate[0]));
		ret = true;
	}
	if (isWarningVisu)
	{
		$(vThis).removeClass("fwNotValid");
	}
	if (!ret && isWarningVisu)
	{
		$(vThis).addClass("fwNotValid");
	}
	return ret;
}

function fw_liveCheck_datePicker()
{
	if (fw_check_datePicker($(this)))
	{
		fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
	}
	else
	{
		fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
	}
}

function fw_check_emptyOrNot(vThis, isWarningVisu)
{
	var ret;
	var groupe = $(vThis).attr("fwGroupe");
	var countAll = 0;
	var countFilled = 0;
	$("input[type=text][fwGroupe='" + groupe + "'].fwEmptyOrNotEmptyGroupe:visible,input[type=password][fwGroupe='" + groupe + "'].fwEmptyOrNotEmptyGroupe, select[fwGroupe='" + groupe + "'].fwEmptyOrNotEmptyGroupe:visible, textarea[fwGroupe='" + groupe + "'].fwEmptyOrNotEmptyGroupe:visible").each(
			function()
			{
				countAll++;
				if ($(this).is("input[type=text]"))
				{
					if (fw_isAutocompletion($(this)))
					{
						var id = $(this).attr("id");
						id = id.substring(0, id.length - 3);
						if (fw_check_autocompletion($("#" + id), isWarningVisu))
						{
							countFilled++;
						}
					}
					else if (fw_isPhoneInput($(this)))
					{
						var id = $(this).attr("id");
						id = id.substring(0, id.length - 4);
						if (fw_check_phone($("#" + id), isWarningVisu))
						{
							countFilled++;
						}
						if ($(this).val().length && !fw_check_phone($("#" + id), isWarningVisu))
						{
							countFilled--;
						}
					}
					else if (fw_isDatePicker($(this)))
					{
						if (fw_check_datePicker($(this), isWarningVisu))
						{
							countFilled++;
						}
					}
					else if (fw_isRegNatInput($(this)))
					{
						var id = $(this).attr("id");
						id = id.substring(0, id.length - 4);
						if (fw_check_regnat($("#" + id), isWarningVisu))
						{
							countFilled++;
						}
					}
					else
					{
						if (fw_check_text($(this), isWarningVisu))
						{
							countFilled++;
						}
					}
				}
				else if ($(this).is("textarea"))
				{
					if (fw_check_text($(this), isWarningVisu))
					{
						countFilled++;
					}
				}
				else
				{
					if (fw_check_select($(this), isWarningVisu))
					{
						countFilled++;
					}
				}
			});
	if (countFilled == 0)
	{
		ret = true;
	}
	else if (countFilled == countAll)
	{
		ret = true;
	}
	else
	{
		ret = false;
	}
	return ret;
}

function fw_check_group(vThis, isWarningVisu)
{
	var ret;
	var groupe = $(vThis).attr("fwGroupe");
	var allOk = true;
	var allEmpty = true;
	$("input[type=text][fwGroupe='" + groupe + "'].fwNotEmptyGroupe:visible, input[type=checkbox][fwGroupe='" + groupe + "'].fwNotEmptyGroupe:visible, select[fwGroupe='" + groupe + "'].fwNotEmptyGroupe:visible").each(function()
	{
		if ($(this).is("input[type=text]"))
		{
			if (fw_isAutocompletion($(this)))
			{
				var id = $(this).attr("id");
				id = id.substring(0, id.length - 3);
				if (fw_check_autocompletion($("#" + id), isWarningVisu))
				{
					allEmpty = false;
				}
			}
			else if (fw_isPhoneInput($(this)))
			{
				var id = $(this).attr("id");
				id = id.substring(0, id.length - 4);
				if (fw_check_phone($("#" + id), isWarningVisu))
				{
					allEmpty = false;
				}
				if ($(this).val().length && !fw_check_phone($("#" + id), isWarningVisu))
				{
					allOk = false;
				}
			}
			else if (fw_isDatePicker($(this)))
			{
				if (fw_check_datePicker($(this), isWarningVisu))
				{
					allEmpty = false;
				}
			}
			else if (fw_isRegNatInput($(this)))
			{
				var id = $(this).attr("id");
				id = id.substring(0, id.length - 4);
				if (fw_check_regnat($("#" + id), isWarningVisu))
				{
					allEmpty = false;
				}
			}
			else
			{
				if (fw_check_text($(this), isWarningVisu))
				{
					allEmpty = false;
				}
			}
		}
		else if ($(this).is("input[type=checkbox]"))
		{
			if (fw_check_group_checkbox($(this), isWarningVisu))
			{
				allEmpty = false;
			}
		}
		else
		{
			if (fw_check_select($(this), isWarningVisu))
			{
				allEmpty = false;
			}
		}
	});
	if (allEmpty || !allOk)
	{
		ret = false;
	}
	else
	{
		ret = true;
	}
	return ret;
}

function fw_liveCheck_group()
{
	var groupe = $(this).attr("fwGroupe");
	if (fw_check_group($(this)))
	{
		fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
	}
	else
	{
		fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
	}
}

function fw_liveCheck_emptyOrNot()
{
	var groupe = $(this).attr("fwGroupe");
	if (fw_check_emptyOrNot($(this)))
	{
		fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
	}
	else
	{
		fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
	}
}

function fw_liveCheck_checkbox()
{
	if (fw_check_checkbox($(this)))
	{
		fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
	}
	else
	{
		fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
	}
}

function fw_check_checkbox(vThis, isWarningVisu)
{
	var ret = false;
	ret = $(vThis).is(":checked");

	$(vThis).removeClass("fwNotValid");
	if (!ret && isWarningVisu)
	{
		$(vThis).addClass("fwNotValid");
	}

	return ret;
}

function fw_check_groupUnique(vThis, isWarningVisu)
{
	var ret;
	var groupe = $(vThis).attr("fwGroupeUnique");
	var cptNotEmpty = 0;
	$("input[type=text][fwGroupeUnique='" + groupe + "'].fwNotEmptyGroupeUnique:visible, input[type=checkbox][fwGroupeUnique='" + groupe + "'].fwNotEmptyGroupeUnique:visible, select[fwGroupeUnique='" + groupe + "'].fwNotEmptyGroupeUnique:visible").removeClass("fwNotValid");
	$("input[type=text][fwGroupeUnique='" + groupe + "'].fwNotEmptyGroupeUnique:visible, input[type=checkbox][fwGroupeUnique='" + groupe + "'].fwNotEmptyGroupeUnique:visible, select[fwGroupeUnique='" + groupe + "'].fwNotEmptyGroupeUnique:visible").each(function()
	{
		if ($(this).is("input[type=text]"))
		{
			if (fw_isAutocompletion($(this)))
			{
				var id = $(this).attr("id");
				id = id.substring(0, id.length - 3);
				if (fw_check_autocompletion($("#" + id), isWarningVisu))
				{
					cptNotEmpty++;
				}
			}
			else if (fw_isPhoneInput($(this)))
			{
				var id = $(this).attr("id");
				id = id.substring(0, id.length - 4);
				if (fw_check_phone($("#" + id), isWarningVisu))
				{
					cptNotEmpty++;
				}

				if ($(this).val().length && !fw_check_phone($("#" + id), isWarningVisu))
				{
					cptNotEmpty = 2; // si un seul numéro du groupe est faux le groupe est d'office faux donc 2
				}
			}
			else if (fw_isDatePicker($(this)))
			{
				if (fw_check_datePicker($(this), isWarningVisu))
				{
					cptNotEmpty++;
				}
			}
			else if (fw_isRegNatInput($(this)))
			{
				var id = $(this).attr("id");
				id = id.substring(0, id.length - 4);
				if (fw_check_regnat($("#" + id), isWarningVisu))
				{
					cptNotEmpty++;
				}
			}
			else
			{
				if (fw_check_text($(this), isWarningVisu))
				{
					cptNotEmpty++;
				}
			}
		}
		else if ($(this).is("input[type=checkbox]"))
		{
			if (fw_check_groupUnique_checkbox($(this), isWarningVisu))
			{
				cptNotEmpty++;
			}
		}
		else
		{
			if (fw_check_select($(this), isWarningVisu))
			{
				cptNotEmpty++;
			}
		}
	});
	if (cptNotEmpty > 1)
	{
		$("input[type=text][fwGroupeUnique='" + groupe + "'].fwNotEmptyGroupeUnique:visible, input[type=checkbox][fwGroupeUnique='" + groupe + "'].fwNotEmptyGroupeUnique:visible, select[fwGroupeUnique='" + groupe + "'].fwNotEmptyGroupeUnique:visible").addClass("fwNotValid");
	}
	if (cptNotEmpty != 1)
	{
		ret = false;
	}
	else
	{
		ret = true;
	}
	return ret;
}

function fw_liveCheck_groupUnique()
{
	if (fw_check_groupUnique($(this)))
	{
		fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
	}
	else
	{
		fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
	}
}

function fw_check_radio(vThis, isWarningVisu)
{
	$("input[type=radio][name='" + name + "'].fwNotEmpty").removeClass("fwNotValid");
	var ret;
	var name = $(vThis).attr("name");
	if ($("input[type=radio][name='" + name + "']:checked.fwNotEmpty:visible").length == 0)
	{
		ret = false;
	}
	else
	{
		ret = true;
	}
	$("input[type=radio][name='" + name + "'].fwNotEmpty").removeClass("fwNotValid");
	if (!ret && isWarningVisu)
	{
		$("input[type=radio][name='" + name + "'].fwNotEmpty").addClass("fwNotValid");
	}
	return ret;
}

function fw_liveCheck_radio()
{
	if (fw_check_radio($(this)))
	{
		fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
	}
	else
	{
		fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
	}
}

function fw_check_select(vThis, isWarningVisu)
{
	var ret;
	if (!$(vThis).find(":selected").is(":disabled") && $(vThis).find(":selected").length && $(vThis).find(":selected").val().length)
	{
		ret = true;
	}
	else
	{
		ret = false;
	}

	$(vThis).removeClass("fwNotValid");
	if (!ret && isWarningVisu)
	{
		$(vThis).addClass("fwNotValid");
	}

	if ($(vThis).parent('div') != undefined && $(vThis).parent('div').hasClass('fwInputSelectMultipleDiv'))
	{
		var ls_parent = $(vThis).parent('div');
		$(ls_parent).find("button").removeClass('fwNotValid');
		if (!ret && isWarningVisu)
		{
			$(ls_parent).find("button").addClass("fwNotValid");
		}
	}

	return ret;
}

function fw_liveCheck_select()
{
	if (fw_check_select($(this)))
	{
		fw_getStarFormChecker($(this)).addClass("fwFormCheckerInputOK");
	}
	else
	{
		fw_getStarFormChecker($(this)).removeClass("fwFormCheckerInputOK");
	}
}

function fw_check_group_checkbox(vThis, isWarningVisu)
{
	var ret;
	var groupe = $(vThis).attr("fwGroupe");
	if ($("input[type=checkbox][fwGroupe='" + groupe + "']:checked.fwNotEmptyGroupe:visible").length != 0)
	{
		ret = true;
	}
	else
	{
		ret = false;
	}
	$("input[type=checkbox][fwGroupe='" + groupe + "'].fwNotEmptyGroupe").removeClass("fwNotValid");
	if (!ret && isWarningVisu)
	{
		$("input[type=checkbox][fwGroupe='" + groupe + "'].fwNotEmptyGroupe").addClass("fwNotValid");
	}
	return ret;
}

function fw_check_groupUnique_checkbox(vThis, isWarningVisu)
{
	var ret;
	var groupe = $(vThis).attr("fwGroupeUnique");
	if ($("input[type=checkbox][fwGroupeUnique='" + groupe + "']:checked.fwNotEmptyGroupeUnique:visible").length != 0)
	{
		ret = true;
	}
	else
	{
		ret = false;
	}
	$("input[type=checkbox][fwGroupeUnique='" + groupe + "'].fwNotEmptyGroupeUnique").removeClass("fwNotValid");
	if (!ret && isWarningVisu)
	{
		$("input[type=checkbox][fwGroupeUnique='" + groupe + "'].fwNotEmptyGroupeUnique").addClass("fwNotValid");
	}
	return ret;
}

function fw_getStarFormChecker(vThis)
{
	if ($(vThis).attr("fwGroupe") != undefined && $(vThis).attr("fwGroupe").length)
	{
		return $("span[fwGroupe='" + $(vThis).attr("fwGroupe") + "']");
	}
	if ($(vThis).attr("fwGroupeUnique") != undefined && $(vThis).attr("fwGroupeUnique").length)
	{
		return $("span[fwGroupeUnique='" + $(vThis).attr("fwGroupeUnique") + "']");
	}
	if ($(vThis).is("input[type=radio]"))
	{
		return $("span[fwGroupe='" + $(vThis).attr("name") + "']");
	}
	var id = $(vThis).attr("id");
	if (id == undefined || id.length == 0)
	{
		id = $(vThis).attr("name");
	}
	return $("span#star-" + id);
}

function fw_getFwMessage(vThis)
{
	var ret = "";
	var isFullFwMessage = false;
	if ($(vThis).attr("class").indexOf("fwEmptyOrRegex") != -1)
	{
		isFullFwMessage = true;
	}
	else if ($(vThis).attr("fwGroupe") != undefined && $(vThis).attr("fwGroupe").length)
	{
		var message = " \"";
		var takeNextRegNat = true;
		var selectionner;
		if ($(vThis).attr("class").indexOf("fwEmptyOrNotEmptyGroupe") == -1)
		{
			selectionner = "[fwGroupe='" + $(vThis).attr("fwGroupe") + "'].fwNotEmptyGroupe:visible";
		}
		else
		{
			selectionner = "[fwGroupe='" + $(vThis).attr("fwGroupe") + "'].fwEmptyOrNotEmptyGroupe:visible";
		}
		$(selectionner).each(function()
		{
			if (fw_isRegNatInput($(this)))
			{
				if (takeNextRegNat)
				{
					takeNextRegNat = false;
				}
				else
				{
					takeNextRegNat = true;
					return;
				}
			}
			if (!isFullFwMessage && $(this).attr("fwMessage").indexOf("$$") == 0)
			{
				isFullFwMessage = true;
			}
			else
			{
				message += $(this).attr("fwMessage") + ", ";
			}
		});
		message = message.substring(0, message.length - 2);
		if ($(vThis).attr("class").indexOf("fwEmptyOrNotEmptyGroupe") == -1)
		{
			ret = fw_message_undeschamps + " " + message + "\" " + fw_message_estobligatoire + ".";
		}
		else
		{
			ret = fw_message_tousouaucunchamp + " " + message + "\" " + fw_message_doiventetreremplis + ".";
		}
	}
	else if ($(vThis).attr("fwGroupeUnique") != undefined && $(vThis).attr("fwGroupeUnique").length)
	{
		var message = " \"";
		var takeNextRegNat = true;
		$("[fwGroupeUnique='" + $(vThis).attr("fwGroupeUnique") + "'].fwNotEmptyGroupeUnique:visible").each(function()
		{
			if (fw_isRegNatInput($(this)))
			{
				if (takeNextRegNat)
				{
					takeNextRegNat = false;
				}
				else
				{
					takeNextRegNat = true;
					return;
				}
			}
			if (!isFullFwMessage && $(this).attr("fwMessage").indexOf("$$") == 0)
			{
				isFullFwMessage = true;
			}
			else
			{
				message += $(this).attr("fwMessage") + ", ";
			}
		});
		message = message.substring(0, message.length - 2);
		ret = fw_message_unseuldeschamps + " " + message + "\" " + fw_message_estobligatoire + ".";
	}
	else
	{
		if ($(vThis).attr("fwMessage") != undefined && $(vThis).attr("fwMessage") != "")
		{
			if (!isFullFwMessage && $(vThis).attr("fwMessage").indexOf("$$") == 0)
			{
				isFullFwMessage = true;
			}
			else
			{
				ret = fw_message_lechamp + " \"" + $(vThis).attr("fwMessage") + "\" " + fw_message_estobligatoire + ".";
			}
		}
	}
	if (isFullFwMessage)
	{
		if ($(vThis).attr("fwMessage") != undefined && $(vThis).attr("fwMessage") != "")
		{
			if ($(vThis).attr("fwMessage").indexOf("$$") == 0)
			{
				ret = $(vThis).attr("fwMessage").substring(2, $(vThis).attr("fwMessage").legnth);
			}
			else
			{
				ret = $(vThis).attr("fwMessage");
			}
		}
	}
	return ret;
}

function fw_starFormCheckers()
{
	if (!fw_getElementAff($(this)).is(":visible") || fw_getElementAff($(this)).is(":disabled"))
		return;
	var isId = true;
	var id = $(this).attr("id");
	if (id == undefined || id.length == 0)
	{
		id = $(this).attr("name");
		isId = false;
	}
	if (id != undefined && id.length != 0)
	{
		if (!$("#star-" + id).length)
		{
			var isForRegexOnly = false;
			var spanid = "star-" + id;
			var klass = "fwFormStar fwNotEmptyStar";
			var span = $("<span />");
			if ($(this).attr("class").indexOf("fwNotEmptyGroupeUnique") != -1)
			{
				klass = "fwFormStar fwNotEmptyGroupeUniqueStar";
			}
			else if ($(this).attr("class").indexOf("fwEmptyOrNotEmptyGroupe") != -1)
			{
				klass = "fwFormStar fwEmptyOrNotEmptyGroupeStar";
			}
			else if ($(this).attr("class").indexOf("fwNotEmptyGroupe") != -1)
			{
				klass = "fwFormStar fwNotEmptyGroupeStar";
			}
			else if ($(this).attr("class").indexOf("fwEmptyOrRegex") != -1)
			{
				klass = "fwFormStar fwNotEmptyStar fwEmptyOrRegexStar";
				isForRegexOnly = true;
			}
			var tooltips = fw_getFwMessage($(this));
			if ($(this).attr("class").indexOf("fwNoStar") != -1)
			{
				klass += " fwNoStar";
			}
			span.attr("class", klass);
			if ($(this).attr("fwGroupe") != undefined && $(this).attr("fwGroupe").length)
			{
				span.attr("fwGroupe", $(this).attr("fwGroupe"));
			}
			else if ($(this).attr("fwGroupeUnique") != undefined && $(this).attr("fwGroupeUnique").length)
			{
				span.attr("fwGroupeUnique", $(this).attr("fwGroupeUnique"));
			}
			if ($(this).is("input[type=radio]"))
			{
				span.attr("fwGroupe", $(this).attr("name"));
			}
			span.attr("title", tooltips);
			span.attr("id", spanid);
			if (isForRegexOnly)
			{
				span.html("?");
				span.hide();
			}
			else
			{
				span.html(" *");
			}
			if (isId && $("label[for=" + id + "]").length && $(this).is("input[type=checkbox], input[type=radio]"))
			{
				$("label[for='" + id + "']").first().after(span);
			}
			else
			{
				$(this).after(span);
			}
		}
	}
	$('[title][title!=""]').not('.notooltip').not('.selected-flag').addClass('tooltip');
	$('.tooltip').tooltipster();
}

function fw_isAutocompletion(elem)
{
	if ($(elem).attr("class"))
		return $(elem).attr("class").indexOf("fwAutoCompletion") != -1;
	return false;
}

function fw_isDatePicker(elem)
{
	if ($(elem).attr("class"))
		return $(elem).attr("class").indexOf("inputDatePicker") != -1;
	return false;
}

function fw_isPhoneInput(elem)
{
	if ($(elem).attr("class"))
		return $(elem).attr("class").indexOf("fwPhoneInput") != -1;
	return false;
}

function fw_isRegNatInput(elem)
{
	if ($(elem).attr("class"))
		return $(elem).attr("class").indexOf("fwRegNatInput") != -1;
	return false;
}

function fw_getElementAff(elem)
{
	var id = elem.attr("id");
	if (fw_isAutocompletion(elem))
	{
		return $("#" + id + "Lib");
	}
	else if (fw_isPhoneInput(elem))
	{
		return $("#" + id + "fake");
	}
	else if (fw_isRegNatInput(elem))
	{
		return $("#" + id + "Lib1, #" + id + "Lib2");
	}
	return elem;
}

function fw_disableFormChecker(form)
{
	$('#' + form).attr('fwDisabledCheck', 'true');
}

function fw_enableFormChecker(form)
{
	$('#' + form).attr('fwDisabledCheck', 'false');
}