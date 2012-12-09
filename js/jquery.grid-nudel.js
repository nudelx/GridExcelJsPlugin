
   var DoGrid = {

        config:{

          container: $('.grid'),
          color: 'black',
          borderWidth: '1px',
          borderColor: '#E6E6E6',
          borderStyle:'dashed',
          resolution: '20x20'


        },


        init:function(config){

          $.extend(this.config,config);
          var WxH = this.config.resolution.split('x');
          this.config.vertical = WxH[1]; 
          this.config.horisontal = WxH[0];

          this.config.conWidth = this.config.container.outerWidth();
          this.config.conHeight = this.config.container.outerHeight();
          
          this.calcCells();
          this.grawGrid();
          this.mapFunctions();

        },

        calcCells:function(){

          this.config.cellWidth  = parseInt(this.config.conWidth/this.config.horisontal);
          this.config.cellWidth  -=2;
          this.config.cellHeight = parseInt(this.config.conHeight/this.config.vertical);
          this.config.cellCount = 0;
          this.config.rowCount  = 0;
          // console.log(this);

        },

        buildCell:function(){

          this.config.cellCount++;
          return $('<td id="cell_'+this.config.cellCount+'" ></td>').css({
                                            'border-width': this.config.borderWidth,
                                          'border-style': this.config.borderStyle,
                                          'border-color': this.config.borderColor,
                                          width:this.config.cellWidth,
                                          height:this.config.cellHeight,
                                          cursor:'pointer'});
          
        },

        buildRow:function(){

          this.config.rowCount++;
          return $('<tr id="row_'+this.config.rowCount+'" ></tr>');
          
        },

        
        grawGrid:function(){



          $table = $('<table  cellpadding="0" cellspacing="0"></table>').css({width:'100%','border-width': this.config.borderWidth,
                                          'border-style': this.config.borderStyle,
                                          'border-color': this.config.borderColor});
          
           var row = 0
          
           for (var j = 0; j < this.config.vertical; j++) {

            row = this.buildRow();

            for (var i=0 ; i < this.config.horisontal; i++) {

              var cell = this.buildCell();
              row.append(cell);
            };

            $table.append(row);
                      
          };
          $table.appendTo(this.config.container);
        },

        mapFunctions:function(){

          $('table td[id*="cell"]',this.container).on('click',function(){

            var $this = $(this);

            if(!$this.children().length)
            {
              var $input = $('<input type="text" value="" >');
              $input.val($this.text()).css({
                width:$this.width()-6,
                height:$this.height()-6,
                padding:0
              });
            
              $this.empty();
              $input.appendTo($this).show().focus();
            }
            


          });

          $('input', this.container).live('focusout',function(){

             var $this = $(this);
             var $cell = $this.parent();
             $cell.text($this.val());
             $this.remove();
             
          });

        }

      }  



