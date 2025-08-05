/*!
 * AK Formext v1.0.0 (https://www.autodudes.de)
 * Copyright 2017-2019 Andre Kraus
 * Licensed under the GPL-2.0-or-later license
 */
// console.log("WE LOVE TYPO3");

/****
 * The idea is to show privacy by an overaly. Currently, there are some promlems with it and it is not used anymore.
  */


/**
 * Form show privacy start
 */
if (document.getElementById("form-privacy-link") !== 'undefined' && document.getElementById("form-privacy-link") !== null) {
    var privacyLoaded = false;

    var privacyLink = document.getElementById("form-privacy-link");
    privacyLink.onclick = function (event) {
        if (detectIE() === false) {
            event.preventDefault();
            showPrivacy(privacyLink.href);
        }

    };

    var closeTop = document.getElementById("close-data-privacy-top");
    closeTop.onclick = function (event) {
        event.preventDefault();
        document.getElementById("privacy-overlay").style.display = 'none';
    };
    var closeBottom = document.getElementById("close-data-privacy-bottom");
    closeBottom.onclick = function (event) {
        event.preventDefault();
        document.getElementById("privacy-overlay").style.display = 'none';
    };


    function showPrivacy(url) {
        if (!privacyLoaded) {
            if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            else {// code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.open("GET", url);
            xmlhttp.send();

            xmlhttp.onreadystatechange = function () {
                var response = xmlhttp.responseText;
                if (response.length > 2 && !privacyLoaded) {
                    privacyLoaded = true;
                    var arr = response.split("<!--TYPO3SEARCH_begin-->");
                    arr = arr[1];
                    var arr2 = arr.split("<!--TYPO3SEARCH_end-->");

                    var parser = new DOMParser();
                    var domString = arr2[0];
                    var html = parser.parseFromString(domString, 'text/html');
                    document.getElementById("form-privacy-content-wrap").innerHTML += arr2[0];
                    document.getElementById("privacy-overlay").style.display = 'block';
                }
            }
        }
        else {
            document.getElementById("privacy-overlay").style.display = 'block';
        }

    }
}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}
/**
 * Form show privacy end
 */
