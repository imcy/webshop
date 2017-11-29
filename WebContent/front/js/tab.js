/**
 * ------------------------------------------------------------------------
 * JA Tabs plugin for Joomla 1.7.x
 * ------------------------------------------------------------------------
 * Copyright (C) 2004-2011 J.O.O.M Solutions Co., Ltd. All Rights Reserved.
 * @license - GNU/GPL, http://www.gnu.org/licenses/gpl.html
 * Author: J.O.O.M Solutions Co., Ltd
 * Websites: http://www.joomlart.com - http://www.joomlancers.com
 * ------------------------------------------------------------------------
 */
var wrap_W = 0;
var JATabs = new Class({
    initialize: function(element, options) {
        this.options = Object.append({
            position:			'top',
            width:				'100%',
            height:				'auto',
            skipAnim:			false,
            animType:			'animMoveHor',
            mouseType:			'mouseover',
            changeTransition:	Fx.Transitions.Pow.easeIn,
            duration:			1000,
            mouseOverClass:		'hover',
            activateOnLoad:		'first',
            useAjax: 			false,
            ajaxUrl: 			'',
            ajaxOptions: 		'get',
            ajaxLoadingText: 	'Loading...',
            fixheight :			 1,
            fixwidth :			 1,
            jaclass: '',
            siteroot:'',
            numbtab :			 0
        }, options || {});

        this.el = $(element);
        this.elid = element;

        this._W = this.el.offsetWidth.toInt();
        wrap_W = this._W;

        if(this.options.height=='auto'){
            this.options.fixheight = 0;
        }
        //tab jaclass
        if(typeOf(this.options.jaclass)=='string'){
            regex = /(\d*):([^,]*)/gi;
            var jaclass = [];
            while((result = regex.exec (this.options.jaclass)))
                jaclass[result[1]]=result[2];

            this.options.jaclass = jaclass;
        }

        //this._H = this.el.getParent().getStyle('height').toInt();
        this._H = this.el.getParent().offsetHeight.toInt();
        this.panels = $$('#' + this.elid + ' .ja-tab-content');
        this.panelwrap = this.el.getElement('.ja-tab-panels-'+this.options.position);

        this.divtitles = $$('#' + this.elid + ' .ja-tabs-title-'+this.options.position);

        this.titles = $$('#' + this.elid + ' div.ja-tabs-title-'+this.options.position+' ul li');

        this.boxTab_H = this.el.getElement('ul.ja-tabs-title').offsetHeight + this.el.getElement('ul.ja-tabs-title').offsetTop;

        //add
        if (this.panels.length <= 1)
        {
            this.panels.setStyle ('position', 'relative');
            return;
        }

        this.titles.each(function(item,i) {
            var color = item.getElement('h3').className;
            if (!color) color=this.options.jaclass[i];
            item._color = '';
            if (color) {
                item.addClass (color);
                item._color = color;
            }

            item.addEvent(this.options.mouseType, function(){
                if (item.className.indexOf('active') != -1)	return;

                item.removeClass(this.options.mouseOverClass);
                this.activate(item,  this.options.skipAnim);
            }.bind(this)
            );

            item.addEvent('mouseover', function() {
                if(item != this.activeTitle)
                {
                    item.addClass(this.options.mouseOverClass);
                }
            }.bind(this));

            item.addEvent('mouseout', function() {
                if(item != this.activeTitle)
                {
                    item.removeClass(this.options.mouseOverClass);

                }
            }.bind(this));
        }.bind(this));


        this.titles[0].addClass('first');
        this.titles[this.titles.length-1].addClass('last');
        this.titles[this.options.numbtab].addClass ('active');

        //height of title (for left, right, bottom)
        //this.tabHeight = $E('.ja-tabs-title-'+this.options.position, this.el);
        this.tabHeight = this.el.getElement('.ja-tabs-title-'+this.options.position);

        //Panel contents
        this.minHeight = 0;
        /*if((this.options.position=='left') || (this.options.position=='right')){

         this.minHeight = this.tabHeight.offsetHeight;
         if (!this.options.fixheight ){
         this.divtitles.setStyle ('height', this.minHeight);
         }
         }	*/

        /* Set height for DIV tabswrap and position Top*/
        if (!this.options.fixheight )
        {
            this.panelwrap.setStyle ('height', this.minHeight);
        }
        else if((this.options.position!='left') && (this.options.position!='right')){
            this.panelwrap.setStyle ('height', this._H - this.titles[0].offsetHeight.toInt());
        }

        /* Set set width for left/right tabs*/
        if((this.options.position=='left') || (this.options.position=='right')){
            var maxw = eval(this._W - this.divtitles[0].offsetWidth.toInt()-45);
            //var maxw = eval(this._W - 10);
            this.panelwrap.setStyle ('width', maxw);
        }

        this.titles.each(function(el,i){
            el.panel = this.panels[i];
            el.panel._idx = i;
        },this);

        if (this.options.skipAnim) this.options.animType = 'animNone';

        //Set default type for animation if needed
        if ((eval('typeof '+this.options.animType) == 'undefined') || (eval('typeOf ('+this.options.animType+')') != 'class')){
            this.options.animType = 'animFade';
        }

        //Create animation object
        this.anim = eval ('new '+this.options.animType + '(this)');

        if(this.options.activateOnLoad != 'none')
        {
            if(this.options.activateOnLoad == 'first')
            {
                this.activate(this.titles[this.options.numbtab],  true);
            }
            else
            {
                this.activate(this.options.activateOnLoad, true);
            }
        }

        if (window.ie) this.firstload = true;
        window.addEvent('resize', this.resize.bind(this));

    },

    resize: function () {

        /* Set set width for left/right tabs*/
        this._W = this.el.offsetWidth;

        maxW = this._W;

        if((this.options.position=='left') || (this.options.position=='right')){
            this.minHeight = this.boxTab_H;
            if (!this.options.fixheight ){
                //this.divtitles.setStyle ('height', Math.max(this.boxTab_H,this.activeTitle.panel.offsetHeight+10));
            }
            maxW = eval(this._W - this.divtitles[0].offsetWidth.toInt() -10);
            //maxW = this._W - 10;
            this.panelwrap.setStyle('width', maxW);
        }
        else{
            this.panelwrap.setStyle('height', Math.max(this.minHeight,this.activeTitle.panel.offsetHeight));
        }
        if(wrap_W!=this._W){this.anim.reposition();};
    },

    activate: function(tab, skipAnim){
        if (this.options.useAjax) this.cancelAjax();

        if (this.options.useAjax && !tab.loaded) {
            this._getContent(tab);
            this.activeTitle = tab;
            return;
        }
        var $defined = function(obj){
            return (obj != undefined);
        };
        if(! $defined(skipAnim))
        {
            skipAnim = false;
        }
        if(typeOf(tab) == 'string')
        {
            myTab = $$('#' + this.elid + ' ul li').filterByAttribute('title', '=', tab)[0];
            tab = myTab;
        }

        if(typeOf(tab) == 'element')
        {
            //add 5
            var newTab = tab.panel;
            var curTab = this.activePanel;
            this.activePanel = newTab;

            this.anim.move (curTab, newTab, skipAnim);

            this.titles.removeClass('active');
            tab.addClass('active');

            if (this.activeTitle && this.activeTitle._color) this.panelwrap.removeClass (this.activeTitle._color);
            if (tab._color) this.panelwrap.addClass (tab._color);

            this.activeTitle = tab;

            if (!this.options.fixheight) {
                if (skipAnim) {
                    this.panelwrap.setStyle('height', Math.max(this.minHeight, this.activePanel.offsetHeight));
                    if((this.options.position=='left') || (this.options.position=='right')){
                        this.tabHeight.setStyle('height', Math.max(this.minHeight, this.panelwrap.offsetHeight, this.boxTab_H));
                    }
                } else {
                    if (!this.mainfx) this.mainfx = new Fx.Tween(this.panelwrap, {duration:this.options.duration});
                    this.mainfx.start('height',Math.max(this.minHeight,this.activePanel.offsetHeight));

                    if((this.options.position=='left') || (this.options.position=='right')){
                        if(!this.changeEffectTitle) this.changeEffectTitle = new Fx.Tween(this.tabHeight, {duration: this.options.duration});
                        this.changeEffectTitle.start('height',  Math.max(this.activePanel.offsetHeight, this.boxTab_H));

                    }
                }
            }
            else{
                this.panelwrap.setStyle('height', this.options.height);
                if((this.options.position=='left') || (this.options.position=='right')){
                    this.tabHeight.setStyle('height', this.options.height);
                }
            }
        }

    },
    cancelAjax: function() {
        if (this.loadingTab) {
            this.tabRequest.cancel();
            if(this.loadingTab.imgLoading!=null)
                this.loadingTab.imgLoading.destroy();
            this.tabRequest = null;
            this.loadingTab = null;
        }
    },

    _getContent: function(tab){

        this.loadingTab = tab;
        var ids = this.options.ids.split(',');

        if(!ids.length || ids[tab.panel._idx]==undefined) return '';

        var h3 = $(this.loadingTab.getElementsByTagName('H3')[0]);
        var imgloading = new Element('img', {'src': this.options.siteroot+'plugins/system/jatabs/jatabs/loading.gif','width': 13});
        if (this.options.position=='right') imgloading.inject(h3,'top');
        else imgloading.inject(h3);
        this.loadingTab.imgLoading = imgloading;
        this.tabRequest = new Request.JSON({
            url: this.options.ajaxUrl+ '&tab=' + ids[tab.panel._idx],
            method:this.options.ajaxOptions,
            onSuccess: this.update.bind(this)

        }).get();

    },
    update: function (result) {
        if (!this.loadingTab) return;
        this.loadingTab.panel.subpanel = this.loadingTab.panel.getElement('.ja-tab-subcontent');
        this.loadingTab.panel.subpanel.innerHTML = result.text;
        this.loadingTab.loaded = true;
        this.tabRequest = null;
        var tab = this.loadingTab;
        this.loadingTab = null;

        var images = tab.panel.subpanel.getElements ('img');

        tab.switched = false;
        /**/
        if (images && images.length && !tab.imgLoaded) {
            var imgs = [];
            images.each (function (image) {imgs.push(image.src)});
            if (imgs.length) {
                new Asset.images(imgs, {
                    onComplete: function(){
                        this.switchTab(tab);
                    }.bind(this)

                });

                tab.imgLoaded = true;

                //call this start if cannot load image after sometime
                //this.switchTab.delay (3000, this, tab);
                return ;
            }
        }
        this.switchTab (tab);
    },

    switchTab: function (tab) {
        if (tab.switched) return;
        tab.switched = true;
        tab.imgLoading.destroy();

        this.anim.reposition();
        this.activate (tab);
    }
});
var animNone = new Class ({
    initialize: function(tabwrap) {
        this.options = tabwrap.options || {};
        this.tabwrap = tabwrap;

        this.tabwrap.panels.setStyle('position', 'absolute');
        this.tabwrap.panels.setStyle('left', 0);
    },

    move: function (curTab, newTab, skipAnim) {
        this.tabwrap.panels.setStyle('display', 'none');
        newTab.setStyle('display', 'block');
    },

    reposition: function() {

    }

});

