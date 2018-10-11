$(document).ready(function(){
    guidesFilesObject = {};
    videosFilesObject = {};
    selectedSubject = getAllUrlParams().sbj;
    selectedGrade = getAllUrlParams().grd;
    selectedArray = getSelectedParametersArray();
    $( "h1.main-title" ).text( selectedSubject );
    $( "h2.grade-title" ).text( selectedGrade );
    bimesterArray = getBimesterArray();
    console.log(bimesterArray);
    createBimesterButtons();
    pauseVideoAfterCloseModal();
    setFilesButtonsFunction("video");
    setFilesButtonsFunction("guide");
});

function pauseVideoAfterCloseModal() {
    $(function(){
        $('.modal').modal({
            show: false
        }).on('hidden.bs.modal', function(){
            if ($(this).find('video')[0]) {
                $(this).find('video')[0].pause();
            }
        });
    });
}

function setFilesButtonsFunction(sort) {
  $( "."+ sort + "-modal-button" ).click(function() {
      var modalClass = $(this)[0].className;
      var filesObject = (sort == "video")? videosFilesObject : guidesFilesObject;
      var srcElement = (sort == "video")? " source" : " embed";
      $.each(filesObject, function(index, object) {
          if (modalClass.indexOf(index)) {
            var modal = "#" + sort + "Modal";
            $( modal + " h4" ).text( object.title );
            $( modal + srcElement ).attr("src", object.url);
            if ($( modal + " video")[0])
              $( modal + " video")[0].load();
            return false;
          }
      });
  });
}

function getSelectedParametersArray() {
    var gradeObject = "GRADO_" + selectedGrade;
    var subjectObject = selectedSubject.toUpperCase();
    return paths[gradeObject][subjectObject];
}

function getBimesterArray() {
    var bimesterArray = [];
    var bimesterObject = selectedArray.VIDEOS;
    $.each(bimesterObject, function(index, object) {
        bimesterArray.push(index);
    });
    return bimesterArray;
}

function createBimesterButtons() {
    for (var i = 0; i < bimesterArray.length; i++) {
        var buttonContainerClass = 'bimester-link-container-'+ bimesterArray[i].replace("BIMESTRE_", "");
        var buttonContainer = (i == 0)? "<li class = 'active " : "<li class = '"
        buttonContainer += buttonContainerClass + "'></li>";
        $( buttonContainer ).appendTo('ul.bimester-pills');
        var bimesterText = bimesterArray[i].replace("_", " ").toLowerCase();
        var linkButton = "#bimester" + bimesterArray[i].replace("BIMESTRE_", "");
        createLink('', bimesterText, linkButton, 'pill', 'li.' + buttonContainerClass);
        createBimesterContentContainers(i, bimesterArray[i], linkButton);
    }
}

function createBimesterContentContainers(numberOfBimester, bimester, bimesterId) {
    var bimesterContainerClass = 'bimester-link-container-' + bimester.replace("BIMESTRE_", "");
    var tabPaneClass = ' tab-pane fade'
    var bimesterContainer = "<div id='" + bimesterId.replace("#", "") + "' class='" + bimesterContainerClass + tabPaneClass;
    bimesterContainer += (numberOfBimester == 0)? " in active'></div>" : "'></div>";
    $( bimesterContainer ).appendTo('div.bimester-content');
    setBimesterContent(bimester, bimesterContainerClass);
}

function setBimesterContent(bimester, containerClass) {
    var bimesterPanelGroup = getBimesterPanels(bimester);
    $( bimesterPanelGroup ).appendTo('div.' + containerClass);
    createGuidesButtons(bimester);
    createVideosButtons(bimester);
}

function createVideosButtons(bimester) {
    var videosArray = getVideosArray(bimester);
    var bimesterNumber = bimester.replace("BIMESTRE_", "");
    var videosContainerClass = "videos-panel-" + bimesterNumber;
    for (var i = 0; i < videosArray.length; i++) {
      var videoText = getVideoName(videosArray[i]);
      var videoID = videoText.replace(" ","") + "_bim" + bimesterNumber;
      createButton('btn btn-primary btn-lg video-modal-button btn-'+ videoID, videoText, "modal", "#videoModal", videosContainerClass);
      var videoUrl = "AULAS_SIN_FRONTERAS/GRADO_" + selectedGrade + "/" + selectedSubject.toUpperCase() + "/VIDEOS/BIMESTRE_" + bimesterNumber + "/" + videosArray[i];
      if (videosFilesObject[videoID] == undefined) {
          videosFilesObject[videoID] = getFileObject(videoID, videoText, videoUrl);
      }
    }
}

