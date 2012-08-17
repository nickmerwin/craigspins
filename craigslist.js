
// LocalStorage

var cl = new Craigslist({
	getPermalinks: true, 
	pages: 3
});

cl.currentPage;
cl.posts;

cl.nextPage();
cl.nextPage();

var post = cl.posts[0];

post.id;
post.title;
post.content;
post.location;
post.price;
post.images;
post.date;
post.replyTo;
post.category;
post.subCategory;
post.mapUrl;

//////////////////////////////////////////////////////

Craigslist = function(options){}

Craigslist.prototype = {
	getPosts: 
		function(options){
			this.options = options;
		}
}
// ================ PARSE ==================

var parse = function(html){
	count = 0;
	$('#parser').html(html).find("span.i").add("span.ih").add("span.p").each(function(){
		var as = $(this).parents('p').find('a');

		if(id = this.id.match(/images:(.*?)$/)){

			addImage("http://images.craigslist.org/"+id[1], as);

		} else {
			$.get(as[0].href,function(d){
				var src = $(d).find('img').attr('src');
				if(!src || !src.match(/images\.craigslist\.org/)) return;
				addImage(src, as);
			});
		}

		count++;
	}); 

	return count > 0;
}

var addImage = function(src,as){
	var html = as.parents('p').html();
	if(!html) return;
	var img = {
		src: src,
		href: as[0].href,
		title: as[0].innerHTML,
		section: as[1] && as[1].innerHTML,
		sectionHref: as[1] && as[1].href,
		price: ( html.match(/(\$.*?)</) || [])[1],
		location: ( html.match(/\((.*?)\)/) || [])[1]
	};

	var image = $('<div/>',{
		style: 'padding:15px 15px 0; margin: 0 0 15px; overflow: hidden; background-color:#fff; '+
			'-moz-box-shadow: 0 1px 2px rgba(34,25,25,0.4); -webkit-box-shadow: 0 1px 3px rgba(34,25,25,0.4); box-shadow: 0 1px 3px rgba(34,25,25,0.4);'})
		.append($('<a/>',{href:img.href, target:'_blank'}).append($('<img/>',{src:img.src, style:'width:'+imageWidth+'px'})))
		.append($('<div/>').css({margin:'10px 0'})
			.html($('<a/>',{href:img.href, target:'_blank'}).css({color:"#000", textDecoration:'none'})
				.html('<b>'+( img.price || '')+'</b>'+ ' ' + img.title.substr(0,20))))
		.append($('<div/>').css({padding:10, margin:'0 -15px', backgroundColor:"#eee"})
			.html($('<a/>',{href:img.sectionHref, target:'_blank'}).css({color:'#8C7E7E', fontWeight:'bold', textTransform:'capitalize', textDecoration:'none'})
			.html(img.section + ' ('+img.location+')')));

	var shortest = columns[0];
	for(var j=0; j < nColumns; j++) 
		if(columns[j].height() < shortest.height()) 
			shortest = columns[j];

	shortest.append(image);
}
