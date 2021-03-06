documentWidth=window.screen.availWidth;
//当前设备屏幕可以使用的宽度
gridContainerWidth=0.92*documentWidth;
cellSideLength=0.18*documentWidth;
cellSpace=0.04*documentWidth;
function getPosTop(i,j){
	return cellSpace+(cellSpace+cellSideLength)*i;
}
function getPosLeft(i,j){
	return cellSpace+(cellSpace+cellSideLength)*j;
}
function getNumberBackgroundColor(number){
	switch(number){
		case 2:return '#eee4da';break;
		case 4:return '#ede0c8';break;
		case 8:return '#f2b179';break;
		case 16:return '#f59563';break;
		case 32:return '#f67c5f';break;
		case 64:return '#f65e3b';break;
		case 128:return '#edcf72';break;
		case 256:return '#edcc61';break;
		case 512:return '#9c0';break;
		case 1024:return '#33b5e5';break;
		case 2048:return '#09c';break;
		case 4096:return '#a6c';break;
		case 8192:return '#93c';break;
	}
	return 'black';
}
function getNumberColor(number){
	if(number<=4)
		return '#776e65';
	return 'white';
}
function nospace(board){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			if(board[i][j]==0)
			return false;
		}
			return true;
}
function canMoveLeft(board){
	for (var i = 0; i < 4; i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				if(board[i][j-1]==0||board[i][j]==board[i][j-1]){return true;}
			}
		}
		return false;
}
function canMoveRight(board){
	for (var i = 0; i < 4; i++)
		for(var j=0;j<3;j++){
			if(board[i][j]!=0){
				if(board[i][j+1]==0||board[i][j]==board[i][j+1]){return true;}
			}
		}
		return false;
}
function canMoveUp(board){
	for (var i = 3; i > 0; i--)
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i-1][j]==0||board[i][j]==board[i-1][j]){return true;}
			}
		}
		return false;
}
function canMoveDown(board){
	for (var i = 0; i < 3; i++)
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i+1][j]==0||board[i][j]==board[i+1][j]){return true;}
			}
		}
		return false;
}
function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]!=0)
			return false;
	}
	return true;
	//col1是左侧列-较小数，col2是右侧列-较大数
}
function noBlockVertical(col,row1,row2,board){
	for(var i=row2-1;i>row1;i--){
		if(board[i][col]!=0)
			return false;
	}
	return true;
	//row1是上面行-较小数row2是下面行-较大数
}

function nomove(board){
	if(canMoveDown(board)||
		canMoveUp(board)||
		canMoveRight(board)||
		canMoveLeft(board)
		){return false;}
	return true;
}