var animFade = new Class ({
    initialize: function(tabwrap) {
        this.options = tabwrap.options || {};
        this.tabwrap = tabwrap;
        this.changeEffect = new Fx.Elements(this.tabwrap.panels, {duration: this.options.duration});
        this.tabwrap.panels.setStyles({'opacity':0,'width':'100%',"visibility":"hidden"});


    },

    move: function (curTab, newTab, skipAnim) {

        if(this.options.changeTransition != 'none' && skipAnim==false)
        {

            if (curTab)
            {
                curOpac = curTab.getStyle('opacity');
                var changeEffect = new Fx.Tween(curTab,  {duration: this.options.duration, transition: this.options.changeTransition});

                changeEffect.start('opacity', curOpac, 0).chain(function(){
                    curTab.setStyle("visibility",'hidden');
                });
            }

            curOpac = newTab.getStyle('opacity');
            var changeEffect = new Fx.Tween(newTab, {duration: this.options.duration, transition: this.options.changeTransition});
            //changeEffect.stop();
            changeEffect.start('opacity', curOpac, 1).chain(function(){
                newTab.setStyle('visibility','visible');

            });
        } else {
            if (curTab) curTab.setStyles({'opacity':0,'visibility':'hidden'});
            newTab.setStyles({'opacity':1,'visibility':'visible'});
        }
        this.tabwrap.panels.removeClass('active');
        newTab.addClass('active');
    },
    reposition: function() {
        if (this.tabwrap.activePanel) {
            //this.changeEffect.stop();

            for (var i=this.tabwrap.activePanel._idx-1;i>=0;i--) {
                this.tabwrap.panels[i].setStyle('opacity',0);
            }
            for (i=this.tabwrap.activePanel._idx+1;i<this.tabwrap.panels.length;i++) {
                this.tabwrap.panels[i].setStyle('opacity',0);
            }
        }
    }
});

