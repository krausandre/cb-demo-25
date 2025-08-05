var filterItems = Array.from(document.querySelectorAll('.ak-filter .filterItem'));

var filterOptions = Array.from(document.querySelectorAll('.ak-filter .filterOptions span'));
if ( Array.isArray(filterOptions)){
    filterOptions.forEach(function(filter, index, arr){
        filter.addEventListener('click', function(){
            this.classList.toggle('active');
            filterResult();
        });
    });
}

document.querySelectorAll('.ak-filter .filterOptions-label')[0].addEventListener('click', function(){
    this.parentNode.classList.toggle('open');
});

function filterResult(){
    var activeFilters = Array.from(document.querySelectorAll('.ak-filter .filterOptions span.active'));
    
    if ( Array.isArray(filterItems)){
        var inputString = document.getElementById('ak-filter-input').value;
        
        filterItems.forEach(function(filterItem, index, arr){
            filterItem.classList.add('filters-active');
            if ( Array.isArray(activeFilters)){
                if ( activeFilters.length > 0 ){
                    filterItem.classList.remove('show');
                    filterItem.classList.add('hide');
                }
                else {
                    filterItem.classList.add('show');
                    filterItem.classList.remove('hide');
                }
                
                activeFilters.forEach(function(filter, index, arr){
                    if( filterItem.innerText.toLowerCase().indexOf(filter.innerText.toLowerCase()) > -1
                        || (inputString.length > 2 && filterItem.innerText.toLowerCase().indexOf(inputString.toLowerCase()) > -1 ) ) {
                        filterItem.classList.add('show');
                        filterItem.classList.remove('hide');
                    }
                });
            }
            else if(inputString.length > 2 && filterItem.innerText.toLowerCase().indexOf(inputString.toLowerCase()) > -1) 
            {
                filterItem.classList.add('show');
                filterItem.classList.remove('hide');
            }
        });
        if (Array.from(document.querySelectorAll('.ak-filter .filterItem.filters-active.show')).length > 0){
            document.querySelectorAll('.no-result')[0].classList.remove('show');
            var filteringString = '';
            if ( Array.isArray(activeFilters)){
                activeFilters.forEach(function(filter, index, arr){
                    if ( filteringString === '' ) filteringString = filter.innerText;
                    else filteringString = filteringString + ', ' + filter.innerText;
                });
            }
        }
        else document.querySelectorAll('.no-result')[0].classList.add('show');
    }

}

function textSearch(){
    if ( document.getElementById('ak-filter-input').value.length > 2) {
        filterResult();
    }
}

function resetFilters(){
    document.getElementById('ak-filter-input').value = '';
    var activeFilters = Array.from(document.querySelectorAll('.ak-filter .filterOptions span.active'));
    if ( Array.isArray(activeFilters))
    {
        activeFilters.forEach(function(filter, index, arr){
            filter.classList.remove('active');
        });
    }
    filterResult();
}