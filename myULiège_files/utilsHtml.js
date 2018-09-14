function fw_regNat_check(regNat, idDateNais, idSexe)
{
	var regNat = regNat.replace(/[\.\-]/g, '');
	var dateNais = $('#' + idDateNais).val();
	if (verifDate(dateNais))
	{
		var dateArray = (dateNais.indexOf('/') > -1) ? dateNais.split('/') : dateNais.split('.');
		var jour = dateArray[0];
		var mois = dateArray[1];
		var an_str = dateArray[2];

		var debutRegNat = an_str.substring(2, 4) + mois + jour;
		if (regNat.length != 11)
		{
			return (false);
		}
		else if (debutRegNat != regNat.substring(0, 6))
		{
			return (false);
		}
		else
		{
			var ls_sexe = $('#' + idSexe).val();
			if (!ls_sexe)
			{
				ls_sexe = $("input[name='" + idSexe + "']:checked").val();
			}
			if (ls_sexe != 'M' && ls_sexe != 'F')
			{
				return (false);
			}
			else
			{
				var numSuite = regNat.substring(6, 9);
				if (numSuite / 2 == Math.round(numSuite / 2) && ls_sexe != 'F')
				{
					return (false);
				}
				else if (numSuite / 2 != Math.round(numSuite / 2) && ls_sexe != 'M')
				{
					return (false);
				}
				else
				{
					// calcul modulo
					if (an_str < '2000')
					{
						var mod = modulo(regNat.substring(0, 9), 97);
						var ctrl = 97 - mod;
						if (regNat.substring(9, 11) == ctrl)
						{
							return (true);
						}
						else
						{
							return (false);
						}
					}
					else
					{
						var str = '2' + regNat.substring(0, 9);
						var mod = modulo(str, 97);
						var ctrl = 97 - mod;
						if (regNat.substring(9, 11) == ctrl)
						{
							return (true);
						}
						else
						{
							return (false);
						}
					}
				}
			}
		}
	}
	else
	{
		return false;
	}
}

function checkRegistreNat(idRegNat, idDateNais, idSexe)
{
	return fw_regNat_check($('#' + idRegNat).val(), idDateNais, idSexe);
}

function fw_regNat_testDateAndSexe(idInput, idDate, nameSexe, change)
{
	var isOk = false;
	var value = $("#" + idDate).val();
	var sdate = value.split("/");
	if (sdate.length == 3 && sdate[0] != "" && sdate[1] != "" && sdate[2] != "" && sdate[2].length == 4)
	{
		if (sdate[1].length == 1)
			sdate[1] = '0' + sdate[1];
		if (sdate[0].length == 1)
			sdate[0] = '0' + sdate[0];
		var html = sdate[2].substring(2, 4) + "." + sdate[1] + "." + sdate[0] + "-";
		var ls_sexe = $("input[name='" + nameSexe + "']:checked").val();
		if (ls_sexe == 'F' || ls_sexe == 'M')
		{
			isOk = true;
		}
	}
	var selection = "#" + idInput + "1, #" + idInput + "2";
	var hidden = "#" + idInput.substring(0, idInput.length - 3);
	if (isOk)
	{
		$(selection).removeAttr("disabled");
		$(selection).attr("title", "");
		if (change)
		{
			$(selection).val("");
			$(hidden).val("").trigger("change");
		}
	}
	else
	{
		$(selection).attr("disabled", "disabled");
		$(selection).attr("title", fw_message_regnat_sexeDate);
		$(selection).val("");
		$(hidden).val("").trigger("change");
	}
}

function fw_regNat_majDate(idDate, idSpan, nameSexe, idInput, change)
{
	var value = $("#" + idDate).val();
	var sdate = value.split("/");
	if (sdate.length == 3 && sdate[0] != "" && sdate[1] != "" && sdate[2] != "" && sdate[2].length == 4)
	{
		var html = sdate[2].substring(2, 4) + "." + sdate[1] + "." + sdate[0] + "-";
		$("#" + idSpan).html(html);
	}
	else
	{
		var selection = "#" + idInput + "1, #" + idInput + "2";
		$("#" + idSpan).html("");
		$(selection).val("");
	}
	fw_regNat_testDateAndSexe(idInput, idDate, nameSexe, change);
}

