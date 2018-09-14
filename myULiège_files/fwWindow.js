function fwModalConfirm_small(small, idConfirm)
{
	if (small)
	{
		$("#" + idConfirm + "_fwModalMessageContentAllAll, #" + idConfirm + "_fwModalMessageContentMessage").addClass("fwModalMessageSmall");
	}
	else
	{
		$("#" + idConfirm + "_fwModalMessageContentAllAll, #" + idConfirm + "_fwModalMessageContentMessage").removeClass("fwModalMessageSmall");
	}
}

function fwModalConfirm_createAlert(as_text, as_titre, as_jsOk, ab_small)
{
	if (typeof as_text == "string" && as_text != '')
	{
		var ls_text = as_text;
		if (typeof ab_small === typeof undefined || typeof ab_small != 'boolean')
		{
			ab_small = true;
		}
		while (ls_text.indexOf("\n") != -1)
		{
			ls_text = ls_text.replace("\n", "<br />");
		}

		var ls_ok = as_jsOk;
		if (typeof ls_ok === typeof undefined)
		{
			ls_ok = '';
		}

		fwModalConfirm_create(ls_text, "", "", ls_ok, "", "", "", "", "", "", "NORMAL", as_titre, ab_small, true, true, true, false);
	}
}

var fwNbIdConfirm = 0;
var fwZIndex = 100001;

