var app = require('snapp');

console.log('Shop Application running in ' + __dirname);
    
var dummyProductList = [
    {id: 4,     name: 'Remote Controlled Hot Rod',  price: 49.00},
    {id: 'axe', name: '"Old Whacker" Steel Axe',    price: 89.00},
    {id: 19,    name: '4GB Desktop Computer RAM',   price: 69.99}
];

var css = '<style>body {font-family: Verdana;}</style>';

var o = function(s) {
    return s.replace(/\"/g, '&quot;');
};

app.$index = css+'<h1>Home Page</h1><p>Welcome to our website. Please view <a href="/products">Our Products</a>.</p>'+
    '<p>This is a Snapp demo for Node.js</p>';

app.products = function(callback) {
    var list = '';
    for(var i in dummyProductList) {
        product = dummyProductList[i];
        list += '<li><a href="/product/'+product.id+'">'+product.name+'</a> for $'+product.price+'</li>';
    }
    callback(css+'<h1>Our Products</h1><p><a href="/">&laquo; Back Home</a><ul>'+list+'</ul>');
};

app.product = function(callback, context) {
    var id = context.arg();
    for(var i in dummyProductList) {
        product = dummyProductList[i];
        if(product.id == id) {
            callback({
        
            $index: css+'<h1>Product Details</h1><p><a href="/products">&laquo; All Products</a><hr/>'+
                '<h3>'+product.name+'</h3>Price: $'+product.price+' <a href="/product/'+id+'/edit">[edit]</a>',
                
            edit: css+'<h1>Edit Product</h1><p><a href="/product/'+id+'">&laquo; Cancel</a><hr/>'+
                '<label>Name:</label><input name="name" value="'+o(product.name)+'"/>'+
                '<br/><label>Price:</label><input name="price" value="'+product.price+'"/>'+
                '<br/><input type="submit" value="Cannot Save Product in this Demo" disabled="disabled"/>',
                
            name: product.name
        
            });
            return;
        }
    }
    callback(css+'Product not found');
};

app.test = {
    good: 'Page exists',
    $404: 'Custom 404 Error by realm! Visit a page under /test other than /test/good to see this'
};