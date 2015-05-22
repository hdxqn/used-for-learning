var board=new Array();
//游戏所在的4*4的格子
var score=0;
//游戏分数
var hasConflicted=new Array();
//用来判断是否可以相加移动的数组
var startx=0;
var starty=0;
var endx=0;
var endy=0;
$(document).ready(function(){
	prepareForMobile();
	//为移动端设置元素样式
	newgame();
});
function prepareForMobile(){
	if(documentWidth>500){
		gridContainerWidth=500;
		cellSpace=20;
		cellSideLength=100;
	}
	$('#grid-container').css({
		width:gridContainerWidth-(2*cellSpace),
		height:gridContainerWidth-(2*cellSpace),
		padding:cellSpace,
		borderRadius:0.02*gridContainerWidth
	});
	$('.grid-cell').css({
		width:cellSideLength,
		height:cellSideLength,
		borderRadius:0.02*cellSideLength
	});
}
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
	hasConflicted[i]=new Array();
	for (var j = 0; j < 4; j++) {
	 board[i][j]=0;
	 hasConflicted[i][j]=false;
	}
}
updateBorderView();

score=0;
//分数初始化
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
				theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
				theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
			}else{
				theNumberCell.css('width',cellSideLength);
				theNumberCell.css('height',cellSideLength);
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			   }
			   hasConflicted[i][j]=false;
		}
	$('.number-cell').css({
		lineHeight:cellSideLength+'px',
		fontSize:0.6*cellSideLength+'px'
	});
}

function generateOneNumber(){
	if(nospace(board)){return false;}
		var randx=parseInt(Math.floor(Math.random()*4));
		var randy=parseInt(Math.floor(Math.random()*4));

		var times=0;
		while(times<50){
			if(board[randx][randy]==0)
				break;
			randx=parseInt(Math.floor(Math.random()*4));
		    randy=parseInt(Math.floor(Math.random()*4));
		    times++;
		    //写一个死循环，给50次机会，当随机位置可用，即board[x][y]=0时，跳出循环，否则重新生成随机位置
		}
		if(times>=50){
			for (var i = 0; i < 4; i++)
				for(var j=0;j<4;j++){
					if(board[i][j]==0){
						randx=i;
						randy=j;
					}
				}
			//当经过50次仍没有随机出可用位置，人工赋给位置
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
	event.preventDefault();
	//阻止摁键的默认动作，即方向键操作滚动条的动作
	switch(event.keyCode){
		case 37://left
		event.preventDefault();
	//阻止摁键的默认动作，即方向键操作滚动条的动作
		if(moveLeft()){
			setTimeout("generateOneNumber()",210); 
			setTimeout("isgameover()",300); 
		}
		break;
		case 38://up
		event.preventDefault();
	//阻止摁键的默认动作，即方向键操作滚动条的动作
		if(moveUp()){
			setTimeout("generateOneNumber()",210); 
			setTimeout("isgameover()",300); 
		}
		break;
		case 39://right
		event.preventDefault();
	//阻止摁键的默认动作，即方向键操作滚动条的动作
		if(moveRight()){
			setTimeout("generateOneNumber()",210); 
			setTimeout("isgameover()",300); 
		}
		break;
		case 40://down
		event.preventDefault();
	//阻止摁键的默认动作，即方向键操作滚动条的动作
		if(moveDown()){
			setTimeout("generateOneNumber()",210); 
			setTimeout("isgameover()",300); 
		}
		break;
		default://default
		break;
	}
});

document.addEventListener("touchstart",function(event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
});

document.addEventListener("touchmove",function(event){
	event.preventDefault();
	//防止因为使用event.preventDefault()出现触摸无效化的BUG
});

document.addEventListener("touchend",function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;

	var deltax=endx-startx;
	var deltay=endy-starty;

	if(Math.abs(deltax)<0.3*documentWidth&&Math.abs(deltay)<0.3*documentWidth){return;}

	if(Math.abs(deltax)>=Math.abs(deltay)){
		if(deltax>0){
			if(moveRight()){
			setTimeout("generateOneNumber()",210); 
			setTimeout("isgameover()",300); }
		}else{
			if(moveLeft()){
			setTimeout("generateOneNumber()",210); 
			setTimeout("isgameover()",300);} 
		}
	}else{
		if(deltay>0){
			if(moveDown()){
			setTimeout("generateOneNumber()",210); 
			setTimeout("isgameover()",300);}
		}else{
			if(moveUp()){
			setTimeout("generateOneNumber()",210); 
			setTimeout("isgameover()",300);} 
		}
	}
});


function isgameover(){
	if(nospace(board)&&nomove(board)){
		gameover();
	}
}

function gameover(){
	alert('game over!');
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
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//移动动作实现
						score+=board[i][k];
						UpdateScore(score);
						//分数改变
						hasConflicted[i][k]=true;
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
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						//移动动作实现
						score+=board[i][k];
						UpdateScore(score);
						//分数改变
						continue;
						//可以移动到空位置，满足条件产生一次移动
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//移动动作实现
						score+=board[i][k];
						UpdateScore(score);
						//分数改变
						hasConflicted[i][k]=true;
						continue;
						//可以与右侧相加，满足条件产生一次移动
					}
				}
		}
	
}
setTimeout("updateBorderView()",200);
	return true;
}

function moveUp(){
	if(!canMoveUp(board)){return false;}
	//判断是否可以向上移动
	for(var j=0;j<4;j++)
		for (var i = 1; i < 4; i++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						//移动动作实现
						continue;
						//可以移动到空位置，满足条件产生一次移动
					}else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)&&!hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						//移动动作实现
						score+=board[k][j];
						UpdateScore(score);
						//分数改变
						hasConflicted[k][j]=true;
						continue;
						//可以与上侧相加，满足条件产生一次移动
					}
				}
		}
	
}
setTimeout("updateBorderView()",200);
	return true; 
}
function moveDown(){
	if(!canMoveDown(board)){return false;}
	//判断是否可以向下移动
	for(var j=0;j<4;j++)
		for (var i = 2; i >=0; i--){
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0&&noBlockVertical(j,i,k,board)){
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						//移动动作实现
						continue;
						//可以移动到空位置，满足条件产生一次移动
					}else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)&&!hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						//移动动作实现
						score+=board[k][j];
						UpdateScore(score);
						//分数改变
						hasConflicted[k][j]=true;
						continue;
						//可以与下侧相加，满足条件产生一次移动
					}
				}
		}
	
}
setTimeout("updateBorderView()",200);
	return true;
}