function fwModalConfirm_create(text, textOk, iconOk, jsOk, textCancel, iconCancel, jsCancel, text3, icon3, js3, iconSize, titre, small, alert, enterEqualOk, escEqualCancel, withCheckForm, as_idConfirm)
{
	var idConfirm;
	if (as_idConfirm)
	{
		idConfirm = as_idConfirm;
	}
	else
	{
		fwNbIdConfirm++;
		idConfirm = "fwModalMessage" + fwNbIdConfirm;
	}

	fwZIndex++;

	var contentAllAll = $("<div />");
	contentAllAll.attr("class", "fwModalMessageContentAllAll");
	contentAllAll.css("z-index", fwZIndex + 1);
	contentAllAll.attr("id", idConfirm + "_fwModalMessageContentAllAll");

	var contentAll = $("<div />");
	contentAll.attr("class", "fwModalMessageContentAll");
	contentAll.attr("id", idConfirm + "_fwModalMessageContentAll");

	var contentTitre = $("<div />");
	contentTitre.attr("class", "fwModalMessageContentTitre");
	contentTitre.attr("id", idConfirm + "_fwModalMessageContentTitre");

	var content = $("<div />");
	content.attr("class", "fwModalMessageContent");
	content.attr("id", idConfirm + "_fwModalMessageContent");

	var contentMessage = $("<div />");
	contentMessage.attr("class", "fwModalMessageContentMessage");
	contentMessage.attr("id", idConfirm + "_fwModalMessageContentMessage");

	var contentButton = $("<div />");
	contentButton.attr("class", "fwModalMessageContentButton");
	contentButton.attr("id", idConfirm + "_fwModalMessageContentButton");
	content.append(contentMessage);
	content.append(contentButton);
	contentAll.append(contentTitre);
	contentAll.append(content);
	contentAllAll.append(contentAll);
	$("body").append(contentAllAll);
	var contentOverlay = $("<div />");
	contentOverlay.attr("id", idConfirm + "_fwModalOverlay");
	contentOverlay.attr("class", "fwModalOverlay");
	contentOverlay.css("z-index", fwZIndex);
	$("body").append(contentOverlay);

	var tableButton = $("<table />");
	tableButton.attr("class", "bordercollapse");
	tableButton.attr("style", "width: 100%");
	var tr = $("<tr />");
	var td;
	if (text3 != undefined && text3 != "")
	{
		td = $("<td />");
		td.attr("class", "fwModalMessageContentButtonLeft");
		var ls_js3 = "fwModalConfirm_preHide(); fwModalConfirm_hide('" + idConfirm + "'); ";
		if (js3 != undefined && js3 != "")
		{
			ls_js3 = "fwModalConfirm_preHide();" + js3 + "; fwModalConfirm_hide('" + idConfirm + "'); ";
		}
		td.append(fw_createFlatButton(idConfirm + "_fwModalMessageButton3", text3, icon3, iconSize, ls_js3, false, true, "fwModalMessageButton3"));
		tr.append(td);
	}

	var ls_textOk = "Ok";
	var ls_jsOk;
	var ls_iconOk = "check2";
	if (textOk != undefined && textOk != "")
	{
		ls_textOk = textOk;
	}
	if (iconOk != undefined && iconOk != "")
	{
		ls_iconOk = iconOk;
	}
	if (typeof jsOk === 'object' && jsOk.js && jsOk.js !== "" && jsOk.test)
	{
		ls_jsOk = "fwModalConfirm_preHide(); fwModalConfirm_hide('" + idConfirm + "'); ";
		ls_jsOk = " var resultJsOk = " + jsOk.js + "; if(resultJsOk == undefined || resultJsOk) { " + ls_jsOk.trim() + " }";
	}
	else if (typeof withCheckForm != undefined && withCheckForm == true)
	{
		ls_jsOk = "if(fw_checkForm($('#" + idConfirm + "_fwModalMessageContentAllAll'))) { fwModalConfirm_preHide(); " + jsOk + ";" + " fwModalConfirm_hide('" + idConfirm + "'); }";
	}
	else
	{
		ls_jsOk = "fwModalConfirm_preHide(); " + jsOk + ";" + "fwModalConfirm_hide('" + idConfirm + "'); ";
	}

	td = $("<td />");
	td.attr("class", "fwModalMessageContentButtonRight");
	td.append(fw_createFlatButton(idConfirm + "_fwModalMessageButtonOk", ls_textOk, ls_iconOk, iconSize, ls_jsOk, false, true, "fwModalMessageButtonOk"));
	td.append("&nbsp;");
	if (!alert)
	{
		var ls_textCancel = "Annuler";
		var ls_jsCancel = "fwModalConfirm_preHide(); fwModalConfirm_hide('" + idConfirm + "');";
		if (jsCancel != undefined && jsCancel != "")
		{
			ls_jsCancel = "fwModalConfirm_preHide(); " + jsCancel + ";fwModalConfirm_hide('" + idConfirm + "');";
		}
		if (textCancel != undefined && textCancel != "")
		{
			ls_textCancel = textCancel;
		}
		
		var ls_iconCancel = "undo_orange";
		if (iconCancel != undefined && iconCancel != "")
		{
			ls_iconCancel = iconCancel;
		}
		
		td.append(fw_createFlatButton(idConfirm + "_fwModalMessageButtonCancel", ls_textCancel, ls_iconCancel, iconSize, ls_jsCancel, false, true, "fwModalMessageButtonCancel"));
	}

	tr.append(td);
	tableButton.append(tr);
	$("#" + idConfirm + "_fwModalMessageContentButton").html(tableButton);
	if (titre != undefined && titre != "")
	{
		fwModalConfirm_titre(titre, idConfirm);
	}
	else
	{
		fwModalConfirm_titreHide(idConfirm);
	}
	
	fwModalConfirm_html(text, idConfirm);
	fwModalConfirm_small(small, idConfirm);
	fwModalConfirm_show(idConfirm);
	if (enterEqualOk)
	{
		$(document).on("keydown", { "idConfirm" : idConfirm }, fwModalConfirm_enableEnter);
	}
	if (escEqualCancel)
	{
		$(document).on("keydown", { "idConfirm" : idConfirm }, fwModalConfirm_enableEsc);
	}
}

function fwModalConfirm_show(idConfirm)
{
	$("#" + idConfirm + "_fwModalOverlay").fadeIn(400);
	$("#" + idConfirm + "_fwModalMessageContentAllAll").fadeIn(400);
	$(window).on("beforeunload", function()
	{
		return "true";
	});
	
	fwBindDisableF5();
}

function fwModalConfirm_html(html, idConfirm)
{
	$("#" + idConfirm + "_fwModalMessageContentMessage").html(html);
}

function fwModalConfirm_titre(html, idConfirm)
{
	$("#" + idConfirm + "_fwModalMessageContentTitre").show();
	$("#" + idConfirm + "_fwModalMessageContentTitre").html(html);
}

function fwModalConfirm_titreHide(idConfirm)
{
	$("#" + idConfirm + "_fwModalMessageContentTitre").hide();
}

function fwModalConfirm_preHide()
{
	$(window).unbind("beforeunload");
	$(document).unbind("keydown", fwModalConfirm_enableEnter);
	$(document).unbind("keydown", fwModalConfirm_enableEsc);
	fwUnBindDisableF5();
}

