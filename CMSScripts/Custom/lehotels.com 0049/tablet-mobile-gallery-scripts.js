
// GALLERY

if (typeof galleryJSON != 'undefined') {
    var galleryImages = [];

    //$.each(galleryJSON, function() {
	//console.log(galleryJSON.data);
    $.each(galleryJSON.data, function() {
        for (var length = this.images.length, index = 0; index < length; index++) {
			//console.log(this.images[index].full);
            this.images[index].image = this.images[index].full;
            this.images[index].description = this.images[index].caption;
            if ($('html').hasClass('property') && !$('html').hasClass('gallery')) {
                galleryImages.push(this.images[index]);
            }
        }
		/*console.log(this);
		console.log(this.length);
        //for (var length = this.data.length, index = 0; index < length; index++) {
        for (var length = this.length, index = 0; index < length; index++) {
			console.log(index);
            this.data[index].image = this.data[index].full;
            this.data[index].description = this.data[index].caption;
            if ($('html').hasClass('property') && !$('html').hasClass('gallery')) {
                galleryImages.push(this.data[index]);
            }
        }*/
    });

    $("#content .gallery a").click(function() {
        if (galleryImages.length) {
            //initGallery(null, galleryImages, $(this).index('#content .gallery a'));
            initGallery(null, galleryImages, 0);
        } else {
            initGallery($(this).data('gallery-id'));
        }
        return false;
    });
	
	$('#qgallery a, #m04 a').click(function (e) {
		e.preventDefault();
        //console.log(galleryImages);
		//initGallery();
        initGallery(null, galleryImages, 0);
	});
	
	/*
	// from tablet - within content
	$(document).on("click", ".gallery a", function(e){
		e.preventDefault();
		initGallery(($(this).data("gallery-id")));
		return false;
	});
	
	// from tablet - on screen nav
	$('#qgallery a').click(function (e) {
		e.preventDefault();
		initGallery();
	});
	*/
	
}

// DEFINE FUNCTION

function initGallery(id, plainImagesArray, currentImage) {
	$('html').addClass('selection-disabled');

	var photos = plainImagesArray ? plainImagesArray : galleryJSON[id].data;
	var galleryOptions = {
		dataSource: photos,
		show: currentImage ? currentImage :0
	};

	$('body').append(
		$('<div />', {'id': 'hebs-gallery'})
			.append($('<div />', {'class': 'galleria'}))
			.append($('<a />', {'class': 'close-button'}))
	);

	if (id) {
		var categoriesSelector = $('<select />', {'class': 'category-selector'});
		$.each(galleryJSON, function(index, value) { categoriesSelector.append($('<option />', {'value': index, 'text': value.name})) });

		if ($('option', categoriesSelector).length > 1) {
			categoriesSelector.val(id);
			categoriesSelector.appendTo('#hebs-gallery');
		}
	}

	if (photos.length == 1) $('#hebs-gallery').addClass('no-controls');

	$('#hebs-gallery').fadeIn(200, function(){
		Galleria.run('#hebs-gallery .galleria', galleryOptions);
	});

	Galleria.ready(function(){
		var gallery = this;

		$('#hebs-gallery .close-button').click(function(){
			gallery.pause();
			$('#hebs-gallery').fadeOut(200, function(){
				gallery.destroy();
				$(this).remove();
				$('html').removeClass('selection-disabled');
			})
		});

		$('#hebs-gallery .category-selector').change(function(){
			var photos = galleryJSON[$(this).val()].data;
			if (photos.length == 1) $('#hebs-gallery').addClass('no-controls');
			else $('#hebs-gallery').removeClass('no-controls');
			gallery.load(photos);
		});
	});
	$("#hebs-gallery select").sSelect();
}



