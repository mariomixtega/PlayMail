
var SetEvents = function(){
		$(document).ready(function(){
			$('.group-list').on('click','a',function(){
				$('a','.group-list').removeClass('active');

				$(this).addClass('active');

				var id = parseInt($(this).attr('data-id') || -1);

				if(typeof page != 'undefined'){
					page.GetList(id,function(data){
						console.log(data);
						Utils.Render('.black-list','#color-list',{List:data.BlackList.List, title:"Lista Negra",Count:data.BlackList.Count});
						Utils.Render('.gray-list','#color-list',{List:data.GrayList.List, title:"Lista Gris",Count:data.GrayList.Count});
						Utils.Render('.white-list','#color-list',{List:data.WhiteList.List, title:"Lista Blanca",Count:data.WhiteList.Count});

						Utils.Render('.email-list','#color-list',{List:data.List, title:"Total de Mails",Count:data.ListCount});

						loadList = true;
						
					});
				}

				$('a:last','.scrollable-menu').css('margin-bottom','2px');

			});

			$('.email-list').on('mouseover','a',function(){
				$('.delete',this).removeClass('hidden');
			});

			$('.email-list').on('mouseleave','a',function(){
				$('.delete',this).addClass('hidden');
			});

			$('.new-group').on('click',function(){
				if(typeof page != 'undefined'){
					page.NewGroup();
				}
			});

		})
	}


