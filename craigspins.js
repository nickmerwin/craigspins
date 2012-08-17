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
  var colMargin = 10;
  var nColumns = Math.floor( $(window).width() / ( pinWidth + colMargin ) );
  
  var leftWrPadding = function() { 
    return ( ( $(window).width() - ( nColumns * ( pinWidth + colMargin ) ) ) / 2 );
  };

  $(window).resize(function(){ 
    $("body").css({paddingLeft: leftWrPadding()});
  });

  var firstPage = $('body').html();

  var likes = JSON.parse(localStorage.getItem('likes') || '[]');
  window.likes = likes;

  // ========== Setup Keys ===========
  $('body').keydown(function (e){ 
    if(!currImg) return;

    if(e.keyCode == 37){
      var i = imgs.indexOf(currImg)-1;
      if(i < 0) i = imgs.length - 1;
      popinImg(imgs[i]);
    } else if(e.keyCode == 39){
      var i = imgs.indexOf(currImg)+1;
      if(i > imgs.length) i = 0;
      popinImg(imgs[i]);
    } else if(e.keyCode == 27){
      popinBg.click();
    }
  });

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
      }).append($('<img/>',{src:"http://passets-cdn.pinterest.com/images/search.gif"}))

  var qWr = $('<div/>', {id:'qWr'}).css({cssFloat:'left', margin:'8px 0 0', paddingLeft:15}).append(qForm.append(qInput).append(qA));

  var logo = $('<div/>',{id:'logo'}).css({position:"absolute",marginLeft:-50, left:'50%', top:7, cursor:'pointer'}).click(function(){showImgs()})
    .append($('<img/>',{src:'http://lemurheavy.com/images/craigspin/logo.png'}));

  var likesLink = $('<div/>',{href:'javascript://'}).css({cssFloat:'right', margin:'8px 0 0', paddingRight:15, cursor:'pointer'})
    .html('Likes (n)').click(function(){showLikes()});

  var nav = $('<div/>',{id:'nav'}).css({
      position:'fixed', height:44, top:0, left:0, width:'100%', backgroundColor:'#FAF7F7', boxShadow:"inset 0 1px #fff, 0 1px 3px rgba(34,25,25,0.4)", zIndex: 103,
      "-webkit-box-shadow": "inset 0 1px #fff, 0 1px 3px rgba(34,25,25,0.4)",
      "-moz-box-shadow": "inset 0 1px #fff, 0 1px 2px rgba(34,25,25,0.4)"
    }).append(qWr).append(logo).append(likesLink);
  
  var PopinWidth = 650;
  var popin = $('<div/>',{style:'-moz-box-shadow: 0 1px 7px rgba(34,25,25,0.4); -webkit-box-shadow: 0 1px 7px rgba(34,25,25,0.4); box-shadow: 0 1px 7px rgba(34,25,25,0.4);'})
    .css({position:'absolute', top: $(window).scrollTop()+30, left: '10%', backgroundColor:'white',
      width: PopinWidth,
      zIndex: 1001
    }).hide();

  var popinTitle = $('<div/>').css({padding:20, fontWeight:'bold', fontSize:14, borderBottom: '1px solid #D1CDCD'});
  popin.append(popinTitle);

  var popinLike = $('<button/>').html('Like').click(function(){
    if(!isLiked(currImg)) {
      likes.push(currImg);
      $(this).html('Unlike');
    } else {
      likes.splice(likes.indexOf(currImg), 1);
      $(this).html('Like');
    }
    localStorage.setItem('likes',JSON.stringify(likes));
    return false;
  });
  popin.append(popinLike);

  var popinBody = $('<div/>').css({padding:20});
  popin.append(popinBody);

  var popinBg = $('<div/>').css({position:'fixed', top:0, left:0, width:'100%', height:'100%', backgroundColor:'rgba(255, 255, 255, 0.93)', zIndex:1000}).hide();

  popinBg.click(function(){
    popinBg.hide();
    popin.hide();
    currImg = null;
  });
  
  $("html").css({background:'url("http://lemurheavy.com/images/craigspin/paper.jpg")'});
  
  var body = $("body").css({margin:0, fontFamily:"'helvetica neue', arial, sans-serif", fontSize:'11px', background:'transparent'})
    .html($('<div/>',{id:'wr', style:'padding:60px 0 0; width:100%;'})).append($("<div/>",{id:'parser'}).css({display:'none'})) 
    .append(nav)
  
  body.append(popin);
  body.append(popinBg);

  $('#q').focus(function(){
    $(this).css({ backgroundColor:"#fff" })
  }).blur(function(){
    $(this).css({ backgroundColor:"#FAF7F7" });
  });

  var isLiked = function(img){
    for(var i = 0; i < likes.length; i++){
      if(likes[i].id == img.id) return true;
    }
    return false;
  }

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
    var column = $("<div/>").css({width:pinWidth, cssFloat:'left', marginLeft:colMargin});
    if(i == 0) column.css({marginLeft: 0});

    columns.push(column);
    $('#wr').append(column);
  }

  $("#wr").append($('<div/>').css({clear:'both', cssFloat:'none'}));

  // === Likes ===
  var showingImgs = true;
  var showingLikes = false;

  var showLikes = function(){
    for(var i = 0; i < nColumns; i++) {
      columns[i].html('');
    }

    for(var i = 0; i < likes.length; i++){
      drawImage(likes[i]);
    }
    showingLikes = true;
  }
  var showImgs = function(){
    for(var i = 0; i < nColumns; i++) {
      columns[i].html('');
    }

    for(var i = 0; i < imgs.length; i++){
      drawImage(imgs[i]);
    }
    showingImgs = true;
  }
  // === Page Loading ===

  var currPage = 0;
  var qReg = /query=(.*?)(&|$)/;
  var currSearch = ( window.location.search.match(qReg) || [] )[1];

  var category = window.location.pathname.match(/(\w{3})\/?$/)[1];

  var nextPage = function(){
    if(showingLikes) return;

    loading = true;
    loadPage(currSearch, ++currPage);
  }

  var loadPage = function(q,page){
    console.log('loadPage: '+ q);

    var url = '/search/'+category+'?query='+(q || '');

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

  var imgs = [];
  var currImg = null;

  var addImage = function(src,as){
    var html = as.parents('p').html();
    if(!html) return;
    var img = {
      id: as[0].href.match(/\d{6,}/)[0],
      src: src,
      href: as[0].href,
      title: as[0].innerHTML,
      section: as[1] && as[1].innerHTML,
      sectionHref: as[1] && as[1].href,
      price: ( html.match(/(\$.*?)</) || [])[1],
      location: ( html.match(/\((.*?)\)/) || [])[1]
    };

    imgs.push(img);
    drawImage(img);
  }

  var drawImage = function(img){
		var image = $('<div/>',{
			style: 'padding:15px 15px 0; margin: 0 0 10px; overflow: hidden; background-color:#fff; '+
				'-moz-box-shadow: 0 1px 2px rgba(34,25,25,0.4); -webkit-box-shadow: 0 1px 3px rgba(34,25,25,0.4); box-shadow: 0 1px 3px rgba(34,25,25,0.4);'})
			.append($('<a/>',{href:img.href, target:'_blank'}).append($('<img/>',{src:img.src, style:'width:'+imageWidth+'px'})))
			.append($('<div/>').css({margin:'10px 0'})
				.html($('<a/>',{href:img.href, target:'_blank'}).css({color:"#000", textDecoration:'none'})
					.html('<b>'+( img.price || '')+'</b>'+ ' ' + img.title.substr(0,20))))
			.append($('<div/>').css({padding:10, margin:'0 -15px', backgroundColor:"#eee"})
				.html($('<a/>',{href:img.sectionHref, target:'_blank'}).css({color:'#8C7E7E', fontWeight:'bold', textTransform:'capitalize', textDecoration:'none'})
				.html(getWhere(img))));

    image.click(function(){
      return popinImg(img);
    });

    var shortest = columns[0];
    for(var j=0; j < nColumns; j++) 
      if(columns[j].height() < shortest.height()) 
        shortest = columns[j];

    shortest.append(image);
  }

  var getWhere = function(img){
   return $('<a/>',{href:img.sectionHref, target:'_blank'}).css({color:'#8C7E7E', fontWeight:'bold', textTransform:'capitalize', textDecoration:'none'})
      .html(img.section + ' ('+img.location+')');
  }

  var popinImg = function(img){
    currImg = img;

    $.get(img.href, function(page){
      var doc = $('<div/>').html(page);
      popinBg.show();
      popin.show();
      popin.find('button').html(isLiked(img) ? 'Unlike' : 'Like'); 
      popinTitle.html($('<a/>',{href:img.href, target:'_blank'}).html(img.title + " " + img.price));
      popinTitle.append($('<div/>').html(doc.find('.postingdate').html()+" in "+getWhere(img).html()));
      popinTitle.append($('<div/>').html(doc.find('.returnemail').html()));

      popin.css({left:$(window).width()/2 - PopinWidth/2, top: $(window).scrollTop()+20});
      //doc.find('img').css({width:650})
      popinBody.html(doc.find('#userbody').html());
    });
    return false;
  }

  // ================ START ==================

  parse(firstPage);

})()