
var feed = new Instafeed({
  clientId: '	141da6a1d75a4a488accb1e47f7a34f0',
   get: 'location',
   locationId: 129016,
  limit: 120,
  sortBy: 'least-recent',//oldest to newest
  //sortBy: 'most-recent',
  //sortBy: 'most-liked',
  after: function () {
    var images = $("#instafeed").find('a');
    $.each(images, function(index, image) {
      var delay = (index * 75) + 'ms';
      $(image).css('-webkit-animation-delay', delay);
      $(image).css('-moz-animation-delay', delay);
      $(image).css('-ms-animation-delay', delay);
      $(image).css('-o-animation-delay', delay);
      $(image).css('animation-delay', delay);
      $(image).addClass('animated flipInX');
    });
  },
  template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /><div class="likes">&hearts; {{likes}}</div></a>'
});
feed.run();
