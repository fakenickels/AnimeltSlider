(function( $ ){
	$.fn.animeltSlider = function( set ){
		var	cur = 0,
			blocks = $(this).children()
				.css({
					transform: 'scale(0)'
				}),
			totalBlocks = blocks.length - 1;
			
		if( set == 'auto' )
			blocks.css({
				position: 'relative',
				display: 'none'
			});	
		
		blocks.first().css('display', 'block');	
		
		function getCur( direction ){
			// Next
			if( direction == 1 && cur == totalBlocks )
				cur = 0;
			else if( direction == 1  )
				cur++;
			// Prev	
			if( direction == -1 && cur == 0 )
				cur = totalBlocks;
			else if( direction == -1 )
				cur--;
	
			return cur;
		}
			
		function turn( dir ){
		// Animelt code :D
			$(blocks[ cur ]).animelt({
				opacity: '0',
				transform: 'scale(0)'
			}, function(){
				$(blocks[ cur ]).css('display', 'none');
				
				$( blocks[ cur = getCur(dir) ] )
					.css('display', 'block')
					.animelt({
						opacity: '1',
						transform: 'scale(1)'
					});	
			});					
		}
			
		var controls = {
			prev: function(){		
				turn( -1 );		
			},
			
			next: function(){
				turn( 1 );								
			}
		}
		
		return controls;
	
	}
})( jQuery )
