/*
 * counter.js
 * Count characters as well as words in Paragraph
 * Created By : Harsh Kothari (harshkothari410@gmail.com)
 * MIT License 
 */

$(function(){

	$('#submitinfo').click(function(){
		var charlist = $('#paragraph').val();
		$('#charcount').text(charlist.length);
		$("#wordcount").text(countWords(charlist));
	})

	function countWords(s){
		s = s.replace(/(^\s*)|(\s*$)/gi,"");
		s = s.replace(/[ ]{2,}/gi," ");
		s = s.replace(/\n /,"\n");
		return s.split(' ').length;
	}
})