function fw_regNat_majSexe(idDate, nameSexe, idInput)
{
	fw_regNat_testDateAndSexe(idInput, idDate, nameSexe, true);
}

function modulo(divident, divisor)
{
	return divident % divisor;
}

function fw_initPwdInfo(idInput)
{
	var pwdInput = $("#" + idInput);
	var divContent = $("<div>").addClass("fwdWrapperContent");
	pwdInput.after(divContent);
	var divPwdInfo = $("<div>").attr("id", idInput + "DivInfo").addClass("fwPwdWrapper");
	var divTriangle = $("<div>").addClass("fwPwdTriangle");
	divContent.append(divPwdInfo);
	divPwdInfo.append(divTriangle);

	var divValidation = $("<div>").addClass("fwPwdValidation");
	divPwdInfo.append(divValidation);

	var pTitre = $("<p>").html(fw_pwd_titre);
	divValidation.append(pTitre);
	var ul = $("<ul>");
	divValidation.append(ul);

	ul.append($("<li>").attr("id", "fw_pwd_password_one_char").html(fw_pwd_password_one_char));
	ul.append($("<li>").attr("id", "fw_pwd_password_one_capital").html(fw_pwd_password_one_capital));
	ul.append($("<li>").attr("id", "fw_pwd_password_one_number").html(fw_pwd_password_one_number));
	ul.append($("<li>").attr("id", "fw_pwd_password_three_identical").html(fw_pwd_password_three_identical));
	ul.append($("<li>").attr("id", "fw_pwd_password_same_as_account").html(fw_pwd_password_same_as_account));
	ul.append($("<li>").attr("id", "fw_pwd_password_eight_characters").html(fw_pwd_password_eight_characters));
	ul.append($("<li>").attr("id", "fw_pwd_password_one_nonalphanumeric").html(fw_pwd_password_one_nonalphanumeric));
	ul.append($("<li>").attr("id", "fw_pwd_password_allowed_chars").html(fw_pwd_password_allowed_chars));
}

var fw_allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!\"#$%'()*+,-./:<=>?@][^_`|~";

function fw_pwd_isInAllowedChar(passwd)
{
	var ls_tab = passwd.split('');

	for (var i = 0; i < ls_tab.length; i++)
	{
		if (fw_allowedChars.indexOf(ls_tab[i]) == -1)
		{
			return false;
		}
	}
	return true;
}

function fw_pwd_completeCheck(idInput1, idInput2, idSecureCont, as_tabId)
{
	return fw_pwd_validate(idInput1, idSecureCont, as_tabId) && fw_pwd_checkSame(idInput1, idInput2);
}

