$(document).ready(function(){
    gradeArray = [];
    subjectObject = [];
    setGradeArray();
    createHomeButton();
    createGradeButtons();
    subjectObject = getSubjectObject();
    console.log(paths);
    console.log(gradeArray);
    console.log(subjectObject);
    createSubjectButtons();
});

function createSubjectButtons() {
    $.each(subjectObject, function(grade, value) {
      $.each(value, function(indexValue, subject) {
          createSubjectLink(subject, grade);
      });
    });
}

function createSubjectLink(subject, grade) {
    var buttonContainerClass = getSubjectLinkContainer(subject, grade);
    var gradeContainerClass = "grade-button-container-" + grade.toLowerCase().replace("_", "");
    var linkButton = getSubjectAndGradeURL(subject, grade);
    var subjectText = subject.toLowerCase();
    var place = 'div.' + gradeContainerClass + " ."+ buttonContainerClass;
    createLink('', subjectText, linkButton, '', place);
}

function getSubjectLinkContainer(subject, grade) {
    var buttonContainerClass = 'subject-link-container-'+ subject.toLowerCase();
    var buttonContainer = "<li class = '" + buttonContainerClass + "'></li>";
    var gradeListClass = "grade-list-" + grade.toLowerCase().replace("_", "");
    $( buttonContainer ).appendTo('ul.' + gradeListClass);
    return buttonContainerClass;
}

function createHomeButton() {
    var buttonContainerClass = 'home-button-container';
    var buttonContainer = "<div class = '" + buttonContainerClass + "' style='display: inline-block;'></div>";
    $( buttonContainer ).appendTo('div.grade-buttons');
    createLink('btn btn-primary', "Inicio", "index.html", '', 'div.' + buttonContainerClass);
}

function createGradeButtons() {
    for (var i = 0; i < gradeArray.length; i++) {
      var buttonContainerClass = 'grade-button-container-'+ gradeArray[i].toLowerCase().replace("_", "");
      var buttonContainer = "<div class = 'dropdown " + buttonContainerClass + "' style='display: inline-block;'></div>";
      $( buttonContainer ).appendTo('div.grade-buttons');
      var gradeText = gradeArray[i].toLowerCase().replace("_", " ");
      createButton('btn btn-primary dropdown-toggle', gradeText, "dropdown", buttonContainerClass);
      createSubjectListByGrade(gradeArray[i], buttonContainerClass);
    }
}

function createSubjectListByGrade(grade, containerClass) {
    var gradeListClass = "grade-list-" + grade.toLowerCase().replace("_", "");
    var buttonList = "<ul class='dropdown-menu " + gradeListClass + "'></ul>";
    $( buttonList ).appendTo('div.' + containerClass);
}

function getSubjectObject() {
    var subjObject = {};
    for (var i = 0; i < gradeArray.length; i++) {
        subjObject[gradeArray[i]] = getSubjectArray(gradeArray[i]);
    }
    return subjObject;
}

function getSubjectArray(grade) {
    var subjectArray = [];
    var subjectObject = paths[grade];
    $.each(subjectObject, function(index, object) {
        subjectArray.push(index);
    });
    return subjectArray;
}

function getSubjectAndGradeURL(subject, grade) {
    grade = grade.replace("GRADO_", "")
    return "content.html?sbj=" + subject + "&grd=" + grade;
}

function setGradeArray() {
    $.each(paths, function(index, object) {
        gradeArray.push(index);
    });
}

function createButton( buttonClass, text, dataToogle, buttonContainerClass) {
    $('<button>',{
      type: "button",
      class: buttonClass,
      "data-toggle": dataToogle,
      text: text,
    }).appendTo( "div." + buttonContainerClass );
}

function createLink( buttonClass, text, link, dataToogle, buttonContainerClass) {
    $('<a>',{
      class: buttonClass,
      text: text,
      href: link,
      "data-toggle": dataToogle,
    }).appendTo( buttonContainerClass );
}
