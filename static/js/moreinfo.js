window.scrollBy({
  top: 1,
  behavior: 'smooth'
});

function showinfo(e) {

    document.querySelectorAll("#above").forEach(el => {
        el.style.display = "block";
    });

    $('html, body').animate({
        scrollTop: $("#above").offset().top
      }, 800, function(){

        window.location.hash = "#above";
      });

};

function programme(el) {
  console.log(el, "HOIOI");
  document.querySelectorAll("#" + el + "").forEach(el => {
      el.style.display = "inline";
  });
}

var request;

$(function(){

  $('table.faq td a.icon-arrow').click(function(event){
	$(this).toggleClass('open');
	$(this).siblings('.item').fadeToggle();
	event.preventDefault();
  });

  $('.search a').click(function(event){
    $(this).toggleClass('expanded');
    $('.search-options').toggle();
	event.preventDefault();
  });

  $(document).on("click","ul.filter li a:not(.disabled),nav.pager ul.menu a",function(event){
	resetInputs();
	$('input[name="'+$(this).attr('data-param')+'"]').attr("value",$(this).attr("data-id"));
	checkOrUncheck($(this));
	postForm();
	searchPageCookie($('input[name="pagePath"]').val());
	event.preventDefault();
  });

  $(document).on("click","a.show-more",function(event){
	$(this).parent('div').children('ul').children('.hidden-from-ui').show();
	$(this).hide();
	event.preventDefault();
  });

  $('form.search').not('.detail').on('submit',function(event){
	resetInputs(true);
    postForm();
	event.preventDefault();
  });

  $('.search-all').on('click',function(event){
	resetInputs(true,true);
	eraseCookie('/');
    postForm();
	event.preventDefault();
  });

  $(document).on('click','nav.pager ul:not(.menu) a',function(event){
    var li        = $(this).parent();
    var inputPage = $('form input[name="p_page"]');
    var oldpage   =  parseFloat(inputPage.val());
    var newpage;

    if      (li.hasClass('previous')) newpage = oldpage - 1;
    else if (li.hasClass('next'))     newpage = oldpage + 1;
    else                              newpage = parseFloat($(this).text());

    inputPage.val(newpage);
    postForm();
	event.preventDefault();
  });

  $(document).on('click','tr.result',function(event){
	$(this).toggleClass('selected');
	$(this).siblings().removeClass('selected');
	$('tr.slideout').not($(this).next('.slideout')).hide();
	$(this).next('.slideout').toggle();
	event.preventDefault();
  });

  $(document).on('click','img.close',function(event){
	$('tr.result').removeClass('selected');
	$('tr.slideout').hide();
	event.preventDefault();
  });

  $('#social-strip a').each(function(){
    var url  = window.location;
    var href = $(this).attr('href');
    $(this).attr('href',href.replace('$pageUrl',escape(url)))
  });
});
