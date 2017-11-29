/**
 * @package    AcyMailing for Joomla!
 * @version    5.2.0
 * @author     acyba.com
 * @copyright  (C) 2009-2016 ACYBA S.A.R.L. All rights reserved.
 * @license    GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 */

function submitacymailingform(task, formName){
    var varform = document[formName];
    var filterEmail = /^([a-z0-9_'&\.\-\+=])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,10})+$/i;

    if(!varform.elements){
        if(varform[0].elements['user[email]'] && varform[0].elements['user[email]'].value && filterEmail.test(varform[0].elements['user[email]'].value)){
            varform = varform[0];
        }else{
            varform = varform[varform.length - 1];
        }
    }

    if(task != 'optout'){
        nameField = varform.elements['user[name]'];
        if(nameField && (( typeof acymailing != 'undefined' && (nameField.value == acymailing['NAMECAPTION'] || (typeof acymailing['excludeValues' + formName] != 'undefined' && typeof acymailing['excludeValues' + formName]['name'] != 'undefined' && nameField.value == acymailing['excludeValues' + formName]['name'])) ) || nameField.value.replace(/ /g, "").length < 2)){
            if(typeof acymailing != 'undefined'){
                alert(acymailing['NAME_MISSING']);
            }
            nameField.className = nameField.className + ' invalid';
            return false;
        }
    }

    var emailField = varform.elements['user[email]'];
    if(emailField){
        if(typeof acymailing == 'undefined' || emailField.value != acymailing['EMAILCAPTION']) emailField.value = emailField.value.replace(/ /g, "");
        if(!emailField || (typeof acymailing != 'undefined' && (emailField.value == acymailing['EMAILCAPTION'] || (typeof acymailing['excludeValues' + formName] != 'undefined' && typeof acymailing['excludeValues' + formName]['email'] != 'undefined' && emailField.value == acymailing['excludeValues' + formName]['email']))) || !filterEmail.test(emailField.value)){
            if(typeof acymailing != 'undefined'){
                alert(acymailing['VALID_EMAIL']);
            }
            emailField.className = emailField.className + ' invalid';
            return false;
        }
    }

    if(varform.elements['hiddenlists'].value.length < 1){
        var listschecked = false;
        var alllists = varform.elements['subscription[]'];
        if(alllists && (typeof alllists.value == 'undefined' || alllists.value.length == 0)){
            for(b = 0; b < alllists.length; b++){
                if(alllists[b].checked) listschecked = true;
            }
            if(!listschecked){
                alert(acymailing['NO_LIST_SELECTED']);
                return false;
            }
        }
    }


    if(task != 'optout' && typeof acymailing != 'undefined'){
        if(typeof acymailing['reqFields' + formName] != 'undefined' && acymailing['reqFields' + formName].length > 0){

            for(var i = 0; i < acymailing['reqFields' + formName].length; i++){
                elementName = 'user[' + acymailing['reqFields' + formName][i] + ']';
                elementToCheck = varform.elements[elementName];
                if(elementToCheck){
                    var isValid = false;
                    if(typeof elementToCheck.value != 'undefined'){
                        if(elementToCheck.value == ' ' && typeof varform[elementName + '[]'] != 'undefined'){
                            if(varform[elementName + '[]'].checked){
                                isValid = true;
                            }else{
                                for(var a = 0; a < varform[elementName + '[]'].length; a++){
                                    if((varform[elementName + '[]'][a].checked || varform[elementName + '[]'][a].selected) && varform[elementName + '[]'][a].value.length > 0) isValid = true;
                                }
                            }
                        }else{
                            if(elementToCheck.value.replace(/ /g, "").length > 0){
                                if(typeof acymailing['excludeValues' + formName] == 'undefined' || typeof acymailing['excludeValues' + formName][acymailing['reqFields' + formName][i]] == 'undefined' || acymailing['excludeValues' + formName][acymailing['reqFields' + formName][i]] != elementToCheck.value) isValid = true;
                            }
                        }
                    }else{
                        for(var a = 0; a < elementToCheck.length; a++){
                            if(elementToCheck[a].checked && elementToCheck[a].value.length > 0) isValid = true;
                        }
                    }
                    if((elementToCheck.length >= 1 && (elementToCheck[0].parentElement.parentElement.style.display == 'none' || elementToCheck[0].parentElement.parentElement.parentElement.style.display == 'none')) || (typeof elementToCheck.length == 'undefined' && (elementToCheck.parentElement.parentElement.style.display == 'none' || elementToCheck.parentElement.parentElement.parentElement.style.display == 'none'))){
                        isValid = true;
                    }
                    if(!isValid){
                        elementToCheck.className = elementToCheck.className + ' invalid';
                        alert(acymailing['validFields' + formName][i]);
                        return false;
                    }
                }else{
                    if((varform.elements[elementName + '[day]'] && varform.elements[elementName + '[day]'].value < 1) || (varform.elements[elementName + '[month]'] && varform.elements[elementName + '[month]'].value < 1) || (varform.elements[elementName + '[year]'] && varform.elements[elementName + '[year]'].value < 1902)){
                        if(varform.elements[elementName + '[day]'] && varform.elements[elementName + '[day]'].value < 1) varform.elements[elementName + '[day]'].className = varform.elements[elementName + '[day]'].className + ' invalid';
                        if(varform.elements[elementName + '[month]'] && varform.elements[elementName + '[month]'].value < 1) varform.elements[elementName + '[month]'].className = varform.elements[elementName + '[month]'].className + ' invalid';
                        if(varform.elements[elementName + '[year]'] && varform.elements[elementName + '[year]'].value < 1902) varform.elements[elementName + '[year]'].className = varform.elements[elementName + '[year]'].className + ' invalid';
                        alert(acymailing['validFields' + formName][i]);
                        return false;
                    }

                    if((varform.elements[elementName + '[country]'] && varform.elements[elementName + '[country]'].value < 1) || (varform.elements[elementName + '[num]'] && (varform.elements[elementName + '[num]'].value < 3 || (typeof acymailing['excludeValues' + formName] != 'undefined' && typeof acymailing['excludeValues' + formName][acymailing['reqFields' + formName][i]] != 'undefined' && acymailing['excludeValues' + formName][acymailing['reqFields' + formName][i]] == varform.elements[elementName + '[num]'].value)))){
                        if(varform.elements[elementName + '[country]'] && varform.elements[elementName + '[country]'].value < 1) varform.elements[elementName + '[country]'].className = varform.elements[elementName + '[country]'].className + ' invalid';
                        if(varform.elements[elementName + '[num]'] && (varform.elements[elementName + '[num]'].value < 3 || (typeof acymailing['excludeValues' + formName] != 'undefined' && typeof acymailing['excludeValues' + formName][acymailing['reqFields' + formName][i]] != 'undefined' && acymailing['excludeValues' + formName][acymailing['reqFields' + formName][i]] == varform.elements[elementName + '[num]'].value))) varform.elements[elementName + '[num]'].className = varform.elements[elementName + '[num]'].className + ' invalid';
                        alert(acymailing['validFields' + formName][i]);
                        return false;
                    }
                }
            }
        }

        if(typeof acymailing != 'undefined' && typeof acymailing['checkFields' + formName] != 'undefined' && acymailing['checkFields' + formName].length > 0){
            for(var i = 0; i < acymailing['checkFields' + formName].length; i++){
                elementName = 'user[' + acymailing['checkFields' + formName][i] + ']';
                elementtypeToCheck = acymailing['checkFieldsType' + formName][i];
                elementToCheck = varform.elements[elementName].value;
                if(typeof acymailing['excludeValues' + formName] != 'undefined'){
                    var excludedValues = acymailing['excludeValues' + formName][acymailing['checkFields' + formName][i]];
                    if(typeof excludedValues != 'undefined' && elementToCheck == excludedValues){
                        continue;
                    }
                }
                switch(elementtypeToCheck){
                    case 'number':
                        myregexp = new RegExp('^[0-9]*$');
                        break;
                    case 'letter':
                        myregexp = new RegExp('^[A-Za-z\u00C0-\u017F ]*$');
                        break;
                    case 'letnum':
                        myregexp = new RegExp('^[0-9a-zA-Z\u00C0-\u017F ]*$');
                        break;
                    case 'regexp':
                        myregexp = new RegExp(acymailing['checkFieldsRegexp' + formName][i]);
                        break;
                }
                if(!myregexp.test(elementToCheck)){
                    alert(acymailing['validCheckFields' + formName][i]);
                    return false;
                }
            }
        }
    }

    var captchaField = varform.elements['acycaptcha'];
    if(captchaField){
        if(captchaField.value.length < 1){
            if(typeof acymailing != 'undefined'){
                alert(acymailing['CAPTCHA_MISSING']);
            }
            captchaField.className = captchaField.className + ' invalid';
            return false;
        }
    }

    if(task != 'optout'){
        var termsandconditions = varform.terms;
        if(termsandconditions && !termsandconditions.checked){
            if(typeof acymailing != 'undefined'){
                alert(acymailing['ACCEPT_TERMS']);
            }
            termsandconditions.className = termsandconditions.className + ' invalid';
            return false;
        }

        if(typeof acymailing != 'undefined' && typeof acymailing['excludeValues' + formName] != 'undefined'){
            for(var fieldName in acymailing['excludeValues' + formName]){
                if(!acymailing['excludeValues' + formName].hasOwnProperty(fieldName)) continue;
                if(!varform.elements['user[' + fieldName + ']'] || varform.elements['user[' + fieldName + ']'].value != acymailing['excludeValues' + formName][fieldName]) continue;

                varform.elements['user[' + fieldName + ']'].value = '';
            }
        }
    }

    if(typeof ga != 'undefined' && task != 'optout'){
        ga('send', 'pageview', 'subscribe');
    }else if(typeof ga != 'undefined'){
        ga('send', 'pageview', 'unsubscribe');
    }

    taskField = varform.task;
    taskField.value = task;

    if(!varform.elements['ajax'] || !varform.elements['ajax'].value || varform.elements['ajax'].value == '0'){
        varform.submit();
        return false;
    }

    if(window.jQuery){
        var form = jQuery('#' + formName);
        form.addClass('acymailing_module_loading');
        form.css("filter:", "alpha(opacity=50)");
        form.css("-moz-opacity", "0.5");
        form.css("-khtml-opacity", "0.5");
        form.css("opacity", "0.5");
        data = form.serialize();
        jQuery.ajax({
            url: document.getElementById(formName).action, data: data, type: 'POST', async: true, success: function(response){
                response = JSON.parse(response);
                acymailingDisplayAjaxResponseJQuery(unescape(response.message), response.type, formName);
            }, error: function(){
                acymailingDisplayAjaxResponseJQuery('Ajax Request Failure', 'error', formName);
            }
        });

    }else{
        try{
            var form = document.id(formName);
        }catch(err){
            var form = $(formName);
        }
        data = form.toQueryString();

        if(typeof Ajax == 'function'){
            new Ajax(form.action, {
                data: data, method: 'post', onRequest: function(){
                    form.addClass('acymailing_module_loading');
                    form.setStyle("filter:", "alpha(opacity=50)");
                    form.setStyle("-moz-opacity", "0.5");
                    form.setStyle("-khtml-opacity", "0.5");
                    form.setStyle("opacity", "0.5");
                }, onSuccess: function(response){
                    response = Json.evaluate(response);
                    acymailingDisplayAjaxResponseMootools(unescape(response.message), response.type, formName);
                }, onFailure: function(){
                    acymailingDisplayAjaxResponseMootools('Ajax Request Failure', 'error', formName);
                }
            }).request();
        }else{
            new Request.JSON({
                url: document.id(formName).action, data: data, method: 'post', onRequest: function(){
                    form.addClass('acymailing_module_loading');
                    form.setStyle("filter:", "alpha(opacity=50)");
                    form.setStyle("-moz-opacity", "0.5");
                    form.setStyle("-khtml-opacity", "0.5");
                    form.setStyle("opacity", "0.5");
                }, onSuccess: function(response){
                    acymailingDisplayAjaxResponseMootools(unescape(response.message), response.type, formName);
                }, onFailure: function(){
                    acymailingDisplayAjaxResponseMootools('Ajax Request Failure', 'error', formName);
                }
            }).send();
        }
    }

    return false;
}

function acymailingDisplayAjaxResponseJQuery(message, type, formName){
    var toggleButton = jQuery('#acymailing_togglemodule_' + formName);

    if(toggleButton && toggleButton.hasClass('acyactive')){
        var wrapper = toggleButton.parent().parent().children()[1];
        jQuery(wrapper).css('height', '');
    }
    ;

    var responseContainer = jQuery('#acymailing_fulldiv_' + formName + ' .responseContainer')[0];

    if(typeof responseContainer == 'undefined'){
        responseContainer = document.createElement('div');
        var fulldiv = jQuery('#acymailing_fulldiv_' + formName);
        fulldiv.prepend(responseContainer);
        oldContainerHeight = '0px';
    }else{
        oldContainerHeight = jQuery(responseContainer).css('height');
    }

    responseContainer.className = 'responseContainer';

    var form = jQuery('#' + formName);

    form.removeClass('acymailing_module_loading');

    responseContainer.innerHTML = message;

    if(type == 'success'){
        jQuery(responseContainer).addClass('acymailing_module_success');
    }else{
        jQuery(responseContainer).addClass('acymailing_module_error');
        form.css("filter:", "alpha(opacity=100)");
        form.css("-moz-opacity", "1");
        form.css("-khtml-opacity", "1");
        form.css("opacity", "1");
    }

    newContainerHeight = jQuery(responseContainer).css('height');

    if(type == 'success'){
        form.animate({
            'height': 0, 'opacity': 0
        });
    }

    jQuery(responseContainer).css({
        'height': oldContainerHeight, 'filter:': "alpha(opacity=0)", '-moz-opacity': 0, '-khtml-opacity': 0, 'opacity': 0
    });

    jQuery(responseContainer).animate({
        'height': newContainerHeight, 'opacity': 1
    });
}

function acymailingDisplayAjaxResponseMootools(message, type, formName){
    try{
        var toggleButton = document.id('acymailing_togglemodule_' + formName);
    }catch(err){
        var toggleButton = $('acymailing_togglemodule_' + formName);
    }

    if(toggleButton && toggleButton.hasClass('acyactive')){
        var wrapper = toggleButton.getParent().getParent().getChildren()[1];
        wrapper.setStyle('height', '');
    }
    ;

    try{
        var responseContainer = document.getElements('#acymailing_fulldiv_' + formName + ' .responseContainer')[0];
    }catch(err){
        var responseContainer = $$('#acymailing_fulldiv_' + formName + ' .responseContainer')[0];
    }

    if(typeof responseContainer == 'undefined'){
        responseContainer = new Element('div');
        try{
            var fulldiv = document.id('acymailing_fulldiv_' + formName);
        }catch(err){
            var fulldiv = $('acymailing_fulldiv_' + formName);
        }
        responseContainer.inject(fulldiv, 'top');
        oldContainerHeight = '0px';
    }else{
        oldContainerHeight = responseContainer.getStyle('height');
    }

    responseContainer.className = 'responseContainer';

    try{
        var form = document.id(formName);
    }catch(err){
        var form = $(formName);
    }
    form.removeClass('acymailing_module_loading');

    responseContainer.innerHTML = message;

    if(type == 'success'){
        responseContainer.addClass('acymailing_module_success');
    }else{
        responseContainer.addClass('acymailing_module_error');
        form.setStyle("filter:", "alpha(opacity=100)");
        form.setStyle("-moz-opacity", "1");
        form.setStyle("-khtml-opacity", "1");
        form.setStyle("opacity", "1");
    }

    newContainerHeight = responseContainer.getStyle('height');

    if(typeof Ajax == 'function'){
        if(type == 'success'){
            var myEffect = new Fx.Styles(form, {duration: 500, transition: Fx.Transitions.linear});
            myEffect.start({
                'height': [form.getSize().size.y, 0], 'opacity': [1, 0]
            });
        }

        try{
            responseContainer.setStyle('height', oldContainerHeight + 'px');
            responseContainer.setStyle("filter:", "alpha(opacity=0)");
            responseContainer.setStyle("-moz-opacity", "0");
            responseContainer.setStyle("-khtml-opacity", "0");
            responseContainer.setStyle("opacity", "0");
        }
        catch(e){
        }

        var myEffect2 = new Fx.Styles(responseContainer, {duration: 500, transition: Fx.Transitions.linear});
        myEffect2.start({
            'height': [oldContainerHeight, newContainerHeight], 'opacity': [0, 1]
        });

    }else // Mootools >= 1.2
    {
        if(type == 'success'){
            form.set('morph');
            form.morph({
                'height': '0px', 'opacity': 0
            });

            form.setStyles({
                'display': 'none'
            });
        }

        if(newContainerHeight != 'auto'){
            responseContainer.setStyles({
                'height': oldContainerHeight, 'opacity': 0
            });

            responseContainer.set('morph');
            responseContainer.morph({
                'height': newContainerHeight, 'opacity': 1
            });
        }
    }
}

