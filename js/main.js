/*
 * JS file for Expenses Divider
 * @author : Harsh Kothari <harshkothari410@gmail.com>
 * MIT License
 */ 

$(function(){

	// Function click event handler for add person
	$('#name_add').click( function(){
		var name = $('#names').val();

		if ( name == '' || name == 'all' ){
			alert('Please enter the name');
		}
		else{
			$('#names').val('');
			name = toTitleCase( name );
			// <p class="form-group ">Anirudh <a href="#"><span class="glyphicon glyphicon-remove"></span></a></p>
			// append names
			$('#names_append').append('<p class="form-group ">' + name + '    <a href="#" name="' + name + '"><span class="glyphicon glyphicon-remove"></span></a></p>');

			// update name counter
			var counter = parseInt( $('#name_count').text() );
			$('#name_count').text( counter + 1 );

			//<div class="checkbox"><input type="checkbox" value="">All</label></div>
			// create check box and append names
			$('#checkbox_append').append( '<div class="checkbox"><input type="checkbox" value="'+ name +'">' + name + '</label></div>' );

			// <tr><td>Anirudh</td><td>1.2</td></tr>
			// initialize table with 0 USD expense
			$('#table_name_append').append( '<tr><td>' + name + '</td><td class="ind_exp" id="' + name + '">0</td></tr>' );
		}
	} );

	// Function click event handler for add item
	$('#expense_add').click( function(){
		var name = $('#expense_name').val();
		var value = parseFloat( $('#expense_val').val() );
		console.log(value);
		if( isNaN(value) ){
			alert('Please enter the value');
		}
		else{
			$('#expense_name').val('');
			$('#expense_val').val('');
			name  = toTitleCase( name );

			var itemcount = parseInt( $('#item_count').text() );
			var itemval = parseFloat( $('#item_val').text() );

			//alert(itemval + 1.99);
			// update counter and value
			$('#item_count').text( itemcount + 1 );
			$('#item_val').text( itemval + value );

			// <tr><td>1</td><td>Milk</td><td>1.2</td></tr>
			var str = '<tr><td>' + (itemcount + 1) + '</td><td class="ind_item_name">' + name + '</td><td> ' + value + ' </td><td><a href="#" class="remove_item" id="' + name + '" name="' + name + '" val="' + value +'"><span class="glyphicon glyphicon-remove"></span></a></td></tr>';
			$('#table_item_append').append( str );

			calculate_expense( name, value );

			// Uncheck all and checked all
			$('input:checkbox').each( function(){
				var $this = $(this);
				if( $this.attr('value') == 'all' ){
					$this.attr('checked', true);
				}
				else{
					$this.attr('checked', false);
				}
			} );
		}
	} );

	// Remove Items
	$('#table_item_append').on( 'click', '.remove_item' ,function( e ){
		
		e.preventDefault();

		var $this = $(this);
		var list = $this.attr('list');
		var val = parseFloat($this.attr('val'));

		var name = $this.attr('name');

		// update main counter
		var itemcount = parseInt( $('#item_count').text() );
		var itemval = parseFloat( $('#item_val').text() );

		//alert(itemval + 1.99);
		// update counter and value
		$('#item_count').text( itemcount - 1 );
		$('#item_val').text( itemval - val );

		list = list.split(',');

		remove_expense( $this, list, val );
	} );

	// check box invert function
	$('body').on( 'click', 'input:checkbox', function(){
		$this = $(this);
		if( $this.attr('value') == 'all' ){
			$('input:checkbox').each( function(){
				var $this = $(this);
				if( $this.attr('value') == 'all' ){
					//continue;
				}
				else{
					$this.attr('checked', false);
				}
			} );
		}
		else{
			$('input:checkbox[value="all"]').attr('checked', false);
		}
	} );
})

// Function for dividing expenses
var calculate_expense = function( name, value ){
	var checkedValues = $('input:checkbox:checked').map(function() {
		return this.value;
	}).get();

	for( i = 0; i < checkedValues.length; i++ ){
		if( checkedValues[i] == 'all' ){
			$('#table_name_append tr').each( function(){
				console.log($(this));
				$this = $(this).find('.ind_exp');
				var val = parseFloat( $this.text() );
				var counter = parseInt( $('#name_count').text() );
				val = val + ( value / counter );
				$this.text( val );

				// update list to array
				$('#' + name).attr('list', checkedValues.toString());
				$('.ind_item_name').last().text( name + ' (' + checkedValues.toString() + ')' );
			} );
		}
		else{
			var val = parseFloat( $('#' + checkedValues[i]).text() );
			$('#' + checkedValues[i]).text( val + value / (checkedValues.length) );

			$('#' + name).attr('list', checkedValues.toString());
			$('.ind_item_name').last().text( name + ' (' + checkedValues.toString() + ')' );
		}
	}
}

// Function for removing Expenses 
var remove_expense = function( dom, list, value ){
	for( i = 0; i < list.length; i++ ){
		if( list[i] == 'all' ){
			$('#table_name_append tr').each( function(){
				$this = $(this).find('.ind_exp');
				var val = parseFloat( $this.text() );
				var counter = parseInt( $('#name_count').text() );
				val = val - (value / counter );
				$this.text( val );
			} );
		}
		else{
			console.log(value);
			var val = parseFloat( $('#' + list[i]).text() );
			$('#' + list[i]).text( val - value / (list.length) );
		}
	}
	dom.parent().parent().remove();
}

// Function for converting string to Title Case
function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}