function fwModalConfirm_hide(idConfirm)
{
	$("#" + idConfirm + "_fwModalMessageContentAllAll").fadeOut(400);
	$("#" + idConfirm + "_fwModalOverlay").fadeOut(800);
	$("#" + idConfirm + "_fwModalMessageContentAllAll").remove();
	fwZIndex--;
}

function fwBindDisableF5()
{
	$(document).on("keydown", fwDisableF5);
}

function fwUnBindDisableF5()
{
	$(document).off("keydown", fwDisableF5);
}

function fwDisableF5(e)
{
	if ((e.which || e.keyCode) == 116)
	{
		e.preventDefault();
	}
}

function fwModalConfirm_enableEnter(e)
{
	if ((e.which || e.keyCode) == 13)
	{
		$('#' + e.data.idConfirm + '_fwModalMessageButtonOk').trigger('click');
		e.preventDefault();
	}
}

function fwModalConfirm_enableEsc(e)
{
	if ((e.which || e.keyCode) == 27)
	{
		$('#' + e.data.idConfirm + '_fwModalMessageButtonCancel').trigger('click');
		e.preventDefault();
	}
}

function fwModalWindow_hide(msgQuit)
{
	if (modalOpen)
	{
		if (msgQuit != undefined && msgQuit != "")
		{
			fwModalConfirm_createAlert(msgQuit, '', '', true);
		}

		modalOpen = false;
		$("#fwModalWindowOverlay").hide();
		$("#fwModalWindowContentAllAll").hide();
		if ($("#fwModalWindowContent").find("iframe").length == 0)
		{
			$("#fwModalWindowContent").children().hide();
			modalDivParent.append($("#fwModalWindowContent").children());
		}
		else
		{
			$("#fwModalWindowContent").html("");
		}
		
		eval($("#fwModalWindowContentAllAll").attr("fwOnHide"));
	}
}

function fwModalWindow_show(width, height, url, titre, description, showClose, afterHide, type)
{
	modalOpen = true;
	if (type == undefined || type == "")
	{
		type = "iframe";
	}
	if (afterHide != "")
	{
		$("#fwModalWindowContentAllAll").attr("fwOnHide", afterHide);
	}

	var windowsize = new WindowSize();
	var heightAdded = 20;
	var heightIframe = height;
	if ((width + 20) > windowsize.width())
	{
		width = windowsize.width() - 60;
	}
	if (width == 0)
	{
		width = windowsize.width() - 60;
	}

	heightAdded += 25;
	if (showClose)
	{
		$("#fwModalWindowContentQuit").show();
	}
	else
	{
		$("#fwModalWindowContentQuit").hide();
	}
	if (titre != "")
	{
		$("#fwModalWindowContentTitre").show();
		$("#fwModalWindowContentTitre").html(titre);
		var widthTitre = width;
		if (showClose)
		{
			widthTitre -= 20;
		}
		$("#fwModalWindowContentTitre").css("width", widthTitre + "px");
		$("#fwModalWindowContentTitre").css("text-overflow", "ellipsis");
		$("#fwModalWindowContentTitre").addClass("notooltip");
		$("#fwModalWindowContentTitre").attr("title", titre);
	}
	else
	{
		$("#fwModalWindowContentTitre").hide();
		if (!showClose)
		{
			$("#fwModalWindowContentTop").hide();
			heightAdded -= 20;
		}
	}
	if (description != "")
	{
		$("#fwModalWindowContentDescription").show();
		$("#fwModalWindowContentDescription").html(description);
		heightAdded += 4;
	}
	else
	{
		$("#fwModalWindowContentDescription").hide();
	}
	
	$("#fwModalWindowOverlay").show();
	$("#fwModalWindowContentAllAll").show();

	heightAdded += $("#fwModalWindowContentDescription").height();

	var heightDiv = height + heightAdded;
	if ((heightDiv) > windowsize.height() || height == 0)
	{
		heightDiv = windowsize.height() - 65; // margin top + border top + border bottom du div all + 5 d'espace
		heightIframe = heightDiv - heightAdded;
	}
	
	$("#fwModalWindowContentAll").css("width", width + 10);
	$("#fwModalWindowContentAll").css("height", heightDiv);

	var marginTop = (windowsize.height() - heightDiv) / 2;
	
	$("#fwModalWindowContentAll").css("margin-top", marginTop + "px");
	$("#fwModalWindowContent").css("width", width);
	$("#fwModalWindowContent").css("height", heightIframe + 5);
	
	var iframe;
	if (type == "div")
	{
		iframe = $("#" + url);
		modalDivParent = iframe.parent();
		iframe.show();
		fw_initLiveCheckers(url);
		$("#fwModalWindowContentAllWait").hide();
	}
	else
	{
		iframe = $("<iframe />");
		iframe.attr("width", width);
		iframe.attr("height", heightIframe);
		iframe.attr("src", url);
		
		$("#fwModalWindowContentAllWait").css("padding-top", "" + ((heightIframe / 2) - 12) + "px");
		$("#fwModalWindowContentAllWait").show();
		iframe.bind("load", function()
		{
			$("#fwModalWindowContentAllWait").hide();
		});
	}
	
	$("#fwModalWindowContent").html(iframe);
	setTimeout(function()
	{
		fwModalWindow_recalcul(width, height, iframe, showClose, titre, description, true);
	}, 200);
}