function fw_pwd_validate(idInput, idSecureCont, as_tabId)
{
	var errorCode = "";

	var passwd = $("#" + idInput).val();

	var id = $("#" + idInput).attr("id");
	id += "DivInfo";
	$("#" + id + " li").removeClass("fail pass");
	$("#" + idInput).removeClass("fwNotValid");

	if (passwd.length == 0)
	{
		fw_pwd_passwordStrengthCalculator(idInput, idSecureCont);
		return false;
	}

	if (passwd.length < 8 || passwd.length > 32)
	{
		errorCode = "_20725";
		$("#fw_pwd_password_eight_characters").addClass("fail");
	}
	else
	{
		$("#fw_pwd_password_eight_characters").addClass("pass");
	}

	if (!passwd.match(/[a-z]/))
	{
		errorCode = errorCode + "," + "_21103";
		$("#fw_pwd_password_one_char").addClass("fail");
	}
	else
	{
		$("#fw_pwd_password_one_char").addClass("pass");
	}

	if (!passwd.match(/[A-Z]/))
	{
		errorCode = errorCode + "," + "_21102";
		$("#fw_pwd_password_one_capital").addClass("fail");
	}
	else
	{
		$("#fw_pwd_password_one_capital").addClass("pass");
	}

	if (!passwd.match(/\d+/))
	{
		errorCode = errorCode + "," + "_20734";
		$("#fw_pwd_password_one_number").addClass("fail");
	}
	else
	{
		$("#fw_pwd_password_one_number").addClass("pass");
	}

	if (passwd.match(/(.)\1\1/))
	{
		errorCode = errorCode + "," + "_20736";
		$("#fw_pwd_password_three_identical").addClass("fail");

	}
	else
	{
		$("#fw_pwd_password_three_identical").addClass("pass");
	}

	var lb_infofound = false;

	if (as_tabId != null)
	{
		for (var i = 0; i < as_tabId.length; i++)
		{
			var ls_info = as_tabId[i];
			if (passwd.toLowerCase().indexOf(ls_info) != -1)
			{
				lb_infofound = true;
			}
		}
	}
	if (lb_infofound)
	{
		errorCode = errorCode + "," + "_20733";
		$("#fw_pwd_password_same_as_account").addClass("fail");
	}
	else
	{
		$("#fw_pwd_password_same_as_account").addClass("pass");
	}
	if (!/[^a-zA-Z0-9]/.test(passwd))
	{
		errorCode = errorCode + "," + "_20733";
		$("#fw_pwd_password_one_nonalphanumeric").addClass("fail");
	}
	else
	{
		$("#fw_pwd_password_one_nonalphanumeric").addClass("pass");
	}

	if (!fw_pwd_isInAllowedChar(passwd))
	{
		errorCode = errorCode + "," + "_20733";
		$("#fw_pwd_password_allowed_chars").addClass("fail");
	}
	else
	{
		$("#fw_pwd_password_allowed_chars").addClass("pass");
	}
	fw_pwd_passwordStrengthCalculator(idInput, idSecureCont);
	if (passwd.length != 0)
	{
		if (errorCode.indexOf(",") == 0)
		{
			errorCode = errorCode.substring(1);
		}

		if (errorCode.trim() != "")
		{
			$("#" + idInput).addClass("fwNotValid");
			return false;
		}
	}
	return true;
}

function fw_pwd_checkSame(idInput1, idInput2)
{
	var ls_value1 = $("#" + idInput1).val();
	var ls_value2 = $("#" + idInput2).val();

	if (ls_value1 == ls_value2)
	{
		$("#" + idInput2).removeClass("fwNotValid");
		return true;
	}
	else
	{
		$("#" + idInput2).addClass("fwNotValid");
	}
	return false;
}

function fw_pwd_passwordStrengthCalculator(idInput, idSecureCont)
{
	if (idSecureCont && idSecureCont.length)
	{
		var passwd = $("#" + idInput).val();
		var passwordScore = 0;
		var passwordStrength = "";

		$("#" + idSecureCont).show();
		if (passwd.length == 0)
		{
			$("#" + idSecureCont).html("&nbsp;");
			return;
		}

		// password length 6-7
		if (passwd.length > 5 && passwd.length < 8)
		{
			passwordScore = (passwordScore + 6);
		}
		// password length 8-15
		else if (passwd.length > 7 && passwd.length < 16)
		{
			passwordScore = (passwordScore + 12);
		}
		else if (passwd.length > 15) // password length > 15
		{
			passwordScore = (passwordScore + 18);
		}

		// Character Check: lower and uppper character check
		if (passwd.match(/[a-z]/))
		{
			passwordScore = (passwordScore + 1);
		}

		if (passwd.match(/[A-Z]/))
		{
			passwordScore = (passwordScore + 5);
		}

		// Number Check
		if (passwd.match(/\d+/)) // at least one numeric
		{
			passwordScore = (passwordScore + 5);
		}

		if (passwd.match(/(.*[0-9].*[0-9].*[0-9])/)) // at least three
														// numeric
		{
			passwordScore = (passwordScore + 5);
		}

		// Symbol Check
		if (passwd.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) // at least one special
														// character
		{
			passwordScore = (passwordScore + 5);
		}

		// Symbol Check - 2
		if (passwd.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/))
		{
			passwordScore = (passwordScore + 5);
		}

		// Mix check: upper/lower case, alpha + numeric
		if (passwd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) // check for both
															// upper and lower
															// case
		{
			passwordScore = (passwordScore + 2);
		}

		if (passwd.match(/([a-zA-Z])/) && passwd.match(/([0-9])/)) // check for
																	// both
																	// alpha and
																	// numeric
		{
			passwordScore = (passwordScore + 2);
		}

		// Mix check: alpha, numbers, and symbols
		if (passwd.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/))
		{
			passwordScore = (passwordScore + 2);
		}

		if (passwordScore < 25)
		{
			passwordStrength = fw_pwd_password_security + "<em class='fwPwdWeak'>" + fw_pwd_password_weak + "</em>";
		}
		else if (passwordScore > 24 && passwordScore < 35)
		{
			passwordStrength = fw_pwd_password_security + "<em class='fwPwdModerate'>" + fw_pwd_password_moderate + "</em>";
		}
		else if (passwordScore > 34)
		{
			passwordStrength = fw_pwd_password_security + "<em class='fwPwdStrong'>" + fw_pwd_password_strong + "</em>";
		}

		$("#" + idSecureCont).html(passwordStrength);
	}
}

