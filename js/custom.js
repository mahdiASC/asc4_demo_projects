(function ($) {

    // Init Wow
    wow = new WOW({
        animateClass: 'animated',
        offset: 100
    });
    wow.init();

    // Navigation scrolls
    $('.navbar-nav li a').bind('click', function (event) {
        $('.navbar-nav li').removeClass('active');
        $(this).closest('li').addClass('active');
        var $anchor = $(this);
        var nav = $($anchor.attr('href'));
        if (nav.length) {
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');

            event.preventDefault();
        }
    });
    //jQuery to collapse the navbar on scroll
    $(window).scroll(function () {
        if ($(".navbar-default").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });
})(jQuery);


$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "../data.txt",
        dataType: "text",
        success: function (data) {
            processData(data);
        }
    });
});

let x;
function processData(allText) {
    x = allText
    var allTextLines = allText.split(/\r\n|\n/);
    allTextLines.shift(); //killing header
    var output = [];
    // while (allTextLines.length > 0) {
    let splits = allTextLines.shift().split(',');
    output.push(new Project(splits[0],splits[1],splits[2],splits[3]));
    // }
    buildProjects(output);
}

let buildProjects = x => {
    for(w of x){
        buildProject(w);
    }
}

let buildProject = x => {
    let project_container = $('<div/>');
    project_container.append(`<img src="img/banner.jpeg">`);
    let text = $('<div/>');
    text.append(`<h2>${x.name}</h2>`)
    text.append(`<h4>${x.students}</h4>`)
    text.append(`<p>${x.desc}</h2>`)
    project_container.append(text);
    $('.project-wrapper').append(project_container);
}
class Project{
    constructor(name, students, desc, img){
        this.name = name;
        this.students = students.split(":").join(', ');
        this.desc = desc;
        this.img = img;
    }
}
