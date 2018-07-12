$(document).ready(function(){
    createSubjectButtons();
});
function createSubjectButtons() {
    for (var i = 0; i < subjectArray.length; i++) {
      var buttonContainerClass = 'subject-button-container-'+ subjectArray[i].toLowerCase();
      var buttonContainer = "<div class = '" + buttonContainerClass + "'></div>";
      $( buttonContainer ).appendTo('div.subject-buttons');
      var linkButton = getSubjectURL(subjectArray[i]);
      createLinks('btn btn-primary', subjectArray[i], linkButton, buttonContainerClass);
    }
}
function getSubjectURL(subject) {
    return "subject.html?sbj=" + subject;
}