function fw_buttonFlatHide(idButton)
{
	var div = $("#" + idButton + "Div");
	div.hide();
}

function fw_buttonFlatShow(idButton)
{
	var div = $("#" + idButton + "Div");
	div.show();
}

function fw_buttonFlatEnable(idButton)
{
	var button = $("#" + idButton);
	var div = $("#" + idButton + "Div");
	if ($(button).is("input[type=file]"))
	{
		var label = $("#" + idButton + "Label");
		var style = label.attr("style");
		if (style.indexOf("_s_i") != -1)
		{
			style = style.replace("_i", "");
		}
		label.attr("style", style);
		label.removeAttr("disabled");
	}
	else
	{
		var img = $("#" + idButton + "Span>img");
		var style = button.attr("style");
		if (style.indexOf("_s_i") != -1)
		{
			style = style.replace("_i", "");
		}
		button.attr("style", style);
		if (img)
		{
			style = img.attr("src");
			if (style && style.indexOf("_s_i") != -1)
			{
				style = style.replace("_i", "");
			}
			img.attr("src", style);
		}
	}
	div.removeAttr("disabled");
	button.removeAttr("disabled");
}

function fw_buttonFlatDisable(idButton)
{
	var button = $("#" + idButton);
	var div = $("#" + idButton + "Div");
	if ($(button).is("input[type=file]"))
	{
		var label = $("#" + idButton + "Label");
		var style = label.attr("style");
		if (style.indexOf("_s_i.") == -1)
		{
			style = style.replace("_s.", "_s_i.");
		}
		label.attr("style", style);
		label.attr("disabled", "disabled");
	}
	else
	{
		var img = $("#" + idButton + "Span>img");
		var style = button.attr("style");
		if (style.indexOf("_s_i.") == -1)
		{
			style = style.replace("_s.", "_s_i.");
		}
		button.attr("style", style);
		if (img)
		{
			style = img.attr("src");
			if (style && style.indexOf("_s_i.") == -1)
			{
				style = style.replace("_s.", "_s_i.");
			}
			img.attr("src", style);
		}
	}
	div.attr("disabled", "disabled");
	button.attr("disabled", "disabled");
}

function fw_button_link(idButton)
{
	$("#" + idButton + "Span").bind("click", function()
	{
		if (!$("#" + idButton).is(":disabled"))
		{
			$("#" + idButton).trigger("click");
		}
	});
}

function fw_imgPlus(id)
{
	if (typeof id == typeof undefined || id == '')
	{
		$(".plusinfo").hide();
		$(".imgMoins").hide();
		$(".imgPlus").show();

		$('body').find('img[id^=plus][class=imgPlus]').each(function()
		{
			var attrFctPlus = $(this).attr('fwFonctionPlus');
			if (typeof attrFctPlus !== typeof undefined && attrFctPlus !== false)
			{
				eval($(this).attr("fwFonctionPlus"));
			}
		});
	}
	else
	{
		jumpToId("moins" + id, 10);
		$(".plusinfo").hide();
		$(".imgMoins").hide();
		$(".imgPlus").show();
		$("#moins" + id).show();
		$("#plus" + id).hide();

		if ($("#plus" + id).attr("fwFonctionPlus") && $("#plus" + id).attr("fwFonctionPlus").length)
		{
			eval($("#plus" + id).attr("fwFonctionPlus"));
		}
	}
}