var animMoveHor = new Class ({
    initialize: function(tabwrap) {
        this.options = tabwrap.options || {};
        this.tabwrap = tabwrap;
        this.changeEffect = new Fx.Elements(this.tabwrap.panels, {duration: this.options.duration});
        var left = 0;
        this.tabwrap.panels.each (function (panel) {
            panel.setStyle('left', left);
            left += panel.offsetWidth;
        });
        this.tabwrap.panels.setStyle('top', 0);
    },

    move: function (curTab, newTab, skipAnim) {
        if(this.options.changeTransition != 'none' && !skipAnim)
        {
            //this.changeEffect.stop();
            var obj = {};
            var offset = newTab.offsetLeft.toInt();
            i=0;

            this.tabwrap.panels.each(function(panel) {
                obj[i++] = {'left':[panel.offsetLeft.toInt(), panel.offsetLeft.toInt() - offset] };
            });

            this.changeEffect.start(obj);
        }
    },
    reposition: function() {
        if (this.tabwrap.activePanel) {
            //this.changeEffect.stop();
            var left = this.tabwrap.activePanel.offsetLeft;
            for (var i=this.tabwrap.activePanel._idx-1;i>=0;i--) {
                left -= this.tabwrap.panels[i].offsetWidth;
                this.tabwrap.panels[i].setStyle('left',left);
            }
            var left = this.tabwrap.activePanel.offsetLeft;
            for (i=this.tabwrap.activePanel._idx+1;i<this.tabwrap.panels.length;i++) {
                left += this.tabwrap.panels[i-1].offsetWidth;
                this.tabwrap.panels[i].setStyle('left',left);
            }
        }
    }
});

