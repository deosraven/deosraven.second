function fw_showTopFadingMessage(delai, closeable, fullWidth, top, noTop)
{
	$("#fwTopFaddingMessage").stop(true, true).fadeOut();
	$("#fwTopFaddingMessage").hide();
	$("#fwTopFaddingMessage").show();

	var width = new WindowSize().width();

	if (fullWidth)
	{
		$("#fwTopFaddingMessage").css("border-radius", "0px");
		$("#fwTopFaddingMessage").css("width", fw_getWidthFramwork());
		$("#fwTopFaddingMessage").css("max-width", "unset");
		$("#fwTopFaddingMessage").css("left", fw_getLeftPositionFramwork() + "px");
	}
	else
	{
		$("#fwTopFaddingMessage").css("left", (width / 2 - $("#fwTopFaddingMessage").width() / 2) + "px");
		$("#fwTopFaddingMessage").css("max-width", "300px");
		$("#fwTopFaddingMessage").css("border-radius", "2px");
	}
	if (noTop)
	{
		$("#fwTopFaddingMessage").css("top", top);
	}
	else
	{
		$("#fwTopFaddingMessage").css("top", 106 + (top == undefined ? 0 : top));
	}

	if (closeable)
	{
		$("#fwTopFaddingMessageClose").show();
		$("#fwTopFaddingMessage").show();
	}
	else
	{
		$("#fwTopFaddingMessageClose").hide();
		$("#fwTopFaddingMessage").fadeOut(delai);
	}
}

function fw_hideTopFadingMessage()
{
	$("#fwTopFaddingMessage").fadeOut();
}

function fw_showTopFadingMessageWithMessage(delai, msg, closeable, fullWidth, top, noTop)
{
	$("#fwTopFaddingMessageInnerMsg").html(msg);
	fw_showTopFadingMessage(delai, closeable, fullWidth, top, noTop);
}

function fw_showTopFadingMessageAllOptions(delai, msg, img, closeable, fullWidth, top, noTop)
{
	fw_topFadingMessageSetImage(img);
	fw_showTopFadingMessageWithMessage(delai, msg, closeable, fullWidth, top, noTop);
}

function fw_topFadingMessageSetImage(img)
{
	$("#fwTopFaddingMessageInnerImg img").attr("src", img);
}

function fw_updateTopFadingImage(as_src)
{
	if (as_src)
	{
		$("#fwTopFaddingMessageInnerImg").find("img").attr("src", fmk_resourcesFW + "/images/ico48/" + as_src + ".png");
	}
}