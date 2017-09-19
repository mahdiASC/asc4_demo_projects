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

})(jQuery);


$(document).ready(function () {
    $.get("../data/data.txt", function (data) {
            processData(data);
        });
});

let x;
function processData(allText) {
    x = allText
    var allTextLines = allText.split(/\r\n|\n/);
    allTextLines.shift(); //killing header
    var output = [];
    while (allTextLines.length > 0) {
        let splits = allTextLines.shift().split('\t');
        output.push(new Project(splits[0],splits[1],splits[2],splits[3],splits[4],splits[5]));
    }
    buildProjects(output);
}

let buildProjects = x => {
    for(let i = 0 ; i < x.length; i ++){
        buildProject(x[i],i);
    }
}

let buildProject = (x,y) => {
    //Need to include direct link and github links
    let project_container = $('<div/>');
    project_container.addClass('project');

    let img = $('<div/>');
    img.addClass('proj_img');
    img.append(`<img src="${x.img}">`);

    let links = $('<div/>');
    links.addClass('links');
    links.append(`<a href="${x.link}" target="_blank"><i class="fa fa-link fa-3x" aria-hidden="true"></i></a>`);
    links.append(`<a href="${x.github}" target="_blank"><i class="fa fa-github fa-3x" aria-hidden="true"></i></a>`);
    img.append(links);

    let text = $('<div/>');
    text.addClass('proj_text');
    text.append(`<h2>${x.name}</h2>`)
    text.append(`<h4>${x.students}</h4>`)
    text.append(`<p>${x.desc}</h2>`)
    
    if(y%2==0){
        project_container.append(img);
        project_container.append(text);
    }else{
        project_container.append(text);
        project_container.append(img);
    }
    $('.project-wrapper').append(project_container);
}
class Project{
    constructor(name, students, desc, img, link, gh){
        this.name = name;
        this.students = students.split(":").join(', ');
        this.desc = desc;
        this.img = img;
        this.link = link;
        this.github = gh;
    }
}