function fwModalWindow_recalcul(width, height, iframe, showClose, titre, description, center)
{
	var heightAdded = 20;
	var windowsize = new WindowSize();
	var heightIframe = height;
	if ((width + 20) > windowsize.width())
	{
		width = windowsize.width() - 60;
	}
	if (width == 0)
	{
		width = windowsize.width() - 60;
	}

	heightAdded += 25;
	if (titre == "" && !showClose)
	{
		heightAdded -= 20;
	}
	if (description != "")
	{
		heightAdded += 4;
	}

	heightAdded += $("#fwModalWindowContentDescription").height();

	var heightDiv = height + heightAdded;
	if ((heightDiv) > windowsize.height() || height == 0)
	{
		heightDiv = windowsize.height() - 65; // margin top + border top + border bottom du div all + 5 d'espace
		heightIframe = heightDiv - heightAdded;
	}
	
	$("#fwModalWindowContentAll").css("width", width + 10);
	$("#fwModalWindowContentAll").css("height", heightDiv);
	if (center)
	{
		var marginTop = (windowsize.height() - heightDiv) / 2;
		$("#fwModalWindowContentAll").css("margin-top", marginTop + "px");
	}

	iframe.attr("width", width);
	iframe.attr("height", heightIframe);
	$("#fwModalWindowContent").css("width", width);
	$("#fwModalWindowContent").css("height", heightIframe + 5);
}

var fwWindowCurrentDrag;
var fwWindowCurrentDragX;
var fwWindowCurrentDragY;
var fwWindowCurrentResize;
var fwWindowCurrentResizeX;
var fwWindowCurrentResizeY;
var fwWindowCurrentResizeWidth;
var fwWindowCurrentResizeHeight;
var fwWindowCurrentResizeLeft;
var fwWindowCurrentResizeType;

function fwWindow_close(id)
{
	$("#fwWindow" + id).fadeOut();
}

function fwWindow_stoptDragging()
{
	if (fwWindowCurrentDrag != undefined)
	{
		$(".fwWindowContentAll").css("z-index", "100001");
		fwWindowCurrentDrag.css("z-index", "100002");
		fwWindowCurrentDrag = undefined;
	}
}

function fwWindow_stoptResizing()
{
	if (fwWindowCurrentResize != undefined)
	{
		$(".fwWindowContentAll").css("z-index", "100001");
		fwWindowCurrentResize.css("z-index", "100002");
		$("#" + fwWindow_getIdOfContent(fwWindowCurrentResize.attr("fwWindowId"))).show();
		fwWindow_updateSizeOfContent(fwWindowCurrentResize.attr("fwWindowId"));
		fwWindowCurrentResize = undefined;
	}
}

function fwWindow_drag(e)
{
	if (fwWindowCurrentDrag != undefined)
	{
		fwWindowCurrentDrag.css("top", e.clientY - fwWindowCurrentDragY);
		fwWindowCurrentDrag.css("left", e.clientX - fwWindowCurrentDragX);
	}
}