function fw_imgMoins(id)
{
	$(".plusinfo").hide();
	$(".imgMoins").hide();
	$(".imgPlus").show();
	if (typeof id == typeof undefined || id == '')
	{
		$('body').find('img[id^=moins][class=imgMoins]').each(function()
		{
			var attrFctPlus = $(this).attr('fwFonctionMoins');
			if (typeof attrFctPlus !== typeof undefined && attrFctPlus !== false)
			{
				eval($(this).attr("fwFonctionMoins"));
			}
		});
	}
	else
	{
		if ($("#moins" + id).attr("fwFonctionMoins") && $("#moins" + id).attr("fwFonctionMoins").length)
		{
			eval($("#moins" + id).attr("fwFonctionMoins"));
		}
	}
}

var acrpt_getMappingContext = function()
{
	return "MPDIV";
};

function acrpt_loadAjax(as_codPays, ao_divOptions, ao_fakeInput, ao_realValueInput)
{
	if (ao_divOptions.children().length)
		ao_divOptions.css('display', '');
	var ls_codPays = $('#' + as_codPays).val();
	var ls_libRech = ao_fakeInput.val();
	if (ls_codPays.length && ls_libRech.length >= 2)
	{
		$.ajax(
		{
			url : fmk_appContext+'/' + acrpt_getMappingContext() + '/acReferPostGlobal.do',
			type : 'POST',
			data :
			{
				as_codPays : ls_codPays,
				as_libRech : ls_libRech
			},
			beforeSend : function(xhr)
			{
				xhr.setRequestHeader('JQUERY_REQUEST', 'TRUE');
			}
		}).done(function(result)
		{
			if (ls_libRech === ao_fakeInput.val())
			{
				$(ao_divOptions).html(result);
				$(ao_divOptions).css('display', '');
				$('td.acrpg-td').on('mouseover', function()
				{
					$(this).css('background-color', 'rgb(237, 176, 61)');
				});
				$('td.acrpg-td').on('mouseout', function()
				{
					$(this).css('background-color', '');
				});
				$('td.acrpg-td').on('click', function()
				{
					ao_fakeInput.val($.trim($(this).html()));
					ao_realValueInput.val($(this).attr('value')).trigger('change');
					ao_divOptions.css('display', 'none');
				});
			}
		});
	}
	else
	{
		ao_divOptions.css('display', 'none');
	}
}

function fw_createFlatButton(id, text, icon, iconSize, onClick, submit, actif, additionnalClass)
{
	var ls_sizeIcon;
	var ls_class;
	switch (iconSize)
	{
	case "BIG":
	{
		ls_sizeIcon = "32";
		ls_class = "fwFlatButton fwFlatButtonBig";
		if (icon == "")
		{
			ls_class += " fwFlatButtonBigNoIcon";
		}
		if (text == "")
		{
			ls_class += " fwFlatButtonBigNoText";
		}
		break;
	}
	case "BIGGER":
	{
		ls_sizeIcon = "48";
		ls_class = "fwFlatButton fwFlatButtonBigger";
		if (icon == "")
		{
			ls_class += " fwFlatButtonBiggerNoIcon";
		}
		if (text == "")
		{
			ls_class += " fwFlatButtonBiggerNoText";
		}
		break;
	}
	case "SMALL":
	{
		ls_sizeIcon = "16";
		ls_class = "fwFlatButton fwFlatButtonSmall";
		if (icon == "")
		{
			ls_class += " fwFlatButtonSmallNoIcon";
		}
		if (text == "")
		{
			ls_class += " fwFlatButtonSmallNoText";
		}
		break;
	}
	case "EXTRABIG":
	{
		ls_sizeIcon = "64";
		ls_class = "fwFlatButton fwFlatButtonExtraBig";
		if (icon == "")
		{
			ls_class += " fwFlatButtonExtraBigNoIcon";
		}
		if (text == "")
		{
			ls_class += " fwFlatButtonExtraBigNoText";
		}
		break;
	}
	case "NORMAL":
	default:
	{
		ls_sizeIcon = "24";
		ls_class = "fwFlatButton";
		if (icon == "")
		{
			ls_class += " fwFlatButtonNoIcon";
		}
		if (text == "")
		{
			ls_class += " fwFlatButtonNoText";
		}
		break;
	}
	}
	var div = $("<div />");
	div.attr("class", "fwFlatButtonDiv");
	if (id != undefined && id != "")
	{
		div.attr("id", id + "Div");
	}
	if (actif != undefined && !actif)
	{
		div.attr("disabled", "disabled");
	}
	var input = $("<button />");
	input.attr("type", submit ? "submit" : "button");
	input.attr("class", ls_class);
	if (icon != undefined && icon != "")
	{
		var ls_icon = icon + "_s";
		if (!actif)
		{
			ls_icon += "_i";
		}
		ls_icon += ".png";
		var ls_style = "background-image: url('"+fmk_resourcesFW + "/images/ico" + ls_sizeIcon + "/" + ls_icon + "'); width: 100%";
		input.attr("style", ls_style);
	}
	if (onClick != undefined && onClick != "")
	{
		input.attr("onclick", onClick);
	}
	if (id != undefined && id != "")
	{
		input.attr("id", id);
	}
	if (additionnalClass != undefined && additionnalClass != "")
	{
		input.addClass(additionnalClass);
	}
	if (text != undefined && text != "")
	{
		input.attr("value", text);
		input.html(text);
	}
	if (actif != undefined && !actif)
	{
		input.attr("disabled", "disabled");
	}
	div.append(input);
	return div;
}

