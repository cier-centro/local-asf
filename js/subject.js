$(document).ready(function(){
    selectedSubject = getAllUrlParams().sbj;
    $( "h1.main-title" ).text( selectedSubject );
    createGradeButtons();
});
function createGradeButtons() {
    for (var i = 0; i < gradeArray.length; i++) {
        var buttonContainerClass = 'grade-button-container-'+ gradeArray[i].toLowerCase().replace("_", "");
        var buttonContainer = "<div class = '" + buttonContainerClass + "'></div>";
        $( buttonContainer ).appendTo('div.grade-buttons');
        var gradeText = gradeArray[i].replace("_", " ").toLowerCase();
        var linkButton = getGradeURL(selectedSubject, gradeArray[i]);
        createLink('btn btn-primary', gradeText, linkButton, buttonContainerClass);
    }
}
function getGradeURL(subject, grade) {
    grade = grade.replace("GRADO_", "")
    return "grade.html?sbj=" + subject + "&grd=" + grade;
}
