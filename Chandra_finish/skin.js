// Garden Gnome Software - Skin
// Pano2VR 6.1.6/17950
// Filename: Vlad_Grom_v6.ggsk
// Generated 2021-01-29T19:44:11

function pano2vrSkin(player,base) {
	player.addVariable('opt_hotspot_preview', 2, true);
	player.addVariable('opt_zoom', 2, true);
	player.addVariable('opt_autorotate', 2, true);
	player.addVariable('opt_info', 2, false);
	player.addVariable('opt_thumbnail', 2, true);
	player.addVariable('opt_thumbnail_tooltip', 2, true);
	player.addVariable('opt_projection', 2, true);
	player.addVariable('opt_gyro', 2, true);
	player.addVariable('opt_fullscreen', 2, true);
	player.addVariable('opt_loader', 2, true);
	player.addVariable('opt_loader_mulires', 2, true);
	player.addVariable('opt_url', 2, false);
	player.addVariable('opt_autohide', 2, false);
	player.addVariable('vis_userdata', 2, false);
	player.addVariable('vis_close_buton', 2, false);
	player.addVariable('vis_image_popup', 2, false);
	player.addVariable('vis_info_popup', 2, false);
	player.addVariable('vis_video_popup_file', 2, false);
	player.addVariable('vis_video_popup_url', 2, false);
	player.addVariable('vis_video_popup_vimeo', 2, false);
	player.addVariable('vis_video_popup_youtube', 2, false);
	player.addVariable('vis_website', 2, false);
	player.addVariable('vis_thumbnail_menu_show', 2, true);
	player.addVariable('vis_thumbnail_menu_mobile', 2, false);
	player.addVariable('vis_thumbnail_menu_auto_hide', 2, true);
	player.addVariable('vis_timer', 2, false);
	player.addVariable('vis_360image_once', 2, true);
	player.addVariable('vis_loader', 2, true);
	player.addVariable('pos_zoom_in', 1, 0);
	player.addVariable('pos_zoom_out', 1, 0);
	player.addVariable('pos_autorotate', 1, 0);
	player.addVariable('pos_information', 1, 0);
	player.addVariable('pos_thumbnail', 1, 0);
	player.addVariable('pos_projection', 1, 0);
	player.addVariable('pos_gyro', 1, 0);
	player.addVariable('pos_fullscreen', 1, 0);
	player.addVariable('pos_controller', 1, 0);
	player.addVariable('pos_360image', 1, 0);
	player.addVariable('opt_thumbnail_menu_tooltip', 2, true);
	player.addVariable('vis_thumbnail_menu', 2, false);
	player.addVariable('opt_thumbnail_menu_tooltip_1', 2, true);
	player.addVariable('vis_thumbnail_menu_1', 2, false);
	player.addVariable('opt_3d_preview', 2, true);
	player.addVariable('opt_hotspot_preview_1', 2, true);
	player.addVariable('opt_3d_preview_1', 2, true);
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._loading_multires=document.createElement('div');
		els=me._loading_multires__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+Cjxzdmcgd2lkdGg9IjI2cHgiIHZlcnNpb249IjEuMCIgaGVpZ2h0PSI3cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTI4IDM1IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPGc+CiAgPGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iMTcuNSIgY3k9IjE3LjUiIHI9IjE3LjUiLz4KICA8YW5pbWF0ZSBrZXlUaW1lcz'+
			'0iMDswLjE2NzswLjU7MC42Njg7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iNjAwbXMiIGJlZ2luPSIwcyIgdmFsdWVzPSIwLjM7MTsxOzAuMzswLjMiIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiLz4KIDwvZz4KIDxnPgogIDxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjExMC41IiBjeT0iMTcuNSIgcj0iMTcuNSIvPgogIDxhbmltYXRlIGtleVRpbWVzPSIwOzAuMzM0OzAuNTswLjgzNTsxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSI2MDBtcyIgYmVnaW49IjBzIiB2YWx1ZXM9IjAuMzswLjM7MTsxOzAuMyIgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIvPgogPC9nPgogPGc+'+
			'CiAgPGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iNjQiIGN5PSIxNy41IiByPSIxNy41Ii8+CiAgPGFuaW1hdGUga2V5VGltZXM9IjA7MC4xNjc7MC4zMzQ7MC42Njg7MC44MzU7MSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iNjAwbXMiIGJlZ2luPSIwcyIgdmFsdWVzPSIwLjM7MC4zOzE7MTswLjM7MC4zIiBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._loading_multires__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="loading_multires";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 7px;';
		hs+='position : absolute;';
		hs+='right : 6px;';
		hs+='top : 6px;';
		hs+='visibility : hidden;';
		hs+='width : 25px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._loading_multires.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._loading_multires.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsTileLoading() == true)) && 
				((player.getVariableValue('opt_loader_mulires') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._loading_multires.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._loading_multires.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._loading_multires.style[domTransition]='';
				if (me._loading_multires.ggCurrentLogicStateVisible == 0) {
					me._loading_multires.style.visibility=(Number(me._loading_multires.style.opacity)>0||!me._loading_multires.style.opacity)?'inherit':'hidden';
					me._loading_multires.ggVisible=true;
				}
				else {
					me._loading_multires.style.visibility="hidden";
					me._loading_multires.ggVisible=false;
				}
			}
		}
		me._loading_multires.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._loading_multires);
		el=me._screentint=document.createElement('div');
		el.ggId="screentint";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='background : rgba(0,0,0,0.392157);';
		hs+='border : 1px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 100%;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 100%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._screentint.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._screentint.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_image_popup') == true)) || 
				((player.getVariableValue('vis_info_popup') == true)) || 
				((player.getVariableValue('vis_video_popup_file') == true)) || 
				((player.getVariableValue('vis_video_popup_url') == true)) || 
				((player.getVariableValue('vis_video_popup_vimeo') == true)) || 
				((player.getVariableValue('vis_video_popup_youtube') == true)) || 
				((player.getVariableValue('vis_userdata') == true)) || 
				((player.getVariableValue('vis_website') == true)) || 
				((player.getVariableValue('vis_thumbnail_menu_mobile') == true)) && 
				((player.getVariableValue('vis_thumbnail_menu_auto_hide') == true)) && 
				((player.getViewerSize().width <= 450))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._screentint.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._screentint.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._screentint.style[domTransition]='opacity 500ms ease 0ms';
				if (me._screentint.ggCurrentLogicStateAlpha == 0) {
					me._screentint.style.visibility=me._screentint.ggVisible?'inherit':'hidden';
					me._screentint.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._screentint.style.opacity == 0.0) { me._screentint.style.visibility="hidden"; } }, 505);
					me._screentint.style.opacity=0;
				}
			}
		}
		me._screentint.onclick=function (e) {
			player.setVariableValue('vis_image_popup', false);
			player.setVariableValue('vis_info_popup', false);
			player.setVariableValue('vis_video_popup_file', false);
			player.setVariableValue('vis_video_popup_url', false);
			player.setVariableValue('vis_video_popup_vimeo', false);
			player.setVariableValue('vis_video_popup_youtube', false);
			player.setVariableValue('vis_website', false);
			player.setVariableValue('vis_userdata', false);
		}
		me._screentint.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._screentint);
		el=me._map_1=document.createElement('div');
		el.ggFilter = '';
		el.ggFilteredIds = [];
		el.ggMapNotLoaded = true;
		el.ggId="Map 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_map ";
		el.ggType='map';
		hs ='';
		hs+=cssPrefix + 'border-radius : 5px;';
		hs+='border-radius : 5px;';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 200px;';
		hs+='left : 5px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 31px;';
		hs+='visibility : inherit;';
		hs+='width : 350px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 0%';
		me._map_1.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._map_1.ggUpdateConditionResize=function () {
			var mapDetails = player.getMapDetails(me._map_1.ggMapId);
			if (!(mapDetails.hasOwnProperty('title'))) return;
			me._map_1.ggCalculateFloorplanSize(mapDetails);
			me._map_1.ggShowSimpleFloorplan(mapDetails);
			me._map_1.ggPlaceMarkersOnSimpleFloorplan();
			me._map_1.ggRadar.update();
		}
		me._map_1.ggUpdateConditionTimer=function () {
			me._map_1.ggRadar.update();
		}
		me._map_1.ggUpdatePosition=function (useTransition) {
			me._map_1.ggUpdateConditionResize();
		}
		me._map_1.ggNodeChange=function () {
			var mapDetails = player.getMapDetails(me._map_1.ggMapId);
			if (!(mapDetails.hasOwnProperty('title'))) return;
			me._map_1.ggCalculateFloorplanSize(mapDetails);
			me._map_1.ggShowSimpleFloorplan(mapDetails);
			me._map_1.ggPlaceMarkersOnSimpleFloorplan();
			me._map_1.ggRadar.update();
			if (me._map_1.ggLastNodeId) {
				var lastActiveMarker = me._map_1.ggSimpleFloorplanMarkerArray[me._map_1.ggLastNodeId];
				if (lastActiveMarker && lastActiveMarker.ggDeactivate) lastActiveMarker.ggDeactivate();
			}
			var id = player.getCurrentNode();
			var marker = me._map_1.ggSimpleFloorplanMarkerArray[id];
			if (marker) {
				if (marker.ggActivate) marker.ggActivate();
			}
			if (player.getMapType(me._map_1.ggMapId) == 'file') {
				var coords = player.getNodeMapCoords(id, me._map_1.ggMapId);
				if (coords.length < 2) {
					var mapId = player.getMapContainingNode(id);
					if (mapId != '') {
							me._map_1.ggChangeMap(mapId);
					}
				}
			}
			me._map_1.ggLastNodeId = id;
		}
		me.divSkin.appendChild(me._map_1);
		el=me._button_2=document.createElement('div');
		els=me._button_2__img=document.createElement('img');
		els.className='ggskin ggskin_button_2';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('alt','HIDE PLAN');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_2.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._button_2.onmouseout=function (e) {
			me.elementMouseDown['button_2']=false;
		}
		me._button_2.onmousedown=function (e) {
			me.elementMouseDown['button_2']=true;
		}
		me._button_2.onmouseup=function (e) {
			me.elementMouseDown['button_2']=false;
		}
		me._button_2.ontouchend=function (e) {
			me.elementMouseDown['button_2']=false;
		}
		me._button_2.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._button_2);
		el=me._button_3=document.createElement('div');
		els=me._button_3__img=document.createElement('img');
		els.className='ggskin ggskin_button_3';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('alt','SHOW PLAN');
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 3";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_button ";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 20px;';
		hs+='left : 5px;';
		hs+='position : absolute;';
		hs+='top : 5px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_3.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._button_3.onmouseout=function (e) {
			me.elementMouseDown['button_3']=false;
		}
		me._button_3.onmousedown=function (e) {
			me.elementMouseDown['button_3']=true;
		}
		me._button_3.onmouseup=function (e) {
			me.elementMouseDown['button_3']=false;
		}
		me._button_3.ontouchend=function (e) {
			me.elementMouseDown['button_3']=false;
		}
		me._button_3.ggUpdatePosition=function (useTransition) {
		}
		me.divSkin.appendChild(me._button_3);
		el=me._thumbnail=document.createElement('div');
		el.ggPermeable=false;
		el.ggId="thumbnail";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 23px;';
		hs+='height : 32px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._thumbnail.onclick=function (e) {
			player.setVariableValue('vis_thumbnail_menu_1', !player.getVariableValue('vis_thumbnail_menu_1'));
		}
		me._thumbnail.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._thumbnail_hide_button=document.createElement('div');
		els=me._thumbnail_hide_button__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgaWQ9IkxheWVyXzEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMzAgMTMwOyIgdmlld0JveD0iMCAwIDEzMCAxMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4Ii'+
			'B5PSIwcHgiPgogPGcgaWQ9IkxheWVyXzFfMV8iPgogIDxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik02NSw4LjlDMzQsOC45LDguOSwzNCw4LjksNjVTMzQsMTIxLjEsNjUsMTIxLjFjMzEsMCw1Ni4xLTI1LjEsNTYuMS01Ni4xUzk2LDguOSw2NSw4Ljl6IE01NS40LDU3LjgmI3hhOyYjeDk7JiN4OTtjMC0xLjMsMS4xLTIuNCwyLjUtMi40aDEwLjRMNTUuNCw2OC4zVjU3Ljh6IE0yNy44LDcyLjJWNTcuOGMwLTEuMywxLjEtMi40LDIuNS0yLjRoMTQuM2MxLjQsMCwyLjUsMS4xLDIuNSwyLjR2MTQuMyYjeGE7JiN4OTsmI3g5O2MwLDEuMy0xLjEsMi40LTIuNSwyLjRIMzAuM0MyOC45LDc0LjYsMjcu'+
			'OCw3My41LDI3LjgsNzIuMnogTTMyLjgsMTAwLjRjLTAuNCwwLTAuOC0wLjEtMS4xLTAuNGwtMS43LTEuN2MtMC42LTAuNi0wLjYtMS42LDAtMi4yJiN4YTsmI3g5OyYjeDk7bDY2LTY2YzAuMy0wLjMsMC43LTAuNCwxLjEtMC40YzAuNCwwLDAuOCwwLjEsMS4xLDAuNGwxLjcsMS43YzAuNiwwLjYsMC42LDEuNiwwLDIuMmwtNjYsNjZDMzMuNiwxMDAuMywzMy4yLDEwMC40LDMyLjgsMTAwLjR6JiN4YTsmI3g5OyYjeDk7IE03NC42LDcyLjJjMCwxLjMtMS4xLDIuNC0yLjUsMi40SDYxLjlsMTIuNy0xMi43TDc0LjYsNzIuMkw3NC42LDcyLjJ6IE0xMDIuMiw3Mi4yYzAsMS4zLTEuMSwyLjQtMi41LD'+
			'IuNEg4NS41JiN4YTsmI3g5OyYjeDk7Yy0xLjQsMC0yLjUtMS4xLTIuNS0yLjRWNTcuOGMwLTEuMywxLjEtMi40LDIuNS0yLjRoMTQuMmMxLjQsMCwyLjUsMS4xLDIuNSwyLjRDMTAyLjIsNTcuOCwxMDIuMiw3Mi4yLDEwMi4yLDcyLjJ6Ii8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMl8xXyI+CiAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTU1LjQsNTcuOGMwLTEuMywxLjEtMi40LDIuNS0yLjRoMTAuNEw1NS40LDY4LjNWNTcuOHogTTI3LjgsNzIuMlY1Ny44YzAtMS4zLDEuMS0yLjQsMi41LTIuNGgxNC4zJiN4YTsmI3g5OyYjeDk7YzEuNCwwLDIuNSwxLjEsMi41LDIuNHYxNC4zYzAsMS4zLTEu'+
			'MSwyLjQtMi41LDIuNEgzMC4zQzI4LjksNzQuNiwyNy44LDczLjUsMjcuOCw3Mi4yeiBNMzIuOCwxMDAuNGMtMC40LDAtMC44LTAuMS0xLjEtMC40JiN4YTsmI3g5OyYjeDk7bC0xLjctMS43Yy0wLjYtMC42LTAuNi0xLjYsMC0yLjJsNjYtNjZjMC4zLTAuMywwLjctMC40LDEuMS0wLjRjMC40LDAsMC44LDAuMSwxLjEsMC40bDEuNywxLjdjMC42LDAuNiwwLjYsMS42LDAsMi4ybC02Niw2NiYjeGE7JiN4OTsmI3g5O0MzMy42LDEwMC4zLDMzLjIsMTAwLjQsMzIuOCwxMDAuNHogTTc0LjYsNzIuMmMwLDEuMy0xLjEsMi40LTIuNSwyLjRINjEuOWwxMi43LTEyLjdMNzQuNiw3Mi4yTDc0LjYsNzIuMn'+
			'ogTTEwMi4yLDcyLjImI3hhOyYjeDk7JiN4OTtjMCwxLjMtMS4xLDIuNC0yLjUsMi40SDg1LjVjLTEuNCwwLTIuNS0xLjEtMi41LTIuNFY1Ny44YzAtMS4zLDEuMS0yLjQsMi41LTIuNGgxNC4yYzEuNCwwLDIuNSwxLjEsMi41LDIuNCYjeGE7JiN4OTsmI3g5O0MxMDIuMiw1Ny44LDEwMi4yLDcyLjIsMTAyLjIsNzIuMnogTTU1LjQsNTcuOGMwLTEuMywxLjEtMi40LDIuNS0yLjRoMTAuNEw1NS40LDY4LjNWNTcuOHogTTI3LjgsNzIuMlY1Ny44YzAtMS4zLDEuMS0yLjQsMi41LTIuNCYjeGE7JiN4OTsmI3g5O2gxNC4zYzEuNCwwLDIuNSwxLjEsMi41LDIuNHYxNC4zYzAsMS4zLTEuMSwyLjQtMi41'+
			'LDIuNEgzMC4zQzI4LjksNzQuNiwyNy44LDczLjUsMjcuOCw3Mi4yeiBNMzIuOCwxMDAuNGMtMC40LDAtMC44LTAuMS0xLjEtMC40JiN4YTsmI3g5OyYjeDk7bC0xLjctMS43Yy0wLjYtMC42LTAuNi0xLjYsMC0yLjJsNjYtNjZjMC4zLTAuMywwLjctMC40LDEuMS0wLjRjMC40LDAsMC44LDAuMSwxLjEsMC40bDEuNywxLjdjMC42LDAuNiwwLjYsMS42LDAsMi4ybC02Niw2NiYjeGE7JiN4OTsmI3g5O0MzMy42LDEwMC4zLDMzLjIsMTAwLjQsMzIuOCwxMDAuNHogTTc0LjYsNzIuMmMwLDEuMy0xLjEsMi40LTIuNSwyLjRINjEuOWwxMi43LTEyLjdMNzQuNiw3Mi4yTDc0LjYsNzIuMnogTTEwMi4yLD'+
			'cyLjImI3hhOyYjeDk7JiN4OTtjMCwxLjMtMS4xLDIuNC0yLjUsMi40SDg1LjVjLTEuNCwwLTIuNS0xLjEtMi41LTIuNFY1Ny44YzAtMS4zLDEuMS0yLjQsMi41LTIuNGgxNC4yYzEuNCwwLDIuNSwxLjEsMi41LDIuNCYjeGE7JiN4OTsmI3g5O0MxMDIuMiw1Ny44LDEwMi4yLDcyLjIsMTAyLjIsNzIuMnoiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._thumbnail_hide_button__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._thumbnail_hide_button__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgaWQ9IkxheWVyXzEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxMzAgMTMwOyIgdmlld0JveD0iMCAwIDEzMCAxMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeD0iMHB4Ii'+
			'B5PSIwcHgiPgogPGcgaWQ9IkxheWVyXzFfMV8iPgogIDxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik02NSwyLjZDMzAuNiwyLjYsMi42LDMwLjYsMi42LDY1czI3LjksNjIuNCw2Mi40LDYyLjRjMzQuNCwwLDYyLjQtMjcuOSw2Mi40LTYyLjRTOTkuNCwyLjYsNjUsMi42eiBNNTQuMyw1Ny4xJiN4YTsmI3g5OyYjeDk7YzAtMS41LDEuMi0yLjcsMi43LTIuN2gxMS42TDU0LjMsNjguN1Y1Ny4xeiBNMjMuNyw3Mi45VjU3LjFjMC0xLjUsMS4yLTIuNywyLjctMi43aDE1LjhjMS41LDAsMi43LDEuMiwyLjcsMi43djE1LjkmI3hhOyYjeDk7JiN4OTtjMCwxLjUtMS4yLDIuNy0yLjcsMi43SDI2LjRDMjQu'+
			'OSw3NS43LDIzLjcsNzQuNCwyMy43LDcyLjl6IE0yOS4zLDEwNC40Yy0wLjQsMC0wLjktMC4yLTEuMi0wLjVsLTEuOC0xLjhjLTAuNy0wLjctMC43LTEuNywwLTIuNCYjeGE7JiN4OTsmI3g5O2w3My4zLTczLjNjMC4zLTAuMywwLjgtMC41LDEuMi0wLjVzMC45LDAuMiwxLjIsMC41bDEuOCwxLjhjMC43LDAuNywwLjcsMS43LDAsMi40bC03My4zLDczLjNDMzAuMSwxMDQuMiwyOS43LDEwNC40LDI5LjMsMTA0LjR6JiN4YTsmI3g5OyYjeDk7IE03NS43LDcyLjljMCwxLjUtMS4yLDIuNy0yLjcsMi43SDYxLjVsMTQuMS0xNC4xTDc1LjcsNzIuOUw3NS43LDcyLjl6IE0xMDYuMyw3Mi45YzAsMS41LT'+
			'EuMiwyLjctMi43LDIuN0g4Ny44JiN4YTsmI3g5OyYjeDk7Yy0xLjUsMC0yLjctMS4yLTIuNy0yLjdWNTcuMWMwLTEuNSwxLjItMi43LDIuNy0yLjdoMTUuOGMxLjUsMCwyLjcsMS4yLDIuNywyLjdDMTA2LjMsNTcuMSwxMDYuMyw3Mi45LDEwNi4zLDcyLjl6Ii8+CiA8L2c+CiA8ZyBpZD0iTGF5ZXJfMl8xXyI+CiAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTU0LjMsNTcuMWMwLTEuNSwxLjItMi43LDIuNy0yLjdoMTEuNkw1NC4zLDY4LjdWNTcuMXogTTIzLjcsNzIuOVY1Ny4xYzAtMS41LDEuMi0yLjcsMi43LTIuN2gxNS44JiN4YTsmI3g5OyYjeDk7YzEuNSwwLDIuNywxLjIsMi43LDIuN3Yx'+
			'NS45YzAsMS41LTEuMiwyLjctMi43LDIuN0gyNi40QzI0LjksNzUuNywyMy43LDc0LjQsMjMuNyw3Mi45eiBNMjkuMywxMDQuNGMtMC40LDAtMC45LTAuMi0xLjItMC41JiN4YTsmI3g5OyYjeDk7bC0xLjgtMS44Yy0wLjctMC43LTAuNy0xLjcsMC0yLjRsNzMuMy03My4zYzAuMy0wLjMsMC44LTAuNSwxLjItMC41czAuOSwwLjIsMS4yLDAuNWwxLjgsMS44YzAuNywwLjcsMC43LDEuNywwLDIuNGwtNzMuMyw3My4zJiN4YTsmI3g5OyYjeDk7QzMwLjEsMTA0LjIsMjkuNywxMDQuNCwyOS4zLDEwNC40eiBNNzUuNyw3Mi45YzAsMS41LTEuMiwyLjctMi43LDIuN0g2MS41bDE0LjEtMTQuMUw3NS43LD'+
			'cyLjlMNzUuNyw3Mi45eiBNMTA2LjMsNzIuOSYjeGE7JiN4OTsmI3g5O2MwLDEuNS0xLjIsMi43LTIuNywyLjdIODcuOGMtMS41LDAtMi43LTEuMi0yLjctMi43VjU3LjFjMC0xLjUsMS4yLTIuNywyLjctMi43aDE1LjhjMS41LDAsMi43LDEuMiwyLjcsMi43JiN4YTsmI3g5OyYjeDk7QzEwNi4zLDU3LjEsMTA2LjMsNzIuOSwxMDYuMyw3Mi45eiBNNTQuMyw1Ny4xYzAtMS41LDEuMi0yLjcsMi43LTIuN2gxMS42TDU0LjMsNjguN1Y1Ny4xeiBNMjMuNyw3Mi45VjU3LjFjMC0xLjUsMS4yLTIuNywyLjctMi43JiN4YTsmI3g5OyYjeDk7aDE1LjhjMS41LDAsMi43LDEuMiwyLjcsMi43djE1LjljMCwx'+
			'LjUtMS4yLDIuNy0yLjcsMi43SDI2LjRDMjQuOSw3NS43LDIzLjcsNzQuNCwyMy43LDcyLjl6IE0yOS4zLDEwNC40Yy0wLjQsMC0wLjktMC4yLTEuMi0wLjUmI3hhOyYjeDk7JiN4OTtsLTEuOC0xLjhjLTAuNy0wLjctMC43LTEuNywwLTIuNGw3My4zLTczLjNjMC4zLTAuMywwLjgtMC41LDEuMi0wLjVzMC45LDAuMiwxLjIsMC41bDEuOCwxLjhjMC43LDAuNywwLjcsMS43LDAsMi40bC03My4zLDczLjMmI3hhOyYjeDk7JiN4OTtDMzAuMSwxMDQuMiwyOS43LDEwNC40LDI5LjMsMTA0LjR6IE03NS43LDcyLjljMCwxLjUtMS4yLDIuNy0yLjcsMi43SDYxLjVsMTQuMS0xNC4xTDc1LjcsNzIuOUw3NS'+
			'43LDcyLjl6IE0xMDYuMyw3Mi45JiN4YTsmI3g5OyYjeDk7YzAsMS41LTEuMiwyLjctMi43LDIuN0g4Ny44Yy0xLjUsMC0yLjctMS4yLTIuNy0yLjdWNTcuMWMwLTEuNSwxLjItMi43LDIuNy0yLjdoMTUuOGMxLjUsMCwyLjcsMS4yLDIuNywyLjcmI3hhOyYjeDk7JiN4OTtDMTA2LjMsNTcuMSwxMDYuMyw3Mi45LDEwNi4zLDcyLjl6Ii8+CiA8L2c+Cjwvc3ZnPgo=';
		me._thumbnail_hide_button__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="thumbnail_hide_button";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_hide_button.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_hide_button.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_thumbnail_menu_1') == false))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_hide_button.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_hide_button.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_hide_button.style[domTransition]='opacity 0s';
				if (me._thumbnail_hide_button.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_hide_button.style.visibility="hidden";
					me._thumbnail_hide_button.style.opacity=0;
				}
				else {
					me._thumbnail_hide_button.style.visibility=me._thumbnail_hide_button.ggVisible?'inherit':'hidden';
					me._thumbnail_hide_button.style.opacity=1;
				}
			}
		}
		me._thumbnail_hide_button.onmouseover=function (e) {
			me._thumbnail_hide_button__img.style.visibility='hidden';
			me._thumbnail_hide_button__imgo.style.visibility='inherit';
		}
		me._thumbnail_hide_button.onmouseout=function (e) {
			me._thumbnail_hide_button__img.style.visibility='inherit';
			me._thumbnail_hide_button__imgo.style.visibility='hidden';
		}
		me._thumbnail_hide_button.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail.appendChild(me._thumbnail_hide_button);
		el=me._thumbnail_show_button=document.createElement('div');
		els=me._thumbnail_show_button__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgaWQ9IkxheWVyXzEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiBiYXNlUHJvZmlsZT0idGlueSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xMTguOSwzOTdjMC0zMS0yNS4xLTU2LjEtNTYuMS01Ni4xYy0zMSwwLTU2LjEsMjUuMS01Ni4xLDU2LjFzMjUuMSw1Ni4xLDU2LjEsNTYuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xNDQsNDUzLjEtMTE4LjksNDI4LTExOC45LDM5N3ogTS0yMDkuNyw0MDYuNmMtMS40LDAtMi41LTEuMS0yLjUtMi40di0xNC4zYzAtMS4zLDEuMS0yLjQsMi41LTIuNGgxNC4zYzEuNCwwLDIuNSwxLjEsMi41LDIuNCYjeGQ7JiN4YTsmI3g5OyYjeDk7djE0LjNjMCwxLjMtMS4xLDIuNC0yLjUsMi40TC0yMDkuNyw0MDYuNkwtMjA5LjcsNDA2LjZ6'+
			'IE0tMTgyLjEsNDA2LjZjLTEuNCwwLTIuNS0xLjEtMi41LTIuNHYtMTQuM2MwLTEuMywxLjEtMi40LDIuNS0yLjRoMTQuMiYjeGQ7JiN4YTsmI3g5OyYjeDk7YzEuNCwwLDIuNSwxLjEsMi41LDIuNHYxNC4zYzAsMS4zLTEuMSwyLjQtMi41LDIuNEwtMTgyLjEsNDA2LjZMLTE4Mi4xLDQwNi42eiBNLTE1NC41LDQwNi42Yy0xLjQsMC0yLjUtMS4xLTIuNS0yLjR2LTE0LjMmI3hkOyYjeGE7JiN4OTsmI3g5O2MwLTEuMywxLjEtMi40LDIuNS0yLjRoMTQuMmMxLjQsMCwyLjUsMS4xLDIuNSwyLjR2MTQuM2MwLDEuMy0xLjEsMi40LTIuNSwyLjRMLTE1NC41LDQwNi42eiIvPgogPC9nPgogPGcgaWQ9Ik'+
			'xheWVyXzIiPgogIDxnPgogICA8Zz4KICAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMTU0LjUsNDA2LjZjLTEuNCwwLTIuNS0xLjEtMi41LTIuNHYtMTQuM2MwLTEuMywxLjEtMi40LDIuNS0yLjRoMTQuMmMxLjQsMCwyLjUsMS4xLDIuNSwyLjR2MTQuMyYjeGQ7JiN4YTsmI3g5OyYjeDk7JiN4OTsmI3g5O2MwLDEuMy0xLjEsMi40LTIuNSwyLjRMLTE1NC41LDQwNi42eiIvPgogICAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xODIuMSw0MDYuNmMtMS40LDAtMi41LTEuMS0yLjUtMi40di0xNC4zYzAtMS4zLDEuMS0yLjQsMi41LTIuNGgxNC4yYzEuNCwwLDIuNSwxLjEsMi41LDIuNHYx'+
			'NC4zJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMS4zLTEuMSwyLjQtMi41LDIuNEwtMTgyLjEsNDA2LjZMLTE4Mi4xLDQwNi42eiIvPgogICAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0yMDkuNyw0MDYuNmMtMS40LDAtMi41LTEuMS0yLjUtMi40di0xNC4zYzAtMS4zLDEuMS0yLjQsMi41LTIuNGgxNC4zYzEuNCwwLDIuNSwxLjEsMi41LDIuNHYxNC4zJiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMS4zLTEuMSwyLjQtMi41LDIuNEwtMjA5LjcsNDA2LjZMLTIwOS43LDQwNi42eiIvPgogICA8L2c+CiAgPC9nPgogPC9nPgo8L3N2Zz4K';
		me._thumbnail_show_button__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._thumbnail_show_button__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgaWQ9IkxheWVyXzEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiBiYXNlUHJvZmlsZT0idGlueSI+CiA8ZyBpZD0iTG'+
			'F5ZXJfMV8xXyI+CiAgPHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTS0xMTIuNiwzOTdjMC0zNC40LTI3LjktNjIuNC02Mi40LTYyLjRjLTM0LjQsMC02Mi40LDI3LjktNjIuNCw2Mi40czI3LjksNjIuNCw2Mi40LDYyLjQmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTQwLjYsNDU5LjQtMTEyLjYsNDMxLjQtMTEyLjYsMzk3eiBNLTIxMy42LDQwNy42Yy0xLjUsMC0yLjctMS4yLTIuNy0yLjd2LTE1LjljMC0xLjUsMS4yLTIuNywyLjctMi43aDE1LjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MxLjUsMCwyLjcsMS4yLDIuNywyLjd2MTUuOWMwLDEuNS0xLjIsMi43LTIuNywyLjdMLTIxMy42LDQwNy42TC0yMTMu'+
			'Niw0MDcuNnogTS0xODIuOSw0MDcuNmMtMS41LDAtMi43LTEuMi0yLjctMi43di0xNS45JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC0xLjUsMS4yLTIuNywyLjctMi43aDE1LjhjMS41LDAsMi43LDEuMiwyLjcsMi43djE1LjljMCwxLjUtMS4yLDIuNy0yLjcsMi43TC0xODIuOSw0MDcuNkwtMTgyLjksNDA3LjZ6IE0tMTUyLjIsNDA3LjYmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMS41LDAtMi43LTEuMi0yLjctMi43di0xNS45YzAtMS41LDEuMi0yLjcsMi43LTIuN2gxNS44YzEuNSwwLDIuNywxLjIsMi43LDIuN3YxNS45YzAsMS41LTEuMiwyLjctMi43LDIuN0wtMTUyLjIsNDA3LjZ6Ii8+CiA8L2c+Ci'+
			'A8ZyBpZD0iTGF5ZXJfMiI+CiAgPGc+CiAgIDxnPgogICAgPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0xNTIuMiw0MDcuNmMtMS41LDAtMi43LTEuMi0yLjctMi43di0xNS45YzAtMS41LDEuMi0yLjcsMi43LTIuN2gxNS44YzEuNSwwLDIuNywxLjIsMi43LDIuN3YxNS45JiN4ZDsmI3hhOyYjeDk7JiN4OTsmI3g5OyYjeDk7YzAsMS41LTEuMiwyLjctMi43LDIuN0wtMTUyLjIsNDA3LjZ6Ii8+CiAgICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTE4Mi45LDQwNy42Yy0xLjUsMC0yLjctMS4yLTIuNy0yLjd2LTE1LjljMC0xLjUsMS4yLTIuNywyLjctMi43aDE1LjhjMS41LDAsMi43LDEuMiwy'+
			'LjcsMi43djE1LjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwxLjUtMS4yLDIuNy0yLjcsMi43TC0xODIuOSw0MDcuNkwtMTgyLjksNDA3LjZ6Ii8+CiAgICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTIxMy42LDQwNy42Yy0xLjUsMC0yLjctMS4yLTIuNy0yLjd2LTE1LjljMC0xLjUsMS4yLTIuNywyLjctMi43aDE1LjhjMS41LDAsMi43LDEuMiwyLjcsMi43djE1LjkmI3hkOyYjeGE7JiN4OTsmI3g5OyYjeDk7JiN4OTtjMCwxLjUtMS4yLDIuNy0yLjcsMi43TC0yMTMuNiw0MDcuNkwtMjEzLjYsNDA3LjZ6Ii8+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=';
		me._thumbnail_show_button__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="thumbnail_show_button";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_show_button.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_show_button.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_thumbnail_menu_1') == false))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_show_button.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_show_button.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_show_button.style[domTransition]='opacity 0s';
				if (me._thumbnail_show_button.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_show_button.style.visibility=me._thumbnail_show_button.ggVisible?'inherit':'hidden';
					me._thumbnail_show_button.style.opacity=1;
				}
				else {
					me._thumbnail_show_button.style.visibility="hidden";
					me._thumbnail_show_button.style.opacity=0;
				}
			}
		}
		me._thumbnail_show_button.onmouseover=function (e) {
			me._thumbnail_show_button__img.style.visibility='hidden';
			me._thumbnail_show_button__imgo.style.visibility='inherit';
		}
		me._thumbnail_show_button.onmouseout=function (e) {
			me._thumbnail_show_button__img.style.visibility='inherit';
			me._thumbnail_show_button__imgo.style.visibility='hidden';
		}
		me._thumbnail_show_button.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail.appendChild(me._thumbnail_show_button);
		me.divSkin.appendChild(me._thumbnail);
		el=me._thumbnail_menu=document.createElement('div');
		els=me._thumbnail_menu__content=document.createElement('div');
		els.className='ggskin ggskin_subelement ggskin_scrollarea';
		el.ggContent=els;
		el.appendChild(els);
		el.ggHorScrollVisible = false;
		el.ggVertScrollVisible = false;
		el.ggContentLeftOffset = 0;
		el.ggContentTopOffset = 0;
		hs ='';
		hs+='height : 73px;';
		hs+='left : 50%;';
		hs+='margin-left : -57.5px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='width : 115px;';
		hs+="";
		els.setAttribute('style',hs);
		me._thumbnail_menu.ggScrollByX = function(diffX) {
			if(!me._thumbnail_menu.ggHorScrollVisible || diffX == 0 || me._thumbnail_menu.ggHPercentVisible >= 1.0) return;
			me._thumbnail_menu.ggScrollPosX = (me._thumbnail_menu__horScrollFg.offsetLeft + diffX);
			me._thumbnail_menu.ggScrollPosX = Math.max(me._thumbnail_menu.ggScrollPosX, 0);
			me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
			me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
			me._thumbnail_menu__content.style.left = -(Math.round(me._thumbnail_menu.ggScrollPosX / me._thumbnail_menu.ggHPercentVisible)) + me._thumbnail_menu.ggContentLeftOffset + 'px';
			me._thumbnail_menu.ggScrollPosXPercent = (me._thumbnail_menu__horScrollFg.offsetLeft / me._thumbnail_menu__horScrollBg.offsetWidth);
		}
		me._thumbnail_menu.ggScrollByXSmooth = function(diffX) {
			if(!me._thumbnail_menu.ggHorScrollVisible || diffX == 0 || me._thumbnail_menu.ggHPercentVisible >= 1.0) return;
			var scrollPerInterval = diffX / 25;
			var scrollCurrX = 0;
			var id = setInterval(function() {
				scrollCurrX += scrollPerInterval;
				me._thumbnail_menu.ggScrollPosX += scrollPerInterval;
				if (diffX > 0 && (scrollCurrX >= diffX || me._thumbnail_menu.ggScrollPosX >= me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth)) {
					me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
					clearInterval(id);
				}
				if (diffX < 0 && (scrollCurrX <= diffX || me._thumbnail_menu.ggScrollPosX <= 0)) {
					me._thumbnail_menu.ggScrollPosX = Math.max(me._thumbnail_menu.ggScrollPosX, 0);
					clearInterval(id);
				}
			me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
			me._thumbnail_menu__content.style.left = -(Math.round(me._thumbnail_menu.ggScrollPosX / me._thumbnail_menu.ggHPercentVisible)) + me._thumbnail_menu.ggContentLeftOffset + 'px';
			me._thumbnail_menu.ggScrollPosXPercent = (me._thumbnail_menu__horScrollFg.offsetLeft / me._thumbnail_menu__horScrollBg.offsetWidth);
			}, 10);
		}
		me._thumbnail_menu.ggScrollByY = function(diffY) {
			if(!me._thumbnail_menu.ggVertScrollVisible || diffY == 0 || me._thumbnail_menu.ggVPercentVisible >= 1.0) return;
			me._thumbnail_menu.ggScrollPosY = (me._thumbnail_menu__vertScrollFg.offsetTop + diffY);
			me._thumbnail_menu.ggScrollPosY = Math.max(me._thumbnail_menu.ggScrollPosY, 0);
			me._thumbnail_menu.ggScrollPosY = Math.min(me._thumbnail_menu.ggScrollPosY, me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight);
			me._thumbnail_menu__vertScrollFg.style.top = me._thumbnail_menu.ggScrollPosY + 'px';
			me._thumbnail_menu__content.style.top = -(Math.round(me._thumbnail_menu.ggScrollPosY / me._thumbnail_menu.ggVPercentVisible)) + me._thumbnail_menu.ggContentTopOffset + 'px';
			me._thumbnail_menu.ggScrollPosYPercent = (me._thumbnail_menu__vertScrollFg.offsetTop / me._thumbnail_menu__vertScrollBg.offsetHeight);
		}
		me._thumbnail_menu.ggScrollByYSmooth = function(diffY) {
			if(!me._thumbnail_menu.ggVertScrollVisible || diffY == 0 || me._thumbnail_menu.ggVPercentVisible >= 1.0) return;
			var scrollPerInterval = diffY / 25;
			var scrollCurrY = 0;
			var id = setInterval(function() {
				scrollCurrY += scrollPerInterval;
				me._thumbnail_menu.ggScrollPosY += scrollPerInterval;
				if (diffY > 0 && (scrollCurrY >= diffY || me._thumbnail_menu.ggScrollPosY >= me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight)) {
					me._thumbnail_menu.ggScrollPosY = Math.min(me._thumbnail_menu.ggScrollPosY, me._thumbnail_menu__vertScrollBg.offsetHeight - me._thumbnail_menu__vertScrollFg.offsetHeight);
					clearInterval(id);
				}
				if (diffY < 0 && (scrollCurrY <= diffY || me._thumbnail_menu.ggScrollPosY <= 0)) {
					me._thumbnail_menu.ggScrollPosY = Math.max(me._thumbnail_menu.ggScrollPosY, 0);
					clearInterval(id);
				}
			me._thumbnail_menu__vertScrollFg.style.top = me._thumbnail_menu.ggScrollPosY + 'px';
			me._thumbnail_menu__content.style.top = -(Math.round(me._thumbnail_menu.ggScrollPosY / me._thumbnail_menu.ggVPercentVisible)) + me._thumbnail_menu.ggContentTopOffset + 'px';
			me._thumbnail_menu.ggScrollPosYPercent = (me._thumbnail_menu__vertScrollFg.offsetTop / me._thumbnail_menu__vertScrollBg.offsetHeight);
			}, 10);
		}
		me._thumbnail_menu.ggScrollIntoView = function(posX, posY, width, height) {
			if (me._thumbnail_menu.ggHorScrollVisible) {
				if (posX < 0) {
					var diffX = Math.floor(posX * me._thumbnail_menu.ggHPercentVisible);
					me._thumbnail_menu.ggScrollByXSmooth(diffX);
				} else if (posX + width > me._thumbnail_menu.offsetWidth - (me._thumbnail_menu.ggVertScrollVisible ? 15 : 0)) {
					var diffX = Math.ceil(((posX + width) - (me._thumbnail_menu.offsetWidth - (me._thumbnail_menu.ggVertScrollVisible ? 15 : 0))) * me._thumbnail_menu.ggHPercentVisible);
					me._thumbnail_menu.ggScrollByXSmooth(diffX);
				}
			}
			if (me._thumbnail_menu.ggVertScrollVisible) {
				if (posY < 0) {
					var diffY = Math.floor(posY * me._thumbnail_menu.ggVPercentVisible);
					me._thumbnail_menu.ggScrollByYSmooth(diffY);
				} else if (posY + height > me._thumbnail_menu.offsetHeight - (me._thumbnail_menu.ggHorScrollVisible ? 15 : 0)) {
					var diffY = Math.ceil(((posY + height) - (me._thumbnail_menu.offsetHeight - (me._thumbnail_menu.ggHorScrollVisible ? 15 : 0))) * me._thumbnail_menu.ggVPercentVisible);
					me._thumbnail_menu.ggScrollByYSmooth(diffY);
				}
			}
		}
		els.ontouchstart = function(e) {
			e = e || window.event;
			var t = e.touches;
			me._thumbnail_menu.ggDragLastX = t[0].clientX;
			me._thumbnail_menu.ggDragLastY = t[0].clientY;
			me._thumbnail_menu__content.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_menu.ggDragInertiaX *= 0.65;
					me._thumbnail_menu.ggDragInertiaY *= 0.65;
					me._thumbnail_menu.ggScrollByX(-me._thumbnail_menu.ggDragInertiaX);
					me._thumbnail_menu.ggScrollByY(-me._thumbnail_menu.ggDragInertiaY);
					if (Math.abs(me._thumbnail_menu.ggDragInertiaX) < 1.0 && Math.abs(me._thumbnail_menu.ggDragInertiaY) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				me._thumbnail_menu__content.ontouchend = null;
				me._thumbnail_menu__content.ontouchmove = null;
			}
			me._thumbnail_menu__content.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = t[0].clientX - me._thumbnail_menu.ggDragLastX;
				var diffY = t[0].clientY - me._thumbnail_menu.ggDragLastY;
				me._thumbnail_menu.ggDragInertiaX = diffX;
				me._thumbnail_menu.ggDragInertiaY = diffY;
				me._thumbnail_menu.ggDragLastX = t[0].clientX;
				me._thumbnail_menu.ggDragLastY = t[0].clientY;
				me._thumbnail_menu.ggScrollByX(-diffX);
				me._thumbnail_menu.ggScrollByY(-diffY);
			}
		}
		elHorScrollBg = me._thumbnail_menu__horScrollBg = document.createElement('div');
		el.appendChild(elHorScrollBg);
		elHorScrollBg.setAttribute('style', 'position: absolute; left: 0px; bottom: 0px; visibility: hidden; width: 300px; height: 15px; background-color: rgba(0,0,0,0.392157); pointer-events: auto;');
		elHorScrollBg.className='ggskin ggskin_scrollarea_hscrollbg';
		elHorScrollFg = me._thumbnail_menu__horScrollFg = document.createElement('div');
		elHorScrollBg.appendChild(elHorScrollFg);
		elHorScrollFg.className='ggskin ggskin_scrollarea_hscrollfg';
		elHorScrollFg.setAttribute('style', 'position: absolute; left: 0px; top: 0px; visibility: hidden; width: 300px; height: 15px; background-color: rgba(0,0,0,1); pointer-events: auto;');
		me._thumbnail_menu.ggScrollPosX = 0;
		me._thumbnail_menu.ggScrollPosXPercent = 0.0;
		elHorScrollFg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			me._thumbnail_menu.ggDragLastX = e.clientX;
			document.onmouseup = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_menu.ggDragInertiaX *= 0.65;
					me._thumbnail_menu.ggScrollByX(me._thumbnail_menu.ggDragInertiaX);
					if (Math.abs(me._thumbnail_menu.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.onmouseup = null;
				document.onmousemove = null;
			}
			document.onmousemove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var diffX = e.clientX - me._thumbnail_menu.ggDragLastX;
				me._thumbnail_menu.ggDragInertiaX = diffX;
				me._thumbnail_menu.ggDragLastX = e.clientX;
				me._thumbnail_menu.ggScrollByX(diffX);
			}
		}
		elHorScrollFg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			me._thumbnail_menu.ggDragLastX = t[0].clientX;
			document.ontouchend = function() {
				let inertiaInterval = setInterval(function() {
					me._thumbnail_menu.ggDragInertiaX *= 0.65;
					me._thumbnail_menu.ggScrollByX(me._thumbnail_menu.ggDragInertiaX);
					if (Math.abs(me._thumbnail_menu.ggDragInertiaX) < 1.0) {
						clearInterval(inertiaInterval);
					}
					}, 50);
				document.ontouchend = null;
				document.ontouchmove = null;
			}
			document.ontouchmove = function(e) {
				e = e || window.event;
				e.preventDefault();
				var t = e.touches;
				var diffX = t[0].clientX - me._thumbnail_menu.ggDragLastX;
				me._thumbnail_menu.ggDragInertiaX = diffX;
				me._thumbnail_menu.ggDragLastX = t[0].clientX;
				me._thumbnail_menu.ggScrollByX(diffX);
			}
		}
		elHorScrollBg.onmousedown = function(e) {
			e = e || window.event;
			e.preventDefault();
			var diffX = me._thumbnail_menu.ggScrollWidth;
			if (e.offsetX < me._thumbnail_menu.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._thumbnail_menu.ggScrollByXSmooth(diffX);
		}
		elHorScrollBg.ontouchstart = function(e) {
			e = e || window.event;
			e.preventDefault();
			e.stopPropagation();
			var t = e.touches;
			var rect = me._thumbnail_menu__horScrollBg.getBoundingClientRect();
			var diffX = me._thumbnail_menu.ggScrollWidth;
			if ((t[0].clientX - rect.left) < me._thumbnail_menu.ggScrollPosX) {
				diffX = diffX * -1;
			}
			me._thumbnail_menu.ggScrollByXSmooth(diffX);
		}
		el.addEventListener('wheel', function(e) {
			e.preventDefault();
			var wheelDelta = Math.sign(e.deltaX);
			me._thumbnail_menu.ggScrollByXSmooth(20 * wheelDelta);
		});
		elCornerBg = me._thumbnail_menu__cornerBg = document.createElement('div');
		el.appendChild(elCornerBg);
		elCornerBg.setAttribute('style', 'position: absolute; right: 0px; bottom: 0px; visibility: hidden; width: 15px; height: 15px; background-color: rgba(255,255,255,1);');
		elCornerBg.className='ggskin ggskin_scrollarea_scrollcorner';
		el.ggId="thumbnail_menu";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_scrollarea ";
		el.ggType='scrollarea';
		hs ='';
		hs+='border : 1px solid rgba(0, 0, 0, 0);';
		hs+='bottom : 65px;';
		hs+='height : 84px;';
		hs+='left : -10000px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 60%;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_menu.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._thumbnail_menu.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((player.getVariableValue('vis_thumbnail_menu_1') == false))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_menu.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_menu.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_menu.style[domTransition]='opacity 500ms ease 0ms';
				if (me._thumbnail_menu.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._thumbnail_menu.style.opacity == 0.0) { me._thumbnail_menu.style.visibility="hidden"; } }, 505);
					me._thumbnail_menu.style.opacity=0;
				}
				else {
					me._thumbnail_menu.style.visibility=me._thumbnail_menu.ggVisible?'inherit':'hidden';
					me._thumbnail_menu.style.opacity=1;
				}
			}
		}
		me._thumbnail_menu.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=((this.ggDx * pw)/100.0 + pw/2 - w/2) + 'px';
			}
			{
				var horScrollWasVisible = this.ggHorScrollVisible;
				var vertScrollWasVisible = this.ggVertScrollVisible;
				this.ggContent.style.left = '0px';
				this.ggContent.style.top = '0px';
				this.ggContentLeftOffset = 0;
				this.ggContentTopOffset = 0;
				var offsetWidthWithScale = this.getBoundingClientRect().width;
				var offsetHeightWithScale = this.getBoundingClientRect().height;
				var domRectContent = this.ggContent.getBoundingClientRect();
				var minX = 0;
				var minY = 0;
				var maxX = 0;
				var maxY = 0;
				var stack=[];
				stack.push(this.ggContent);
				while(stack.length>0) {
					var e=stack.pop();
					if (e!=this.ggContent && e.getBoundingClientRect && e.style['display']!='none') {
						var domRectChild = e.getBoundingClientRect();
						var diffX = domRectChild.left - domRectContent.left;
						minX = Math.min(minX, diffX);
						maxX = Math.max(maxX, diffX + domRectChild.width);
						var diffY = domRectChild.top - domRectContent.top;
						minY = Math.min(minY, diffY);
						maxY = Math.max(maxY, diffY + domRectChild.height);
					}
					if (e.hasChildNodes() && e.style['display']!='none') {
						for(var i=0;i<e.childNodes.length;i++) {
							stack.push(e.childNodes[i]);
						}
					}
				}
				if (minX < 0) this.ggContentLeftOffset = -minX;
				if (minY < 0) this.ggContentTopOffset = -minY;
				var contentWidth = maxX - minX;
				var contentHeight = maxY - minY;
				this.ggContent.style.left = this.ggContentLeftOffset + 'px';
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.width = contentWidth + 'px';
				this.ggContent.style.height = contentHeight + 'px';
				var containerWidth = offsetWidthWithScale;
				if (this.ggVertScrollVisible) containerWidth -= 15;
				if (contentWidth < containerWidth) {
					this.ggContent.style.left = '50%';
					this.ggContent.style.marginLeft = ((contentWidth/-2) - (this.ggVertScrollVisible ? (15/2) : 0)) + 'px';
				}
				else {
					this.ggContent.style.left = this.ggContentLeftOffset + 'px';
					this.ggContent.style.marginLeft = '0px';
				}
				this.ggContent.style.top = this.ggContentTopOffset + 'px';
				this.ggContent.style.marginTop = '0px';
				if (contentWidth > Math.ceil(offsetWidthWithScale)) {
					me._thumbnail_menu__horScrollBg.style.visibility = 'inherit';
					me._thumbnail_menu__horScrollFg.style.visibility = 'inherit';
					me._thumbnail_menu.ggHorScrollVisible = true;
				} else {
					me._thumbnail_menu__horScrollBg.style.visibility = 'hidden';
					me._thumbnail_menu__horScrollFg.style.visibility = 'hidden';
					me._thumbnail_menu.ggHorScrollVisible = false;
				}
				if(me._thumbnail_menu.ggHorScrollVisible) {
					me._thumbnail_menu.ggAvailableHeight = me._thumbnail_menu.offsetHeight - 15;
					if (me._thumbnail_menu.ggVertScrollVisible) {
						me._thumbnail_menu.ggAvailableWidth = me._thumbnail_menu.offsetWidth - 15;
						me._thumbnail_menu.ggAvailableWidthWithScale = me._thumbnail_menu.getBoundingClientRect().width - me._thumbnail_menu__horScrollBg.getBoundingClientRect().height;
					} else {
						me._thumbnail_menu.ggAvailableWidth = me._thumbnail_menu.offsetWidth;
						me._thumbnail_menu.ggAvailableWidthWithScale = me._thumbnail_menu.getBoundingClientRect().width;
					}
					me._thumbnail_menu__horScrollBg.style.width = me._thumbnail_menu.ggAvailableWidth + 'px';
					me._thumbnail_menu.ggHPercentVisible = contentWidth != 0 ? me._thumbnail_menu.ggAvailableWidthWithScale / contentWidth : 0.0;
					if (me._thumbnail_menu.ggHPercentVisible > 1.0) me._thumbnail_menu.ggHPercentVisible = 1.0;
					me._thumbnail_menu.ggScrollWidth = Math.round(me._thumbnail_menu__horScrollBg.offsetWidth * me._thumbnail_menu.ggHPercentVisible);
					me._thumbnail_menu__horScrollFg.style.width = me._thumbnail_menu.ggScrollWidth + 'px';
					me._thumbnail_menu.ggScrollPosX = me._thumbnail_menu.ggScrollPosXPercent * me._thumbnail_menu.ggAvailableWidth;
					me._thumbnail_menu.ggScrollPosX = Math.min(me._thumbnail_menu.ggScrollPosX, me._thumbnail_menu__horScrollBg.offsetWidth - me._thumbnail_menu__horScrollFg.offsetWidth);
					me._thumbnail_menu__horScrollFg.style.left = me._thumbnail_menu.ggScrollPosX + 'px';
					if (me._thumbnail_menu.ggHPercentVisible < 1.0) {
						me._thumbnail_menu__content.style.left = -(Math.round(me._thumbnail_menu.ggScrollPosX / me._thumbnail_menu.ggHPercentVisible)) + this.ggContentLeftOffset + 'px';
					}
				} else {
					me._thumbnail_menu.ggAvailableHeight = me._thumbnail_menu.offsetHeight;
					me._thumbnail_menu.ggScrollPosX = 0;
					me._thumbnail_menu.ggScrollPosXPercent = 0.0;
				}
				if(horScrollWasVisible != me._thumbnail_menu.ggHorScrollVisible || vertScrollWasVisible != me._thumbnail_menu.ggVertScrollVisible) {
					me.updateSize(me._thumbnail_menu);
					me._thumbnail_menu.ggUpdatePosition();
				}
			}
		}
		el=me._thumbnail_cloner=document.createElement('div');
		el.ggNumRepeat = 1;
		el.ggNumRows = 0;
		el.ggNumCols = 0;
		el.ggWidth = 96;
		el.ggHeight = 62;
		el.ggUpdating = false;
		el.ggFilter = [];
		el.ggInstances = [];
		me._thumbnail_cloner.callChildLogicBlocks_changenode = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
					}
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_mouseover = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_active && me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_mouseover = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
					}
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_active = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_active && me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_active.logicBlock_bordercolor();
					}
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_changevisitednodes = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_visible();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_activehotspotchanged = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
					}
					if (me._thumbnail_cloner.ggInstances[i]._checkmark_tick && me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._checkmark_tick.logicBlock_alpha();
					}
				}
			}
		}
		me._thumbnail_cloner.callChildLogicBlocks_varchanged_opt_thumbnail_menu_tooltip_1 = function(){
			if(me._thumbnail_cloner.ggInstances) {
				var i;
				for(i = 0; i < me._thumbnail_cloner.ggInstances.length; i++) {
					if (me._thumbnail_cloner.ggInstances[i]._thumbnail_title && me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha) {
						me._thumbnail_cloner.ggInstances[i]._thumbnail_title.logicBlock_alpha();
					}
				}
			}
		}
		el.ggUpdate = function(filter) {
			if(me._thumbnail_cloner.ggUpdating == true) return;
			me._thumbnail_cloner.ggUpdating = true;
			var el=me._thumbnail_cloner;
			var curNumRows = 0;
			curNumRows = el.ggNumRepeat;
			if (curNumRows < 1) curNumRows = 1;
			if (typeof filter=='object') {
				el.ggFilter = filter;
			} else {
				filter = el.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.ggNumRows == curNumRows) && (el.ggInstances.length > 0) && (filter.length === el.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.ggCurrentFilter[index] }) )) {
				me._thumbnail_cloner.ggUpdating = false;
				return;
			} else {
				el.ggNumCols = 1;
				el.ggNumRows = curNumRows;
			}
			el.ggCurrentFilter = filter;
			el.ggInstances = [];
			if (el.hasChildNodes() == true) {
				while (el.firstChild) {
					el.removeChild(el.firstChild);
				}
			}
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			for (var i=0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j]) == -1) passed = false;
					}
				}
				if (passed) {
				var parameter={};
				parameter.top=(row * me._thumbnail_cloner.ggHeight) + 'px';
				parameter.left=(column * me._thumbnail_cloner.ggWidth) + 'px';
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_thumbnail_cloner_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.ggInstances.push(inst);
				el.appendChild(inst.__div);
				inst.__div.ggObj=inst;
				skin.updateSize(inst.__div);
				row++;
				if (row >= el.ggNumRows) {
					row = 0;
					column++;
					el.ggNumCols++;
				}
				}
			}
			me._thumbnail_cloner.callChildLogicBlocks_changenode();
			me._thumbnail_cloner.callChildLogicBlocks_mouseover();
			me._thumbnail_cloner.callChildLogicBlocks_mouseover();
			me._thumbnail_cloner.callChildLogicBlocks_active();
			me._thumbnail_cloner.callChildLogicBlocks_changevisitednodes();
			me._thumbnail_cloner.callChildLogicBlocks_activehotspotchanged();
			me._thumbnail_cloner.callChildLogicBlocks_varchanged_opt_thumbnail_menu_tooltip_1();
			me._thumbnail_cloner.ggUpdating = false;
			player.triggerEvent('clonerchanged');
			if (me._thumbnail_cloner.parentNode.classList.contains('ggskin_subelement') && me._thumbnail_cloner.parentNode.parentNode.classList.contains('ggskin_scrollarea')) me._thumbnail_cloner.parentNode.parentNode.ggUpdatePosition();
		}
		el.ggFilter = [];
		el.ggId="thumbnail_cloner";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_cloner ";
		el.ggType='cloner';
		hs ='';
		hs+='height : 62px;';
		hs+='left : 0px;';
		hs+='overflow : visible;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 96px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_cloner.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_cloner.ggUpdateConditionNodeChange=function () {
			var cnode=player.getCurrentNode();
			for(var i=0; i<me._thumbnail_cloner.childNodes.length; i++) {
				var child=me._thumbnail_cloner.childNodes[i];
				if (child.ggObj && child.ggObj.ggNodeId==cnode) {
			        var childOffX = child.offsetLeft;
			        var childOffY = child.offsetTop;
					var p = child.parentElement;
			        while (p != null && p!==this.divSkin) {
						if (p.ggType && p.ggType == 'scrollarea') {
							p.ggScrollIntoView(childOffX, childOffY, child.clientWidth, child.clientHeight);
						}
						childOffX += p.offsetLeft;
						childOffY += p.offsetTop;
						p = p.parentElement;
					}
				}
			}
		}
		me._thumbnail_cloner.ggUpdatePosition=function (useTransition) {
				me._thumbnail_cloner.ggUpdate();
		}
		me._thumbnail_cloner.ggNodeChange=function () {
			me._thumbnail_cloner.ggUpdateConditionNodeChange();
		}
		me._thumbnail_menu__content.appendChild(me._thumbnail_cloner);
		me.divSkin.appendChild(me._thumbnail_menu);
		me._map_1.ggMarkerInstances=[];
		me._map_1.ggMapId = 'FloorPlan02';
		me._map_1.ggLastNodeId=null;
		me._map_1.callChildLogicBlocksHotspot_map_pin_changenode = function(){
			if(me._map_1.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_1.ggMarkerInstances.length; i++) {
					if (me._map_1.ggMarkerInstances[i]._map_pin_tt && me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha) {
						me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha();
					}
				}
			}
		}
		me._map_1.callChildLogicBlocksHotspot_map_pin_configloaded = function(){
			if(me._map_1.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_1.ggMarkerInstances.length; i++) {
					if (me._map_1.ggMarkerInstances[i]._map_pin_tt && me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_position) {
						me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_position();
					}
				}
			}
		}
		me._map_1.callChildLogicBlocksHotspot_map_pin_mouseover = function(){
			if(me._map_1.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_1.ggMarkerInstances.length; i++) {
					if (me._map_1.ggMarkerInstances[i]._map_pin_active && me._map_1.ggMarkerInstances[i]._map_pin_active.logicBlock_scaling) {
						me._map_1.ggMarkerInstances[i]._map_pin_active.logicBlock_scaling();
					}
					if (me._map_1.ggMarkerInstances[i]._map_pin_normal && me._map_1.ggMarkerInstances[i]._map_pin_normal.logicBlock_scaling) {
						me._map_1.ggMarkerInstances[i]._map_pin_normal.logicBlock_scaling();
					}
				}
			}
		}
		me._map_1.callChildLogicBlocksHotspot_map_pin_mouseover = function(){
			if(me._map_1.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_1.ggMarkerInstances.length; i++) {
					if (me._map_1.ggMarkerInstances[i]._map_pin_tt && me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha) {
						me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha();
					}
				}
			}
		}
		me._map_1.callChildLogicBlocksHotspot_map_pin_active = function(){
			if(me._map_1.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_1.ggMarkerInstances.length; i++) {
					if (me._map_1.ggMarkerInstances[i]._map_pin_active && me._map_1.ggMarkerInstances[i]._map_pin_active.logicBlock_alpha) {
						me._map_1.ggMarkerInstances[i]._map_pin_active.logicBlock_alpha();
					}
					if (me._map_1.ggMarkerInstances[i]._map_pin_normal && me._map_1.ggMarkerInstances[i]._map_pin_normal.logicBlock_alpha) {
						me._map_1.ggMarkerInstances[i]._map_pin_normal.logicBlock_alpha();
					}
				}
			}
		}
		me._map_1.callChildLogicBlocksHotspot_map_pin_hastouch = function(){
			if(me._map_1.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_1.ggMarkerInstances.length; i++) {
					if (me._map_1.ggMarkerInstances[i]._map_pin_tt && me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_position) {
						me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_position();
					}
				}
			}
		}
		me._map_1.callChildLogicBlocksHotspot_map_pin_activehotspotchanged = function(){
			if(me._map_1.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_1.ggMarkerInstances.length; i++) {
					if (me._map_1.ggMarkerInstances[i]._map_pin_tt && me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha) {
						me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha();
					}
				}
			}
		}
		me._map_1.ggSimpleFloorplanMarkerArray=[];
		me._map_1.ggFloorplanWidth=0;
		me._map_1.ggFloorplanHeight=0;
		me._map_1__mapdiv=document.createElement('div');
		me._map_1__mapdiv.className='ggskin ggskin_map';
		me._map_1.appendChild(me._map_1__mapdiv);
		me._map_1__img=document.createElement('img');
		me._map_1__img.className='ggskin ggskin_map';
		me._map_1__mapdiv.appendChild(me._map_1__img);
		me._map_1.ggRadar={ lastFov : -1, lastPan : -1, xPos : -1, yPos : -1, radarElement : null }
		me._map_1.ggRadar.update=function() {
			var radar=me._map_1.ggRadar;
			var d2r = Math.PI/180 ;
			var fov = player.getFov();
			var pan = player.getPanNorth();
			pan -= me._map_1.ggFloorplanNorth;
			var filterpassed = true;
			var currentId = player.getCurrentNode();
			if (me._map_1.ggFilteredIds.length > 0 && me._map_1.ggFilteredIds.indexOf(currentId) == -1) filterpassed = false;
			if ((me._map_1.ggSimpleFloorplanMarkerArray.hasOwnProperty(currentId)) && filterpassed) {
				var activeMarker = me._map_1.ggSimpleFloorplanMarkerArray[currentId];
				if ((radar.radarElement) && (fov==radar.lastFov) && (pan==radar.lastPan) && (activeMarker.radarXPos==radar.xPos) && (activeMarker.radarYPos==radar.yPos)) return; 
				radar.lastPan=pan; radar.lastFov=fov;
				radar.xPos=activeMarker.radarXPos; radar.yPos=activeMarker.radarYPos;
				if (radar.radarElement) me._map_1__mapdiv.removeChild(radar.radarElement);
				radar.radarElement = document.createElementNS('http://www.w3.org/2000/svg','svg');
				radar.radarElement.setAttributeNS(null,'width',500);
				radar.radarElement.setAttributeNS(null,'height',500);
				radar.radarElement.setAttributeNS(null,'viewBox','0 0 500 500');
				var radarPath = document.createElementNS('http://www.w3.org/2000/svg','path');
				radarPath.setAttributeNS(null,'id','radarPath');
				pan = -90 - pan;
				var arcX1 = 250 * Math.cos((pan - fov / 2) * d2r);
				var arcY1 = 250 * Math.sin((pan - fov / 2) * d2r);
				var arcX2 = 250 * Math.cos((pan + fov / 2) * d2r);
				var arcY2 = 250 * Math.sin((pan + fov / 2) * d2r);
				arcX1 += 250;
				arcY1 += 250;
				arcX2 += 250;
				arcY2 += 250;
				var radarPathString = 'M250,250 L' + arcX1 + ',' + arcY1 + ' A 250 250 0 0 1 ' + arcX2 + ' ' + arcY2 +' Z';
				radarPath.setAttributeNS(null,'d', radarPathString);
				radarPath.setAttributeNS(null,'fill', '#00aa00');
				radarPath.setAttributeNS(null,'fill-opacity', 0.35);
				radarPath.setAttributeNS(null,'stroke', '#00aa00');
				radarPath.setAttributeNS(null,'stroke-opacity', 0.8);
				radarPath.setAttributeNS(null,'stroke-width', 1);
				radarPath.setAttributeNS(null,'stroke-linejoin', 'miter');
				radar.radarElement.appendChild(radarPath);
				me._map_1__mapdiv.appendChild(radar.radarElement);
				var radarXPos = activeMarker.radarXPos - 250;
				var radarYPos = activeMarker.radarYPos - 250;
				radar.radarElement.style['position'] = 'absolute';
				radar.radarElement.style['left'] = '' + radarXPos + 'px';
				radar.radarElement.style['top'] = '' + radarYPos + 'px';
				radar.radarElement.style['z-index'] = me._map_1.style['z-index'] + 1;
			} else {
				if (radar.radarElement) {
					me._map_1__mapdiv.removeChild(radar.radarElement);
					radar.radarElement = null;
				}
			}
		}
		me._map_1.ggShowSimpleFloorplan=function(mapDetails) {
			var mapWidth = me._map_1.clientWidth;
			var mapHeight = me._map_1.clientHeight;
			var levelLimit = 500;
			var level = 1;
			while (mapWidth > levelLimit && mapHeight > levelLimit) {
				levelLimit *= 2;
				if (mapDetails['width'] < levelLimit || mapDetails['height'] < levelLimit) break;
				level++;
			}
			var imageFilename = basePath + 'images/maptiles/' + me._map_1.ggMapId + '_' + level + '.' + mapDetails['tileformat'];
			me._map_1__img.setAttribute('src', imageFilename);
		me._map_1__mapdiv.setAttribute('style','position: absolute; left: 0px; top: 0px;width:' + me._map_1.ggFloorplanWidth + 'px;height:' + me._map_1.ggFloorplanHeight + 'px;overflow:hidden;;');
		me._map_1__img.setAttribute('style','width:' + me._map_1.ggFloorplanWidth + 'px;height:' + me._map_1.ggFloorplanHeight + 'px;-webkit-user-drag:none;pointer-events:none;');
		}
		me._map_1.ggCalculateFloorplanSize=function(mapDetails) {
			var floorplanWidth = mapDetails['width'];
			var floorplanHeight = mapDetails['height'];
			var frameAR = me._map_1.clientWidth / me._map_1.clientHeight;
			var floorplanAR = floorplanWidth / floorplanHeight;
			if (frameAR > floorplanAR) {
				me._map_1.ggFloorplanHeight = me._map_1.clientHeight;
				me._map_1.ggFloorplanWidth = me._map_1.ggFloorplanHeight * floorplanAR;
			} else {
				me._map_1.ggFloorplanWidth = me._map_1.clientWidth;
				me._map_1.ggFloorplanHeight = me._map_1.ggFloorplanWidth / floorplanAR;
			}
		}
		me._map_1.ggInitMap=function() {
			me._map_1.ggMapNotLoaded = false;
			var mapDetails = player.getMapDetails(me._map_1.ggMapId);
			me._map_1.style.backgroundColor = mapDetails['bgcolor'];
			if (mapDetails.hasOwnProperty('transparent') && mapDetails['transparent']) {
				me._map_1.ggPermeableMap = true;
			} else {
				me._map_1.ggPermeableMap = false;
			}
			me._map_1.ggCalculateFloorplanSize(mapDetails);
			me._map_1.ggShowSimpleFloorplan(mapDetails);
			me._map_1.ggFloorplanNorth = mapDetails['floorplannorth'];
		}
		me._map_1.ggClearMap=function() {
			me._map_1.ggClearMapMarkers();
			me._map_1.ggMapNotLoaded = true;
		}
		me._map_1.ggChangeMap=function(mapId) {
			var newMapType = player.getMapType(mapId)
			if (newMapType == 'web') {
				return;
			}
			me._map_1.ggMapId = mapId;
			me._map_1.ggClearMap();
			me._map_1.ggInitMap();
			me._map_1.ggInitMapMarkers();
		}
		me._map_1.ggPlaceMarkersOnSimpleFloorplan=function() {
			var markers=me._map_1.ggSimpleFloorplanMarkerArray;
			for (id in markers) {
				if (markers.hasOwnProperty(id)) {
					marker=markers[id];
					var coords = player.getNodeMapCoordsInPercent(id, me._map_1.ggMapId);
					var xPos = (me._map_1.ggFloorplanWidth * coords[0]) / 100.0;
					var yPos = (me._map_1.ggFloorplanHeight * coords[1]) / 100.0;
					marker.radarXPos = xPos;
					marker.radarYPos = yPos;
					xPos -= me._map_1.ggHMarkerAnchorOffset;
					yPos -= me._map_1.ggVMarkerAnchorOffset;
					marker.style['position'] = 'absolute';
					marker.style['left'] = xPos + 'px';
					marker.style['top'] = yPos + 'px';
					marker.style['z-index'] = me._map_1.style['z-index'] + 2;
				}
			}
		}
		me._map_1.ggInitMapMarkers=function() {
			me._map_1.ggClearMapMarkers();
			var ids=player.getNodeIds();
			me._map_1.ggFilteredIds = [];
			if (me._map_1.ggFilter != '') {
				var filter = me._map_1.ggFilter.split(',');
				for (i=0; i < ids.length; i++) {
					var nodeId = ids[i];
					var nodeData = player.getNodeUserdata(nodeId);
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j].trim()) != -1) me._map_1.ggFilteredIds.push(nodeId);
					}
				}
				if (me._map_1.ggFilteredIds.length > 0) ids = me._map_1.ggFilteredIds;
			}
			for(var i=0; i < ids.length; i++) {
				var id = ids[i];
				var coords = player.getNodeMapCoordsInPercent(id, me._map_1.ggMapId);
				if (coords.length>=2) {
					me._map_1.ggHMarkerAnchorOffset = 12;
					me._map_1.ggVMarkerAnchorOffset = 41;
					var markerParent = new Object();
					markerParent.ggElementNodeId=function() { return id };
					var markerClass = new SkinElement_map_pin_Class(me, markerParent);
					me._map_1.ggMarkerInstances.push(markerClass);
					var marker = markerClass._map_pin;
					me._map_1.ggSimpleFloorplanMarkerArray[id] = marker;
					me._map_1__mapdiv.appendChild(marker);
				}
			}
			me._map_1.ggPlaceMarkersOnSimpleFloorplan();
			skin.updateSize(me._map_1);
		me._map_1.callChildLogicBlocksHotspot_map_pin_changenode();
		me._map_1.callChildLogicBlocksHotspot_map_pin_configloaded();
		me._map_1.callChildLogicBlocksHotspot_map_pin_mouseover();
		me._map_1.callChildLogicBlocksHotspot_map_pin_mouseover();
		me._map_1.callChildLogicBlocksHotspot_map_pin_active();
		me._map_1.callChildLogicBlocksHotspot_map_pin_hastouch();
		me._map_1.callChildLogicBlocksHotspot_map_pin_activehotspotchanged();
		}
		me._map_1.ggClearMapMarkers=function() {
			for (id in me._map_1.ggSimpleFloorplanMarkerArray) {
				if (me._map_1.ggSimpleFloorplanMarkerArray.hasOwnProperty(id)) {
					me._map_1__mapdiv.removeChild(me._map_1.ggSimpleFloorplanMarkerArray[id]);
				}
			}
			me._map_1.ggMarkerInstances=[];
			me._map_1.ggSimpleFloorplanMarkerArray=[];
		}
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
		player.addListener('configloaded', function() {
			me._map_1.ggClearMap();
			me._map_1.ggInitMap(false);
			me._map_1.ggInitMapMarkers(true);
			me._thumbnail_cloner.ggUpdate();
		});
		player.addListener('imagesready', function() {
			me._thumbnail_menu.ggUpdatePosition();
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	me.callChildLogicBlocksHotspot_ht_node_sizechanged = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hs_tt && hotspotTemplates['ht_node'][i]._hs_tt.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hs_tt.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_changenode = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hs_preview_image && hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node'][i]._ht_node_customimage && hotspotTemplates['ht_node'][i]._ht_node_customimage.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node_customimage.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._hs_tt && hotspotTemplates['ht_node'][i]._hs_tt.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hs_tt.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_configloaded = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hs_preview_image && hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_mouseover = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._image_1 && hotspotTemplates['ht_node'][i]._image_1.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._image_1.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_mouseover = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hs_preview_image && hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_active = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hs_visited && hotspotTemplates['ht_node'][i]._hs_visited.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hs_visited.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_changevisitednodes = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hs_visited && hotspotTemplates['ht_node'][i]._hs_visited.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hs_visited.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_activehotspotchanged = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_node_customimage && hotspotTemplates['ht_node'][i]._ht_node_customimage.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_node_customimage.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._hs_tt && hotspotTemplates['ht_node'][i]._hs_tt.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hs_tt.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_3d_preview = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hs_preview_image && hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha();
				}
			}
		}
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
		me._map_1.ggUpdateConditionTimer();
		if (me.elementMouseDown['button_2']) {
			me._map_1.ggClearMap();
			me._map_1.style[domTransition]='none';
			me._map_1.style.visibility='hidden';
			me._map_1.ggVisible=false;
			me._button_3.style[domTransition]='none';
			me._button_3.style.visibility=(Number(me._button_3.style.opacity)>0||!me._button_3.style.opacity)?'inherit':'hidden';
			me._button_3.ggVisible=true;
			me._button_2.style[domTransition]='none';
			me._button_2.style.visibility='hidden';
			me._button_2.ggVisible=false;
		}
		if (me.elementMouseDown['button_3']) {
			if (me._map_1.ggMapNotLoaded) {
				me._map_1.ggInitMap(false);
				me._map_1.ggInitMapMarkers(true);
			}
			me._map_1.style[domTransition]='none';
			me._map_1.style.visibility=(Number(me._map_1.style.opacity)>0||!me._map_1.style.opacity)?'inherit':'hidden';
			me._map_1.ggVisible=true;
			me._button_2.style[domTransition]='none';
			me._button_2.style.visibility=(Number(me._button_2.style.opacity)>0||!me._button_2.style.opacity)?'inherit':'hidden';
			me._button_2.ggVisible=true;
			me._button_3.style[domTransition]='none';
			me._button_3.style.visibility='hidden';
			me._button_3.ggVisible=false;
		}
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_ht_node(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node=document.createElement('div');
		el.ggId="ht_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 70px;';
		hs+='position : absolute;';
		hs+='top : 220px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		hs+='transform-style: preserve-3d;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node.onclick=function (e) {
			player.openNext(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node']=true;
			me._hs_preview_image.logicBlock_alpha();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node']=false;
			me._hs_preview_image.logicBlock_alpha();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ontouchend=function (e) {
			me.elementMouseOver['ht_node']=false;
			me._hs_preview_image.logicBlock_alpha();
		}
		me._ht_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_10=document.createElement('div');
		els=me._image_10__img=document.createElement('img');
		els.className='ggskin ggskin_image_10';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 1";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -140px;';
		hs+='visibility : inherit;';
		hs+='width : 70px;';
		hs+='pointer-events:auto;';
		hs+='transform:translate3d(0px,0px,-1px);';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_10.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._ht_node.appendChild(me._image_10);
		el=me._image_1=document.createElement('div');
		els=me._image_1__img=document.createElement('img');
		els.className='ggskin ggskin_image_1';
		hs=basePath + 'images/image_1.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 1";
		el.ggDx=2;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 70px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.70002;';
		hs+='position : absolute;';
		hs+='top : -140px;';
		hs+='visibility : inherit;';
		hs+='width : 70px;';
		hs+='pointer-events:auto;';
		hs+='transform:translate3d(0px,0px,1px);';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._image_1.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['image_1'] == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._image_1.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._image_1.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._image_1.style[domTransition]='opacity 0s';
				if (me._image_1.ggCurrentLogicStateAlpha == 0) {
					me._image_1.style.visibility=me._image_1.ggVisible?'inherit':'hidden';
					me._image_1.style.opacity=1;
				}
				else {
					me._image_1.style.visibility=me._image_1.ggVisible?'inherit':'hidden';
					me._image_1.style.opacity=0.70002;
				}
			}
		}
		me._image_1.onmouseover=function (e) {
			me.elementMouseOver['image_1']=true;
			me._image_1.logicBlock_alpha();
		}
		me._image_1.onmouseout=function (e) {
			me.elementMouseOver['image_1']=false;
			me._image_1.logicBlock_alpha();
		}
		me._image_1.ontouchend=function (e) {
			me.elementMouseOver['image_1']=false;
			me._image_1.logicBlock_alpha();
		}
		me._image_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._ht_node.appendChild(me._image_1);
		el=me._hs_preview_image=document.createElement('div');
		els=me._hs_preview_image__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/hs_preview_image_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hs_preview_image";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:5,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='z-index: -5;';
		hs+='cursor : pointer;';
		hs+='height : 128px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -234px;';
		hs+='visibility : hidden;';
		hs+='width : 200px;';
		hs+='pointer-events:none;';
		hs+='border-radius: 5px; overflow: hidden; box-shadow: 0px 0px 2px #000000; transform:translate3d(0px,0px,100px) rotateX(-90deg) scale(1.5); transform-style: preserve-3d; -webkit-backface-visibility: hidden; backface-visibility: hidden;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._hs_preview_image.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._hs_preview_image.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['ht_node'] == true)) && 
				((player.getVariableValue('opt_3d_preview') == true)) && 
				((player.getIsTour() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._hs_preview_image.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._hs_preview_image.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._hs_preview_image.style[domTransition]='opacity 500ms ease 0ms';
				if (me._hs_preview_image.ggCurrentLogicStateAlpha == 0) {
					me._hs_preview_image.style.visibility=me._hs_preview_image.ggVisible?'inherit':'hidden';
					me._hs_preview_image.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._hs_preview_image.style.opacity == 0.0) { me._hs_preview_image.style.visibility="hidden"; } }, 505);
					me._hs_preview_image.style.opacity=0;
				}
			}
		}
		me._hs_preview_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._hs_tt=document.createElement('div');
		els=me._hs_tt__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="hs_tt";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 0px;';
		hs+='height : 28px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 200px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 200px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.196078);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 12px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._hs_tt.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hs_tt.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('opt_3d_tooltip') == false)) || 
				((me.hotspot.title == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hs_tt.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hs_tt.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hs_tt.style[domTransition]='';
				if (me._hs_tt.ggCurrentLogicStateVisible == 0) {
					me._hs_tt.style.visibility="hidden";
					me._hs_tt.ggVisible=false;
				}
				else {
					me._hs_tt.style.visibility=(Number(me._hs_tt.style.opacity)>0||!me._hs_tt.style.opacity)?'inherit':'hidden';
					me._hs_tt.ggVisible=true;
				}
			}
		}
		me._hs_tt.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._hs_preview_image.appendChild(me._hs_tt);
		el=me._hs_visited=document.createElement('div');
		els=me._hs_visited__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgaWQ9IkxheWVyXzEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IC0yNDAgMzMyIDEzMCAxMzA7IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdm'+
			'ciIHg9IjBweCIgeT0iMHB4Ij4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojMDAwMDAwO30mI3hkOwoJLnN0MXtmaWxsOiNGRkZGRkY7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEu'+
			'N2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIgY2xhc3M9InN0MCIvPgogIDxwYXRoIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy0yLjQsMGwtMTIuNS'+
			'wxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIgY2xhc3M9InN0MSIvPgogPC9nPgo8L3N2Zz4K';
		me._hs_visited__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hs_visited";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 20px;';
		hs+='position : absolute;';
		hs+='right : 5px;';
		hs+='top : 5px;';
		hs+='visibility : inherit;';
		hs+='width : 20px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hs_visited.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hs_visited.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me._hs_visited.ggIsActive() == true)) || 
				((player.nodeVisited(me._hs_visited.ggElementNodeId()) == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hs_visited.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hs_visited.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hs_visited.style[domTransition]='';
				if (me._hs_visited.ggCurrentLogicStateVisible == 0) {
					me._hs_visited.style.visibility=(Number(me._hs_visited.style.opacity)>0||!me._hs_visited.style.opacity)?'inherit':'hidden';
					me._hs_visited.ggVisible=true;
				}
				else {
					me._hs_visited.style.visibility=(Number(me._hs_visited.style.opacity)>0||!me._hs_visited.style.opacity)?'inherit':'hidden';
					me._hs_visited.ggVisible=true;
				}
			}
		}
		me._hs_visited.ggUpdatePosition=function (useTransition) {
		}
		me._hs_preview_image.appendChild(me._hs_visited);
		me._ht_node.appendChild(me._hs_preview_image);
		el=me.__code=document.createElement('div');
		els=me.__code__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="_code";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 37px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : -39px;';
		hs+='visibility : hidden;';
		hs+='width : 66px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 68px;';
		hs+='height: 39px;';
		hs+='pointer-events: none;';
		hs+='background: #ffffff;';
		hs+='border: 1px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
