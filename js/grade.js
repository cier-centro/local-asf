$(document).ready(function(){
    selectedSubject = getAllUrlParams().sbj;
    selectedGrade = getAllUrlParams().grd;
    $( "h1.main-title" ).text( selectedSubject );
    $( "h2.grade-title" ).text( selectedGrade );
    bimesterArray = getBimesterArray();
    console.log(bimesterArray);
    createBimesterButtons();
});
function getBimesterArray() {
    var bimesterArray = [];
    var gradeObject = "GRADO_" + selectedGrade;
    var subjectObject = selectedSubject.toUpperCase();
    var bimesterObject = paths[gradeObject][subjectObject].VIDEOS;
    $.each(bimesterObject, function(index, object) {
        bimesterArray.push(index);
    });
    return bimesterArray;
}
function createBimesterButtons() {
    for (var i = 0; i < bimesterArray.length; i++) {
        var buttonContainerClass = 'bimester-button-container-'+ bimesterArray[i].replace("BIMESTRE_", "");
        var buttonContainer = "<div class = '" + buttonContainerClass + "'></div>";
        $( buttonContainer ).appendTo('div.bimester-buttons');
        var bimesterText = bimesterArray[i].replace("_", " ").toLowerCase();
        var linkButton = "#"; //getGradeURL(selectedSubject, gradeArray[i])
        createLink('btn btn-primary', bimesterText, linkButton, buttonContainerClass);
    }
}
/*function getGradeURL(subject, grade) {
    grade = grade.replace("GRADO_", "")
    return "grade.html?sbj=" + subject + "&grd=" + grade;
}
*/
