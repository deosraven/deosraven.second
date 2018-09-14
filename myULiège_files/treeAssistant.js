var ta_inputLibField;
var ta_inputIdField;
var ta_divTree;

var ta_afterHide = '';

$('html').on('click', function(e)
{
	e = e || window.event;
	var obj = e.target || e.srcElement;
	
	var lb_clickOnFieldLib = ('#' + obj.id == ta_inputLibField);
	var lb_clickOnDivTree = ('#' + obj.id == ta_divTree);
	if($(obj).closest(".ta_dontHideOnClick").length == 0)
	{
		ta_hideresult(false);
	}
});

function ta_init(treeId, a_afterHide)
{
	ta_inputLibField = '#' + treeId + 'Lib';
	ta_inputIdField = '#' + treeId;
	ta_divTree = '#div_ta_' + treeId;
	ta_afterHide = a_afterHide;
}

function ta_hideresult(clearFields)
{
	if ($(ta_divTree) != undefined)
	{
		$(ta_divTree).css("display", "none");
		if (ta_afterHide != '' && ta_afterHide != undefined && ta_afterHide != "null")
			eval(ta_afterHide);
	}
	if (clearFields)
	{
		$(ta_inputLibField).val('');
		$(ta_inputIdField).val('');
		$(ta_inputLibField).addClass('ta_inputKO');
		$(ta_inputLibField).removeClass('ta_inputOK');
	}
}

function ta_nodeOnClick(event, treeId, treeNode, clickFlag)
{
	$(ta_inputLibField).val(treeNode.name);
	$(ta_inputIdField).val(treeNode.id);
	$(ta_inputLibField).removeClass('ta_inputKO');
	$(ta_inputLibField).addClass('ta_inputOK');
	ta_hideresult(false);
}

function ta_onclickInput(treeId, treeAction, rootParameters, a_afterHide)
{
	ta_init(treeId, a_afterHide);
	
	var ls_rootParameters = '';
	if(rootParameters != null)
		ls_rootParameters = '&' + rootParameters;
	
	if($(ta_divTree).html() == '')
	{
		$.post(treeAction + '?as_action=root' + ls_rootParameters,
		{
			as_action : 'init', 
			id : treeId
		}).done(function(response)
		{
			$(ta_divTree).html(response);
			ta_positiondivTree();
		});
	}
	else
	{
		if($(ta_divTree).css("display") == 'none')
		{
			ta_positiondivTree();
		}
		else
		{
			ta_hideresult(false);
		}
	}
}

function ta_positiondivTree()
{
	$(ta_divTree).css("display", "inline-block");
	$(ta_divTree).css("position", "absolute");
	$(ta_divTree).css("left", $(ta_inputLibField).position().left + "px");
	var top = $(ta_inputLibField).position().top + $(ta_inputLibField).height() + 5;
	$(ta_divTree).css("top", top + "px");
}