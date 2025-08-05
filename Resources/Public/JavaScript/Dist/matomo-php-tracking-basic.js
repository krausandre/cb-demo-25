// make sure getQueryParam function is available
if (typeof getQueryParam !== 'function') {
    function getQueryParam(name) {
        if (!name) return '';
        var url = window.location.href;
        var queryString = url.split('?');
        if (queryString[1] === undefined || queryString[1] === null || queryString[1].length == 0) return '';
        var params = queryString[1].split('&');
        if (params.length < 1) return '';
        var paramValue = '';
        for (let i = 0; i < params.length; i++) {
            var paramValuePair = params[i].split('=');
            if (paramValuePair[0] == name) {
                paramValue = paramValuePair[1];
                break;
            }
        }
        return paramValue;
    }
}

const formId = 9262706;

let formData = new FormData();
formData.append('id', formId);
formData.append('w', window.screen.availWidth);
formData.append('h', window.screen.availHeight);
formData.append('r', document.referrer);
formData.append('t', document.title);
formData.append('ag', navigator.userAgent);

if (getQueryParam('dimension1') !== '') {
    formData.append('d1', getQueryParam('dimension1'));
}

fetch(
    window.location.href,
    {
        method: 'POST',
        body: formData
    }
);

// helper functions
function mEvent(category, action, name, value) {
    var formData = new FormData();
    formData.append('id', formId);
    formData.append('A', 'e');
    formData.append('c', category);
    formData.append('a', action);
    formData.append('n', name);
    formData.append('v', value);
    fetch(
        window.location.href,
        {
            method: 'POST',
            body: formData
        }
    );
}

function mSearch(search, category = '', results = false) {
    var formData = new FormData();
    formData.append('id', formId);
    formData.append('A', 'S');
    formData.append('q', search);
    formData.append('c', category);
    formData.append('r', results);
    fetch(
        window.location.href,
        {
            method: 'POST',
            body: formData
        }
    );
}

function mDownload(url) {
    var formData = new FormData();
    formData.append('id', formId);
    formData.append('A', 'D');
    formData.append('u', url);
    fetch(
        window.location.href,
        {
            method: 'POST',
            body: formData
        }
    );
}

function mOutlink(url) {
    var formData = new FormData();
    formData.append('id', formId);
    formData.append('A', 'O');
    formData.append('u', url);
    fetch(
        window.location.href,
        {
            method: 'POST',
            body: formData
        }
    );
}

// function arrayValueInString
function arrayValueInString(array, string) {
    for (var i = 0; i < array.length; i++) {
        if (string.indexOf(array[i]) !== -1) {
            return true;
        }
    }
    return false;
}

// end helper functions

// add event listener to all links
document.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function (e) {
        if (link.href.indexOf(window.location.hostname) === -1) {
            mOutlink(link.href);
        }
        // list of file extensions
        var fileExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'zip', 'rar', '7z', 'tar', 'gz', 'txt', 'rtf', 'csv', 'ics', 'vcf', 'msi', 'psd', 'ai', 'eps', 'ps', 'log', 'key'];
        // if link is internal and has a download attribute or is a file extension in the list
        if (link.href.indexOf(window.location.hostname) !== -1 && (link.hasAttribute('download') || fileExtensions.indexOf(link.href.split('.').pop()) !== -1)) {
            mDownload(link.href);
        }
    });

    if (link.href.indexOf('tel:') > -1) { // link is a phone link
        link.addEventListener("click", function () {
            mEvent('Kontaktaufnahme', 'Telefon Link Klick', 'Telefonnummer ' + link.href.substring(4) + ' angerufen, Seite: ' + document.title);
        });
    }

    if (link.href.indexOf('mailto:') > -1 || (link.dataset.mailtoToken !== undefined && link.dataset.mailtoToken !== null && link.dataset.mailtoToken !== '')) { // link is an e-mail link
        link.addEventListener("click", function () {
            let mail = link.href.substring(7);
            if (link.dataset.mailtoToken !== undefined && link.dataset.mailtoToken !== null && link.dataset.mailtoToken !== '') {
                mail = link.innerText;
            }
            mEvent('Kontaktaufnahme', 'E-Mail Link Klick', 'E-Mail an ' + mail + ' gesendet, Seite: ' + document.title);
        });
    }

    var interestSignalTexts = ['anfordern', 'finden', 'sichern', 'jetzt buchen', 'online ansehen', 'konfigurator', 'bestellen', 'erfahren', 'kontakt']; // CTA link texts or text fragments toLowerCase, that shoes interest on click
    if (arrayValueInString(interestSignalTexts, link.text.toLocaleLowerCase())  // if link has an interest offering text
        && link.href.indexOf(document.location.origin) > -1)  // but only if it seems to be a internal link, not mail, not phone -> these should appeare in the contact category
    {
        console.log('Signal für Interesse: ' + link.text);
        link.addEventListener("click", function () {
            mEvent('Signal für Interesse', 'Mehr Infos Klick', 'Klick auf "' + link.text + '" auf Seite "' + document.title + '"');
        });
    }
});

