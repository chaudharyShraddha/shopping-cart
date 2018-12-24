let Product = require('../models/product');
let mongoose = require('mongoose');
var url = "mongodb://localhost:27017/shopping";

mongoose.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
});

let products = [ 
	new Product({
		imagePath : "https://image.ibb.co/fVevKU/1.jpg",
    	title : "wedding dress!!!",
 		description : "The dress is featuring solid color, rhinestone paneled, bandeau design and t-style.",
    	price : 3500,
	}),

	new Product({
		imagePath:"https://preview.ibb.co/ewdBtp/2.jpg",
   		title : "Cocktail party Dress!!!",
 		description : "Black Vintage Chiffon Marilyn Monroe Swing Rockabilly Retro Cocktail",
 		price : 2000,
	}),
	new Product({
		imagePath : "https://preview.ibb.co/jEjqm9/3.jpg",
 		title : "Mzi-dress..!!!",
 		description: "The Stock Long Party Dresses Sexy Gradient Color Ombre Strapless Backless",
 		price: 2000,
		}),

	new Product({
		imagePath : "https://image.ibb.co/mWP4eU/4.jpg",
 		title : "Bebz..!!!",
 		description : "New Hot Cute Short Tulle Sweetheart Beaded Waist Ball Gown Short Prom Dress",
 		price: 4750,
	}),
	new Product({
		imagePath : "https://i.ibb.co/wwSFD1V/a.jpg",
 		title : "Short Mini Lace-up!!!",
 		description : "Dresses Women's Fashion Pageant Bridal Gown Special Occasion Prom Bridesmaid Party Dress",
 		price : 7000,

	}),
	new Product({
		imagePath : "https://i.ibb.co/51P3PFN/b.jpg"  ,
		title : "Classy Women!!!",
 		description : "Ocassions:Casual and formal:Office ladies wear to work,business wear,work places,Evening party...",
 		price : 3000,
 
	}),	
];
let done=0;
for( let i=0; i<products.length; i++ ){
	products[i].save( (err,result) =>{
		done++;
		if( done === products.length){
			mongoose.disconnect();
		}
	});
};