function getFileObject(id, title, url) {
    var file = {
      id: id,
      title: title,
      url: url,
    };
    return file;
}

function getVideoName(nameFile) {
    nameFile = (selectedGrade == 7) ? nameFile.split("_")[1].replace("V","") : nameFile.split("-")[2].replace(".mp4","");
    return "video " + nameFile;
}

function getVideosArray(bimester) {
  var bimesterKey = "BIMESTRE_" + bimester.replace("BIMESTRE_", "");
  var videosArray = [];
  $.each(selectedArray["VIDEOS"][bimesterKey], function(index, object) {
      if ( (isString(object)) && (object.indexOf(".mp4")))
          videosArray.push(object);
  });
  return videosArray;
}

function createGuidesButtons(bimester) {
    var teacherGuidesArray = getGuideArrayBySort(bimester, "DOCENTE");
    var studentGuidesArray = getGuideArrayBySort(bimester, "ESTUDIANTE");
    createGuidesButtonsBySort(bimester, teacherGuidesArray, "DOCENTE");
    createGuidesButtonsBySort(bimester, studentGuidesArray, "ESTUDIANTE");
}

function createGuidesButtonsBySort(bimester, sortArray, sort) {
    var bimesterNumber = bimester.replace("BIMESTRE_", "");
    var guidesContainerClass = "guides-panel-" + bimesterNumber;
    for (var i = 0; i < sortArray.length; i++) {
      var guideText = sort.indexOf("DOCENTE")? "Guía Docente" : sort.indexOf("ESTUDIANTE")? "Guía Estudiante" : "Guía";
      guideText += (i>0)? " " + (i+1) : "";
      var guideID = sort.toLowerCase() + (i+1) + "_bim" + bimesterNumber;
      createButton('btn btn-primary btn-lg guide-modal-button btn-guide-'+ guideID, guideText, "modal", "#guideModal", guidesContainerClass);
      var guideUrl = "AULAS_SIN_FRONTERAS/GRADO_" + selectedGrade + "/" + selectedSubject.toUpperCase() + "/" + sortArray[i];
      if (guidesFilesObject[guideID] == undefined) {
          guidesFilesObject[guideID] = getFileObject(guideID, guideText, guideUrl);
      }
    }
}

function getGuideArrayBySort(bimester, sort) {
  var sortGuidesArray = [];
  var bimesterKey = "BIM" + bimester.replace("BIMESTRE_", "");
  $.each(selectedArray, function(index, object) {
      if ( (isString(object)) && (object.indexOf(bimesterKey) || object.indexOf("COMPLETO")) && (object.indexOf(sort)) && (object.indexOf(".pdf")))
          sortGuidesArray.push(object);
  });
  return sortGuidesArray;
}

function isString(value) {
    return typeof value === 'string';
}

function getBimesterPanels(bimester) {
    var panelGroupClass = "panel-group";
    var panelGroup = "<div class='" + panelGroupClass + "'>";
    var panelClass = "panel panel-primary";
    var panel = "<div class='" + panelClass + "'>";
    var panelHeadingClass = "panel-heading";
    var panelHeading = "<div class='" + panelHeadingClass + "'>";
    var panelBodyClass = "panel-body";
    var panelGuidesBody = "<div class='" + panelBodyClass + " guides-panel-" + bimester.replace("BIMESTRE_", "") + "'>";
    var panelVideosBody = "<div class='" + panelBodyClass + " videos-panel-" + bimester.replace("BIMESTRE_", "") + "'>";
    var endDiv = "</div>";
    var guidesPanel = panel + panelHeading + "Guías" + endDiv + panelGuidesBody + endDiv + endDiv;
    var videosPanel = panel + panelHeading + "Videos" + endDiv + panelVideosBody + endDiv + endDiv;
    var panels = panelGroup + guidesPanel + videosPanel + endDiv;
    return panels;
}

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}
