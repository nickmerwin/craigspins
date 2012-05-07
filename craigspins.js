(function(){
	// TODO:
	// * section links load pins
	// * advanced search params
	// * bookmarklet start on CL homepage or subpage
	// * update # in URL for linking
	// * pushState ?
	// * new logo
	// * saving service: click like to bookmark, link in nav to view liked
	// * price banner
	// * version check
	// * scroll to top link
	// * BUG: quote in search
	// * formatted show page via ajax
  
  
	// ================ SETUP ==================
	
	var pinWidth = 222;
	var imageWidth = 192;
	var colMargin = 15;
	var nColumns = Math.floor( $(window).width() / ( pinWidth + colMargin ) );
	
  var leftWrPadding = function() { 
    return ( ( $(window).width() - ( nColumns * ( pinWidth + colMargin ) ) ) / 2 );
  };

  $(window).resize(function(){ 
    $("body").css({paddingLeft: leftWrPadding()});
  });

	var firstPage = $('body').html();

	// === Shell ===
	var qForm = $('<form/>',{id:'qForm'});

	var qInput = $('<input/>',{id:'q'})
			.css({
					cssFloat:'left', width:183, border:'1px solid', lineHeight:1.3, 
					boxShadow:'0 1px #fff, inset 0 1px rgba(34,25,25,0.05)',
					'-moz-box-shadow': '0 1px #fff, inset 0 1px rgba(34,25,25,0.05)',
					'-webkit-box-shadow': '0 1px #fff, inset 0 1px rgba(34,25,25,0.05)',
					fontSize: 13, borderColor: '#C2C0C0 #CCCACA #D1CFCF', padding:5, 
					backgroundColor:'#FAF7F7', margin:0
				});

	var qA = $('<a/>',{id:'qBtn', href:'#'}).css({
				cssFloat: 'left',
				marginLeft: -1,
				padding:"7px 7px 2px",
				minHeight:17,
				border: '1px solid',
				boxShadow:'0 1px rgba(255,255,255,0.9), inset 0 0 2px rgba(255,255,255,0.75)',
				'-moz-box-shadow': '0 1px rgba(255,255,255,0.9), inset 0 0 2px rgba(255,255,255,0.75)',
				'-webkit-box-shadow': '0 1px rgba(255,255,255,0.9), inset 0 0 2px rgba(255,255,255,0.75)',
				borderColor:'#C2C0C0 #CCCACA #D1CFCF'
				//background: "-webkit-linear-gradient(#FFFCFC, #F0EDED)",
				//background: "-moz-linear-gradient(top,#FFFCFC, #F0EDED)",
				//background: "-o-linear-gradient(#FFFCFC, #F0EDED)",
				//background: "-webkit-linear-gradient(#FFFCFC, #F0EDED)"
			}).append($('<img/>',{src:"http://passets-cdn.pinterest.com/images/search.gif"}))

	var qWr = $('<div/>', {id:'qWr'}).css({cssFloat:'left', margin:'8px 0 0', paddingLeft:15}).append(qForm.append(qInput).append(qA));

	var logo = $('<div/>',{id:'logo'}).css({position:"absolute",marginLeft:-50, left:'50%', top:7})
		.append($('<img/>',{src:'http://lemurheavy.com/images/craigspin/logo.png'}));

	var nav = $('<div/>',{id:'nav'}).css({
			position:'fixed', height:44, top:0, left:0, width:'100%', backgroundColor:'#FAF7F7', boxShadow:"inset 0 1px #fff, 0 1px 3px rgba(34,25,25,0.4)", zIndex: 103,
			"-webkit-box-shadow": "inset 0 1px #fff, 0 1px 3px rgba(34,25,25,0.4)",
			"-moz-box-shadow": "inset 0 1px #fff, 0 1px 2px rgba(34,25,25,0.4)"
		}).append(qWr).append(logo);
  
  $("html").css({background:'url("http://lemurheavy.com/images/craigspin/paper.jpg")'});
  
	$("body").css({margin:0, fontFamily:"'helvetica neue', arial, sans-serif", fontSize:'11px', background:'transparent'})
		.html($('<div/>',{id:'wr', style:'padding:60px 0 0; width:100%;'})).append($("<div/>",{id:'parser'}).css({display:'none'})) 
		.append(nav);

	$('#q').focus(function(){
		$(this).css({ backgroundColor:"#fff" })
	}).blur(function(){
		$(this).css({ backgroundColor:"#FAF7F7" });
	});
  

  
	// ================= Search =================
	var search = function(){
		try {
			var q = $('#q').val();
			// TODO: section search, location

			for(var i = 0; i < nColumns; i++) columns[i].html('');

			currPage = 0;
			currSearch = q;

			loadPage(q, 0);
			return false;
		
		}catch(e){console.log(e);return false}
	}

	qForm.submit(search);
	qA.click(search);


	// === Add Columns ===
	
	$("body").css({paddingLeft: leftWrPadding()});
	
	var columns = [];

	for(var i = 0; i < nColumns; i++) {
		var column = $("<div/>").css({width:pinWidth, cssFloat:'left', marginLeft:15});
		if(i == 0) column.css({marginLeft: 0});

		columns.push(column);
		$('#wr').append(column);
	}

	$("#wr").append($('<div/>').css({clear:'both', cssFloat:'none'}));

	// === Page Loading ===
	var origUrl = window.location.href;
	var currPage = 0;
	var qReg = /query=(.*?)(&|$)/;
	var currSearch = ( window.location.search.match(qReg) || [] )[1];

	var nextPage = function(){
		loading = true;
		loadPage(currSearch, ++currPage);
	}

	var loadPage = function(q,page){
		console.log('loadPage: '+ q);

		var url = origUrl.match(qReg) ? origUrl.replace(qReg,'query='+q+'&') : 
			( origUrl.match(/\?/) ? origUrl + '&query='+q : origUrl + '?query='+q);

		$.get(url+'&s='+(page * 100),function(html){
			if(!parse(html)) done = true;
			loading = false;
		});
	}

	// true when no more results
	var done = false;
	var loading = false;

	$(window).scroll(function(){
		if(!loading && !done && ( $(window).scrollTop() + $(window).height() > $('#wr').height() - $(window).height() )){
			nextPage();
		}
	});

	// ================ PARSE ==================

	var parse = function(html){
		console.log('parsing!');
		var imgs = []; 
		$('#parser').html(html).find("span.i").add("span.ih").each(function(){
			id = this.id.match(/images:(.*?)$/); 
			if(!id) return;

			var as = $(this).parents('p').find('a');
			imgs.push({
				src: "http://images.craigslist.org/"+id[1],
				href: as[0].href,
				title: as[0].innerHTML,
				section: as[1].innerHTML,
				sectionHref: as[1].href,
				price: ( $(this).parents('p').html().match(/(\$.*?)</) || [])[1]
			});
		}); 

		for(var i = 0; i < imgs.length; i++){
			var img = imgs[i];

			var image = $('<div/>',{
				style: 'padding:15px 15px 0; margin: 0 0 15px; overflow: hidden; background-color:#fff; '+
					'-moz-box-shadow: 0 1px 2px rgba(34,25,25,0.4); -webkit-box-shadow: 0 1px 3px rgba(34,25,25,0.4); box-shadow: 0 1px 3px rgba(34,25,25,0.4);'})
				.append($('<a/>',{href:img.href, target:'_blank'}).append($('<img/>',{src:img.src, style:'width:'+imageWidth+'px'})))
				.append($('<div/>').css({margin:'10px 0'})
					.html($('<a/>',{href:img.href, target:'_blank'}).css({color:"#000", textDecoration:'none'})
						.html('<b>'+( img.price || '')+'</b>'+ ' ' + img.title.substr(0,20))))
				.append($('<div/>').css({padding:10, margin:'0 -15px', backgroundColor:"#eee"})
					.html($('<a/>',{href:img.sectionHref, target:'_blank'}).css({color:'#8C7E7E', fontWeight:'bold', textTransform:'capitalize', textDecoration:'none'}).html(img.section)));

			var shortest = columns[0];
			for(var j=0; j < nColumns; j++) 
				if(columns[j].height() < shortest.height()) 
					shortest = columns[j];

			shortest.append(image);
		}

		return imgs.length > 0;
	}

	// ================ START ==================

	parse(firstPage);

})()