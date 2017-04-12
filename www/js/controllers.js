angular.module('starter.controllers', [])

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
})
.controller('DashCtrl', function($scope,$rootScope) {

  // console.log(chance.word({length: 4})+"==========");

  function hasRepeatedLetters(str) {
    var patt = /^([a-z])\1+$/;
    var result = patt.test(str);
    console.log(result);
    return result;
  }

  var wordToFind = "mole";

  // while(true) {
  //   var str = chance.word({length:4});
  //   if(hasRepeatedLetters(str)) {
  //     console.log("has repeat");
  //   }
  //   else{
  //     console.log("no repeat");
  //     var wordToFind = str;
  //     break;
  //   }
  // }


// console.log(randomWords(4));

  $scope.jsonObj=[];

  $scope.dynamicJSON=function(value) {
      
      item = {};
      
      item ["value"] = "";
      item["bull"] = 0,
      item["cow"] = 0,
      item["btnDisplay"] = false;
      item["dupe"] = true ;

      $scope.jsonObj.push(angular.copy(item));

  };

  //first time add one empty row
  $scope.dynamicJSON(1);

 // $rootScope.isDisabled = false;
 $scope.values = {
  "bull" : 0,
  "cow" : 0
 }

  

  $scope.calculate = function(variable,count)
  {
    // $rootScope.isDisabled = true;
    $scope.jsonObj[count].btnDisplay = true;
    console.log("variable received===" + variable);
    //calculate same occurence -- BULL
    for (var i = variable.length - 1; i >= 0; i--) {
      if(variable.charAt(i) === wordToFind.charAt(i)) {
        // $scope.values.bull = $scope.values.bull + parseInt(1);
        $scope.jsonObj[count].bull = $scope.jsonObj[count].bull + parseInt(1);       
      }
    }
    //calculate diff occurence -- COW
    for (var i = 0 ; i < variable.length ; i++)
      for (var j = 0 ; j < wordToFind.length ; j++)
        if( (variable.charAt(i).toLowerCase() === (wordToFind.charAt(j).toLowerCase()) ) && i!==j) {
          console.log("inside cow function")
          // $scope.values.cow = $scope.values.cow + parseInt(1);
          $scope.jsonObj[count].cow = $scope.jsonObj[count].cow + parseInt(1);
        }

    if($scope.jsonObj[count].bull === 0  && $scope.jsonObj[count].cow === 0)
      for (var i = 0 ; i < variable.length ; i++)
        for (var j = 0 ; j < $scope.alphabeltList.length ; j++)
          if( variable.charAt(i).toLowerCase() ===  ($scope.alphabeltList[j].value).toLowerCase() )
            $scope.alphabeltList[j].display = false;
  
    //add the json until the word is correct
    if($scope.jsonObj[count].bull !== 4)
      $scope.dynamicJSON(count);
    else
      alert("Congratulations You found");
  }

  $scope.alphabeltList = 
  [
    {
      display: true,
      value: "A"
    },
    {
      display: true,
      value: "B"
    },
    {
      display: true,
      value: "C"
    },
    {
      display: true,
      value: "D"
    },
    {
      display: true,
      value: "E"
    },
    {
      display: true,
      value: "F"
    },
    {
      display: true,
      value: "G"
    },
    {
      display: true,
      value: "H"
    },
    {
      display: true,
      value: "I"
    },
    {
      display: true,
      value: "J"
    },
    {
      display: true,
      value: "K"
    },
    {
      display: true,
      value: "L"
    },
    {
      display: true,
      value: "M"
    },
    {
      display: true,
      value: "N"
    },
    {
      display: true,
      value: "O"
    },
    {
      display: true,
      value: "P"
    },
    {
      display: true,
      value: "Q"
    },
    {
      display: true,
      value: "R"
    },
    {
      display: true,
      value: "S"
    },
    {
      display: true,
      value: "T"
    },
    {
      display: true,
      value: "U"
    },
    {
      display: true,
      value: "V"
    },
    {
      display: true,
      value: "W"
    },
    {
      display: true,
      value: "X"
    },
    {
      display: true,
      value: "Y"
    },
    {
      display: true,
      value: "Z"
    },

  ];

  function chunk(arr, size) {
    var newArr = [];
      for (var i=0; i<arr.length; i+=size) {
        newArr.push(arr.slice(i, i+size));
      }
    return newArr;
  }

//set no of cards to be displayed in a row
$scope.chunkedData = chunk($scope.alphabeltList, 6);

$scope.$watch("jsonObj", function(newValue ,oldValue) {

  var len = $scope.jsonObj.length - 1;
  console.log(newValue[len].value);
  //alert(newValue);
  if(((oldValue[len].value).indexOf(newValue[len].value.slice(-1))!=-1 && (newValue[len].value.length > oldValue[len].value.length)) )
                                                                         // || (this.hasRepeatedLetters(newValue[len].value))) 
  {
    $scope.duplicate = true;
    console.log(newValue[len].value);
    // $scope.jsonObj[len].dupe = true;
    console.log("dupe");
  }
  else {
    $scope.duplicate = false;
    // $scope.jsonObj[len].dupe = false;
    console.log("not dupe");
  }   
  },true);

})