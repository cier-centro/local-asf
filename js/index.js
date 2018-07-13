$(document).ready(function(){
    createGradeButtons();
    subjectObject = getSubjectObject();
    console.log(subjectObject);
    createSubjectButtons();
});
function createSubjectButtons() {
    $.each(subjectObject, function(grade, value) {
      $.each(value, function(indexValue, subject) {
          createSubjectButton(subject, grade);
      });
    });
}
function createSubjectButton(subject, grade) {
    var buttonContainerClass = 'subject-button-container-'+ subject.toLowerCase();
    var buttonContainer = "<div class = '" + buttonContainerClass + "'></div>";
    var gradeContainerClass = "grade-button-container-" + grade.toLowerCase().replace("_", "");
    $( buttonContainer ).appendTo('div.' + gradeContainerClass);
    var linkButton = "#";
    var subjectText = subject.toLowerCase();
    var place = gradeContainerClass + " ."+ buttonContainerClass;
    createLinks('btn btn-primary', subjectText, linkButton, place);
}
function createGradeButtons() {
    for (var i = 0; i < gradeArray.length; i++) {
      var buttonContainerClass = 'grade-button-container-'+ gradeArray[i].toLowerCase().replace("_", "");
      var buttonContainer = "<div class = '" + buttonContainerClass + "' style='display: inline-block;'></div>";
      $( buttonContainer ).appendTo('div.grade-buttons');
      var linkButton = getGradeURL(gradeArray[i]);
      var gradeText = gradeArray[i].toLowerCase().replace("_", " ");
      createLinks('btn btn-primary', gradeText, linkButton, buttonContainerClass);
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