this.onUpdatePosition=function(player,hotspot) {
var vs=player.getViewerSize();
var y=vs.height * (1/6*(1+Math.cos(player.getTilt() * Math.PI/90.0)));
var hs= 'perspective(500px) translate3d(0px,' + (y) + 'px,0px) ';
hs += 'rotateZ(' + ( player.getRoll()).toFixed(10) + 'deg) ';
hs += 'rotateX(' + ( player.getTilt()).toFixed(10) + 'deg) ';
hs += 'rotateY(' + (-player.getPan()).toFixed(10)  + 'deg) ';
hs += 'rotateY(' + ( hotspot.pan).toFixed(2)  + 'deg) ';
hs += 'rotateX(' + (-hotspot.tilt).toFixed(2) + 'deg) ';
hs += 'rotateX(90deg) ';
this.__div.style.transform=hs;
this.__div.style.left = vs.width / 2 + "px";
this.__div.style.top = vs.height / 2 + "px";
};
		el.appendChild(els);
		me.__code.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me.__code.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.appendChild(me.__code);
		el=me._ht_node_customimage=document.createElement('div');
		els=me._ht_node_customimage__img=document.createElement('img');
		els.className='ggskin ggskin_external';
		els.setAttribute('style','position: absolute;-webkit-user-drag:none;pointer-events:none;;');
		els.onload=function() {me._ht_node_customimage.ggUpdatePosition();}
		if ((hotspot) && (hotspot.customimage)) {
			el.ggText=hotspot.customimage;
			els.setAttribute('src', hotspot.customimage);
			els.style.width=hotspot.customimagewidth + 'px';
			els.style.height=hotspot.customimageheight + 'px';
			me.ggUse3d = hotspot.use3D;
			me.gg3dDistance = hotspot.distance3D;
		}
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		hs ='';
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_node_CustomImage";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_external ";
		el.ggType='external';
		hs ='';
		hs+='border : 0px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 50px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -129px;';
		hs+='visibility : inherit;';
		hs+='width : 50px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_customimage.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_node_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_node_customimage.style[domTransition]='';
				if (me._ht_node_customimage.ggCurrentLogicStateVisible == 0) {
					me._ht_node_customimage.style.visibility="hidden";
					me._ht_node_customimage__img.src = '';
					me._ht_node_customimage.ggVisible=false;
				}
				else {
					me._ht_node_customimage.style.visibility=(Number(me._ht_node_customimage.style.opacity)>0||!me._ht_node_customimage.style.opacity)?'inherit':'hidden';
					me._ht_node_customimage.ggSubElement.src=me._ht_node_customimage.ggText;
					me._ht_node_customimage.ggVisible=true;
				}
			}
		}
		me._ht_node_customimage.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			var parentWidth = me._ht_node_customimage.clientWidth;
			var parentHeight = me._ht_node_customimage.clientHeight;
			var img = me._ht_node_customimage__img;
			var aspectRatioDiv = me._ht_node_customimage.clientWidth / me._ht_node_customimage.clientHeight;
			var aspectRatioImg = img.naturalWidth / img.naturalHeight;
			if (img.naturalWidth < parentWidth) parentWidth = img.naturalWidth;
			if (img.naturalHeight < parentHeight) parentHeight = img.naturalHeight;
			var currentWidth,currentHeight;
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			}
			img.style.left='50%';
			img.style.marginLeft='-' + currentWidth/2 + 'px';
			img.style.top='50%';
			img.style.marginTop='-' + currentHeight/2 + 'px';
		}
		me._ht_node.appendChild(me._ht_node_customimage);
		if ((hotspot) && (hotspot.customimage)) {
			el.style.width=hotspot.customimagewidth + 'px';
			el.style.height=hotspot.customimageheight + 'px';
		}
		me.__div = me._ht_node;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		{
			hotspot.skinid = 'ht_node';
			hsinst = new SkinHotspotClass_ht_node(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node_sizechanged();;
			me.callChildLogicBlocksHotspot_ht_node_changenode();;
			me.callChildLogicBlocksHotspot_ht_node_configloaded();;
			me.callChildLogicBlocksHotspot_ht_node_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node_active();;
			me.callChildLogicBlocksHotspot_ht_node_changevisitednodes();;
			me.callChildLogicBlocksHotspot_ht_node_activehotspotchanged();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_3d_preview();;
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				hotspotTemplates['ht_node'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	function SkinElement_map_pin_Class(parentScope,ggParent) {
		var me=this;
		var flag=false;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		var nodeId=ggParent.ggElementNodeId();
		me.ggNodeId=nodeId;
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		
		el=me._map_pin=document.createElement('div');
		el.ggId="map_pin";
		el.ggDx=-308;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 439px;';
		hs+='height : 41px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 24px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_pin.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._map_pin.onclick=function (e) {
			if (
				(
					((me._map_pin.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
		}
		me._map_pin.onmouseover=function (e) {
			me.elementMouseOver['map_pin']=true;
			me._map_pin_tt.logicBlock_alpha();
		}
		me._map_pin.onmouseout=function (e) {
			me.elementMouseOver['map_pin']=false;
			me._map_pin_tt.logicBlock_alpha();
		}
		me._map_pin.ontouchend=function (e) {
			me.elementMouseOver['map_pin']=false;
			me._map_pin_tt.logicBlock_alpha();
		}
		me._map_pin.ggUpdatePosition=function (useTransition) {
		}
		el=me._map_pin_active=document.createElement('div');
		els=me._map_pin_active__img=document.createElement('img');
		els.className='ggskin ggskin_map_pin_active';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="map_pin_active";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 41px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 24px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		me._map_pin_active.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._map_pin_active.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['map_pin_active'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._map_pin_active.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._map_pin_active.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._map_pin_active.style[domTransition]='' + cssPrefix + 'transform 200ms ease 0ms, opacity 500ms ease 0ms';
				if (me._map_pin_active.ggCurrentLogicStateScaling == 0) {
					me._map_pin_active.ggParameter.sx = 1.1;
					me._map_pin_active.ggParameter.sy = 1.1;
					me._map_pin_active.style[domTransform]=parameterToTransform(me._map_pin_active.ggParameter);
				}
				else {
					me._map_pin_active.ggParameter.sx = 1;
					me._map_pin_active.ggParameter.sy = 1;
					me._map_pin_active.style[domTransform]=parameterToTransform(me._map_pin_active.ggParameter);
				}
			}
		}
		me._map_pin_active.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me._map_pin_active.ggIsActive() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._map_pin_active.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._map_pin_active.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._map_pin_active.style[domTransition]='' + cssPrefix + 'transform 200ms ease 0ms, opacity 500ms ease 0ms';
				if (me._map_pin_active.ggCurrentLogicStateAlpha == 0) {
					me._map_pin_active.style.visibility=me._map_pin_active.ggVisible?'inherit':'hidden';
					me._map_pin_active.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._map_pin_active.style.opacity == 0.0) { me._map_pin_active.style.visibility="hidden"; } }, 505);
					me._map_pin_active.style.opacity=0;
				}
			}
		}
		me._map_pin_active.onmouseover=function (e) {
			me.elementMouseOver['map_pin_active']=true;
			me._map_pin_active.logicBlock_scaling();
		}
		me._map_pin_active.onmouseout=function (e) {
			me.elementMouseOver['map_pin_active']=false;
			me._map_pin_active.logicBlock_scaling();
		}
		me._map_pin_active.ontouchend=function (e) {
			me.elementMouseOver['map_pin_active']=false;
			me._map_pin_active.logicBlock_scaling();
		}
		me._map_pin_active.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._map_pin.appendChild(me._map_pin_active);
		el=me._map_pin_normal=document.createElement('div');
		els=me._map_pin_normal__img=document.createElement('img');
		els.className='ggskin ggskin_map_pin_normal';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="map_pin_normal";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 0px;';
		hs+='cursor : pointer;';
		hs+='height : 31px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 18px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		me._map_pin_normal.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._map_pin_normal.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['map_pin_normal'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._map_pin_normal.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._map_pin_normal.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._map_pin_normal.style[domTransition]='' + cssPrefix + 'transform 200ms ease 0ms, opacity 500ms ease 0ms';
				if (me._map_pin_normal.ggCurrentLogicStateScaling == 0) {
					me._map_pin_normal.ggParameter.sx = 1.1;
					me._map_pin_normal.ggParameter.sy = 1.1;
					me._map_pin_normal.style[domTransform]=parameterToTransform(me._map_pin_normal.ggParameter);
				}
				else {
					me._map_pin_normal.ggParameter.sx = 1;
					me._map_pin_normal.ggParameter.sy = 1;
					me._map_pin_normal.style[domTransform]=parameterToTransform(me._map_pin_normal.ggParameter);
				}
			}
		}
		me._map_pin_normal.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me._map_pin_normal.ggIsActive() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._map_pin_normal.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._map_pin_normal.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._map_pin_normal.style[domTransition]='' + cssPrefix + 'transform 200ms ease 0ms, opacity 500ms ease 0ms';
				if (me._map_pin_normal.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._map_pin_normal.style.opacity == 0.0) { me._map_pin_normal.style.visibility="hidden"; } }, 505);
					me._map_pin_normal.style.opacity=0;
				}
				else {
					me._map_pin_normal.style.visibility=me._map_pin_normal.ggVisible?'inherit':'hidden';
					me._map_pin_normal.style.opacity=1;
				}
			}
		}
		me._map_pin_normal.onmouseover=function (e) {
			me.elementMouseOver['map_pin_normal']=true;
			me._map_pin_normal.logicBlock_scaling();
		}
		me._map_pin_normal.onmouseout=function (e) {
			me.elementMouseOver['map_pin_normal']=false;
			me._map_pin_normal.logicBlock_scaling();
		}
		me._map_pin_normal.ontouchend=function (e) {
			me.elementMouseOver['map_pin_normal']=false;
			me._map_pin_normal.logicBlock_scaling();
		}
		me._map_pin_normal.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._map_pin.appendChild(me._map_pin_normal);
		el=me._map_pin_tt=document.createElement('div');
		els=me._map_pin_tt__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="map_pin_tt";
		el.ggDx=0;
		el.ggDy=38;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #ffffff;';
		hs+='border: 0px solid #000000;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._map_pin_tt.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._map_pin_tt.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._map_pin_tt.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._map_pin_tt.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._map_pin_tt.style[domTransition]='left 0s, top 0s, opacity 500ms ease 0ms';
				if (me._map_pin_tt.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					this.ggDy = -38;
					me._map_pin_tt.ggUpdatePosition(true);
				}
				else {
					me._map_pin_tt.ggDx=0;
					me._map_pin_tt.ggDy=38;
					me._map_pin_tt.ggUpdatePosition(true);
				}
			}
		}
		me._map_pin_tt.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['map_pin'] == true)) && 
				((me.ggUserdata.title != ""))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._map_pin_tt.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._map_pin_tt.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._map_pin_tt.style[domTransition]='left 0s, top 0s, opacity 500ms ease 0ms';
				if (me._map_pin_tt.ggCurrentLogicStateAlpha == 0) {
					me._map_pin_tt.style.visibility=me._map_pin_tt.ggVisible?'inherit':'hidden';
					me._map_pin_tt.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._map_pin_tt.style.opacity == 0.0) { me._map_pin_tt.style.visibility="hidden"; } }, 505);
					me._map_pin_tt.style.opacity=0;
				}
			}
		}
		me._map_pin_tt.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._map_pin.appendChild(me._map_pin_tt);
	};
	function SkinCloner_thumbnail_cloner_Class(nodeId, parentScope,ggParent,parameter) {
		var me=this;
		var hs='';
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.__div=document.createElement('div');
		me.__div.setAttribute('style','position: absolute;width: 96px; height: 62px; visibility: inherit; overflow: visible;');
		me.__div.style.left=parameter.left;
		me.__div.style.top=parameter.top;
		me.__div.ggIsActive = function() {
			return player.getCurrentNode()==me.ggNodeId;
		}
		me.__div.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		el=me._thumbnail_nodeimage=document.createElement('div');
		els=me._thumbnail_nodeimage__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/thumbnail_nodeimage_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="thumbnail_nodeImage";
		el.ggParameter={ rx:0,ry:0,a:0,sx:0.62,sy:0.58 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='height : 90px;';
		hs+='left : -24px;';
		hs+='position : absolute;';
		hs+='top : -16px;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		el.style[domTransform]=parameterToTransform(el.ggParameter);
		me._thumbnail_nodeimage.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._thumbnail_nodeimage.ggUpdatePosition=function (useTransition) {
		}
		me.__div.appendChild(me._thumbnail_nodeimage);
		el=me._thumbnail_active=document.createElement('div');
		el.ggId="thumbnail active";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_rectangle ";
		el.ggType='rectangle';
		hs ='';
		hs+='border : 3px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 51px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 85px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._thumbnail_active.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_active.logicBlock_bordercolor = function() {
			var newLogicStateBorderColor;
			if (
				((me._thumbnail_active.ggIsActive() == true))
			)
			{
				newLogicStateBorderColor = 0;
			}
			else if (
				((me.elementMouseOver['thumbnail_active'] == true))
			)
			{
				newLogicStateBorderColor = 1;
			}
			else {
				newLogicStateBorderColor = -1;
			}
			if (me._thumbnail_active.ggCurrentLogicStateBorderColor != newLogicStateBorderColor) {
				me._thumbnail_active.ggCurrentLogicStateBorderColor = newLogicStateBorderColor;
				me._thumbnail_active.style[domTransition]='border-color 0s';
				if (me._thumbnail_active.ggCurrentLogicStateBorderColor == 0) {
					me._thumbnail_active.style.borderColor="rgba(192,192,192,1)";
				}
				else if (me._thumbnail_active.ggCurrentLogicStateBorderColor == 1) {
					me._thumbnail_active.style.borderColor="rgba(192,192,192,1)";
				}
				else {
					me._thumbnail_active.style.borderColor="rgba(0,0,0,1)";
				}
			}
		}
		me._thumbnail_active.onclick=function (e) {
			if (
				(
					((me._thumbnail_active.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
		}
		me._thumbnail_active.onmouseover=function (e) {
			me.elementMouseOver['thumbnail_active']=true;
			me._thumbnail_title.logicBlock_alpha();
			me._checkmark_tick.logicBlock_alpha();
			me._thumbnail_active.logicBlock_bordercolor();
		}
		me._thumbnail_active.onmouseout=function (e) {
			me.elementMouseOver['thumbnail_active']=false;
			me._thumbnail_title.logicBlock_alpha();
			me._checkmark_tick.logicBlock_alpha();
			me._thumbnail_active.logicBlock_bordercolor();
		}
		me._thumbnail_active.ontouchend=function (e) {
			me.elementMouseOver['thumbnail_active']=false;
			me._thumbnail_title.logicBlock_alpha();
			me._checkmark_tick.logicBlock_alpha();
			me._thumbnail_active.logicBlock_bordercolor();
		}
		me._thumbnail_active.ggUpdatePosition=function (useTransition) {
		}
		el=me._thumbnail_title=document.createElement('div');
		els=me._thumbnail_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="thumbnail_title";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 51px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 85px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 85px;';
		hs+='height: 51px;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.784314);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._thumbnail_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._thumbnail_title.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['thumbnail_active'] == true)) && 
				((me.ggUserdata.title != "")) && 
				((player.getVariableValue('opt_thumbnail_menu_tooltip_1') == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._thumbnail_title.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._thumbnail_title.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._thumbnail_title.style[domTransition]='opacity 500ms ease 0ms';
				if (me._thumbnail_title.ggCurrentLogicStateAlpha == 0) {
					me._thumbnail_title.style.visibility=me._thumbnail_title.ggVisible?'inherit':'hidden';
					me._thumbnail_title.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._thumbnail_title.style.opacity == 0.0) { me._thumbnail_title.style.visibility="hidden"; } }, 505);
					me._thumbnail_title.style.opacity=0;
				}
			}
		}
		me._thumbnail_title.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._thumbnail_active.appendChild(me._thumbnail_title);
		el=me._checkmark_tick=document.createElement('div');
		els=me._checkmark_tick__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgaWQ9IkxheWVyXzEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IC0yNDAgMzMyIDEzMCAxMzA7IiB2aWV3Qm94PSItMjQwIDMzMiAxMzAgMTMwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdm'+
			'ciIHg9IjBweCIgeT0iMHB4Ij4KIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4ZDsKCS5zdDB7ZmlsbDojMDAwMDAwO30mI3hkOwoJLnN0MXtmaWxsOiNGRkZGRkY7fSYjeGQ7Cjwvc3R5bGU+CiA8ZyBpZD0iTGF5ZXJfMV8xXyIvPgogPGcgaWQ9IkxheWVyXzIiPgogIDxwYXRoIGQ9Ik0tMTIyLjEsMzQxLjVoLTEwNS44Yy0xLjQsMC0yLjYsMS4xLTIuNiwyLjZ2MTA1LjhjMCwxLjQsMS4xLDIuNiwyLjYsMi42aDEwNS44YzEuNCwwLDIuNi0xLjEsMi42LTIuNlYzNDQuMSYjeGQ7JiN4YTsmI3g5OyYjeDk7Qy0xMTkuNiwzNDIuNy0xMjAuNywzNDEuNS0xMjIuMSwzNDEuNXogTS0xMzIuOCwzODEu'+
			'N2wtNTAuOCw1MC44Yy0wLjMsMC4zLTAuOCwwLjUtMS4yLDAuNWMtMC41LDAtMC45LTAuMS0xLjMtMC41bC0zMS43LTMxLjgmI3hkOyYjeGE7JiN4OTsmI3g5O2MtMC43LTAuNy0wLjctMS43LDAtMi40bDEyLjUtMTIuNWMwLjctMC43LDEuNy0wLjcsMi40LDBsMTgsMThsMzcuMS0zNy4xYzAuNy0wLjcsMS43LTAuNywyLjQsMGwxMi41LDEyLjUmI3hkOyYjeGE7JiN4OTsmI3g5O0MtMTMyLjEsMzc5LjktMTMyLjEsMzgxLTEzMi44LDM4MS43eiIgY2xhc3M9InN0MCIvPgogIDxwYXRoIGQ9Ik0tMTQ3LjcsMzY2LjhsLTM3LjEsMzcuMWwtMTgtMThjLTAuNy0wLjctMS43LTAuNy0yLjQsMGwtMTIuNS'+
			'wxMi41Yy0wLjcsMC43LTAuNywxLjcsMCwyLjRsMzEuNywzMS44JiN4ZDsmI3hhOyYjeDk7JiN4OTtjMC4zLDAuMywwLjgsMC41LDEuMywwLjVjMC40LDAsMC45LTAuMiwxLjItMC41bDUwLjgtNTAuOWMwLjctMC43LDAuNy0xLjcsMC0yLjRsLTEyLjUtMTIuNUMtMTQ1LjksMzY2LjEtMTQ3LDM2Ni4xLTE0Ny43LDM2Ni44eiIgY2xhc3M9InN0MSIvPgogPC9nPgo8L3N2Zz4K';
		me._checkmark_tick__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="checkmark_tick";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 19px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : 1px;';
		hs+='visibility : hidden;';
		hs+='width : 19px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._checkmark_tick.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._checkmark_tick.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.nodeVisited(me._checkmark_tick.ggElementNodeId()) == true)) || 
				((me._checkmark_tick.ggIsActive() == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._checkmark_tick.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._checkmark_tick.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._checkmark_tick.style[domTransition]='opacity 500ms ease 0ms';
				if (me._checkmark_tick.ggCurrentLogicStateVisible == 0) {
					me._checkmark_tick.style.visibility=(Number(me._checkmark_tick.style.opacity)>0||!me._checkmark_tick.style.opacity)?'inherit':'hidden';
					me._checkmark_tick.ggVisible=true;
				}
				else {
					me._checkmark_tick.style.visibility="hidden";
					me._checkmark_tick.ggVisible=false;
				}
			}
		}
		me._checkmark_tick.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['thumbnail_active'] == true)) && 
				((me.ggUserdata.title != ""))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._checkmark_tick.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._checkmark_tick.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._checkmark_tick.style[domTransition]='opacity 500ms ease 0ms';
				if (me._checkmark_tick.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._checkmark_tick.style.opacity == 0.0) { me._checkmark_tick.style.visibility="hidden"; } }, 505);
					me._checkmark_tick.style.opacity=0;
				}
				else {
					me._checkmark_tick.style.visibility=me._checkmark_tick.ggVisible?'inherit':'hidden';
					me._checkmark_tick.style.opacity=1;
				}
			}
		}
		me._checkmark_tick.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnail_active.appendChild(me._checkmark_tick);
		me.__div.appendChild(me._thumbnail_active);
	};
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	me._screentint.logicBlock_alpha();
	me._loading_multires.logicBlock_visible();
	me._thumbnail_hide_button.logicBlock_alpha();
	me._thumbnail_show_button.logicBlock_alpha();
	me._thumbnail_menu.logicBlock_alpha();
	player.addListener('sizechanged', function(args) { me._screentint.logicBlock_alpha(); });
	player.addListener('tilesready', function(args) { me._loading_multires.logicBlock_visible(); });
	player.addListener('tilesrequested', function(args) { me._loading_multires.logicBlock_visible(); });
	player.addListener('changenode', function(args) { me._loading_multires.logicBlock_visible();me._screentint.logicBlock_alpha();me._thumbnail_hide_button.logicBlock_alpha();me._thumbnail_show_button.logicBlock_alpha();me._thumbnail_menu.logicBlock_alpha(); });
	player.addListener('varchanged_opt_loader_mulires', function(args) { me._loading_multires.logicBlock_visible(); });
	player.addListener('varchanged_vis_image_popup', function(args) { me._screentint.logicBlock_alpha(); });
	player.addListener('varchanged_vis_info_popup', function(args) { me._screentint.logicBlock_alpha(); });
	player.addListener('varchanged_vis_video_popup_file', function(args) { me._screentint.logicBlock_alpha(); });
	player.addListener('varchanged_vis_video_popup_url', function(args) { me._screentint.logicBlock_alpha(); });
	player.addListener('varchanged_vis_video_popup_vimeo', function(args) { me._screentint.logicBlock_alpha(); });
	player.addListener('varchanged_vis_video_popup_youtube', function(args) { me._screentint.logicBlock_alpha(); });
	player.addListener('varchanged_vis_userdata', function(args) { me._screentint.logicBlock_alpha(); });
	player.addListener('varchanged_vis_website', function(args) { me._screentint.logicBlock_alpha(); });
	player.addListener('varchanged_vis_thumbnail_menu_mobile', function(args) { me._screentint.logicBlock_alpha(); });
	player.addListener('varchanged_vis_thumbnail_menu_auto_hide', function(args) { me._screentint.logicBlock_alpha(); });
	player.addListener('varchanged_vis_thumbnail_menu_1', function(args) { me._thumbnail_hide_button.logicBlock_alpha();me._thumbnail_show_button.logicBlock_alpha();me._thumbnail_menu.logicBlock_alpha(); });
	player.addListener('changenode', function(args) { me._thumbnail_cloner.callChildLogicBlocks_changenode(); });
	player.addListener('mouseover', function(args) { me._thumbnail_cloner.callChildLogicBlocks_mouseover(); });
	player.addListener('mouseover', function(args) { me._thumbnail_cloner.callChildLogicBlocks_mouseover(); });
	player.addListener('changenode', function(args) { me._thumbnail_cloner.callChildLogicBlocks_active(); });
	player.addListener('changevisitednodes', function(args) { me._thumbnail_cloner.callChildLogicBlocks_changevisitednodes(); });
	player.addListener('activehotspotchanged', function(args) { me._thumbnail_cloner.callChildLogicBlocks_activehotspotchanged(); });
	player.addListener('varchanged_opt_thumbnail_menu_tooltip_1', function(args) { me._thumbnail_cloner.callChildLogicBlocks_varchanged_opt_thumbnail_menu_tooltip_1(); });
	player.addListener('changenode', function(args) { me._map_1.callChildLogicBlocksHotspot_map_pin_changenode(); });
	player.addListener('configloaded', function(args) { me._map_1.callChildLogicBlocksHotspot_map_pin_configloaded(); });
	player.addListener('mouseover', function(args) { me._map_1.callChildLogicBlocksHotspot_map_pin_mouseover(); });
	player.addListener('mouseover', function(args) { me._map_1.callChildLogicBlocksHotspot_map_pin_mouseover(); });
	player.addListener('changenode', function(args) { me._map_1.callChildLogicBlocksHotspot_map_pin_active(); });
	player.addListener('hastouch', function(args) { me._map_1.callChildLogicBlocksHotspot_map_pin_hastouch(); });
	player.addListener('activehotspotchanged', function(args) { me._map_1.callChildLogicBlocksHotspot_map_pin_activehotspotchanged(); });
	player.addListener('sizechanged', function(args) { me.callChildLogicBlocksHotspot_ht_node_sizechanged(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_ht_node_changenode(); });
	player.addListener('configloaded', function(args) { me.callChildLogicBlocksHotspot_ht_node_configloaded(); });
	player.addListener('mouseover', function(args) { me.callChildLogicBlocksHotspot_ht_node_mouseover(); });
	player.addListener('mouseover', function(args) { me.callChildLogicBlocksHotspot_ht_node_mouseover(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_ht_node_active(); });
	player.addListener('changevisitednodes', function(args) { me.callChildLogicBlocksHotspot_ht_node_changevisitednodes(); });
	player.addListener('activehotspotchanged', function(args) { me.callChildLogicBlocksHotspot_ht_node_activehotspotchanged(); });
	player.addListener('varchanged_opt_3d_preview', function(args) { me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_3d_preview(); });
	player.addListener('hotspotsremoved', function(args) { me.removeSkinHotspots(); });
	me.skinTimerEvent();
};