function fwWindow_resize(e)
{
	if (fwWindowCurrentResize != undefined)
	{
		var newWidth, newHeight;
		var newLeft;
		if (fwWindowCurrentResizeType == "right")
		{
			newWidth = fwWindowCurrentResizeWidth + (e.clientX - fwWindowCurrentResizeX);
			newHeight = fwWindowCurrentResizeHeight + (e.clientY - fwWindowCurrentResizeY);
		}
		else
		{
			newWidth = fwWindowCurrentResizeWidth - (e.clientX - fwWindowCurrentResizeX);
			newHeight = fwWindowCurrentResizeHeight + (e.clientY - fwWindowCurrentResizeY);
			newLeft = fwWindowCurrentResizeLeft + (e.clientX - fwWindowCurrentResizeX);
		}
		
		var minWidth = parseInt(fwWindowCurrentResize.attr("fwMinWidth"));
		var minHeight = parseInt(fwWindowCurrentResize.attr("fwMinHeight"));
		var maxWidth = parseInt(fwWindowCurrentResize.attr("fwMaxWidth"));
		var maxHeight = parseInt(fwWindowCurrentResize.attr("fwMaxHeight"));
		if (minWidth && newWidth < minWidth)
		{
			newWidth = minWidth;
			newLeft = undefined;
		}
		if (minHeight && newHeight < minHeight)
		{
			newHeight = minHeight;
		}
		if (maxWidth && newWidth > maxWidth)
		{
			newWidth = maxWidth;
			newLeft = undefined;
		}
		if (maxHeight && newHeight > maxHeight)
		{
			newHeight = maxHeight;
		}
		if (newWidth)
		{
			fwWindowCurrentResize.css("width", newWidth);
		}
		if (newHeight)
		{
			fwWindowCurrentResize.css("height", newHeight);
		}
		if (newLeft)
		{
			fwWindowCurrentResize.css("left", newLeft);
		}
	}
}

function fwWindow_startDragging(e)
{
	fwWindowCurrentDrag = $(this).parent();
	if (fwWindowCurrentDrag.attr("fwDrag") == "true")
	{
		fwWindowCurrentDragX = e.offsetX;
		fwWindowCurrentDragY = e.offsetY;
		$(".fwWindowContentAll").css("z-index", "100001");
		fwWindowCurrentDrag.css("z-index", "100002");
	}
	else
	{
		fwWindowCurrentDrag = undefined;
	}
}

function fwWindow_startResizingLeft(e)
{
	fwWindow_startResizing(e, "left", this);
}

function fwWindow_startResizingRight(e)
{
	fwWindow_startResizing(e, "right", this);
}

function fwWindow_startResizing(e, type, vThis)
{
	fwWindowCurrentResizeX = e.clientX;
	fwWindowCurrentResizeY = e.clientY;
	fwWindowCurrentResize = $(vThis).parent().parent();
	fwWindowCurrentResizeWidth = fwWindowCurrentResize.width();
	fwWindowCurrentResizeHeight = fwWindowCurrentResize.height();
	var tmpLeft = fwWindowCurrentResize.css("left");
	tmpLeft = tmpLeft.substring(0, tmpLeft.length - 2);
	fwWindowCurrentResizeLeft = parseInt(tmpLeft);
	$(".fwWindowContentAll").css("z-index", "100001");
	fwWindowCurrentResize.css("z-index", "100002");
	fwWindowCurrentResizeType = type;
	$("#" + fwWindow_getIdOfContent(fwWindowCurrentResize.attr("fwWindowId"))).hide();
}

function fwWindow_focus(id)
{
	var lo_fwWindow = $("#fwWindow" + id);
	if (lo_fwWindow.length)
	{
		$(".fwWindowContentAll").css("z-index", "100001");
		lo_fwWindow.css("z-index", "100002");
	}
}

function fwWindow_setMaxHeight(id, maxHeight)
{
	var lo_fwWindow = $("#fwWindow" + id);
	if (lo_fwWindow.length)
	{
		lo_fwWindow.css("max-height", maxHeight);
		if (lo_fwWindow.height() > maxHeight)
		{
			lo_fwWindow.css("height", maxHeight);
		}
	}
}

function fwWindow_setMaxWidth(id, maxWidth)
{
	var lo_fwWindow = $("#fwWindow" + id);
	if (lo_fwWindow.length)
	{
		lo_fwWindow.css("max-width", maxWidth);
		if (lo_fwWindow.width() > maxWidth)
		{
			lo_fwWindow.css("width", maxWidth);
		}
	}
}

function fwWindow_setPos(id, top, left)
{
	var lo_fwWindow = $("#fwWindow" + id);
	if (lo_fwWindow.length)
	{
		lo_fwWindow.css("top", top);
		lo_fwWindow.css("left", left);
	}
}