// forms on a page
var contactFormsOnThisPage = document.querySelectorAll('form'); // get all forms
contactFormsOnThisPage.forEach(function (form) {
    if (form.id !== 'tx_indexedsearch' && form.id !== 'tx_indexedsearch_header') {
        form.addEventListener('submit', function () {
            mEvent('Kontaktaufnahme', 'Formular gesendet', 'Formular gesendet auf Seite: ' + document.title);
        });
    }
});

// Site Search
if (
    document.getElementById('tx-indexedsearch-searchbox-sword') !== null
    && document.getElementById('tx-indexedsearch-searchbox-sword') !== undefined
    && document.getElementById('tx-indexedsearch-searchbox-sword').value.length > 0
) {
    // reduce multiple processing:
    // -> Process only if it is the first page of the search results || OR || there is no pagination
    // though behind: if someone is browsing through the pagination, there are for every pageview a new site search event.
    if ((document.querySelectorAll('ul.tx-indexedsearch-browsebox')[0] !== undefined && document.querySelectorAll('ul.tx-indexedsearch-browsebox li')[0].querySelectorAll('strong') !== undefined)
        || document.querySelectorAll('ul.tx-indexedsearch-browsebox')[0] === undefined
    ) {
        var searchResultsCount = 0;
        if (document.querySelectorAll('p.numberOfResultsCount strong')[1] !== undefined) {
            searchResultsCount = parseInt(document.querySelectorAll('p.numberOfResultsCount strong')[1].innerText);
        }
        mSearch('trackSiteSearch',
            // Search keyword searched for
            '' + document.getElementById('tx-indexedsearch-searchbox-sword').value,
            // Search category selected in your search engine. If you do not need this, set to false
            "Standard",
            // Number of results on the Search results page. Zero indicates a 'No Result Search Keyword'. Set to false if you don't know
            searchResultsCount
        );
    }

}

// Error Page
if (document.title.indexOf('404') > -1) {
    var errorMsg = 'Fehlerseite gefunden: ' + document.location.href;
    if (document.referrer) errorMsg = errorMsg + ' | Besuch kam von: ' + document.referrer;
    else errorMsg = errorMsg + ' | Quelle unbekannt bzw. direkter Aufruf';
    mEvent('Fehlerseite', 'Fehlerseite aufgerufen', errorMsg);
}

function mDisable() {
    disableLink = document.getElementById('mDisableLink').style.display = 'none';
    enableLink = document.getElementById('mEnableLink').style.display = 'inline-block';
    document.cookie = "m_off=true";
}

function mEnable() {
    disableLink = document.getElementById('mDisableLink').style.display = 'inline-block';
    enableLink = document.getElementById('mEnableLink').style.display = 'none';
    document.cookie = "m_off=false";
}

if (typeof getCookie !== 'function') {
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}

if (getCookie('m_off') !== "" && getCookie('m_off') !== "false") {
    var disableLink = document.getElementById('mDisableLink');
    var enableLink = document.getElementById('mEnableLink');
    if (disableLink !== undefined && disableLink !== null && enableLink !== undefined && enableLink !== null) {
        disableLink.style.display = none;
        enableLink.style.display = inline-block;
    }
}
