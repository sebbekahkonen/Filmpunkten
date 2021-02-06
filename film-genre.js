$('.button').click(function () {
  $('.selectBox').slideToggle(200).css('borderTop', 'none');
  $('.selectBox li').click(function () {
    $('.mehidden').val($(this).text());
  
    $('.selectBox').slideUp(200);
  });
});