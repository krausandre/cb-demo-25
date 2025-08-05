var justifiedGalleriesList = Array.from(document.getElementsByClassName('justified-gallery'));
if (Array.isArray(justifiedGalleriesList)){
    document.addEventListener("DOMContentLoaded", function(event) {
        $(".justified-gallery").justifiedGallery({
            rowHeight : 170,
            lastRow : 'nojustify',
            margins : 3
        });
      });
}