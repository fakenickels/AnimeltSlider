(function( $ ){

var s = {
	cur: 0,
	
	totalBlocks: 0,
	
	init: function( el, opts ){
		var opts = $.extend( {}, opts );	
		if( opts.container )
			s.blocks = el.children();
		else
			s.blocks = el;

		s.totalBlocks = s.blocks.length - 1;	
			
		// Amazing effects for you sir
		if ( $.type( opts.effect ) == 'object' ){
			s.effects.personal = opts.effect;
			opts.effect = 'personal';
		}
		
		if( opts.auto )
			s.blocks.css({
				position: 'relative',
				display: 'none'
			});	
		
		s.blocks.first().css('display', 'block');	
		
		var controls = {
			prev: function(){		
				s.turn( -1, opts.effect );		
			},
			
			next: function(){
				s.turn( 1, opts.effect );								
			}
		}
		
		return controls;				
					
	},
	
	setCur: function( dir ){
		var cur = s.cur;
		// Next
		if( dir == 1 && cur == s.totalBlocks )
			cur = 0;
		else if( dir == 1  )
			cur++;
		// Prev	
		if( dir == -1 && cur == 0 )
			cur = s.totalBlocks;
		else if( dir == -1 )
			cur--;
		
		s.cur = cur;
			
		return cur;
	},
	
	turn: function( dir, effectName ){
		var effect = s.effects[ effectName ] || s.effects['flip'];
			s.blocks.eq( s.cur ).animelt(effect.hide, function(){
				$(s.blocks[ s.cur ]).css('display', 'none');
				
				// Alternate
				s.setCur( dir );
				s.blocks.eq( s.cur )
					.css('display', 'block')
					.animelt( effect.show );	
			});					
	},
	
	effects: {
		flip: { 
			hide: {
				opacity: '0',
				transform: 'rotateY(180deg)'
			},
			show: {
				opacity: '1',
				transform: 'rotateY(0deg)'
			}
		},
		
		scale: {
			hide: {
				opacity: '0',
				transform: 'scale(0)'
			},
			show: {
				opacity: '1',
				transform: 'scale(1)'
			}				
		},
		
		rotate: {
			hide: {
				opacity: '0',
				transform: 'rotate(45deg) scale(0)'
			},
			show: {
				opacity: '1',
				transform: 'rotate(0deg)  scale(1)'
			}			
		}
	}
};

$.fn.animeltSlider = function( opts ){
	return s.init( $(this), opts );
};

})( jQuery )
