function load() {
    var subjectArray= [];
    var gradeArray= [];
    console.log(paths);
    //console.log(paths.GRADO_7.CIENCIAS.VIDEOS.BIMESTRE_1);
    $.each(paths, function(index, object) {
        gradeArray.push(index);
        for (var property in object) {
            if($.inArray(property, subjectArray) === -1) subjectArray.push(property);
        }
    });
    console.log(gradeArray);
    console.log(subjectArray);
    for (var i = 0; i < subjectArray.length; i++) {
      var buttoncontainer = "<div class = 'subject-button-container-" + subjectArray[i].toLowerCase() + "'></div>";
      $( buttoncontainer ).appendTo('div.subject-buttons');
      $('<a>',{
        class: 'btn btn-primary',
        text: subjectArray[i],
        href: getSubjectURL(subjectArray[i]),
      }).appendTo( 'div.subject-button-container-' + subjectArray[i].toLowerCase());
    }
}
function getSubjectURL(subject) {
    return "subject.html?sbj=" + subject;
}
