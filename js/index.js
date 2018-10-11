$(document).ready(function() {
  setHomeButtonClickFunction();
  pauseVideoAfterCloseModal();
});


function setHomeButtonClickFunction() {
  $(".home-videos .btn-video").click(function() {
    console.log(videoTitleHTML);
    var idButton = $(this).attr('id');
    var videoTitleHTML = (idButton == "video_asf1") ? "¿Qué es Aulas sin fronteras?" : "¿Cómo funciona esta interfaz?";
    var urlVideo = "media/" + idButton + ".mp4";
    $("#md-asf-home-video source").attr("src", urlVideo);
    $("#md-asf-home-video video")[0].load();
    $("#md-asf-home-video .modal-title").empty();
    $("#md-asf-home-video .modal-title").append(videoTitleHTML);
  });

}

function pauseVideoAfterCloseModal() {
  $(function() {
    $('.modal').modal({
      show: false
    }).on('hidden.bs.modal', function() {
      if ($(this).find('video')[0]) {
        $(this).find('video')[0].pause();
      }
    });
  });
}