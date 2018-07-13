$(document).ready(function(){
    createGradeButtons();
    subjectObject = getSubjectObject();
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
    var buttonContainerClass = 'subject-link-container-'+ subject.toLowerCase();
    var buttonContainer = "<li class = '" + buttonContainerClass + "'></li>";
    var gradeContainerClass = "grade-button-container-" + grade.toLowerCase().replace("_", "");
    var gradeListClass = "grade-list-" + grade.toLowerCase().replace("_", "");
    $( buttonContainer ).appendTo('ul.' + gradeListClass);
    var linkButton = "#";
    var subjectText = subject.toLowerCase();
    var place = gradeContainerClass + " ."+ buttonContainerClass;
    createLink('', subjectText, linkButton, place);
}
function createGradeButtons() {
    for (var i = 0; i < gradeArray.length; i++) {
      var buttonContainerClass = 'grade-button-container-'+ gradeArray[i].toLowerCase().replace("_", "");
      var buttonContainer = "<div class = 'dropdown " + buttonContainerClass + "' style='display: inline-block;'></div>";
      $( buttonContainer ).appendTo('div.grade-buttons');
      var linkButton = getGradeURL(gradeArray[i]);
      var gradeText = gradeArray[i].toLowerCase().replace("_", " ");
      createButton('btn btn-primary dropdown-toggle', gradeText, linkButton, "dropdown", buttonContainerClass);
      var gradeListClass = "grade-list-" + gradeArray[i].toLowerCase().replace("_", "");
      var buttonList = "<ul class='dropdown-menu " + gradeListClass + "'></ul>";
      $( buttonList ).appendTo('div.' + buttonContainerClass);
    }
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
function getGradeURL(grade) {
    return "#";
    //return "grade.html?sbj=" + grade;
}