function fw_removeSpecChar(as_chaine, as_exclusion)
{
	var ls_excl = "´'-().:/%[]#§{}µ£@,;=+";
	if (as_exclusion != "")
	{
		ls_excl += as_exclusion;
	}
	var ls_in = "àâäéèêëîïöôùûüçñ";
	var ls_out = "AAAEEEEIIOOUUUCN";
	var ls_result = "";

	if (as_chaine != "")
	{
		for (var li_i = 0; li_i < as_chaine.length; li_i++)
		{
			var lc_car = as_chaine.charAt(li_i);
			if (ls_excl.indexOf(lc_car) == -1)
			{
				var li_index = ls_in.indexOf(lc_car);
				if (li_index > -1)
				{
					ls_result += ls_out.charAt(li_index);
				}
				else
				{
					ls_result += lc_car;
				}
			}
		}
	}
	return ls_result;
}

function fw_replaceAll(as_chaine, as_toReplace, as_replaceBy)
{
	var ls_ret = as_chaine;
	while (ls_ret.indexOf(as_toReplace) != -1)
	{
		ls_ret = ls_ret.replace(as_toReplace, as_replaceBy);
	}
	return ls_ret;
}

function fw_getBetween(string, begin, end)
{
	if (string.indexOf(begin) != -1 && string.indexOf(end) != -1)
	{
		return string.substring(string.indexOf(begin) + begin.length, string.indexOf(end));
	}
	else
	{
		if (string.indexOf(begin) != -1)
		{
			return string.substring(string.indexOf(begin) + begin.length, string.length);
		}
		else
		{
			return string.substring(0, string.indexOf(end));
		}
	}
}

function fwContextMenu_show(idMenu, caller, e)
{
	fwContextMenu_hide();
	var menu = $("#" + idMenu);
	menu.show();
	var windowsize = new WindowSize();
	var leftPx = e.clientX;
	var topPx = e.clientY;
	if (e.clientX + menu.width() > windowsize.width())
	{
		leftPx -= menu.width();
	}
	if (e.clientY + menu.height() > windowsize.height())
	{
		if (e.clientY - menu.height() < 0)
		{
			topPx = 0;
		}
		else
		{
			topPx -= menu.height();
		}
	}
	menu.css("top", topPx + "px");
	menu.css("left", leftPx + "px");
	fw_initLiveCheckers();
}

function fwContextMenu_hide()
{
	$(".fwContextMenu").hide();
}

function fwContextMenu_init()
{
	$(".cmVoice").each(function()
	{
		var klass = $(this).attr("class");
		if (klass.indexOf("{") != -1 && klass.indexOf("}") != -1)
		{
			var caller = $(this);
			var data = fw_getBetween(klass, "{", "}");
			var idMenu = data.substring("cMenu:'".length, data.length - 1);
			$(this).unbind("click.fwContextMenu");
			$(this).bind("click.fwContextMenu", function(e)
			{
				fwContextMenu_show(idMenu, caller, e);
			});
		}
	});
}