function fwWindow_maximize(id)
{
	var lo_fwWindow = $("#fwWindow" + id);
	if (lo_fwWindow.length)
	{
		var isMaximized = lo_fwWindow.attr("fwMax") == "true";
		if (isMaximized)
		{
			lo_fwWindow.attr("fwMax", "false");
			lo_fwWindow.css("width", lo_fwWindow.attr("fwWidth"));
			lo_fwWindow.css("height", lo_fwWindow.attr("fwHeight"));
			lo_fwWindow.css("top", lo_fwWindow.attr("fwTop"));
			lo_fwWindow.css("left", lo_fwWindow.attr("fwLeft"));
			$("#fwWindowContentBottom" + id).show();
			lo_fwWindow.attr("fwDrag", "true");
			var minWidth = parseInt(lo_fwWindow.attr("fwMinWidth"));
			var minHeight = parseInt(lo_fwWindow.attr("fwMinHeight"));
			var maxWidth = parseInt(lo_fwWindow.attr("fwMaxWidth"));
			var maxHeight = parseInt(lo_fwWindow.attr("fwMaxHeight"));
			if (minWidth)
			{
				lo_fwWindow.css("min-width", minWidth);
			}
			if (minHeight)
			{
				lo_fwWindow.css("min-height", minHeight);
			}
			if (maxWidth)
			{
				lo_fwWindow.css("max-width", maxWidth);
			}
			if (maxHeight)
			{
				lo_fwWindow.css("max-height", maxHeight);
			}
		}
		else
		{
			var windowsize = new WindowSize();
			lo_fwWindow.attr("fwMax", "true");
			lo_fwWindow.attr("fwWidth", lo_fwWindow.width());
			lo_fwWindow.attr("fwHeight", lo_fwWindow.height());
			lo_fwWindow.attr("fwTop", lo_fwWindow.css("top"));
			lo_fwWindow.attr("fwLeft", lo_fwWindow.css("left"));
			lo_fwWindow.css("top", 0);
			lo_fwWindow.css("left", 0);
			lo_fwWindow.css("width", windowsize.width() - 4);
			lo_fwWindow.css("height", windowsize.height() - 2);
			lo_fwWindow.css("max-width", windowsize.width() - 4);
			lo_fwWindow.css("max-height", windowsize.height() - 2);
			$("#fwWindowContentBottom" + id).hide();
			lo_fwWindow.attr("fwDrag", "false");
		}
		fwWindow_updateSizeOfContent(id);
	}
}

function fwWindow_updateSizeOfContent(id)
{
	var lo_fwWindow = $("#fwWindow" + id);
	if (lo_fwWindow.length)
	{
		var divContent = $("#" + fwWindow_getIdOfContent(id));
		var width = lo_fwWindow.width();
		var height = lo_fwWindow.height();
		width -= 4;
		height -= $("#fwWindowContentTop" + id).height() + 7;
		var divBottom = $("#fwWindowContentBottom" + id);
		if (divBottom.length)
		{
			height -= divBottom.height();
		}
		divContent.css("width", width);
		divContent.css("height", height);
	}
}

