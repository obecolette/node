(function() {

	console.log("app.js (front end for to do list)");

	var createItemInDOM =  function(item) {
		console.log(item)
		if (item.deleted_at) return;

	 	var $newItem = $("<li>");

	 	var $a = $("<a>");
	 	$a.attr("href", "/items/" + item.id);
	 	$a.text(item.name);

	 	var $checkmark = $('<img src="/assets/checkmark.png">');

	 	var $deletemark = $('<img src="/assets/deletemark.png">');
	 	$deletemark.attr("class", "delete");
	 	$deletemark.attr("href", "/items/" + item.id);

		$newItem.append( $a );
		$newItem.append( $checkmark );
		$newItem.append( $deletemark );

		$newItem.appendTo("ul.items");

	}

	// go get the list at start up
	$.ajax('/items', {
	  	method: 'GET',
	  	dataType: 'json'
	}).done(function(items) {
		console.log("got items array", items);
		$(items).each(function(index, item) {
			createItemInDOM(item);
		})
	}).fail(function(jqXHR, textStatus, erroThrown) {
	  // console.warn("fail")
	})

	// new item form ajax
	$('.create_item').on('submit', function(e) {
		e.preventDefault();

		$.ajax( $(this).attr('action'), {

			method: 'post',
			data: {
				new_item: $("[name='new_item']").val()
			}

		}).done(function(item) {

		 	createItemInDOM(item);

			$("[name='new_item']").val("").focus();

		}).fail(function(jqXHR) {
			// alert(jqXXR.responseText);
			$("[name='new_item']").css("border", "1px solid red");
			setTimeout(function() {
				$("[name='new_item']").css("border", "1px solid gray");
			}, 1000)
		})

	})

	$("body").on("click", "li .delete", function(e) {
		e.preventDefault();
		console.log("delete item");

		var $theListItem = $(this).parents("li");

		$.ajax( $(this).attr("href"), {
			method: "delete"
		}).done(function(item) {
			$theListItem.remove();

		}).fail(function(jqXHR) {

		})
	})

})()
