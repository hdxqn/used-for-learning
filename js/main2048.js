var board=new Array();
//游戏所在的4*4的格子
var score=0;
//游戏分数
$(document).ready(function(){
	newgame();
});
function newgame(){
	//初始化棋盘
	init();
	//随机的在两个格子里生成数字

}
function init(){
	for (var i = 0; i < 4; i++) 
		for (var j = 0; j < 4; j++) {
			var gridCell = $('#grid-cell-'+i+"-"+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}

for (var i = 0; i < board.length; i++) {
	board[i]=new Array();
	for (var j = 0; j < 4; j++) {
	 board[i][j]=0;
	}
}
updateBorderView();
}
function updateBorderView(){
	$('.number-cell').remove();
	for (var i = 0; i < 4; i++) 
		for (var j = 0; j < 4; j++) {
			  $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
			var theNumberCell = $('#number-cell-'+i+'-'+j);
			if(board[i][j]==0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j)+50);
				theNumberCell.css('left',getPosLeft(i,j)+50);
			}else{
				theNumberCell.css('width','100px');
				theNumberCell.css('height','100px');
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i,j]));
				theNumberCell.css('color',getNumberColor(board[i,j]));
				theNumberCell.text(board[i,j]);
			   }
		}
	
}