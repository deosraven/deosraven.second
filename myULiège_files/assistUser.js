var viewtab_waitImg = "<div class=\"fw_loading\"></div>";
var viewtab_lienAnnuaire = fmk_appContext + '/TR/view_modal.do';
var viewtab_lienAnnuaireXt = fmk_appContext + '/TR_xt/view_modal.do';
var viewtab_lienSearchPerson = fmk_appContext + "/SS_xt/searchUser.do";
var viewtab_lienAddFriends = fmk_appContext + "/addfriends.do";
var viewtab_lienTROk = fmk_resourcesFW + "/images/ico16/form_green_s.png";
var viewtab_lienTRKo = fmk_resourcesFW + "/images/ico16/form_green_s_i.png";
{
	var viewtab_tabNumber = -1;
	var viewtab_tabContent = [];
	var viewtab_tabs;
	var viewtab_numberOfTab;
	var viewtab_indexString = [];
	var viewtab_stringIndex = [];
	var viewtab_lastUpdate = 0;

	function viewtab_saveCreateNew()
	{
		$("#buttonsFriends").css("display", "none");
		$("#waitFriends").css("display", "table-row");
		$.post(viewtab_lienAddFriends,
		{
			as_assimil : $('#as_assimil').val(),
			as_sendMailUser : $('#as_sendMailUser').val(),
			idPop : $('#idPop').val(),
			as_nom : $('#as_nom').val(),
			as_prenom : $('#as_prenom').val(),
			as_vedette : $('#as_vedette').val(),
			as_sexe : $('#as_sexe').val(),
			as_rue : $('#as_rue').val(),
			as_rue2 : $('#as_rue2').val(),
			as_num : $('#as_num').val(),
			as_boite : $('#as_boite').val(),
			as_cp : $('#as_cp').val(),
			as_loc : $('#as_loc').val(),
			as_codPays : $('#as_codPays').val(),
			as_tel : $('#as_tel').val(),
			as_email : $('#as_email').val(),
			as_assist : $('#as_assist').val(),
			as_vedette : $(':input[name=as_vedette]').val(),
			as_sexe : $(':input[name=as_sexe]').val(),
			as_codPays : $(':input[name=as_codPays]').val(),
		})
		.done(function(response)
		{
			$("#waitFriends").css("display", "none");
			$("#buttonsFriends").css("display", "table-row");
			if (response.indexOf("#ERR#") != -1)
			{
				var error = response.substring(5, response.length);
				alert(error);
			}
			if (response.indexOf("#OK#") != -1)
			{
				var ok = response.substring(4, response.length);
				var codUlg = ok.split("@")[0];
				var nomPrenom = ok.split("@")[1];
				ac_fillAndGo(codUlg, nomPrenom, false);
			}
		});
	}

	function viewtab_cancelShowCreateNew()
	{
		for ( var i = 0; i < viewtab_numberOfTab; i++)
		{
			if (i != viewtab_tabNumber)
			{
				$("#viewtab_title_" + i).css("display", "");
			}
		}
		
		$(".bottomLinkArchive").css("display", "block");
		$("#viewtab_title_" + viewtab_tabNumber).html("Friends");
		viewtab_changeTabWithTitle("Friends");
	}

	function viewtab_sendShowCreateNew()
	{
		viewtab_tabContent[viewtab_tabNumber].html(viewtab_waitImg);
		for ( var i = 0; i < viewtab_numberOfTab; i++)
		{
			if (i != viewtab_tabNumber)
			{
				$("#viewtab_title_" + i).css("display", "none");
			}
		}
		
		$("#createnewdiv").css("display", "none");
		$(".bottomLinkArchive").css("display", "none");
		$("#viewtab_title_" + viewtab_tabNumber).html("Création d'un nouveau friend");
		$.post(viewtab_lienSearchPerson,
		{
			as_action : "showCreateNew"
		})
		.done(function(response)
		{
			viewtab_tabContent[viewtab_tabNumber].html(response);
		});
	}

	function viewtab_showInactive(inputToFocus, update)
	{
		$(".choice.notValidUser").css("display", "");
		$("#linkArchive").html("Masquer les utilisateurs inactifs");
		$("#linkArchive").attr("onclick", "viewtab_hideInactive('" + inputToFocus + "',true); $(\"#" + inputToFocus + "\").focus();");
		if (update)
		{
			$.post(viewtab_lienSearchPerson,
			{
				as_action : "searcharchive",
				ab_showDirectArchive : true
			});
		}
		
		ac_highlightFirstVisible();
	}

	function viewtab_hideInactive(inputToFocus, update)
	{
		$(".choice.notValidUser").css("display", "none");
		$("#linkArchive").html("Afficher les utilisateurs inactifs");
		$("#linkArchive").attr("onclick", "viewtab_showInactive('" + inputToFocus + "',true); $(\"#" + inputToFocus + "\").focus();");
		if (update)
		{
			$.post(viewtab_lienSearchPerson,
			{
				as_action : "searcharchive",
				ab_showDirectArchive : false
			});
		}
		
		ac_highlightFirstVisible();
	}

	function viewtab_updateImgLienAnnuaire(idImg, isOk)
	{
		if ($(idImg) != undefined)
		{
			$(idImg).attr("src", isOk ? viewtab_lienTROk : viewtab_lienTRKo);
		}
	}

	function viewtab_openLienAnnuaire(a_codUlg, ab_intranet, ab_isId, as_name)
	{
		if (a_codUlg == undefined || a_codUlg == null || a_codUlg == 'null' || a_codUlg == '')
		{
			fwModalConfirm_createAlert("Vous devez sélectionner un utilisateur pour accéder à sa fiche.", '', '', true);
			return;
		}
		
		var link = viewtab_lienAnnuaire;
		if (ab_intranet)
		{
			link = viewtab_lienAnnuaireXt;
		}
		
		link += '?as_codULg=' + a_codUlg + "&ab_isId=" + ab_isId;	
		if (a_codUlg[0] == 'f' || a_codUlg[0] == 'F')
		{
			link += "&ff=true";
		}
		if (as_name == undefined || as_name == null || as_name == 'null' || as_name == '')
		{
			as_name = a_codUlg;
		}

		fwModalWindow_show(690, 510, link, 'Fiche de ' + as_name, '', true, '');		
	}

	function viewtab_initTab(titlesIdPlace, a_idInput)
	{
		viewtab_tabNumber = -1;
		viewtab_tabContent = [];
		viewtab_indexString = [];
		viewtab_stringIndex = [];
		viewtab_numberOfTab = 0;
		viewtab_tabs = $(".viewtab_tabs");
		viewtab_numberOfTab = viewtab_tabs.length;
		
		var divTitles = $('#' + titlesIdPlace);

		viewtab_tabs.each(function(i, currentElement)
		{
			currentElement = $(currentElement);
			viewtab_tabContent[i] = $("#viewtab_content_" + currentElement.attr("id"));
			viewtab_tabContent[i].css("display", "none");
			currentElement.css("display", "none");
			
			var childs = currentElement.children();
			childs.each(function(j, child)
			{
				child = $(child);
				if (child.attr("class") != null && child.attr("class").indexOf("title") != -1)
				{
					var title = child.html();
					var divTitle = document.createElement("div");
					divTitle.className = "viewtab_title donthideonclick";
					divTitle.id = "viewtab_title_" + i;
					divTitle.innerHTML = title;
					var onclick = "javascript:viewtab_changeTabWithTitle('" + title + "');";
					onclick += "$('#" + a_idInput + "').focus()";
					divTitle.setAttribute("onclick", onclick);
					divTitles.append(divTitle);
					child.css("display", "none");
					viewtab_indexString[title] = i;
					viewtab_stringIndex[i] = title;
					return;
				}
			});
		});

		viewtab_changeTab(0);
	}

	function viewtab_nextTab()
	{
		var newTab = viewtab_tabNumber + 1;
		if (newTab >= viewtab_numberOfTab)
		{
			newTab = 0;
		}
		
		viewtab_changeTabWithTitle(viewtab_stringIndex[newTab]);
	}

	function viewtab_prevTab()
	{
		var newTab = viewtab_tabNumber - 1;
		if (newTab < 0)
		{
			newTab = viewtab_numberOfTab - 1;
		}
		
		viewtab_changeTabWithTitle(viewtab_stringIndex[newTab]);
	}

	function viewtab_changeTabWithTitle(title)
	{
		var i = viewtab_indexString[title];
		if (i == undefined)
		{
			return;
		}		
		if (i != viewtab_tabNumber && viewtab_tabNumber != -1)
		{
			viewtab_tabContent[viewtab_tabNumber].html('');
		}
		
		viewtab_changeTab(i);
		viewtab_tabContent[i].html(viewtab_waitImg);
		
		var updateAt = new Date().getTime();
		viewtab_lastUpdate = updateAt;
		{
			$.post(viewtab_lienSearchPerson,
			{
				as_action : "searchtype",
				as_type : title
			})
			.done(function(response)
			{
				if (updateAt == viewtab_lastUpdate)
				{
					viewtab_tabContent[i].html(response);
					if ($("#result_scroll") != undefined)
					{
						setTimeout(function()
						{
							ac_highlightFirstVisible();
							$("#result_scroll").scrollTop(0);
						}, 250);
					}
					if (typeof ac_highlight == 'function')
					{
						ac_highlight(0);
					}
					if (typeof ac_setMinPosToGo == 'function')
					{
						ac_setMinPosToGo(0);
					}
					if (typeof ac_setMaxPosToGo == 'function')
					{
						if ($('.choice:last').attr('id') != undefined)
						{
							ac_setMaxPosToGo(parseInt($('.choice:last').attr('id').substr("search_".length)));
							ac_executeEnterIfNeeded();
						}
					}
					if (typeof ac_setLastIndexOfChoice == 'function')
					{
						ac_setLastIndexOfChoice(-1);
					}
				}
			});
		}
	}

	function viewtab_changeTab(i)
	{
		if (viewtab_tabNumber == i)
		{
			viewtab_tabContent[i].css("display", "inline");
			viewtab_tabs[viewtab_tabNumber].style.display = "inline";
			$("#viewtab_title_" + i).attr("class", "viewtab_title donthideonclick viewtab_title_selected");
		} 
		else
		{
			if (viewtab_tabNumber != -1)
			{
				$("#viewtab_title_" + viewtab_tabNumber).attr("class", "viewtab_title donthideonclick");
				viewtab_tabContent[viewtab_tabNumber].css("display", "none");
				viewtab_tabs[viewtab_tabNumber].style.display = "none";
			}
			
			viewtab_tabContent[i].css("display", "inline");
			viewtab_tabs[i].style.display = "inline";
			$("#viewtab_title_" + i).attr("class", "viewtab_title donthideonclick viewtab_title_selected");
			viewtab_tabNumber = i;
		}
	}
}