var animMoveVir = new Class ({
    initialize: function(tabwrap) {
        this.options = tabwrap.options || {};
        this.tabwrap = tabwrap;
        this.changeEffect = new Fx.Elements(this.tabwrap.panels, {duration: this.options.duration});
        var top = 0;
        this.tabwrap.panels.each (function (panel) {
            panel.setStyle('top', top);
            top += Math.max(panel.offsetHeight,  panel.getParent().getParent().offsetHeight, this.tabwrap.boxTab_H);
        }.bind(this));
        this.tabwrap.panels.setStyle('left', 0);
    },
    move: function (curTab, newTab, skipAnim) {
        if(this.options.changeTransition != 'none' && skipAnim==false)
        {
            var obj = {};
            var offset = newTab.offsetTop.toInt();
            i=0;
            this.tabwrap.panels.each(function(panel) {
                obj[i++] = {'top':[panel.offsetTop.toInt(), panel.offsetTop.toInt() - offset]};
            });
            this.changeEffect.start(obj);
        }
    },
    reposition: function() {
        if (this.tabwrap.activePanel) {
            //this.changeEffect.stop();
            var top = this.tabwrap.activePanel.offsetTop;
            for (var i=this.tabwrap.activePanel._idx-1;i>=0;i--) {
                top -= this.tabwrap.panels[i].offsetHeight;
                this.tabwrap.panels[i].setStyle('top',top);
            }
            var top = this.tabwrap.activePanel.offsetTop;
            for (i=this.tabwrap.activePanel._idx+1;i<this.tabwrap.panels.length;i++) {
                top += this.tabwrap.panels[i-1].offsetHeight;
                this.tabwrap.panels[i].setStyle('top',top);
            }
        }
    }
});