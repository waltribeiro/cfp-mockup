$( document ).ready(function() {
    let search = document.getElementById('js-site-search');

    search.addEventListener('focusin', function (evt) {
        if ($('#navbarSearchBarDropdown').children().length) {
            $('#navbarSearchBarDropdown').addClass('show');
        }
    });

    search.addEventListener('blur', function (evt) {
        $('#navbarSearchBarDropdown').removeClass('show');
    });

    search.addEventListener('input', debounce(
        function(evt) {
            var searchTerm = evt.target.value; 
            fetch(`https://codeforphilly.org/search?q=${searchTerm}&include=recordTitle%2CrecordURL&format=json`)
                .then(response => response.json())
                .then(data => {
                    $('#navbarSearchBarDropdown').empty();
                    $('#navbarSearchBarDropdown').removeClass('show');

                    if (!data.data) return;

                    $('#navbarSearchBarDropdown').addClass('show');

                    let section = $(`<div class="results-group"><h6 class="group-title dropdown-header">Top results</h6></div>`);
                    section.appendTo('#navbarSearchBarDropdown');

                    if (data.data['Laddr\\Project'].length) {
                        let section = $(`<div class="results-group"><h6 class="group-title dropdown-header">Projects</h6></div>`);
                        section.appendTo('#navbarSearchBarDropdown');
                        data.data['Laddr\\Project'].slice(0, 3).forEach(result => {
                            $(`<a class="dropdown-item nav-link" href="">${result.Title}</a>`).appendTo(section);
                        });
                    }
                    if (data.data['Laddr\\ProjectBuzz'].length) {
                        let section = $(`<div class="results-group"><h6 class="group-title dropdown-header">Project Buzz</h6></div>`);
                        section.appendTo('#navbarSearchBarDropdown');
                        data.data['Laddr\\ProjectBuzz'].slice(0, 3).forEach(result => {
                            $(`<a class="dropdown-item nav-link" href="">${result.Headline}</a>`).appendTo(section);
                        });
                    }
                    if (data.data['Laddr\\ProjectUpdate'].length) {
                        let section = $(`<div class="results-group"><h6 class="group-title dropdown-header">Project Updates</h6></div>`);
                        section.appendTo('#navbarSearchBarDropdown');
                        data.data['Laddr\\ProjectUpdate'].slice(0, 3).forEach(result => {
                            $(`<a class="dropdown-item nav-link" href="">${result.recordTitle}</a>`).appendTo('#navbarSearchBarDropdown');
                        });
                    }
                    if (data.data['Tag'].length) {
                        let section = $(`<div class="results-group"><h6 class="group-title dropdown-header">Tags</h6></div>`);
                        section.appendTo('#navbarSearchBarDropdown');
                        data.data['Tag'].slice(0, 3).forEach(result => {
                            $(`<a class="dropdown-item nav-link" href="">${result.Title}</a>`).appendTo('#navbarSearchBarDropdown');
                        });
                    }
                });
        },
        250
    ));
});