var Group = function(){

	this.Init = function(){
		this.GetData();

		SetEvents();
	};


	this.GetData = function(cb,idCampaign){


		if(typeof idCampaign != 'number'){
			idCampaign = -1;
		}

		var groups = {};
		var list = {};
		var me = this;
		var loadGruops = false, loadList = false;
		var check = function(){
			if(loadGruops && loadList){
				if(typeof cb == 'function') cb({Groups: groups, List: list});

			}
		}
		
		this.GetGroups(function(data){
			Utils.Render('.group-list', '#group-list', data);
			loadGruops = true;
			
		});

		this.GetList(idCampaign,function(data){
			console.log(data);
			Utils.Render('.black-list','#color-list',{List:data.BlackList.List, title:"Lista Negra",Count:data.BlackList.Count});
			Utils.Render('.gray-list','#color-list',{List:data.GrayList.List, title:"Lista Gris",Count:data.GrayList.Count});
			Utils.Render('.white-list','#color-list',{List:data.WhiteList.List, title:"Lista Blanca",Count:data.WhiteList.Count});

			Utils.Render('.email-list','#color-list',{List:data.List, title:"Total de Mails",Count:data.ListCount});

			loadList = true;
			
		});

		return;
	};

	this.GetGroups = function(cb){
		/*Ajax*/
		
		var data = {
				  "GroupsCount":7,
				  "Groups": [
					   {
				        "Name":"Totales",
				        "Email":162,
				        "Class":"active"
				      },
				      {
				        "Name":"Empresarios",
				        "Email":14,
				        "Id":0
				      },
				      {
				        "Name":"Directivos",
				        "Email":3,
				        "Id":1
				      },
				      {
				        "Name":"Colaboradores",
				        "Email":7,
				        "Id":2
				      },
				      {
				        "Name":"Clientes",
				        "Email":100,
				        "Id":3
				      },
				      {
				        "Name":"Skaters",
				        "Email":34,
				        "Id":4
				      },
				      {
				        "Name":"Jovenazos",
				        "Email":4,
				        "Id":4
				      },
				      {
				        "Name":"Vacios",
				        "Email":0,
				        "Id":5
				      }
				    ]
				};
		
		if(typeof cb == 'function'){
			cb(data);
		}
	};

	this.GetList = function(id,cb){
		/*Ajax*/

		var globalData = {
				  "GroupName":"Totales",
				  "ListCount":162,
				  "BlackList": {
				    "Count": 50,
				    "List": [
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za"
				    ]
				  },
				  "GrayList": {
				    "Count": 50,
				    "List": [
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za"
				    ]
				  },
				  "WhiteList": {
				    "Count": 62,
				    "List": [
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za"
				    ]
				  },
				  "List":[
				     	"foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					     "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					     "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "foreignexchangedept1@yahoo.com.hk",
					    "williamsgeorgeatmcarddept1@gmail.com",
					    "ericlim220@yahoo.com",
					    "mr.paul.harry08@gmail.com",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za",
					    "katblix4@gmail.com",
					    "felica4uu@hotmail.com",
					    "j.nomvete30@workmail.co.za"
				    ]
				}

		var data = [
						{
						  "GroupName":"Empresarios",
						  "ListCount":14,
						  "BlackList": {
						    "Count": 7,
						    "List": [
							    "foreignexchangedept1@yahoo.com.hk",
							    "williamsgeorgeatmcarddept1@gmail.com",
							    "ericlim220@yahoo.com",
							    "mr.paul.harry08@gmail.com",
							    "katblix4@gmail.com",
							    "felica4uu@hotmail.com",
							    "j.nomvete30@workmail.co.za"
						    ]
						  },
						  "GrayList": {
						    "Count": 3,
						    "List": [
							    "paul_ku2@hotmail.com",
							    "davis_mark1@outlook.com",
							    "sgtamyrhodes@qq.com"
						    ]
						  },
						  "WhiteList": {
						    "Count": 4,
						    "List": [
							    "dhldelivery@pochta.com",
							    "arfinances@live.com",
							    "help202@outlook.dk",
							    "mrs.gloriamackenie@outlook.com"
						    ]
						  },
						  "List":[
							    "foreignexchangedept1@yahoo.com.hk",
							    "williamsgeorgeatmcarddept1@gmail.com",
							    "ericlim220@yahoo.com",
							    "mr.paul.harry08@gmail.com",
							    "katblix4@gmail.com",
							    "felica4uu@hotmail.com",
							    "j.nomvete30@workmail.co.za",
							    "paul_ku2@hotmail.com",
							    "davis_mark1@outlook.com",
							    "sgtamyrhodes@qq.com",
							    "dhldelivery@pochta.com",
							    "arfinances@live.com",
							    "help202@outlook.dk",
							    "mrs.gloriamackenie@outlook.com"
						    ],
						},
						{
						  "GroupName":"Directivos",
						  "ListCount":3,
						  "BlackList": {
						    "Count": 0,
						    "List": [
						    ]
						  },
						  "GrayList": {
						    "Count": 1,
						    "List": [
						    "paul_ku2@hotmail.com"
						    ]
						  },
						  "WhiteList": {
						    "Count": 2,
						    "List": [
						    "help202@outlook.dk",
						    "mrs.gloriamackenie@outlook.com"
						    ]
						  },
						  "List":[
						    "paul_ku2@hotmail.com",
						    "help202@outlook.dk",
						    "mrs.gloriamackenie@outlook.com"
						    ]
						}
				   ];

		if(typeof id != 'number' || id < 0){
			if(typeof cb == 'function') cb(globalData);
			return;// globalData;
		}

		

		if(typeof cb == 'function') cb(data[id % data.length]);

		return;// data[id % data.length];
	};

	this.GetDetailedList = function(cb){
		/*Ajax*/
		if(typeof cb == 'function'){
			cb([
				  {
				    "Email":"pedro@hola.com",
				    "Id":0,
				    "Groups":["Empresarios","Jovenazos","Otros","Skaters"]
				  },
				  {
				    "Email":"mr.paul.harry08@gmail.com",
				    "Id":1,
				    "Groups":["Empresarios"]
				  },
				  {
				    "Email":"katblix4@gmail.com",
				    "Id":3,
				    "Groups":["Otros","Skaters"]
				  },
				  {
				    "Email":"dhldelivery@pochta.com",
				    "Id":3,
				    "Groups":["Otros","Jovenazos"]
				  },
				  {
				    "Email":"williamsgeorgeatmcarddept1@gmail.com",
				    "Id":3,
				    "Groups":["Otros","Skaters"]
				  }
				  ,
				  {
				    "Email":"davis_mark1@outlook.com",
				    "Id":3,
				    "Groups":["Skaters"]
				  },
				  {
				    "Email":"pedro@hola.com",
				    "Id":3,
				    "Groups":["Clientes","Skaters"]
				  },
				  {
				    "Email":"arfinances@live.com",
				    "Id":3,
				    "Groups":["Clientes"]
				  },
				  {
				    "Email":"help202@outlook.dk",
				    "Id":3,
				    "Groups":["Clientes"]
				  },
				  {
				    "Email":"sgtamyrhodes@qq.com",
				    "Id":3,
				    "Groups":["Clientes"]
				  }
				])
		}
	}
	this.NewGroup = function(){
		this.GetDetailedList(function(data){
			Utils.Render('.new-group-lists', '#group-list-new-group', {List:data});
		});
	};


	
};