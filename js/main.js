/*
 * JS file for Expenses Divider
 * @author : Harsh Kothari <harshkothari410@gmail.com>
 * MIT License
 */ 

$(function(){

	// Function click event handler for add person
	$('#name_add').click( function(){
		var name = $('#names').val();
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
	} );

	// Function click event handler for add item
	$('#expense_add').click( function(){
		var name = $('#expense_name').val();
		var value = parseFloat( $('#expense_val').val() );

		name  = toTitleCase( name );

		var itemcount = parseInt( $('#item_count').text() );
		var itemval = parseFloat( $('#item_val').text() );

		//alert(itemval + 1.99);
		// update counter and value
		$('#item_count').text( itemcount + 1 );
		$('#item_val').text( itemval + value );

		// <tr><td>1</td><td>Milk</td><td>1.2</td></tr>
		var str = '<tr><td>' + (itemcount + 1) + '</td><td>' + name + '</td><td> ' + value + ' </td><td><a href="#" name="' + name + '" val="' + value +'"><span class="glyphicon glyphicon-remove"></span></a></td></tr>';
		$('#table_item_append').append( str );

		calculate_expense( value );

	} );

	// check box invert function
})

// Function for dividing expenses
var calculate_expense = function( value ){
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
				val = val + (value / counter );

				$this.text( val );
			} )
		}
		else{
			var val = parseFloat( $('#' + checkedValues[i]).text() );
			$('#' + checkedValues[i]).text( val + value / (checkedValues.length) );
		}
	}
}

// Function for converting string to Title Case
function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}