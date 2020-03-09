window.scrollBy({
  top: 2,
  behavior: 'smooth'
});

window.scrollBy({
  down: 1,
  behavior: 'smooth'
});

selecteditem = ""

function showinfo(e) {

    if (selecteditem != "") {
      document.querySelectorAll("#" + selecteditem + "").forEach(el => {
          el.style.display = "none";
      });
    }

    selecteditem = e

    document.querySelectorAll("#above").forEach(el => {
        el.style.display = "block";
    });

    var temp = document.querySelectorAll("#" + e + "")

    document.querySelectorAll("#" + e + "").forEach(el => {
        el.style.display = "flex";
    });


    $('html, body').animate({
        scrollTop: $("#above").offset().top
      }, 600, function(){

        window.location.hash = "#above";
      });

    // document.querySelectorAll(".card").forEach((item, i) => {
    //   if (item.id != "computational") {
    //     item.classList.add('change');
    //   }
    //
    // });
};

var lastScrollTop = 0;
var topofDiv = $("#above").offset().bottom; //gets offset of header
var height = $("#above").outerHeight(); //gets height of header

function convertName(name) {
  var item;
  if (name == "cls") {
    item = "computational"
  }
  else if (name = "programmereninfo") {
    item = "programmeren"
  }
  return item
}


$(window).scroll(function(){

  var st = window.pageYOffset || document.documentElement.scrollTop ; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
  if (st + 5 > lastScrollTop){
     // downscroll code
     if($(window).scrollTop() > (270)){
       document.querySelectorAll(".card").forEach((item, i) => {
         if (item.id != convertName(selecteditem)) {
           item.classList.remove('change');
         }
       });
     }
  } else {
    document.querySelectorAll(".card").forEach((item, i) => {
      if (item.id != convertName(selecteditem)) {
        item.classList.add('change');
      }
    });
     // upscroll code
  }
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

});


// var cards = document.getElementsByClassName("card");
//
// for(var x = 0; x < cards.length; x++) {
//
//     cards[x].addEventListener("click",function(el){
//
//       console.log(el, "hoi")
//
//     },false);
// }


var request;
$(function() {

  $('table.faq td a.icon-arrow').click(function(event) {
      $(this).toggleClass('open');
      $(this).siblings('.item').fadeToggle();
      event.preventDefault();
  });

  $('.search a').click(function(event) {
      $(this).toggleClass('expanded');
      $('.search-options').toggle();
      event.preventDefault();
  });

  $(document).on("click", "ul.filter li a:not(.disabled),nav.pager ul.menu a", function(event) {
      resetInputs();
      $('input[name="' + $(this).attr('data-param') + '"]').attr("value", $(this).attr("data-id"));
      checkOrUncheck($(this));
      postForm();
      searchPageCookie($('input[name="pagePath"]').val());
      event.preventDefault();
  });

  $(document).on("click", "a.show-more", function(event) {
      $(this).parent('div').children('ul').children('.hidden-from-ui').show();
      $(this).hide();
      event.preventDefault();
  });

  $('form.search').not('.detail').on('submit', function(event) {
      resetInputs(true);
      postForm();
      event.preventDefault();
  });

  $('.search-all').on('click', function(event) {
      resetInputs(true, true);
      eraseCookie('/');
      postForm();
      event.preventDefault();
  });

  $(document).on('click', 'nav.pager ul:not(.menu) a', function(event) {
      var li = $(this).parent();
      var inputPage = $('form input[name="p_page"]');
      var oldpage = parseFloat(inputPage.val());
      var newpage;

      if (li.hasClass('previous')) newpage = oldpage - 1;
      else if (li.hasClass('next')) newpage = oldpage + 1;
      else newpage = parseFloat($(this).text());

      inputPage.val(newpage);
      postForm();
      event.preventDefault();
  });

  $(document).on('click', 'tr.result', function(event) {
      $(this).toggleClass('selected');
      $(this).siblings().removeClass('selected');
      $('tr.slideout').not($(this).next('.slideout')).hide();
      $(this).next('.slideout').toggle();
      event.preventDefault();
  });

  $(document).on('click', 'img.close', function(event) {
      $('tr.result').removeClass('selected');
      $('tr.slideout').hide();
      event.preventDefault();
  });

  $('#social-strip a').each(function() {
      var url = window.location;
      var href = $(this).attr('href');
      $(this).attr('href', href.replace('$pageUrl', escape(url)))
  });
});
