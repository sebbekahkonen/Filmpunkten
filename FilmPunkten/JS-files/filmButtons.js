
let dramaImg = document.getElementsByClassNamen ('drama/fantasy', 'skräck/drama', 'drama/biografi').src = "images/filmCovers.jpg"
/*Image.src = this.getValue;*/
$('.ticket').click(function () {
});
$('.button').click(function () {
  
  $('.selectBox').slideToggle(200).css('borderTop', 'none');
  $('.selectBox li').click(function () {
    if (document.getElementsByClassName('item6')) {
      alert(dramaImg)
    }
    $('.mehidden').val($(this).text());
  
    $('.selectBox').slideUp(200);
 /*
function selectGenre() {
  let val = document.getElementsByClassName('.selectBox li');
  let thriller = document.getElementsByClassName('skräck/thriller');
  let drama = document.getElementsByClassName('drama/fantasy', 'skräck/drama', 'drama/biografi');
  if (val == 'item6') {
    alert(drama)
  }
  if (val == 'item2') {
    alert(thriller)
  }
}
*/
  });
});
