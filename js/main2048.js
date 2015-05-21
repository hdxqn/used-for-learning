var board=new Array();
//游戏所在的4*4的格子
var score=0;
//游戏分数
$(document).ready(function(){
	newgame();
});
function newgame(){
	init();
	//初始化棋盘
	generateOneNumber();
	generateOneNumber();
	//随机的在两个格子里生成数字,因为初始化要生成两个数字所以调用两次

}
function init(){
	for (var i = 0; i < 4; i++) 
		for (var j = 0; j < 4; j++) {
			var gridCell = $('#grid-cell-'+i+"-"+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}

for (var i = 0; i < 4; i++) {
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
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			   }
		}
	
}

function generateOneNumber(){
	if(nospace(board)){return false;}
		var randx=parseInt(Math.floor(Math.random()*4));
		var randy=parseInt(Math.floor(Math.random()*4));
		while(true){
			if(board[randx][randy]==0)
				break;
			randx=parseInt(Math.floor(Math.random()*4));
		    randy=parseInt(Math.floor(Math.random()*4));
		    //写一个死循环，当随机位置可用，即board[x][y]=0时，跳出循环，否则重新生成随机位置
		}
	//随机一个位置
	var randomNumber=Math.random()<0.5?2:4;
	//随机一个数字
	board[randx][randy]=randomNumber;
	showNumberWithAnimation(randx,randy,randomNumber);

	//在随机位置显示随机的数字
	return true;
}
$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
		if(moveLeft()){
			generateOneNumber();
			isgameover();
		}
		break;
		case 38://up
		if(moveUp()){
			generateOneNumber();
			isgameover();
		}
		break;
		case 39://right
		if(moveRight()){
			generateOneNumber();
			isgameover();
		}
		break;
		case 40://down
		if(moveDown()){
			generateOneNumber();
			isgameover();
		}
		break;
		default://default
		break;
	}
});

function isgameover(){

}

function moveLeft(){
	if(!canMoveLeft(board)){return false;}
	//判断是否可以向左移动
	for (var i = 0; i < 4; i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						//移动动作实现
						continue;
						//可以移动到空位置，满足条件产生一次移动
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//移动动作实现
						continue;
						//可以与左侧相加，满足条件产生一次移动
					}
				}
		}
	
}
setTimeout("updateBorderView()",200);
	return true;
}

function moveRight(){
	if(!canMoveRight(board)){return false;}
	//判断是否可以向右移动
	for (var i = 0; i < 4; i++)
		for(var j=0;j<3;j++){
			if(board[i][j]!=0){
				for(var k=j;k<4;k++){
					if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						//移动动作实现
						continue;
						//可以移动到空位置，满足条件产生一次移动
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//移动动作实现
						continue;
						//可以与右侧相加，满足条件产生一次移动
					}
				}
		}
	
}
setTimeout("updateBorderView()",200);
	return true;
}