angular.module('barclaysApp',[])

.controller('bcHomeCtrl', function ($scope,$location) {
	
	// to do stuff
});

.directive('bInput',function()
{
	return{
		restrict:"E"
		//replace:""
		template:
			'<div>'+
			'<input type="{{bType}} name="{{bName}}">'+
			'</div>'
		scope:
		{
			bType:'@bType'
			bName:'@bName'
		}
		linc:function(scope,elem,attrs,ctrl){

		}
	}
});

// <b-radio>

// </b-radio>

// <fieldset class="horizontal">
// <fieldset1></fieldset1>
// <b-radio>

// </b-radio>
// <b-radio1>

// </b-radio1>
// </fieldset>

// <b-input b-type="text" b-name="finput" ></b-input>

// .directive("bInput",function()
// {
// 	return{
// 	restrict:"E"
// 	replace:""
// 	template:
// 	{
// 		<div class="">
// 		<input type="{{bType}} name="{{bName}}">
// 		</div>
// 	}
// 	scope:
// 	{
// 		bType:@bType
// 		bName:"@bName"
// 	}
// 	linc:function(scope,elem,attrs,ctrl){

// 	}
// 	}
// })

// <b-block b-arrange="hor">

// <b-radio>

// </b-radio>
// <b-radio1>

// </b-radio1>
// </b-block>


// .directive("bBlock",function()
// {
// 	return{
// 	restrict:"E"
// 	replace:""
// 	template:
// 	{
// 		<div class="">
// 		<fieldset class="{{bClass}}">
// 		<fieldset1></fieldset1>
// 		</fieldset>
// 		</div>
// 	}
// 	scope:
// 	{
// 		bType:@bType
// 		bName:"@bName"
// 		bArrange:"@bArrange"
// 		//bClass=""
// 	}
// 	linc:function(scope,elem,attrs,ctrl){
// 		if(scope.bArrange==="hor"){
// 			bClass="horizontal";
// 		}
// 		else{
// 			bClass="vertical"
// 		}
// 	}
// 	}
// })

// <fieldset class="horizontal">
// <fieldset1></fieldset1>
// <b-radio>

// </b-radio>
// <b-radio1>

// </b-radio1>
// </fieldset>




// <b-radio>

// </b-radio>
// <b-radio1>

// </b-radio1>

