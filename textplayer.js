/***
    This entity types text out on the screen charector by charector and also word wraps the text based on the maxwidth.
    This exaple centers the text both by height and width
***/

ig.module(
    'game.entities.textplayer'
    )
.requires(
    'impact.entity'
    )
.defines(function(){
    EntityTextplayer = ig.Entity.extend({
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(255, 100, 0, 0.7)',
        size: {x: 90, y: 90},
        pos:{x:0, y:0},
        textString:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate magna eget ullamcorper interdum. Vestibulum fermentum mattis risus vitae consectetur. Quisque sit amet augue accumsan odio pharetra vulputate quis nec odio. Ut iaculis arcu at magna lobortis, at tristique felis sodales. Mauris ultricies nunc ut odio eleifend, eget sodales ante suscipit.',
        textStringLength:null,
        textArray:null,
        textCurrentChar:1,
        displayText:'',
        maxWidth:250,
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.textArray = this.textString.split('');
            this.textStringLength = this.textArray.length;
            this.pos.x = ig.system.width/2;
            this.pos.y = ig.system.height/2;
        },
        kill:function(){
            this.parent();
        },
        draw: function() {
            var font = new ig.Font( 'media/04b03.font.png' );
            var x = ig.system.width/2;
            var y = ig.system.height/2;

            if(this.textCurrentChar <= this.textStringLength){
                this.displayText = '';
                var lineBreaks = 1;
                var breakChar = null;
                for (var i= 0; i < this.textCurrentChar; i++){
                    this.displayText += this.textArray[i];
                    if(font.widthForString(this.displayText) > this.maxWidth){
                        if(breakChar == null && this.textArray[i] == ' '){
                            breakChar = i;
                            this.displayText = this.displayText+ '\n';
                            lineBreaks++;
                        }else{
                            if(i >= (breakChar*lineBreaks) && this.textArray[i] == ' '){
                                this.displayText = this.displayText+ '\n';
                                lineBreaks++;
                            }
                        }
                    }
                }
                this.textCurrentChar++;
            }
            font.draw( this.displayText, this.pos.x, this.pos.y-(font.heightForString(this.displayText)/2), ig.Font.ALIGN.CENTER );
            this.parent();
        },
        update: function(){
            this.parent();
        }
    });
});