function fwWindow_createIfNeeded(id, width, height, url, titre, closeable, maximizable, resizeable, minWidth, minHeight, maxWidth, maxHeight)
{
	var ret = $("#fwWindow" + id);
	if (!ret.length)
	{
		ret = $("<div />");
		ret.hide();
		ret.attr("id", "fwWindow" + id);
		ret.attr("fwWindowId", id);
		ret.addClass("fwWindowContentAll");
		ret.css("width", width + "px");
		ret.css("height", height + "px");
		ret.css("top", "0px");
		ret.attr("fwDrag", "true");
		ret.bind("click", function()
		{
			fwWindow_focus(id);
		});
		if (minWidth)
		{
			ret.css("min-width", minWidth + "px");
			ret.attr("fwMinWidth", minWidth);
		}
		if (minHeight)
		{
			ret.css("min-height", minHeight + "px");
			ret.attr("fwMinHeight", minHeight);
		}
		if (maxWidth)
		{
			ret.css("max-width", maxWidth + "px");
			ret.attr("fwMaxWidth", maxWidth);
		}
		if (maxHeight)
		{
			ret.css("max-height", maxHeight + "px");
			ret.attr("fwMaxHeight", maxHeight);
		}
		var divContentTop = $("<div />");
		ret.append(divContentTop);
		divContentTop.attr("id", "fwWindowContentTop" + id);
		divContentTop.addClass("fwWindowContentTop");

		var divTitre = $("<div />");
		divTitre.attr("id", "fwWindowContentTopTitre" + id);
		divTitre.addClass("fwWindowContentTitre");
		divTitre.html(titre);
		divContentTop.append(divTitre);
		divContentTop.bind("mousedown", fwWindow_startDragging);

		$("html").unbind("mouseup.window", fwWindow_stoptDragging);
		$("html").bind("mouseup.window", fwWindow_stoptDragging);
		$("html").unbind("mousemove.window", fwWindow_drag);
		$("html").bind("mousemove.window", fwWindow_drag);

		if (closeable || maximizable)
		{
			if (closeable)
			{
				var divClose = $("<div />");
				divClose.attr("id", "fwWindowContentTopClose" + id);
				divClose.addClass("fwWindowContentQuit");
				divContentTop.append(divClose);
				var imgClose = $("<img />");
				imgClose.attr("src", fmk_resourcesFW + "/images/ico16/cross.png");
				imgClose.addClass("fwWindowContentQuitButton");
				divClose.bind("click", function()
				{
					fwWindow_close(id);
				});
				divClose.append(imgClose);
			}
			if (maximizable)
			{
				var divMaximize = $("<div />");
				divMaximize.attr("id", "fwWindowContentTopMaximize" + id);
				divMaximize.addClass("fwWindowContentQuit");
				divContentTop.append(divMaximize);
				var imgMaximize = $("<img />");
				imgMaximize.attr("src", fmk_resourcesFW + "/images/ico16/window_s.png");
				imgMaximize.addClass("fwWindowContentQuitButton");
				divMaximize.bind("click", function()
				{
					fwWindow_maximize(id);
				});
				divMaximize.append(imgMaximize);
			}
		}
		var divContent = $("<div />");
		divContent.attr("id", fwWindow_getIdOfContent(id));
		divContent.addClass("fwWindowContentContent");
		ret.append(divContent);
		if (url)
		{
			var iframe = $("<iframe />");
			iframe.attr("width", "100%");
			iframe.attr("height", "100%");
			iframe.attr("src", url);
			divContent.append(iframe);
			// $("#fwModalWindowContentAllWait").css("padding-top", "" + ((heightIframe / 2) - 12) + "px");
			// $("#fwModalWindowContentAllWait").show();
			// iframe.bind("load", function()
			// {
			// $("#fwModalWindowContentAllWait").hide();
			// });
		}
		if (resizeable)
		{
			var divBottom = $("<div />");
			divBottom.attr("id", "fwWindowContentBottom" + id);
			divBottom.addClass("fwWindowContentBottom");
			ret.append(divBottom);

			var divBottomRight = $("<div />");
			divBottomRight.attr("id", "fwWindowContentBottomRight" + id);
			divBottomRight.addClass("fwWindowContentBottomRight");
			divBottom.append(divBottomRight);
			divBottomRight.bind("mousedown", fwWindow_startResizingRight);

			var divBottomLeft = $("<div />");
			divBottomLeft.attr("id", "fwWindowContentBottomLeft" + id);
			divBottomLeft.addClass("fwWindowContentBottomLeft");
			divBottom.append(divBottomLeft);
			divBottomLeft.bind("mousedown", fwWindow_startResizingLeft);

			$("html").unbind("mouseup.window_resize", fwWindow_stoptResizing);
			$("html").bind("mouseup.window_resize", fwWindow_stoptResizing);
			$("html").unbind("mousemove.window_resize", fwWindow_resize);
			$("html").bind("mousemove.window_resize", fwWindow_resize);
		}

		$("#fw16Body").append(ret);
	}
	return ret;
}

function fwWindow_getIdOfContent(id)
{
	return "fwWindowContentContent" + id;
}

function fwWindow_show(id, width, height, url, titre, closeable, maximizable, resizeable, minWidth, minHeight, maxWidth, maxHeight)
{
	var divWindow = fwWindow_createIfNeeded(id, width, height, url, titre, closeable, maximizable, resizeable, minWidth, minHeight, maxWidth, maxHeight);
	divWindow.fadeIn();
	fwWindow_updateSizeOfContent(id);
}