$(document).ready(function()
{
	fwContextMenu_init();
	$('html').on('click', function(e)
	{
		e = e || window.event;
		var obj = e.target || e.srcElement;

		// Permet d'avoir un container type div avec la class donthideonclick et
		// tous les éléments du div ne masqueront pas au click
		if ($(obj).closest(".donthideonclick").length == 0 && $(obj).closest(".cmVoice").length == 0)
		{
			fwContextMenu_hide();
		}
	});
});

function fw_getWidthFramwork()
{
	return $("#fw16Body").width();
}

function fw_getLeftPositionFramwork()
{
	return ($("body").width() / 2 - fw_getWidthFramwork() / 2);
}

function fw_notificationHide()
{
	var divNotification = $("#fwNotifcation");
	if (divNotification.length)
	{
		divNotification.fadeOut();
	}
}

function fw_notificationInit(isUrgent)
{
	var divNotification = $("#fwNotifcation");
	var divNotificationInner = $("#fwNotifcationInner");
	var divNotificationMsg = $("#fwNotifcationMsg");
	if (!divNotification.length)
	{
		divNotification = $("<div />");
		divNotification.attr("id", "fwNotifcation");
		$("#fw16Body").append(divNotification);
		divNotificationInner = $("<div />");
		divNotificationInner.attr("id", "fwNotifcationInner");
		divNotification.append(divNotificationInner);
		divNotificationMsg = $("<div />");
		divNotificationMsg.attr("id", "fwNotifcationMsg");
		divNotificationInner.append(divNotificationMsg);

		var divCloser = $("<div />");
		divCloser.attr("id", "fwNotifcationCloser");
		divCloser.bind("click", fw_notificationHide);
		var imgCloser = $("<img />");
		imgCloser.attr("src", fmk_resourcesFW + "/images/ico16/close_s.png");
		divCloser.append(imgCloser);
		divNotificationInner.append(divCloser);

		$(window).on("resize", fw_notificationInit);
	}
	if (isUrgent)
	{
		divNotification.css("min-height", $("#fw16Header").height() + "px");
	}
	else
	{
		divNotification.css("min-height", "unset");
	}
	divNotification.css("left", fw_getLeftPositionFramwork() + "px");
	divNotification.css("top", "0px");
	divNotification.css("width", fw_getWidthFramwork() + "px");
}

function fw_notificationShow(msg, isUrgent)
{
	fw_notificationInit(isUrgent);
	var divNotificationMsg = $("#fwNotifcationMsg");
	var divNotification = $("#fwNotifcation");
	divNotificationMsg.html(msg);
	divNotification.fadeIn();
}

function getBooleanValue(aa_params, aa_name, ab_defaultValue)
{
	var lb_bool;
	if (typeof aa_params[aa_name] === typeof undefined || typeof aa_params[aa_name] != 'boolean')
	{
		if (typeof ab_defaultValue !== typeof undefined && typeof ab_defaultValue == 'boolean')
		{
			lb_bool = ab_defaultValue;
		}
		else
		{
			lb_bool = false;
		}
	}
	else
	{
		lb_bool = aa_params[aa_name];
	}

	return lb_bool;
}

function getStringValue(aa_params, aa_name, as_defaultValue)
{
	var ls_string;
	if (typeof aa_params[aa_name] === typeof undefined || typeof aa_params[aa_name] != 'string')
	{
		if (typeof as_defaultValue !== typeof undefined && typeof as_defaultValue == 'string')
		{
			ls_string = as_defaultValue;
		}
		else
		{
			ls_string = '';
		}
	}
	else
	{
		ls_string = aa_params[aa_name];
	}

	return ls_string;
}

function getNumberValue(aa_params, aa_name)
{
	var li_val;
	if (typeof aa_params[aa_name] === typeof undefined || typeof aa_params[aa_name] != 'number')
	{
		li_val = 0;
	}
	else
	{
		li_val = aa_params[aa_name];
	}

	return li_val;
}

function escapeSingleQuotes(as_chaine)
{
	var ls_return = '';
	if (as_chaine != '')
	{
		ls_return = as_chaine.replace(/'/g, "\\'");
		ls_return = ls_return.replace(/’/g, "\\'");
	}

	return ls_return;
}

function escapeHtml(as_chaine)
{
	var ls_return = '';
	if (as_chaine != '')
	{
		ls_return = as_chaine.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
	}

	return ls_return;
}

$(fw_activateTextareaCheckLength);

function fw_activateTextareaCheckLength(target)
{
	if (target && typeof target === "string")
		target = "textarea.checkLength[id=" + target + "]";
	else
		target = "textarea.checkLength:not(.checkLengthActive):not(.fake-textarea)";
	var regexLength = /length(\d+)/;
	$(target).each(function()
	{
		var textArea = $(this);
		if (regexLength.test($(textArea).attr("class")))
		{
			var div = $("<div></div>").attr("id", $(textArea).attr("id") + "Div").css(
			{
				display : "inline-block"
			}).addClass("div-textarea");
			$(textArea).before(div);
			$(div).append($(textArea));
			var length = regexLength.exec($(textArea).attr("class"))[1];
			var counter = $("<div class='textarea-counter'></div>");
			$(textArea).after(counter);
			var func = function()
			{
				if ($(textArea).val().length > length)
					$(textArea).val($(textArea).val().substr(0, length));
				$(counter).empty().append($(textArea).val().length + " / " + length);
				if ($(textArea).val().length == length)
					$(counter).addClass("full");
				else
					$(counter).removeClass("full");
			};
			func();
			$(textArea).on("keyup change paste", func);
			$(textArea).addClass("checkLengthActive");
		}
	});
}

function fw_updateTextareaCheckLength()
{
	$("textarea.checkLength.checkLengthActive").each(function()
	{
		var divParent = $(this).parent();
		if (divParent.is("div.div-textarea"))
			$(divParent).after($(this).removeClass("checkLengthActive")).remove();
	}).promise().done(fw_activateTextareaCheckLength);
}

function fw_resizeTextAreaHeight(textArea)
{
	$(textArea).css("height", "1px");
	$(textArea).css("height", ($(textArea).prop("scrollHeight") + "px"));
}

function fw_initButtonProtectDoubleClick(id)
{
	$("#" + id).on("click", function()
	{
		fw_buttonProtectDoubleClick(id);
	});
}

function fw_buttonProtectDoubleClick(id)
{
	setTimeout(function()
	{
		fw_buttonFlatDisable(id);
	}, 1);
}

function fw_buttonInitSaveWait(id)
{
	$("#" + id).on("click", function()
	{
		fw_buttonSaveWait(id);
	});
}

function fw_buttonSaveWait(id)
{
	setTimeout(function()
	{
		var button = $("#" + id);
		button.attr("bgtmp", button.css("background-image"));
		fw_buttonFlatDisable(id);
		var wait = "url('"+fmk_resourcesFW + "/images/ajax2.gif')";
		button.css("background-image", wait);
	}, 1);
}

function fw_buttonSaveWaitDisable(id)
{
	setTimeout(function()
	{
		var button = $("#" + id);
		var bg = $("#" + id).attr("bgtmp");
		if (bg != undefined)
		{
			button.css("background-image", bg);
			fw_buttonFlatEnable(id);
		}
	}, 1);
}

function parseHtmlElement(jsonData)
{
	if (jsonData.type === "tag")
	{
		var elem = $("<" + jsonData.name + "/>");
		for ( var attrName in jsonData.attrs)
			if (jsonData.attrs.hasOwnProperty(attrName))
				elem.attr(attrName, jsonData.attrs[attrName]);
		for ( var i in jsonData.children)
			elem.append(parseHtmlElement(jsonData.children[i]));
		return elem;
	}
	else if (jsonData.type === "text")
	{
		return jsonData.text;
	}
	throw "unknown data type \"" + jsonData.type + "\"";
}

function jumpToId(id, delai)
{
	if (delai != undefined)
	{
		setTimeout(function(){document.getElementById(id).scrollIntoView();}, delai);
	}
	else
	{
		document.getElementById(id).scrollIntoView(); 
	}
}
